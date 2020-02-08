import React, { useState } from 'react';

type PreferencesContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const Preferences: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const contextValue = {
    theme,
    toggleTheme
  }

  return (
    <PreferencesContext.Provider value={contextValue}>{children}</PreferencesContext.Provider>
  )
}
