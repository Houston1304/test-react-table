import { Button, TextField, Typography } from "@mui/material";
import AutorizationInput from "../components/Autorization/AutorizationInput";
import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../services/AutorizationApi";

function AutorizationPage() {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(username, password);

      if (token.error_code === 2004) {
        setError("Неверный логин или пароль");
        return;
      }

      localStorage.setItem("token", token.data.token);

      navigate("/table");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  function onUsernameChange(value: string) {
    if (value.startsWith("user") && /^user\d*$/.test(value)) {
      setUsername(value);
    }
  }

  return (
    <div className="autorizationPage">
      <form className="autorizationForm" onSubmit={handleSubmit}>
        {error && <Typography color="error">{error}</Typography>}
        <AutorizationInput
          label="Логин"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <AutorizationInput
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  );
}

export default AutorizationPage;
