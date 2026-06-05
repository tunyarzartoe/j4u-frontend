import React, {  useState } from "react";
import BreadCrumb from "../../components/pages/BreadCrumb";
import Meta from "../../components/pages/Meta";
import CustomInput from "../../components/CustomInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getSuccess, login } from "../auth/authSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequestStatus, setLoginRequestStatus] = useState("idle");
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   setMessage("");
  // }, [email, password]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const canLogin =
    [email, password].every(Boolean) && loginRequestStatus === "idle";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const success = useSelector(getSuccess);
  const roleType = useSelector(getRoles)

  const onLogin = (e) => {
    e.preventDefault();

    if (canLogin) {
      setLoginRequestStatus("pending");

      try {
        dispatch(
          login({
            username: email,
            password,
          })
        ).unwrap();

        if (success) {
          setEmail("");
          setPassword("");
          if (Array.isArray(roleType) ? roleType.includes("ROLE_ADMIN") : roleType === "ROLE_ADMIN") {
            navigate("/admin/", { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        } 
        // else {
        //   setMessage(
        //     <span className="alert-danger">
        //       username or password is incorrect
        //     </span>
        //   );
        // }
      } catch (error) {
        console.error(error);
      } finally {
        setLoginRequestStatus("idle");
      }
    }
  };

  return (
    <>
      <div class="container register h-25 d-lg-flex half my-2 ">
        <div
          class="bg order-1 order-md-2 bg-image"
          style={{
            backgroundImage:
              " url('https://tycheventures.com/wp-content/uploads/2020/09/were-hiring-scaled.jpg')",
          }}
        ></div>
        <div class="contents order-2 order-md-1 ">
          <h3 className="text-center my-2 mb0">
            Welcome to J<span className="logo">4</span>U
          </h3>
          <Meta title={"Login"} />
          <BreadCrumb title="Login" />

          <Container class1="login-wrapper  home-wrapper-2 ">
            <div className="row ">
              <div className="col-12">
                <div className="auth-card">
                  {/* {message} */}
                  <h3 className="text-center mb-3">Login</h3>
                  <form className="d-flex flex-column gap-15">
                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onchange={onEmailChange}
                    />
                    <CustomInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onchange={onPasswordChange}
                    />
                    <div>
                      <Link to="/forgot-password">Forgot Password?</Link>

                      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center  ms-3">
                        <button
                          className="button1 border-0 "
                          onClick={onLogin}
                          disabled={!canLogin}
                        >
                          Login
                        </button>
                        <Link to="/signup" className="button1 signup mx-3">
                          SignUp
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Login;
