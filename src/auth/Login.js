import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isUserExist = sessionStorage.getItem("user");
  useEffect(() => {
    if (isUserExist) navigate("/app", { state: JSON.parse(isUserExist) });
  }, []);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:9090/user/login", data)
      .then((res) => {
        sessionStorage.setItem("token", res.data.data.token);
        const user = jwtDecode(res.data.data.token);
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/app", { state: user });
      })
      .catch((err) => {
        setFormError(err.response.data);
      });
  };
  return (
    <Container
    maxWidth="md"
    sx={{ display: "flex", alignItems: "center", height: "100vh" }}
  >
    <Grid direction={'column'} container>
      <Grid item md={6} sx={{boxShadow: 1}}>
        <Paper
          square
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent:'space-between',
          }}
        >
          <Box sx={{ p: 3, textAlign: "center", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "600", mt: 2 }}
            >
              Gupshup
            </Typography>

            <Typography>
              Made in India
            </Typography>
          </Box>
          {/* SVG section */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", height:'150px'}}>
              <img style={{background : '#000'}} src="/chat.gif" alt="Chat"/>
            </Box>
        </Paper>
      </Grid>

        <Grid item md={6}>
          <Paper
            square
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{ p: 5 }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              {formError && (
                <Alert sx={{ mb: 3 }} severity="error">
                  {formError.msg}
                </Alert>
              )}
              <Typography
                variant="h5"
                sx={{ mb: 2, fontWeight: "500", textTransform: "uppercase" }}
              >
                Login
              </Typography>
              <TextField
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                sx={{ mb: 3 }}
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "invalid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
              />

              <TextField
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                sx={{ mb: 3 }}
                {...register("password", {
                  required: "Required field",
                })}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ py: 2 }}
              >
                Login
              </Button>
              {/* <Button sx={{ mt: 1 }}>Forgot Password</Button> */}
            </Box>
            <Box sx={{ textAlign: "right", pr: 1 }}>
              <Typography variant="body2">
                Don't have an account{" "}
                <Button onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Login;
