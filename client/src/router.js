import { BrowserRouter as Router, Route } from 'react-router-dom'

import SignIn from './components/SignIn'
import Chat from './components/chat'

const Routes = () => {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/chat" component={Chat} />
    </Router>
  )
}

export default Routes
