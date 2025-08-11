import { ContainerComponent } from '@/components/ContainerComponent';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function CheckScreen() {
  const handleClickOk = () => {
    console.log("ああああ")
  }

  const handleClickNg = () => { }

  const theme = useThemeStyles()

  return (
    <ContainerComponent>
      <View style={styles.titleContainer}>
        <IconButton
          icon="emoticon-excited-outline"
          iconColor={'#FF6600'}
          size={100}
          onPress={handleClickOk}
        />
        <IconButton
          icon="emoticon-frown"
          iconColor={'#66CCFF'}
          size={100}
          onPress={handleClickNg}
        />
      </View>

      <Text variant="bodyLarge" style={{ textAlign: "center" }}>チェックしてください</Text>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
