import classes from "./LoggedOut.module.css";
import { CLIENT_ID, REDIRECT_URL } from "../config";

const LoggedOut = () => {
  return (
    <div className={classes.loginCard}>
      <button
        onClick={() =>
          window.location.replace(
            `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
              REDIRECT_URL
            )}&response_type=code&scope=identify`
          )
        }
      >
        Login
      </button>
    </div>
  );
};

export default LoggedOut;
