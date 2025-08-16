import { Colors } from '@/constants/Colors';
import { colorAtom } from '@/store/atoms';

export const useThemeStyles = () => {
  const { useAtomValue } = require("jotai");
  const color = useAtomValue(colorAtom);
  const theme = {
    color1: color ? Colors.dark.text : Colors.light.text,
    color2: !color ? Colors.dark.text : Colors.light.text
  };
  return theme;
}
