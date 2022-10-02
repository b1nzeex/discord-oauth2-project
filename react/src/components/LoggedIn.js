import { useContext } from "react";
import AuthContext from "../store/auth-context";

import classes from "./LoggedIn.module.css";

const LoggedIn = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.userCard}>
      <img
        src={`https://cdn.discordapp.com/avatars/${authCtx.user.id}/${authCtx.user.avatar}.png`}
        alt={`Avatar of ${authCtx.user.username}`}
      />

      <div className={classes.userInfo}>
        <h3>
          {authCtx.user.username}#{authCtx.user.discriminator}
        </h3>

        <button onClick={authCtx.logout}>Logout</button>
        <button onClick={authCtx.getUser}>Refresh Info</button>
      </div>
    </div>
  );
};

export default LoggedIn;
