import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNotificationDispatch } from "../context/NotificationContext";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notificationDispatch = useNotificationDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userReturned = await loginService.login({ username, password });
      setUser(userReturned);
      setUsername("");
      setPassword("");
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userReturned),
      );
      blogService.setToken(userReturned.token);
    } catch (exception) {
      console.log("Wrong credentials");
      notificationDispatch({
        type: "setMessage",
        payload: { message: "Wrong username or password", type: "error" },
      });
      setTimeout(() => notificationDispatch({ type: "clearMessage" }), 3000);
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
