import { CheckmarkComponent } from '@/components/CheckmarkComponent';
import { CircleWithTextComponent } from '@/components/CircleWithTextComponent';
import { ContainerComponent } from '@/components/ContainerComponent';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function CheckScreen() {
  const theme = useThemeStyles()

  const [isCheckYes, setIsCheckYes] = useState<boolean>(false);
  const [isCheckNo, setIsCheckNo] = useState<boolean>(false);

  const handleClickYes = () => {
    if (isCheckYes) return

    setIsCheckNo(false)
    setIsCheckYes(true)
  }

  const handleClickNo = () => {
    if (isCheckNo) return

    setIsCheckYes(false)
    setIsCheckNo(true)
  }

  return (
    <ContainerComponent>
      <Text variant="bodyLarge" style={[styles.titleContainer, { color: theme.color1 }]}>Did you snack today?</Text>

      <View style={styles.bodyContainer}>
        {!isCheckYes
          ? <CircleWithTextComponent text1='Yes,' text2='I snacked' isGreen={false} handleClick={handleClickYes} />
          : <CheckmarkComponent isGreen={false} onPress={handleClickYes} />
        }
        {!isCheckNo
          ? <CircleWithTextComponent text1='No,' text2="I didn't" isGreen={true} handleClick={handleClickNo} />
          : <CheckmarkComponent isGreen={true} onPress={handleClickNo} />
        }
      </View>

      <Text variant="bodyLarge" style={[styles.dateText, { color: theme.color1 }]}>{formattedDate}</Text>
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
