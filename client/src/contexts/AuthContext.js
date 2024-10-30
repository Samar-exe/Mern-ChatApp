import { createContext, useCallback, useEffect, useState } from "react";
import { base_URL, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {


//================================Register User=================================================
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  // console.log("Userr",user)
 
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault()
    setIsRegisterLoading(true);
    setRegisterError(null);

    const response = await postRequest(
      `${base_URL}/users/register`,
      JSON.stringify(registerInfo)
    );
    setIsRegisterLoading(false)

    if (response.error) {
      return setRegisterError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

//===============================Login User======================================================
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);
  
  const loginUser = useCallback(async (e) => {
    e.preventDefault()
    setIsLoginLoading(true);
    setLoginError(null);
    
    const response = await postRequest(
      `${base_URL}/users/login`,
      JSON.stringify(loginInfo)
    );
    setIsLoginLoading(false)
    
    if (response.error) {
      return setLoginError(response);
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
    
  }, [loginInfo]);


  useEffect(()=>{
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user))
    
  },[])
//==============================Logout User===============================================
  const logoutUser = useCallback(()=>{
    localStorage.removeItem("User");
    setUser(null)
  },[])
    
  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
