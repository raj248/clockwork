import React from 'react'
import { FlatList, View } from 'react-native'
import { ProjectCard } from '~/components/ProjectCard'
import { useProjectStore } from '~/stores/projectStore'
import { Stack } from 'expo-router'
import { Text, useTheme } from 'react-native-paper'
import { Clock } from '~/components/Clock'

export default function Home() {
  const projects = useProjectStore((state) => state.projects)
  const theme = useTheme()
  return (
    <View className="flex-1" style={{ backgroundColor: theme.colors.background }}>
      <Stack.Screen options={{ title: 'Clockwork Projects' }} />
      <Clock />
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.outline }}
            >
              No projects yet. Add a project to get started.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  )
}
