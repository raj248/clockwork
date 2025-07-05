import React from 'react'
import { Card, Text, useTheme } from 'react-native-paper'
import { View } from 'react-native'
import { Project } from '~/stores/projectStore'
import { Link } from 'expo-router'
import { cn } from '~/lib/cn'
interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const theme = useTheme()
  const textColor = theme.colors.onSurface

  return (
    <>
      <Link href={`/project/${project.id}`} asChild>
        <Card
          mode="contained"
          className="mx-3 my-1.5 rounded-2xl"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Card.Content>
            <Text variant="titleMedium" style={{ color: textColor }}>
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
          </Card.Content>
        </Card>
      </Link>
    </>
  )
}
