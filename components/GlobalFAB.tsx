import React from 'react'
import { FAB, useTheme } from 'react-native-paper'
import { useRouter, useSegments } from 'expo-router'
import { View } from 'react-native'

interface GlobalFABProps {
  projectId?: string
}

export const GlobalFAB: React.FC<GlobalFABProps> = ({ projectId }) => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <FAB
      icon="timer-outline"
      mode="elevated"
      color={theme.colors.onPrimaryContainer}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: theme.colors.primaryContainer,
      }}
      onPress={() => {
        if (projectId) {
          router.push(`/timer?projectId=${projectId}`)
        } else {
          router.push('/timer')
        }
      }}
    />
  )
}
