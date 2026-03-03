import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui } from 'tamagui'
export const tamaguiConfig = createTamagui({...defaultConfig,settings:{remBaseFontSize:16}})
export default tamaguiConfig
export type Conf = typeof tamaguiConfig
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}