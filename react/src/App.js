import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import AuthContext from "./store/auth-context";

import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

const App = () => {
  const [searchParams, setSearchParms] = useSearchParams();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async (code) => {
      const response = await fetch("http://127.0.0.1:8000/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          redirectUri: "http://127.0.0.1:3000",
        }),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        await authCtx.login(responseData.message.access_token);
      }
    };

    if (searchParams.has("code")) {
      fetchToken(searchParams.get("code"));
      searchParams.delete("code");
      setSearchParms(searchParams);
    }
  }, [authCtx, searchParams, setSearchParms]);

  if (authCtx.isLoggedIn && authCtx.user) {
    return <LoggedIn />;
  } else {
    return <LoggedOut />;
  }
};

export default App;
