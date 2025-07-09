import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedProps,
  interpolateColor,
} from 'react-native-reanimated'
import { useTheme } from 'react-native-paper'

const { width } = Dimensions.get('window')
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

type BreathingSoftBubbleProps = {
  size: number
}

export const BreathingSoftBubble = ({ size }: BreathingSoftBubbleProps) => {
  const theme = useTheme()
  const radius = size / 2

  const scale = useSharedValue(1)
  const opacity = useSharedValue(0.8)
  const colorProgress = useSharedValue(0)

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.15, { duration: 4000 }), -1, true)
    opacity.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true)
    colorProgress.value = withRepeat(withTiming(1, { duration: 8000 }), -1, true)
  }, [])

  const animatedProps = useAnimatedProps(() => {
    const color = interpolateColor(
      colorProgress.value,
      [0, 0.5, 1],
      theme.dark
        ? ['rgba(139,92,246,0.5)', 'rgba(59,130,246,0.5)', 'rgba(6,182,212,0.5)']
        : ['rgba(168,85,247,0.5)', 'rgba(59,130,246,0.5)', 'rgba(14,165,233,0.5)']
    )

    return {
      r: radius * scale.value,
      fill: color,
      opacity: opacity.value,
    }
  })

  return (
    <Svg
      width={size * 1.5}
      height={size * 1.5}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -0.75 * size }, { translateY: -0.75 * size }],
      }}
    >
      <AnimatedCircle
        cx={(size * 1.5) / 2}
        cy={(size * 1.5) / 2}
        animatedProps={animatedProps}
      />
    </Svg>
  )
}
