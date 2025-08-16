import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewProps } from 'react-native';

export type CircleWithTextComponentProps = ViewProps & {
  text1: string
  text2: string
  isGreen: boolean;
  handleClick: () => void
};

export function CircleWithTextComponent({ text1, text2, isGreen, handleClick }: CircleWithTextComponentProps) {
  const gradientColors = isGreen
    ? ['#5EDC74', '#03C75A'] as const
    : ['#FFC78A', '#FF7F50'] as const;

  return (
    <>
      <TouchableOpacity onPress={handleClick} activeOpacity={0.7}>
        <LinearGradient
          colors={gradientColors}
          style={styles.circle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.text}>{text1}</Text>
          <Text style={styles.text}>{text2}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});