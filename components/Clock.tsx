import React, { useEffect, useState, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Svg, { Circle } from 'react-native-svg'

const size = 220
const strokeWidth = 8
const radius = (size - strokeWidth - 8) / 2 // safe padding
const circumference = 2 * Math.PI * radius

export const Clock = () => {
  const theme = useTheme()
  const [time, setTime] = useState(new Date())
  const scaleAnim = useRef(new Animated.Value(1)).current
  const opacityAnim = useRef(new Animated.Value(0.8)).current

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Breathing animation
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.03,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start()
  }, [])

  const seconds = time.getSeconds()
  const progress = (seconds / 60) * circumference

  return (
    <View className="items-center justify-center my-8">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        <Svg width={size} height={size}>
          {/* Glow Ring */}
          <Circle
            stroke={theme.colors.primary}
            strokeOpacity={0.15}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius + 6}
            strokeWidth={4}
          />
          {/* Background Circle */}
          <Circle
            stroke={theme.colors.outlineVariant}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            opacity={0.15}
          />
          {/* Progress Circle */}
          <Circle
            stroke={theme.colors.primary}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={`${progress}, ${circumference}`}
            strokeLinecap="round"
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
      </Animated.View>

      <Text
        variant="displaySmall"
        className="absolute text-center text-white text-opacity-90 font-mono tracking-widest"
        style={{
          textShadowColor: theme.colors.primary,
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
