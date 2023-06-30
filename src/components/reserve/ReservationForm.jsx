import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, FormControl, FormHelperText, Grid } from '@mui/material';
import { AccountCircleOutlined as AccountCircleOutlinedIcon } from '@mui/icons-material';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../pages/reserve.css';
import { useContext, useEffect } from 'react';
import { Context } from '../../context/userContext/context';
import axios from 'axios';
import { format } from 'date-fns';
import Redirect from '../Redirect';



const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  start_date: yup
  .date()
  .min(new Date(), 'Start Date must be greater than or equal to the current date')
  .required('Start Date is required'),
  end_date: yup
    .date()
    .required('End Date is required')
    .when('start_date', (start_date, schema) => {
      return start_date && schema.min(start_date, 'End Date must be greater than Start Date');
    }),
  car_id: yup.number().required('Car ID is required'),
  customer_id: yup.number().required('Customer ID is required'),
});

const ReservationForm = () => {

  const { user } = useContext(Context);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstname);
      setValue('lastName', user.lastname);
      setValue('email', user.email)
      setValue('customer_id', user.customerid);
    }
  }, [user, setValue]);

  

  const handleFormSubmit = (formData) => {
    // Handle form submission
    console.log(formData);
  
    const startDate = formData.start_date;
    const endDate = formData.end_date;
  
    if (!startDate || !endDate) {
      // Handle case when start_date or end_date is undefined
      console.error('Invalid date: start_date or end_date is undefined');
      return;
    }
  
    // Convert the start_date and end_date to the desired format
    const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
    const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
  
    // Create an object to hold the data you want to send
    const requestData = {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      car_id: formData.car_id,
      customer_id: formData.customer_id
    };
  console.log(requestData)
  axios
  .post("https://carhireapi.azurewebsites.net/reserve", requestData)
  .then((response) => {
    // Access the message property in the response data
    response.data.message && toast.success(response.data.message, {
      position: toast.POSITION.TOP_CENTER
    });
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // Extract the error message from the response data
      const errorMessage = error.response.data.error || 'An error occurred';
      toast.error(`Double Check the details entered: ${errorMessage}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from the server', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      // Something happened in setting up the request
      toast.error('An error occurred while creating the reservation', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  });

}
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='reserve-form'>
      <h2 style={{marginLeft:'150px'}}>Reserve A Car </h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <FormControl error={!!errors.firstName} fullWidth>
            <TextField
              label="First Name"
              variant="outlined"
              {...register('firstName')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }} />,
              }}
            />
            <FormHelperText>{errors.firstName?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <FormControl error={!!errors.lastName} fullWidth>
            <TextField
              label="Last Name"
              variant="outlined"
              {...register('lastName')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }}/>,
              }}
            />
            <FormHelperText>{errors.lastName?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <FormControl error={!!errors.email} fullWidth>
            <TextField
              label="Email"
              variant="outlined"
              {...register('email')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }} />,
              }}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl error={!!errors.start_date} fullWidth>
            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              {...register('start_date')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }}/>,
              }}
            />
            <FormHelperText>{errors.start_date?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl error={!!errors.end_date} fullWidth>
            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              {...register('end_date')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }}/>,
              }}
            />
            <FormHelperText>{errors.end_date?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl error={!!errors.car_id} fullWidth>
            <TextField
              label="Car ID"
              variant="outlined"
              {...register('car_id')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }}/>,
              }}
            />
            <FormHelperText>{errors.car_id?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl error={!!errors.customer_id} fullWidth>
            <TextField
              label="Customer ID"
              variant="outlined"
              
              {...register('customer_id')}
              InputProps={{
                startAdornment: <AccountCircleOutlinedIcon sx={{  marginRight: '8px' }}/>,
              }}
              disabled
            />
            <FormHelperText>{errors.customer_id?.message}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop:'20px'}}>
        Submit
      </Button>
      <div style={{margin:'15px 150px'}}>
      <Redirect message="View your" redirectLinkTo="Active Reservations" route="/activeReservations"/>
      </div>
     
      <ToastContainer />
    </form>
  );
};




export default ReservationForm;
