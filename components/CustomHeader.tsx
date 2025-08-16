import { useThemeStyles } from '@/hooks/useThemeStyles';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export function CustomHeader() {
  const theme = useThemeStyles()

  return (
    <Appbar.Header style={{ backgroundColor: theme.color1 }}>
      <Appbar.BackAction onPress={() => { }} />
      <Appbar.Content title="Don't snack" color={theme.color2} titleStyle={styles.title} />
      <Appbar.Action icon="magnify" onPress={() => { }} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SpaceMono',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});