import { type ViewProps } from 'react-native';

import { Button } from 'react-native-paper';

export type ButtonComponentProps = ViewProps & {
  text: string
  handleClick: () => void
};

export function ButtonComponent({ text, handleClick }: ButtonComponentProps) {
  // const backgroundColor = 

  return (
    <>
      <Button mode="contained" dark onPress={handleClick}>
        {text}
      </Button>
    </>
  );
}
