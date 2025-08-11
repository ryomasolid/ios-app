import { Colors } from '@/constants/Colors';
import { colorAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

export type ContainerComponentProps = ViewProps & {
  children: ReactNode
};

export function ContainerComponent({ children }: ContainerComponentProps) {
  const color = useAtomValue(colorAtom)
  const bgColor = !color ? Colors.dark.text : Colors.light.text

  return (
    <>
      <View style={{ backgroundColor: bgColor }}>
        {children}
      </View>
    </>
  );
}
