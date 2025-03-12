import { Box, Container, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0D47A1", // 🔹 Azul oscuro elegante
        color: "white",
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {/* Sección de Enlaces */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Inicio
            </Link>
            <Link href="/productos" color="inherit" underline="hover" sx={{ display: "block", mb: 1 }}>
              Productos
            </Link>
            <Link href="/contacto" color="inherit" underline="hover" sx={{ display: "block" }}>
              Contacto
            </Link>
          </Grid>

          {/* Sección de Información */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2">
              Somos una tienda online comprometida con ofrecerte los mejores productos al mejor precio.
            </Typography>
          </Grid>

          {/* Sección de Redes Sociales */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <IconButton href="https://facebook.com" target="_blank" color="inherit">
              <Facebook fontSize="large" />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="inherit">
              <Instagram fontSize="large" />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit">
              <Twitter fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        {/* Derechos de Autor */}
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
