import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Person, Email, Phone, Home, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required').matches(/^[^\d]+$/, 'First Name cannot contain numbers'),
  last_name: yup.string().required('Last Name is required').matches(/^[^\d]+$/, 'Last Name cannot contain numbers'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone_number: yup
  .string()
  .required('Phone Number is required')
  .matches(/^[0-9]{10}$/, 'Phone Number must be a 10-digit number')
  .test('is-positive', 'Phone Number must be a positive number', (value) => parseInt(value) > 0),
  home_address: yup
    .string()
    .required('Home Address is required')
    .matches(/^[-\w\s]+$/, 'Invalid Home Address'),
    gender: yup
    .string()
    .required('Gender is required')
    .matches(/^(?!.*\d).*$/, 'Gender cannot contain numbers')
    .oneOf(['male', 'female', 'transgender'], 'Invalid gender value'),
    national_id: yup
    .string()
    .required('National ID is required')
    .min(8, 'National ID must be at least 8 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'National ID cannot contain special symbols'),
    drivers_license_id: yup
    .string()
    .required("Driver's License ID is required")
    .min(12, "Driver's License ID should be at least 12 characters"),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const registerData = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      home_address: data.home_address,
      phone_number: data.phone_number,
      national_id: data.national_id,
      drivers_license_id: data.drivers_license_id,
      email: data.email,
      password: data.password
    };

    axios.post("https://carhireapi.azurewebsites.net/auth/register", registerData)
      .then((response) => {
        response.data.message && toast.success("Registration successful!"); // Display success toast
        navigate("/login"); // Redirect to the login page
        console.log(response);
      })
      .catch((error) => {
        toast.error(error.response.data.error); // Display error toast
      });
  
    console.log(data);
  };
 

  return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" style={{ backgroundColor: '#f0f0f0', padding: '20px' }} spacing={2}>
      <Grid item xs={12}>
  <Typography variant="h2" component="h2" gutterBottom style={{ marginBottom: '0px', marginTop:'-10px', textAlign: 'center' }}>
    Register
  </Typography>
</Grid>

        <Grid item xs={12}>
          <TextField
            label="First Name"
            {...register('first_name')}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Person />,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Last Name"
            {...register('last_name')}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Person />,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Email />,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Phone Number"
            {...register('phone_number')}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Phone />,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Home Address"
            {...register('home_address')}
            error={!!errors.home_address}
            helperText={errors.home_address?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Home />,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Gender"
            {...register('gender')}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="National ID"
            {...register('national_id')}
            error={!!errors.national_id}
            helperText={errors.national_id?.message}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Driver's License ID"
            {...register('drivers_license_id')}
            error={!!errors.drivers_license_id}
            helperText={errors.drivers_license_id?.message}
            fullWidth
            margin="normal"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Lock />,
              endAdornment: <VisibilityOff />,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Confirm Password"
            type="password"
            {...register('confirm_password')}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <Lock />,
              endAdornment: <Visibility />,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
    <ToastContainer /> {/* Add ToastContainer */}
    </>
  );
};

export default RegisterForm;
