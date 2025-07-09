import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { BreathingSoftBubble } from './BreathingSoftBubble'

const size = 220
const strokeWidth = 8

export const Clock = () => {
  const theme = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const seconds = time.getSeconds()
  const progress = seconds / 60

  return (
    <View className="flex-1 items-center justify-center my-8">
      <BreathingSoftBubble size={240} />

      <Text
        variant="displaySmall"
        className={`absolute text-center font-mono tracking-widest ${theme.dark ? 'text-white' : 'text-black'
          }`}
        style={{
          textShadowColor: theme.dark ? '#06b6d4' : '#3b82f6',
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 6,
        }}
      >
        {time.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </Text>
    </View>
  )
}
