/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string },
  colorName: keyof typeof Colors.light
) {
  const colorFromProps = props.light

  if (colorFromProps) {
    return colorFromProps;
  } else {
<<<<<<< HEAD
    return Colors[theme][colorName];
=======
    return Colors.light[colorName];
>>>>>>> 2e000de2698fafa3508ec8cd1bf8fc33ced3e20b
  }
}
