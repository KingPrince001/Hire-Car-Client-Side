import { useState, useEffect, useContext } from "react";

import { Context } from "../context/userContext/context";
import { styled } from "@mui/system";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../components/Loading';
import Redirect from '../components/Redirect';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Edit as EditIcon, Close as CloseIcon, Update as UpdateIcon } from '@mui/icons-material';

const schema = yup.object().shape({
  carId: yup.number().required().positive().integer(),
  startDate: yup.date().required().min(new Date(), 'Start date must be greater than or equal to today'),
  endDate: yup.date().required().min(yup.ref('startDate'), 'End date must be greater than or equal to start date'),
});

const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap:'20px',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const ActiveReservations = () => {
  const { user } = useContext(Context);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

 

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `https://carhireapi.azurewebsites.net/${user.customerid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBookings(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching bookings:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  const handleOpenDialog = (booking) => {
    setSelectedBooking(booking);
    setValue('carId', booking.car_id);
    setValue('startDate', new Date(booking.start_date));
    setValue('endDate', new Date(booking.end_date));
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedBooking(null);
    setIsDialogOpen(false);
  };

  const handleUpdate = async (data) => {
    try {
      const formattedStartDate = format(new Date(data.startDate), "yyyy-MM-dd");
      const formattedEndDate = format(new Date(data.endDate), "yyyy-MM-dd");
  
      const response = await fetch(`https://carhireapi.azurewebsites.net/bookings/update/${selectedBooking.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          car_id: data.carId,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        }),
      });
  
      if (response.ok) {
        const updatedBooking = {
          ...selectedBooking,
          car_id: data.carId,
          start_date: data.startDate,
          end_date: data.endDate,
        };

        setBookings(bookings.map((booking) => booking.id === selectedBooking.id ? updatedBooking : booking));
        toast.success("Booking updated successfully!");
        handleCloseDialog();
      } else {
        toast.error("Failed to update booking.");
      }

    } catch (error) {
      console.log("Error updating booking:", error);
      toast.error("Failed to update booking.");
    }
  };

  const handleDelete = async (booking_id) => {
    try {
      const response = await fetch(`https://carhireapi.azurewebsites.net/bookings/delete/${booking_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message);
      // Refresh the bookings after successful deletion
      fetchBookings();
      toast.success("Booking deleted successfully!");
    } catch (error) {
      console.log("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h2" style={{fontSize:'35px', margin:'10px 300px 15px '}}>
          Active Reservations
        </Typography>
        {isLoading ? (
          <Loading loadingItem="OffLoading Active Reservations ..." />
        ) : (
          <Grid container spacing={4}>
            {bookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <Card>
                  <Avatar
                    src={booking.carImage}
                    alt="Car Image"
                  />
                  <div>
                    <CardContent>
                      <Typography variant="h6">Car ID: {booking.car_id}</Typography>
                      <div>
                        <Typography
                          variant="body1"
                        >
                          Pickup Date:{" "}
                          {format(
                            new Date(booking.start_date),
                            "MMMM dd, yyyy"
                          )}
                        </Typography>
                        <Typography
                          variant="body1"
                        >
                          Return Date:{" "}
                          {format(new Date(booking.end_date), "MMMM dd, yyyy")}
                        </Typography>
                      </div>
                      <div style={{marginTop:'10px'}}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDelete(booking.booking_id)}
                        >
                          Delete
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          style={{marginLeft:'20px'}}
                          onClick={() => handleOpenDialog(booking)}
                        >
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <ToastContainer /> {/* Add ToastContainer */}
      </Container>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update Booking</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <FormContainer>
              <Controller
                name="carId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Car ID"
                    error={!!errors.carId}
                    helperText={errors.carId?.message}
                  />
                )}
              />
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Start Date"
                    type="date"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="End Date"
                    type="date"
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<UpdateIcon />}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDialog}
                startIcon={<CloseIcon />}
              >
                Cancel
              </Button>
            </FormContainer>
          </form>
        </DialogContent>
        <DialogActions />
      </Dialog>
      <div style={{margin:'20px 400px'}}>

<Redirect message="Make a new" redirectLinkTo="Reservation" route="/reserve"  />
      </div>

    </>
  );
};

export default ActiveReservations;
