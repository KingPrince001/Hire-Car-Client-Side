
import { Typography } from '@mui/material';

const LoginPageTitle = () => {
  const titleStyle = {
    fontFamily: 'fantasy',
    fontSize: '2.5rem',
    color: '#165a72',
    textAlign: 'center',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  return (
    <Typography variant="h1"  component="h1" sx={titleStyle}>
      Log In
    </Typography>
  );
};

export default LoginPageTitle;
