import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {

  const{loginInfo,updateLoginInfo,loginUser,loginError,isLoginLoading} = useContext(AuthContext)
  return (
    <>
      <div className="container formInputs">
        <form onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>updateLoginInfo({...loginInfo,email:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e)=>updateLoginInfo({...loginInfo,password:e.target.value})}
            />
          </div>

          
          <button type="submit" className="btn btn-primary">
            {isLoginLoading ? "Logging in": "Login"}
          </button>
        </form>
      </div>
      {
        loginError?.error && <div
        className="alert alert-danger my-3"
        style={{ width: "25%", textAlign: "center", marginLeft: "36.5%" }}
        role="alert"
      >
        {loginError?.message}
      </div>
      }
    </>
  );
};

export default Login;
