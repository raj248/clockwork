import '../global.css';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '~/stores/themeStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { GlobalFAB } from '~/components/GlobalFAB'

export default function RootLayout() {
  const isDark = useThemeStore((state) => state.isDark);
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.background);
    NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
  }, [theme]);
  return (
    <PaperProvider theme={theme}>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.colors.background} />

      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.elevation.level2,
            },
            headerTintColor: theme.colors.onSurface,
            headerTitleStyle: {
              color: theme.colors.onSurface,
            },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
          <Stack.Screen name="details" options={{ title: 'Details' }} />
        </Stack>

      </SafeAreaView>
    </PaperProvider>
  );
}
