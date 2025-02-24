import React, { createContext, useState ,useEffect} from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [signIn, setSignIn] = useState(null);

  useEffect(() => {
      const setSignInContext = () => {
        const adminIdCookie = Cookies.get("adminId");
        const adminAuthTokenCookie = Cookies.get("adminAuthToken");
  
        //console.log(userId);
  
        if (!adminIdCookie || !adminAuthTokenCookie) {
          console.error("User is not authenticated. Missing token or userId.");
         // alert("Something went wrong. Please try again.");
          return setSignIn(false);
        }
        //console.log(bool);
        return setSignIn(true);
      };
  
      setSignInContext();
    });

  return (
    <AuthContext.Provider value={{ signIn, setSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
