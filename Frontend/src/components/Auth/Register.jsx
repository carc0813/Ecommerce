import { useState } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions";
import { Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user", // 🔹 Agrega el rol por defecto
  });

  const { name, email, password, password2, role } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados al backend:", formData); // 🔹 Agrega esto para verificar
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
    } else {
      console.log({ name, email, password, role }); // Verificar qué se envía
      dispatch(register({ name, email, password, role }));
    }
  };
  
  

  if (auth && auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography>Registrarse</Typography>
        {auth.error && <Typography color="error">{auth.error}</Typography>}
        <form onSubmit={onSubmit}>
          <TextField
            label="Nombre"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={onChange}
            required
          />
          <TextField
            label="Correo Electrónico"
            name="email"
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
          <TextField
            label="Confirmar Contraseña"
            name="password2"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password2}
            onChange={onChange}
            required
          />

          {/* 🔹 Selector para el rol */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select name="role" value={role} onChange={onChange}>
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;