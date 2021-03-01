import { ReactComponent as Welcome } from '../assets/undraw_welcome_3gvl.svg'

import '../styles/Css/signIn.css'

const SignIn = () => {
  return (
    <div className="container">
      <div className="sign__in">
        <div className="left">
          <Welcome />
        </div>
        <div className="right">
          <div className="wrapper">
            <h1>Welcome to What's App (Desktop)</h1>
            <form className="sign__in__form">
              <section className="username__box">
                <label htmlFor="username">user name:</label>
                <br />
                <input type="text" placeholder="John smith" name="name" id="username" autoComplete="off" />
              </section>

              <button type="submit">Start</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
