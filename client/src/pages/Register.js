import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {

  const{registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading} = useContext(AuthContext)
  return (
    <>
      <div className="container formInputs">
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>updateRegisterInfo({...registerInfo,name:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e)=>updateRegisterInfo({...registerInfo,email:e.target.value})}
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
              onChange={(e)=>updateRegisterInfo({...registerInfo,password:e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isRegisterLoading ? "Creating Your Account": "Signup"}
          </button>
        </form>
      </div>
      {
        registerError?.error && <div
        className="alert alert-danger my-3"
        style={{ width: "25%", textAlign: "center", marginLeft: "36.5%" }}
        role="alert"
      >
        {registerError?.message}
      </div>
      }
    
    </>
  );
};

export default Register;
