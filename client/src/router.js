import { Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
// components
import SignIn from "./components/SignIn";
import Chat from "./components/chat";
// animation
import { AnimatePresence } from "framer-motion";

const Routes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={SignIn} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </AnimatePresence>
  );
};

export default Routes;
