import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'
import {ThemeContainer} from './styledComponents'

import './App.css'

class App extends Component {
  state = {isDark: false}

  toggleTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {isDark} = this.state

    return (
      <ThemeContext.Provider value={{isDark, toggleTheme: this.toggleTheme}}>
        <ThemeContainer dark={isDark}>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/users/:id" component={UserProfile} />
            <ProtectedRoute exact path="/my-profile" component={MyProfile} />
            <NotFound />
          </Switch>
        </ThemeContainer>
      </ThemeContext.Provider>
    )
  }
}
export default App
