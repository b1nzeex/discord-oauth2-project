import React, { useState } from "react";

const AuthContext = React.createContext({
  accessToken: "",
  user: {},
  isLoggedIn: false,
  login: (token) => {},
  getUser: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const userLoggedIn = !!token;

  const getUserHandler = async (token) => {
    const response = await fetch("http://127.0.0.1:8000/oauth2/@me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      setUser(responseData.message);
      localStorage.setItem("user", JSON.stringify(responseData.message));
    }
  };

  const loginHandler = async (token) => {
    setToken(token);

    await getUserHandler(token);

    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (userLoggedIn && !user) {
    getUserHandler(token);
  }

  const contextValue = {
    accessToken: token,
    user: user,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    getUser: getUserHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
