import { ThemeToggle } from '~/components/ThemeToggle';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { cn } from '~/lib/cn';

export default function Settings() {
  const theme = useTheme();

  return (
    <View
      className={cn('flex-1 items-center justify-center p-4')}
      style={{ backgroundColor: theme.colors.background }}
    >
      <ThemeToggle />
    </View>
  );
}
