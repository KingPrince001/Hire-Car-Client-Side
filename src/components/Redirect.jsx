import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Redirect = ({ message, redirectLinkTo, route }) => {
  const linkStyle = {
    textDecoration: 'underline',
    textDecorationColor: '#ff4081',
    textDecorationThickness: '2px',
    transition: '0.3s',
    display: 'inline-block',
    color: '#ff4081',
    marginLeft: '10px',
  };

  const hoverStyle = {
    textDecorationColor: '#42a5f5',
    color: '#42a5f5',
  };

  return (
    <span>
      <span>{message}</span>
      <MuiLink
        component={RouterLink}
        to={route}
        variant="body2" 
        sx={linkStyle}
        underline="none"
        onMouseEnter={(event) => {
          event.target.style.textDecoration = 'none';
          Object.assign(event.target.style, hoverStyle);
        }}
        onMouseLeave={(event) => {
          event.target.style.textDecoration = 'underline';
          event.target.style.color = '#ff4081';
        }}
      >
        {redirectLinkTo}
      </MuiLink>
    </span>
  );
};

export default Redirect;
