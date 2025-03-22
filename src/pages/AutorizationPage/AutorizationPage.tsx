import { Button, CircularProgress, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/AutorizationApi";
import "./AutorizationPageStyle.css";

function AutorizationPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await login(username, password);

      if (token.error_code === 2004) {
        setError("Неверный логин или пароль");
        return;
      }

      localStorage.setItem("token", token.data.token);

      navigate("/table");
    } catch (err) {
      setError("Возникла ошибка");
    }
    setLoading(false);
  };

  function onUsernameChange(value: string) {
    if (value.startsWith("user") && /^user\d*$/.test(value)) {
      setUsername(value);
    }
  }

  return (
    <div className="autorizationPage">
      <form className="autorizationForm" onSubmit={handleSubmit}>
        <Typography fontSize={22}>Авторизация</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Логин"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <TextField
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <Button type="submit" variant="contained">
            Войти
          </Button>
        )}
      </form>
    </div>
  );
}

export default AutorizationPage;
