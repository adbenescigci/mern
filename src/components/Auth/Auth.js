import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  //const [formData, setFormData] = useState(initialState);
  const [isSignup, setSignup] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstName.current?.value ?? '',
      lastName: lastName.current?.value ?? '',
      email: email.current.value ?? '',
      password: password.current.value ?? '',
      confirmPassword: confirmPassword.current?.value ?? '',
    };
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   console.log(email.current.value);
  // };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5"> {isSignup ? 'SignUp' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  ref={firstName}
                  name="firstName"
                  label="First Name"
                  //handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  ref={lastName}
                  name="lastName"
                  label="Last Name"
                  //handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              ref={email}
              name="email"
              label="Email Adress"
              //handleChange={handleChange}
              type="email"
            />
            <Input
              ref={password}
              name="password"
              label="Password"
              //handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                ref={confirmPassword}
                name="confirmPassword"
                label="Repeat Password"
                //handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an accoount? Sign in' : "Don't have an account?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
