import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import Chat from './components/chat'

const Router = () => {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default Router
