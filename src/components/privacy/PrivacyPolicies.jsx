
import { Typography, Grid, Paper } from '@mui/material';
import { Info, Lock, Settings, Language, ChildCare } from '@mui/icons-material';

const PrivacyPolicies = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          Privacy Policies
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Data Collection
          </Typography>
          <Typography variant="body1">
            <Info /> We collect various types of personal data, such as name, contact details, and payment information, in order to process reservations and provide customer support.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Data Storage and Security
          </Typography>
          <Typography variant="body1">
            <Lock /> We implement strict security measures to protect your personal data from unauthorized access and ensure its confidentiality.
          </Typography>
        </Paper>
      </Grid>


      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Children's Privacy
          </Typography>
          <Typography variant="body1">
            <ChildCare /> Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            International Data Transfers
          </Typography>
          <Typography variant="body1">
            <Language /> Your personal data may be transferred to and processed in countries outside of your country of residence. We ensure that appropriate safeguards are in place to protect your data.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1">
            <Settings /> If you have any questions or concerns regarding our privacy policies, please contact our support team at privacy@hirewheelscompany.com.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicies;
