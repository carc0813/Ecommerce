import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { name, email, password, password2, role } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await dispatch(register({ name, email, password, role }));
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Aquí puedes manejar el error, por ejemplo mostrando una notificación
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5">Registrarse</Typography>
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Registro exitoso. Redirigiendo al login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
