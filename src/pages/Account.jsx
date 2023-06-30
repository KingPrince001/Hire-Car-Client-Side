import { useContext } from 'react';
import { Context } from '../context/userContext/context';
import { styled } from '@mui/system';
import { Container, Typography, Grid, Avatar, Divider } from '@mui/material';
import { Person, Email, Home, Phone, CreditCard, DriveEta, Wc } from '@mui/icons-material';

const useStyles = styled((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#f8f8f8',
    minHeight: '100vh',
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: theme.spacing(2),
    border: '4px solid #fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginTop: theme.spacing(4),
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  value: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  divider: {
    margin: theme.spacing(3, 0),
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
  },
}));

const Account = () => {
  const { user } = useContext(Context);
  const classes = useStyles();

  const User = {
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h2" component="h2" align="center" gutterBottom className={classes.title} style={{ marginTop:'20px'}} >
        Your Account Details
      </Typography>
      <Grid container spacing={4} >
        <Grid item xs={12} md={4} align="center" style={{marginTop:'20px'}}>
          <Avatar className={classes.avatar} src={User.profilePicture} alt="User Avatar" style={{height:'200px', width:'200px'}} />
          <Typography variant="h2" style={{textTransform:'capitalize',marginTop:'20px', fontSize:'35px'}}>
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="h2" color="textSecondary" style={{fontSize:'18px', marginTop:'10px'}}>
            {user.email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}  className={classes.section}>
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <Home /> Home Address
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.homeaddress}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <Phone /> Phone Number
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.phonenumber}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <CreditCard /> National ID
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.nationalid}
          </Typography>

          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <DriveEta /> Driver's License ID
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.driverslicenseid}
          </Typography>

          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <Wc /> Gender
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.gender}
          </Typography>

          <Divider className={classes.divider} />
          <Typography variant="h6" className={classes.label} style={{ display:'flex',alignItems:'center', gap:'5px', color:'#165a72'}}>
            <Person /> Customer ID
          </Typography>
          <Typography variant="body1" style={{paddingBottom:'5px'}}  className={classes.value}>
            {user.customerid}
          </Typography>
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
