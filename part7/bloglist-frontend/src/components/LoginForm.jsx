import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userReturned = await loginService.login({ username, password });
      dispatch(setUser(userReturned));
      setUsername("");
      setPassword("");
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userReturned),
      );
      blogService.setToken(userReturned.token);
    } catch (exception) {
      console.log("Wrong credentials");
      dispatch(
        setNotification({
          message: "Wrong username or password",
          type: "error",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            Username:{" "}
            <input
              type="text"
              name="username"
              data-testid="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            Password:{" "}
            <input
              type="password"
              name="password"
              data-testid="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
