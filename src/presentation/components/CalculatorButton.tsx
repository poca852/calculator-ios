import { Pressable, Text } from 'react-native';
import { colors, styles } from '../../config/app-theme';

interface Props {
  label: string;
  color?: string;
  doubleSize?: boolean;
  blackText?: boolean;
  onPress: () => void;
}

export const CalculatorButton = ({
  label,
  color = colors.darkGray,
  doubleSize = false,
  blackText = false,
  onPress
}: Props) => {
  return (
    <Pressable 
      onPress={() => onPress()}
      style={({pressed}) => ({
        ...styles.button,
        backgroundColor: color,
        width: (doubleSize) ? 160 : 70,
        opacity: (pressed) ? 0.8 : 1
    })}>
      <Text style={{
        ...styles.buttonText,
        textAlign: (doubleSize) ? 'left':'center',
        color: (blackText) ? 'black' : 'white',
        paddingHorizontal: (doubleSize) ? 17 : 10
      }}>{label}</Text>
    </Pressable>
  )
}
