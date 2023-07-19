import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUser as fetchUser } from "../../store/async/async";

const Auth = () => {
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const log = () => {
    if (email.length > 0 && password.length > 0) {
      dispatch(fetchUser({ email, password }));
    } else {
      setIsError(true);
      setOpen(true);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };
  const [value, setValue] = useState(0);

  React.useEffect(() => {
    if (status) {
      navigate("/");
    }
  }, [status]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [open, setOpen] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="auth">
      {isError ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Пожалуйста заполните все поля!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      <Link className="backToMain" to="/">
        <Button>Вернуться на главную страницу</Button>
      </Link>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Авторизация" />
        <Tab label="Регистрация" />
      </Tabs>
      {value === 0 && (
        <div className="formContainer">
          <TextField
            className="input"
            label="Имя"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <FormControl className="input" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button className="button" variant="contained" onClick={log}>
            Войти
          </Button>
        </div>
      )}
      {value === 1 && (
        <div className="formContainer">
          <TextField className="input" label="Email" variant="outlined" />
          <FormControl className="input" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <TextField className="input" label="Password" variant="outlined" />
          <div className="request">
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Согласен с условиями</label>
          </div>
          <Button className="button" variant="contained">
            Регистрация
          </Button>
        </div>
      )}
    </div>
  );
};

export default Auth;
