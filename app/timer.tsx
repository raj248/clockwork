import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Button, Dialog, Portal, TextInput, useTheme, Menu, Divider } from 'react-native-paper'
import { useTimerStore } from '~/stores/timerStore'
import { useSessionStore } from '~/stores/sessionStore'
import { useProjectStore } from '~/stores/projectStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import uuid from 'react-native-uuid'

export default function TimerScreen() {
  const theme = useTheme()
  const router = useRouter()
  const { projectId: routeProjectId } = useLocalSearchParams<{ projectId: string }>()
  const [elapsed, setElapsed] = useState(0)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [tag, setTag] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(routeProjectId || null)
  const [projectMenuVisible, setProjectMenuVisible] = useState(false)
  const [tagMenuVisible, setTagMenuVisible] = useState(false)

  const { isRunning, startTime, stopTimer, resetTimer } = useTimerStore()
  const [initialized, setInitialized] = useState(false)

  const addSession = useSessionStore((state) => state.addSession)
  const projects = useProjectStore((state) => state.projects)
  const allTags = useSessionStore((state) => state.sessions.map((s) => s.tag))
  const uniqueTags = Array.from(new Set(allTags))

  const availableTags = selectedProjectId
    ? useSessionStore.getState().getTagsForProject(selectedProjectId)
    : uniqueTags

  useEffect(() => {
    if (!initialized) {
      if (!isRunning) {
        useTimerStore.getState().startTimer(routeProjectId as string | undefined)
        console.log("Timer Started")
      }
      setInitialized(true)
    }

    const interval = setInterval(() => {
      if (startTime) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [initialized, isRunning, startTime])

  useEffect(() => {
    return () => {
      resetTimer()
      console.log("Timer Reset on Unmount")
    }
  }, [])


  const handleStop = () => {
    stopTimer()
    setVisible(true)
  }

  const handleSave = () => {
    const endTime = new Date().toISOString()
    const startTimeISO = new Date(Date.now() - elapsed * 1000).toISOString()

    addSession({
      id: uuid.v4() as string,
      projectId: selectedProjectId || '',
      start: startTimeISO,
      end: endTime,
      note: note || title,
      tag: tag || 'untagged',
    })

    resetTimer()
    setVisible(false)
    router.back()
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text variant="displayMedium">{Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}</Text>
      <Button mode="contained" onPress={handleStop} style={{ marginTop: 20 }}>
        Stop
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Save Session</Dialog.Title>
          <Dialog.Content>
            {!selectedProjectId && (
              <>
                <Menu
                  visible={projectMenuVisible}
                  onDismiss={() => setProjectMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => setProjectMenuVisible(true)}
                      style={{ marginBottom: 8 }}
                    >
                      {selectedProjectId
                        ? projects.find((p) => p.id === selectedProjectId)?.description || 'Select Project'
                        : 'Select Project'}
                    </Button>
                  }
                >
                  {projects.map((project) => (
                    <Menu.Item
                      key={project.id}
                      onPress={() => {
                        setSelectedProjectId(project.id)
                        setProjectMenuVisible(false)
                      }}
                      title={project.description}
                    />
                  ))}
                </Menu>
              </>
            )}

            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              style={{ marginBottom: 8 }}
            />
            <TextInput
              label="Note"
              value={note}
              onChangeText={setNote}
              style={{ marginBottom: 8 }}
            />

            <Menu
              visible={tagMenuVisible}
              onDismiss={() => setTagMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setTagMenuVisible(true)}
                  style={{ marginBottom: 8 }}
                >
                  {tag ? `#${tag}` : 'Select Tag'}
                </Button>
              }
            >
              {availableTags.length > 0 ? (
                availableTags.map((t) => (
                  <Menu.Item
                    key={t}
                    onPress={() => {
                      setTag(t)
                      setTagMenuVisible(false)
                    }}
                    title={`#${t}`}
                  />
                ))
              ) : (
                <Menu.Item disabled title="No tags found" />
              )}
            </Menu>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
