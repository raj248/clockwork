import { Button } from 'react-native-paper';
import { useThemeStore } from '~/stores/themeStore';

export function ThemeToggle() {
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Button
      icon={isDark ? 'weather-night' : 'white-balance-sunny'}
      mode="contained"
      onPress={toggleTheme}
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </Button>
  );
}
