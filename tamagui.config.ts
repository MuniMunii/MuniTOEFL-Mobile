import { createAnimations } from "@tamagui/animations-react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { createFont, createTamagui } from "tamagui";
import {themes} from "./theme"
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes:themes,
  settings: { remBaseFontSize: 16,defaultFont:'body' },
  fonts:{
    body:createFont({
    family: 'Outfit-Regular',
    size: {
      1: 12,
      2: 14,
      3: 16,
      4: 24,
      5: 32,
    },
    weight: {
      thin: '100',
      extraLight: '200',
      regular: '400',
      semiBold: '600',
      bold: '700',
    },
    face: {
      100: { normal: 'Outfit-Thin' },
      200: { normal: 'Outfit-ExtraLight' },
      400: { normal: 'Outfit-Regular' },
      600: { normal: 'Outfit-Semibold' },
      700: { normal: 'Outfit-Bold' },
    },
  })
  },

  animations: createAnimations({
    bouncy: {
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      damping: 18,
      stiffness: 50,
    },
    quick: {
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
  }),
});
export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
