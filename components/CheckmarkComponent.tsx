import React from 'react';
import { StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export type CheckmarkComponentProps = ViewProps & {
  isGreen: boolean;
  onPress: () => void;
};

const CheckmarkSvg = ({ isGreen = true }) => {
  const color = isGreen ? "#5EDC74" : "#FFC78A";

  return (
    <Svg width={150} height={150} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export function CheckmarkComponent({ isGreen = true, onPress }: CheckmarkComponentProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
      <CheckmarkSvg isGreen={isGreen} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
  },
});