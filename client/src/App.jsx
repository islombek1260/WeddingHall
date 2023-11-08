import { Switch, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import UserList from './components/UserList'
import Calendar from './components/calendar/Calendar'
import SignUpForm from './components/auth/SignUp'
import MainApp from './components/MainApp'
import HallsList from './components/HallList'


function App() {

  return (
    <Switch>
      <Route exact component={ Auth } path="/" />
      <Route exact component={ MainApp } path="/main" />
      <Route exact component={ SignUpForm } path="/signup" />
      <Route exact component={ UserList } path="/users" />
      <Route exact component={ HallsList } path="/halls"></Route>
      <Route exact component={ Calendar } path="/calendar" />
    </Switch>
  )
}

export default App
