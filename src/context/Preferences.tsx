import React, { useState } from 'react';

type PreferencesContextType = {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
});

export const Preferences: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const isDark = theme === 'dark'
  const toggleTheme = () => {
    if (isDark) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const contextValue = {
    theme,
    isDark,
    toggleTheme
  }

  return (
    <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>
  )
}
