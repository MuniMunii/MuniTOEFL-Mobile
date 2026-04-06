import React, { createContext, useContext, useEffect } from "react"
import { StyleProp, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming,SharedValue } from "react-native-reanimated"
import { View } from "tamagui"
const AnimatedView = Animated.createAnimatedComponent(View)
const SkeletonContext = createContext<SharedValue<number>|null>(null)

export function SkeletonProvider({ children }:{children:React.ReactNode}) {
  const opacity = useSharedValue(0.4)
  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800 }),
      -1,
      true
    )
  }, [])
  return (
    <SkeletonContext.Provider value={opacity}>
      {children}
    </SkeletonContext.Provider>
  )
}

export function useSkeleton(): SharedValue<number> {
  const ctx = useContext(SkeletonContext)
  if (!ctx) {
    throw new Error("useSkeleton must be used inside SkeletonProvider")
  }
  return ctx
}

export function Skeleton({height=35,width='100%',styleList}:{height?:number,width?:number|string,styleList?:StyleProp<ViewStyle>}) {
  const opacity = useSkeleton()
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <AnimatedView
      style={[animatedStyle,styleList]}
      height={height}
      width={width}
      
      backgroundColor={'$gray6'}
      borderRadius={12}
    />
  )
}