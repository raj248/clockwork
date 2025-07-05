import React, { createContext, useContext, useState } from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => { },
});

export const useAppTheme = () => useContext(ThemeContext);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
