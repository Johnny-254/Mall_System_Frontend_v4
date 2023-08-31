import { Box, Button, Card, CardContent, TextField, Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import { useRef, useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^.{8,24}$/;

function Signup() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    // console.log(result);
    // console.log(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // console.log(result);
    // console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, pwd, matchPwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const user = {
      username: username,
      email: email,
      password: pwd,
    };
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    } else if (pwd !== matchPwd) {
      setErrMsg("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8024/api/v1/signup",
        user,
        { username, email, pwd }
      );
      console.log(response?.data);

      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
    if (errMsg) {
      alert(errMsg);
    } else {
      navigate("/CustomerDash");
    }
  }

  return (
    <div className="signup">
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
            Sign Up
          </h1>
          <CardContent className="body">
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
                onChange={(e) => setUser(e.target.value)}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                aria-invalid={validName ? "false" : "true"}
                value={username}
                label="Username"
                name="username"
                variant="outlined"
                aria-describedby="uidnote"
                autoComplete="off"
                required
              />
              <p
                id="uidnote"
                className={
                  userFocus && username && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <InfoIcon style={{ width: "15px", height: "15px" }} />
                <br />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="element">
              <TextField
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                value={email}
                aria-invalid={validEmail ? "false" : "true"}
                autoComplete="off"
                label="email"
                name="email"
                variant="outlined"
                aria-describedby="uidnote"
                required
              />
              <p
                id="eidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <InfoIcon style={{ width: "15px", height: "15px" }} />
                <br />
                invalid format
              </p>
            </div>
            <div className="element">
              <TextField
                type="password"
                onChange={(e) => setPwd(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                label="Password"
                autoComplete="off"
                aria-describedby="pwdnote"
                variant="outlined"
                name="password"
                required
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                }
              >
                <InfoIcon style={{ width: "15px", height: "15px" }} />
                <br />
                8 to 24 characters.
                <br />
                Allowed special characters:{" !@#$%^&*"}
              </p>
            </div>
            <div className="element">
              <TextField
                type="password"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                label=" Confirm Password"
                autoComplete="current-password"
                variant="outlined"
                name="confirm password"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <InfoIcon style={{ width: "15px", height: "15px" }} />
                <br />
                Password input field do not match.
              </p>
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
            <div>
              <h5>
                Have an account?{" "}
                <Link component={RouterLink} to={"/login"}>
                  Login here
                </Link>
              </h5>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Signup;
