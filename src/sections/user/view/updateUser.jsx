import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { UserDetailsForm } from '../user-details-form';
import { UserInfo } from '../user-info';

export default function UpdateUser({handleCloseModal, userId }) {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">User details</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} xs={8}>
          <UserInfo userId={userId} />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <UserDetailsForm handleCloseModal={handleCloseModal} userId={userId} />
        </Grid>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Stack>
  );
} 
UpdateUser.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    userId: PropTypes.any,
  };
