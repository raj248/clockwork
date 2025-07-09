import React, { useState } from 'react'
import { FAB, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useColorScheme } from 'react-native'
import { useThemeStore } from '~/stores/themeStore'

interface GlobalFABProps {
  projectId?: string
}

export const GlobalFAB: React.FC<GlobalFABProps> = ({ projectId }) => {
  const theme = useTheme()
  const router = useRouter()
  const colorScheme = useColorScheme()

  const [open, setOpen] = useState(false)

  return (
    <FAB.Group
      open={open}
      visible={true}
      color={theme.colors.onPrimaryContainer}
      fabStyle={{
        backgroundColor: theme.colors.primaryContainer,
      }}
      icon={open ? 'close' : 'plus'}
      actions={[
        {
          icon: 'timer-outline',
          label: 'Start Timer',
          onPress: () => {
            if (projectId) {
              router.push(`/timer?projectId=${projectId}`)
            } else {
              router.push('/timer')
            }
          },
        },
        {
          icon: colorScheme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent',
          label: 'Toggle Theme',
          onPress: () => {
            // ⚡ Integrate your theme toggle logic here, for example:
            // toggleTheme()
            useThemeStore.getState().toggleTheme()
          },
        },
        {
          icon: 'cog-outline',
          label: 'Settings',
          onPress: () => {
            router.push('/settings')
          },
        },
      ]}
      onStateChange={({ open }) => setOpen(open)}
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    />
  )
}
