import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/userContext/context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const {dispatch} = useContext(Context);
  // help navigate to reserve page
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  


  const onSubmit = (data) => {
    console.log(data);
    const loginData = {
      email: data.email,
      password: data.password
    };

    axios.post("https://carhireapi.azurewebsites.net/auth/login", loginData)
      .then(({data}) => {
        if(data.token) {
          //context is made aware of logged in user
          dispatch({type: "LOGIN_SUCCESS", payload: data})
//redirecting logged in user to reserve page
navigate('/reserve')
        }
      })
  
    .catch(({response}) => {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_CENTER
      });
    })
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <TextField
            label="First Name"
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            InputProps={{
              startAdornment: <Email />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            InputProps={{
              startAdornment: <Lock />,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
