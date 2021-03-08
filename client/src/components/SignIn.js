import { useState } from "react";
// svg
import { ReactComponent as Welcome } from "../assets/undraw_welcome_3gvl.svg";
// animate
import { motion } from "framer-motion";
// style
import "../styles/Css/signIn.css";
// redux
import { connect, useDispatch } from "react-redux";
// action
import { setUserName } from "../actions";

const SignIn = ({ allUsers, history }) => {
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();

  const variants = {
    show: { y: 0, height: "auto" },
    hide: { y: "-100%", height: 0 },
  };

  const submitForm = (e) => {
    e.preventDefault();

    const typedName = name.trim().toLowerCase();

    const exist =
      typedName !== ""
        ? allUsers.find(({ username }) => username === typedName)
        : true;

    if (exist) {
      setErr(true);
      return;
    }

    dispatch(setUserName(typedName));
    setName("");

    history.push("/chat");
  };

  return (
    <div className="container">
      <div className="sign__in">
        <div className="left">
          <Welcome />
        </div>
        <div className="right">
          <div className="wrapper">
            <h1>Welcome to What's App (Desktop)</h1>
            <form className="sign__in__form" onSubmit={submitForm}>
              <section className="username__box">
                <label htmlFor="username">user name:</label>
                <br />
                <input
                  type="text"
                  placeholder="John smith"
                  name="name"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => err && setErr(false)}
                />
              </section>

              <div className="error">
                <motion.p animate={err ? "show" : "hide"} variants={variants}>
                  {name === ""
                    ? "Please insert your name"
                    : "This username has taken before"}
                </motion.p>
              </div>

              <button type="submit">Start</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allUsers: state.allUsers,
});

export default connect(mapStateToProps)(SignIn);
