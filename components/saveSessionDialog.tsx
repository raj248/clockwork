// components/SaveSessionDialog.tsx

import React from 'react'
import { Button, Dialog, Menu, Portal, TextInput } from 'react-native-paper'
import { Project } from '~/stores/projectStore'

type SaveSessionDialogProps = {
  visible: boolean
  onDismiss: () => void
  onSave: () => void
  title: string
  setTitle: (text: string) => void
  note: string
  setNote: (text: string) => void
  tag: string
  setTag: (text: string) => void
  selectedProjectId: string | null
  setSelectedProjectId: (id: string) => void
  projects: Project[]
  availableTags: string[]
}

export const SaveSessionDialog: React.FC<SaveSessionDialogProps> = ({
  visible,
  onDismiss,
  onSave,
  title,
  setTitle,
  note,
  setNote,
  tag,
  setTag,
  selectedProjectId,
  setSelectedProjectId,
  projects,
  availableTags,
}) => {
  const [projectMenuVisible, setProjectMenuVisible] = React.useState(false)
  const [tagMenuVisible, setTagMenuVisible] = React.useState(false)

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Save Session</Dialog.Title>
        <Dialog.Content>
          {!selectedProjectId && (
            <Menu
              visible={projectMenuVisible}
              onDismiss={() => setProjectMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setProjectMenuVisible(true)}
                  className="mb-2"
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
          )}

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            className="mb-2"
          />
          <TextInput
            label="Note"
            value={note}
            onChangeText={setNote}
            className="mb-2"
          />

          <Menu
            visible={tagMenuVisible}
            onDismiss={() => setTagMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setTagMenuVisible(true)}
                className="mb-2"
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
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}
