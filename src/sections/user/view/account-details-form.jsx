'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateUser, fetchAllUser } from 'src/Actions/PdtActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton,InputAdornment,Box } from '@mui/material';

const states = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

export function AccountDetailsForm({ photo, accountDetail }) {
  const [username, setUsername] = useState(accountDetail.username);

  const [company, setCompany] = useState(accountDetail.company || '');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
    setShowPasswordError(event.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(event.target.value === password);
    setShowPasswordError(event.target.value !== password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');

  const fetchUpdatedUserData = async () => {
    try {
      await dispatch(fetchAllUser(tokenFromCookie));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données utilisateur actualisées :", error);
    }
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setShowPasswordError(true);
      toast.error('Passwords do not match!');
      return;
    }
    try {
      await dispatch(UpdateUser(accountDetail.id, username, password, photo, company, accountDetail.status, accountDetail.verified, accountDetail.region, tokenFromCookie));

      fetchUpdatedUserData();

      toast.success('Profile updated successfully!');

    } catch (error) {
      console.error("Une erreur s'est produite lors de la mise à jour du profil :", error);
      toast.error('Update failed!');
    };
  };
  return (
    <>
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel> UserName</InputLabel>
                <OutlinedInput value={username} label="UserName" name="UserName" onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <OutlinedInput value={accountDetail.role} label="Role" name="Role" readOnly />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Company</InputLabel>
                <OutlinedInput value={company} label="Company" name="Company" onChange={(e) => setCompany(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <OutlinedInput value={accountDetail.status === 0 ? 'Banned' : 'active'} label="Status" name="Status" readOnly />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Verified?</InputLabel>
                <Select value={accountDetail.verified === 0 ? 'No' : 'Yes'} label="Verified" name="Verified" variant="outlined" readOnly>
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type='password'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  label="Confirm Password"
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
            <FormControl fullWidth variant="outlined">
                {showPasswordError && <Box className="profile-password-match-error" color="red">Passwords do not match!</Box>}
                {passwordsMatch && <Box className="profile-password-match-error" color="green">Passwords match!</Box>}
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSaveDetails}>Save details</Button>
        </CardActions>
      </Card>
      
    </form>
  
      </>
  );
}
AccountDetailsForm.propTypes = {
  photo: PropTypes.any,
  accountDetail: PropTypes.any,
};