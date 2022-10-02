import classes from "./LoggedOut.module.css";

const LoggedOut = () => {
  return (
    <div className={classes.loginCard}>
      <button
        onClick={() =>
          window.location.replace(
            "https://discord.com/api/oauth2/authorize?client_id=856501212652240939&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000&response_type=code&scope=identify"
          )
        }
      >
        Login
      </button>
    </div>
  );
};

export default LoggedOut;
