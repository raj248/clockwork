import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Button, Dialog, Portal, TextInput, useTheme, Menu } from 'react-native-paper'
import { useTimerStore } from '~/stores/timerStore'
import { useSessionStore } from '~/stores/sessionStore'
import { useProjectStore } from '~/stores/projectStore'
import { useLocalSearchParams, useRouter } from 'expo-router'
import uuid from 'react-native-uuid'

import { AnimatedBackground } from '~/components/AnimatedBackground'
import { SaveSessionDialog } from '~/components/saveSessionDialog'
import { BreathingSoftBubble } from '~/components/BreathingSoftBubble'

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

  const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0')
  const seconds = (elapsed % 60).toString().padStart(2, '0')
  const progress = (elapsed % 60) / 60

  return (
    <View
      className="flex-1 items-center"
      style={{ backgroundColor: theme.dark ? '#0a0a0a' : '#f9f9f9' }}
    >
      <AnimatedBackground />

      <View className="mt-16 items-center justify-center">
        <BreathingSoftBubble size={240} />


        <Text
          variant="displayLarge"
          className={`absolute font-mono ${theme.dark ? 'text-white' : 'text-black'}`}
          style={{
            textShadowColor: theme.dark ? '#06b6d4aa' : '#3b82f6aa',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 6,
          }}
        >
          {minutes}:{seconds}
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={handleStop}
        className="mt-10 z-10"
      >
        Stop
      </Button>

      <SaveSessionDialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        onSave={handleSave}
        title={title}
        setTitle={setTitle}
        note={note}
        setNote={setNote}
        tag={tag}
        setTag={setTag}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        projects={projects}
        availableTags={availableTags}
      />

    </View>
  )
}
