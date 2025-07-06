import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Circle } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type GradientProgressRingProps = {
  progress: number // 0 to 1
  size: number
  strokeWidth: number
}

export const GradientProgressRing = ({
  progress,
  size,
  strokeWidth,
}: GradientProgressRingProps) => {
  const theme = useTheme()
  const radius = (size - strokeWidth - 8) / 2
  const circumference = 2 * Math.PI * radius

  const animatedProgress = useSharedValue(0)

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 800 })
  }, [progress])

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: `${circumference}, ${circumference}`,
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }))

  const glowColor = theme.dark ? '#06b6d4' : '#3b82f6'
  const bgStroke = theme.dark ? '#ffffff33' : '#00000022'

  return (
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={theme.dark ? '#8b5cf6' : '#a855f7'} />
          <Stop offset="50%" stopColor={theme.dark ? '#3b82f6' : '#2563eb'} />
          <Stop offset="100%" stopColor={theme.dark ? '#06b6d4' : '#0ea5e9'} />
        </LinearGradient>
      </Defs>

      {/* Glow Ring */}
      <Circle
        stroke={glowColor}
        strokeOpacity={0.15}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius + 6}
        strokeWidth={4}
      />

      {/* Background Circle */}
      <Circle
        stroke={bgStroke}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />

      {/* Gradient Progress Circle */}
      <AnimatedCircle
        stroke="url(#grad)"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        rotation={-90}
        origin={`${size / 2}, ${size / 2}`}
        animatedProps={animatedProps}
      />
    </Svg>
  )
}
