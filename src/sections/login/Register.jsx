'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Logo from 'src/components/logo';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';



import Stack from '@mui/material/Stack';



const states = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const regions = [
    { value: 'America', label: 'America' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Africa', label: 'Africa' },
  ];


export default function AddUser() {
    const navigate = useNavigate();

    const theme = useTheme();

    const [username, setUsername] = useState('');
    const [company, setCompany] = useState('');

    const [region, setRegion] = useState('America');
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      setPasswordsMatch(event.target.value === confirmPassword && event.target.value !=='');
      setShowPasswordError(event.target.value !== confirmPassword);
    };

    console.log('passwordsMatch',passwordsMatch);
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
      setPasswordsMatch(event.target.value === password && event.target.value !=='');
      setShowPasswordError(event.target.value !== password);
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  
    const handleSaveDetails = async (e) => {
      e.preventDefault();
      
      const formData = new FormData();
  
      formData.append('username', username);
      formData.append('password', password);
      formData.append('company', company || '');
      formData.append('region', region || '');
      if (!passwordsMatch) {
        setShowPasswordError(true);
        toast.error('Passwords do not match!');
        return;
        
      } console.log('formData',formData);
      try {
        const response = await axios.post(
          'https://localhost:7013/api/Auth/register',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Modifier le type de contenu
          }
          }
        );

        if (response.status === 200) {
            toast.success('Inscription effectuée avec succès');
            // Reset the form after successful creation
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setCompany('');
            setRegion('');
          } else {
            console.error('Error while creating reunion.');
          }
    
      } catch (error) {
        toast.error('Inscription erronée');
        throw error;
      }
      
    };
  


  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
    <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

    <Stack spacing={3}>
      
      <Grid container spacing={8}>
        


      <Grid item lg={8} md={6} xs={12} sx={{ marginLeft: 30 }}>
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
        <CardHeader subheader="The information can be edited" title="Register" />
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
                <OutlinedInput value='user' label="Role" name="Role" readOnly />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <OutlinedInput value={company} label="Company" name="Company" onChange={(e) => setCompany(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <OutlinedInput value='active' label="Status" name="Status" readOnly />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Verified?</InputLabel>
                <Select value='No' label="Verified" name="Verified" variant="outlined" readOnly>
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Region</InputLabel>
                <Select value={region} label="Region" name="Region" variant="outlined" onChange={(e) => setRegion(e.target.value)}>
                  {regions.map((option) => (
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
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  label="Confirm Password"
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
          <Button variant="contained" onClick={handleSaveDetails}>Save </Button>
          <Button variant="outlined" onClick={()=>navigate('/')}>Retour</Button>
        </CardActions>
      </Card>
      
    </form>
        </Grid>
      </Grid>
          </Stack>
          </Box>
  );
} 
