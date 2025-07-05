import React, { useState } from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import { View, FlatList } from 'react-native'
import { Text, Card, useTheme, SegmentedButtons } from 'react-native-paper'
import { useProjectStore } from '~/stores/projectStore'
import { useSessionStore } from '~/stores/sessionStore'
import { Project } from '~/stores/projectStore'
import { Session } from '~/stores/sessionStore'
import { GlobalFAB } from '~/components/GlobalFAB'

export default function ProjectDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const theme = useTheme()

  const project: Project | undefined = useProjectStore((state) =>
    state.projects.find((p) => p.id === id)
  )

  const sessions: Session[] = useSessionStore((state) =>
    state.sessions.filter((s) => s.projectId === id)
  )

  const tags = useSessionStore.getState().getTagsForProject(id!)
  const [selectedTag, setSelectedTag] = useState<string>('All')

  const filteredSessions =
    selectedTag === 'All'
      ? sessions
      : sessions.filter((s) => s.tag === selectedTag)

  if (!project) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text variant="bodyLarge" style={{ color: theme.colors.error }}>
          Project not found.
        </Text>
      </View>
    )
  }

  const totalTimeSpentSeconds = sessions.reduce((acc, session) => {
    const start = new Date(session.start).getTime()
    const end = new Date(session.end).getTime()
    const diffSeconds = Math.max(0, (end - start) / 1000)
    return acc + diffSeconds
  }, 0)

  return (
    <>
      <Stack.Screen options={{ title: project.description }} />

      <View className="flex-1 p-3">
        {/* Project Card */}
        <Card mode="contained" className="mb-3 rounded-2xl">
          <Card.Content>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              {project.description}
            </Text>
            <View className="flex-row flex-wrap gap-1 mt-1">
              {project.tags.map((tag) => (
                <Text
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-md"
                  style={{
                    backgroundColor: theme.colors.secondaryContainer,
                    color: theme.colors.onSecondaryContainer,
                  }}
                >
                  #{tag}
                </Text>
              ))}
            </View>
            <Text
              variant="labelSmall"
              className="mt-1"
              style={{ color: theme.colors.outline }}
            >
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </Text>
            <Text
              variant="labelSmall"
              className="mt-0.5"
              style={{ color: theme.colors.outline }}
            >
              Total Sessions: {sessions.length} | Total Time:{' '}
              {Math.floor(totalTimeSpentSeconds / 60)} min
            </Text>
          </Card.Content>
        </Card>

        {/* Segmented Buttons */}
        <SegmentedButtons
          value={selectedTag}
          onValueChange={setSelectedTag}
          buttons={[
            { value: 'All', label: 'All' },
            ...tags.map((tag) => ({ value: tag, label: tag })),
          ]}
          style={{ marginBottom: 12 }}
        />

        {/* Sessions List */}
        <FlatList
          data={filteredSessions}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>
                No sessions found for this filter.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Card mode="outlined" className="mb-2 rounded-xl">
              <Card.Content>
                <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
                  {item.note || 'No Note'}
                </Text>
                <View className="flex-row flex-wrap gap-1 mt-1">
                  <Text
                    className="px-2 py-0.5 text-xs rounded-md"
                    style={{
                      backgroundColor: theme.colors.secondaryContainer,
                      color: theme.colors.onSecondaryContainer,
                    }}
                  >
                    #{item.tag}
                  </Text>
                </View>
                <Text
                  variant="labelSmall"
                  className="mt-1"
                  style={{ color: theme.colors.outline }}
                >
                  {new Date(item.start).toLocaleString()} →{' '}
                  {new Date(item.end).toLocaleTimeString()}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
        <GlobalFAB projectId={id} />
      </View>
    </>
  )
}
