import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
  SharedValue,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from 'react-native-paper'

type BlobAnimationParams = {
  translateX: SharedValue<number>
  translateY: SharedValue<number>
  scaleX: SharedValue<number>
  scaleY: SharedValue<number>
  offset: number
}

const { width, height } = Dimensions.get('window')

const createBlobAnimation = ({
  translateX,
  translateY,
  scaleX,
  scaleY,
  offset,
}: BlobAnimationParams) => {
  translateX.value = withRepeat(
    withTiming(offset, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  )
  translateY.value = withRepeat(
    withTiming(-offset, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  )
  scaleX.value = withRepeat(
    withTiming(1.3, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  )
  scaleY.value = withRepeat(
    withTiming(0.7, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
    -1,
    true
  )
}

export const AnimatedBackground = () => {
  const theme = useTheme()

  const colors = theme.dark
    ? ['rgba(139, 92, 246, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(6, 182, 212, 0.3)']
    : ['rgba(168, 85, 247, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(14, 165, 233, 0.3)']

  const blobs = Array.from({ length: 3 }, (_, i) => {
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const scaleX = useSharedValue(1)
    const scaleY = useSharedValue(1)

    useEffect(() => {
      createBlobAnimation({
        translateX,
        translateY,
        scaleX,
        scaleY,
        offset: 40 + i * 20,
      })
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scaleX: scaleX.value },
        { scaleY: scaleY.value },
      ],
    }))

    return { animatedStyle, key: i }
  })

  return (
    <>
      {blobs.map(({ animatedStyle, key }) => (
        <Animated.View
          key={key}
          style={[
            {
              position: 'absolute',
              top: height / 2 - width,
              left: width / 2 - width,
              width: width * 1.5,
              height: width * 1.5,
              borderRadius: width,
              opacity: 0.6,
            },
            animatedStyle,
          ]}
        >
          <LinearGradient
            colors={colors as [string, string, ...string[]]}
            style={{
              flex: 1,
              borderRadius: width,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
      ))}
    </>
  )
}
