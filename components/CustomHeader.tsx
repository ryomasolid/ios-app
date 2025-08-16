import { useThemeStyles } from '@/hooks/useThemeStyles';
import { colorAtom } from '@/store/atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Appbar } from 'react-native-paper';

export function CustomHeader() {
  const theme = useThemeStyles()

  const { useAtom } = require("jotai");
  const [colorValue, setColorAtom] = useAtom(colorAtom);

  const toggleTheme = () => {
    setColorAtom(!colorValue);
  };

  const colorScheme = useColorScheme();
  const themeIconName = colorScheme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent';
  const themeIconColor = colorScheme === 'dark' ? 'yellow' : 'black';

  return (
    <Appbar.Header style={{ backgroundColor: theme.color1 }}>
      <Appbar.Action icon="menu" onPress={() => { }} />
      <Appbar.Content title="Don't snack" color={theme.color2} titleStyle={styles.title} />
      <Pressable style={styles.themeToggle}>
        <MaterialCommunityIcons
          onPress={toggleTheme}
          name={themeIconName}
          size={24}
          color={themeIconColor}
        />
      </Pressable>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  menu: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  themeToggle: {
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
});