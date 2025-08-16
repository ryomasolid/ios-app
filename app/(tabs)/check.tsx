import { CircleWithTextComponent } from '@/components/CircleWithTextComponent';
import { ContainerComponent } from '@/components/ContainerComponent';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function CheckScreen() {
  const handleClickYes = () => {
    console.log("間食しました。")
  }

  const handleClickNo = () => {
    console.log("間食しませんでした。")
  }

  const theme = useThemeStyles()

  return (
    <ContainerComponent>
      <Text variant="bodyLarge" style={styles.titleContainer}>Did you snack today?</Text>

      <View style={styles.bodyContainer}>
        <CircleWithTextComponent text1='Yes,' text2='I snacked' isGreen={false} handleClick={handleClickYes} />
        <CircleWithTextComponent text1='No,' text2="I didn't" isGreen={true} handleClick={handleClickNo} />
      </View>

      <Text variant="bodyLarge" style={styles.dateText}>{formattedDate}</Text>
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
