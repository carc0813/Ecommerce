import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {}); 
  console.log("Estado de autenticación después del login:", auth);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
    } else {
      setError("");
      dispatch(login( email, password ));
    }
  };

  if (auth?.isAuthenticated) {
    console.log("Estado de autenticación:", auth);
  return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5">Iniciar Sesión</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {auth.error && <Typography color="error">{auth.error}</Typography>}

        <form onSubmit={onSubmit}>
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={onChange}
            required
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={onChange}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!email || !password}
          >
            Iniciar Sesión
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;