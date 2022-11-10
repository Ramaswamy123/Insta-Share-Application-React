import React from 'react'

const ThemeContext = React.createContext({
  isDark: '',
  toggleTheme: () => {},
})

export default ThemeContext
