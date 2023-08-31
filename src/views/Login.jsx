import { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, Link, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import useAuth from "../auth/hooks/useAuth";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  // const { setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: pwd,
    };

    try {
      const response = await axios.post(
        "http://localhost:8024/api/v1/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      //console.log(JSON.stringify(response));
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;

      // setAuth({ username, pwd, roles, accessToken });
      setUsername("");
      setPwd("");
      navigate("/CustomerDash");
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid #f00",
          width: "100vw",
          height: "100vh",
        }}
        noValidate
        autoComplete="off"
      >
        <Card className="card">
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "30px",
            }}
          >
            Log In
          </h1>
          <CardContent>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="element">
              <TextField
                type="text"
                ref={userRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                autoComplete="current-username"
                variant="outlined"
                name="username"
                autoFocus // Autofocus
              />
            </div>
            <div className="element">
              <TextField
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                label="Password"
                autoComplete="off"
                variant="outlined"
                name="password"
                required
              />
            </div>
            <Button variant="contained" onClick={handleSubmit}>
              Log In
            </Button>
            <div>
              <h5>
                No account? No problem!{" "}
                <Link component={RouterLink} to="/signup">
                  Signup here
                </Link>{" "}
                and become a member.
              </h5>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
