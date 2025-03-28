import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions";
import CartIcon from "../../pages/CartIcon";
const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {}); // Evita error si auth es undefined

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-commerce
        </Typography>
        <CartIcon />
        <Button color="inherit" component={NavLink} to="/">
          Inicio
        </Button>
        {auth.isAuthenticated ? ( // Sin espacio en auth.isAuthenticated
          <>
            <Button color="inherit" component={NavLink} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Iniciar sesión
            </Button>
            <Button color="inherit" component={NavLink} to="/register">
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;