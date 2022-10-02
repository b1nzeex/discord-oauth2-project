import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import AuthContext from "./store/auth-context";

import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";
import { API_URL, REDIRECT_URL } from "./config";

const App = () => {
  const [searchParams, setSearchParms] = useSearchParams();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async (code) => {
      const response = await fetch(`${API_URL}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
          redirectUri: REDIRECT_URL,
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
