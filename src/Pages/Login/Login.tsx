import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./style/index.css";
import { LoadingButton } from "@mui/lab";
import logo from "../../asset/img/myLogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { errorForm } from "../../utils";
import { InitLogin, LoginModel } from "../../Firebase/Models";
import { useState } from "react";
import { autentication } from "../../Firebase/Collections/Login.Firebase";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../redux/slices";
import { useNavigate } from "react-router";
import { User } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

interface ILoginProps {}

const schema = object({
  email: string()
    .email(errorForm.emailFormatInvalid)
    .required(errorForm.requiredFile),
  password: string().required(errorForm.requiredFile),
  //.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=])(?!.*\s).{8,}$/,errorForm.matchesPass),
});

const Login = () => {
  const disphatch = useDispatch();
  const [loadin, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    defaultValues: InitLogin,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const submit = async (data: LoginModel) => {
    setLoading(true);
    const result = await autentication(data);
    if (result.data) {
      const user = result.data as User;
      const userRedux = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
      };

      disphatch(setUserLogin(userRedux));
      navigate("/home");
    }
    if (result.error) {
      enqueueSnackbar(result.error, {
        variant: "error",
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
      });
    }

    setLoading(false);
  };

  
  return (
    <>
      <div className="container">
        <Box className="container-box">
          <Stack
            direction={"column-reverse"}
            spacing={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography color="primary" variant="h4">
              EventControl
            </Typography>
            <img src={logo} alt="" width={"70px"} height={"70px"} />
          </Stack>
          <Divider variant="fullWidth" />
          <form>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="button">Login</Typography>
              <TextField
                autoComplete="of"
                autoFocus
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                required
                {...register("email")}
                helperText={errors.email?.message}
                error={!!errors.email}
              />
              <TextField
                autoComplete="of"
                autoFocus
                margin="dense"
                label="Contraseña"
                type="password"
                fullWidth
                variant="outlined"
                required
                {...register("password")}
                helperText={errors.password?.message}
                error={!!errors.password}
              />

              <LoadingButton
                //loading={loadin}
                loadingPosition="center"
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<GoogleIcon color="error" />}
                color="error"
              >
                Entrar con Google
              </LoadingButton>
              <LoadingButton
                loading={loadin}
                loadingPosition="center"
                variant="contained"
                size="large"
                fullWidth
                onClick={handleSubmit(submit)}
              >
                Entrar
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </div>
    </>
  );
};

export default Login;
