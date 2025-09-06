import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
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
          severity: "error",
        }),
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ marginTop: 6, marginBottom: 3, textAlign: "center" }}
      >
        Log in to application
      </Typography>
      <Paper sx={{ maxWidth: "450px", margin: "auto", padding: 4 }}>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            data-testid="username"
            value={username}
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              data-testid="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
