
import { styled } from '@mui/system';
import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const useStyles = styled ((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  listItem: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
  },
  listItemAvatar: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const Notifications = () => {
  const classes = useStyles();

  const notifications = [
    {
      id: 1,
      avatar: 'A',
      title: 'New Booking Confirmation',
      content: 'Congratulations! Your car booking has been confirmed.',
    },
    {
      id: 2,
      avatar: 'R',
      title: 'Reservation Reminder',
      content: 'Don\'t forget, your car reservation starts tomorrow.',
    },
    {
      id: 3,
      avatar: 'S',
      title: 'Special Offer',
      content: 'Limited time offer: Get 20% off on your next booking.',
    },
  ];

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>Notifications</Typography>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar className={classes.listItemAvatar}>{notification.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={notification.title}
              secondary={notification.content}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Notifications;
