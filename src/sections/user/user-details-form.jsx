'use client';

import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateUser,fetchAllUser } from 'src/Actions/PdtActions';
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

const stats = [
  { value: 'Banned', label: 'Banned' },
  { value: 'Active', label: 'Active' },
];
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

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = Array.from(binaryString).map(char => char.charCodeAt(0));
  return new Uint8Array(bytes).buffer;
}

export function UserDetailsForm({ handleCloseModal,userId }) {

    const userDetails = useSelector(state => state.auth.user || []);

    const userDetail = userDetails.find(user => user.id === userId);
    
    const [username, setUsername] = useState(userDetail.username);
    const [company, setCompany] = useState(userDetail.company);
    const [verified, setVerified] = useState(userDetail.verified);
    const [status, setStatus] = useState(userDetail.status);
    const [region, setRegion] = useState(userDetail.region);

    const dispatch = useDispatch();

    const tokenFromCookie = localStorage.getItem('token');

    const fetchUpdatedUserData = async () => {
        try {
          await dispatch(fetchAllUser(tokenFromCookie));
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données utilisateur actualisées :", error);
        }
      };


      const arrayBuffer = base64ToArrayBuffer(userDetail.photo);
  
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    
  const handleSaveDetails = async () => {
    try {
      await dispatch(UpdateUser(userId, username, userDetail.password, file, company, status, verified, region, tokenFromCookie));
      handleCloseModal();

      fetchUpdatedUserData();
      toast.success('Profil mis à jour avec succès!');
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la mise à jour du profil :", error);
    }
  };

  const Isadmin = localStorage.getItem('checkMe');

  return (
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
                <OutlinedInput value={username} label="UserName" name="UserName" onChange={(e) => setUsername(e.target.value)}/>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <OutlinedInput value={userDetail.role} label="Role" name="Role" readOnly/>
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
                {Isadmin === 'user' && (
                <OutlinedInput value={status === 0 ? 'Banned' : 'active'} label="Status" name="Status" readOnly/>
                )}
                {Isadmin === 'admin' && (
                <Select value={status === 0 ? 'Banned' : 'Active'} label="Status" name="Status" variant="outlined" onChange={(e) => setStatus(e.target.value === 'Active' ? 1 : 0)}>
                {stats.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Verified?</InputLabel>
                {Isadmin === 'user' && (
                <OutlinedInput value={verified === 0 ? 'No' : 'Yes'} label="Verified" name="Verified" readOnly/>
                )}
                {Isadmin === 'admin' && (
                <Select value={verified === 0 ? 'No' : 'Yes'} label="Verified" name="Verified" variant="outlined" onChange={(e) => setVerified(e.target.value === 'Yes' ? 1 : 0)}>
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                )}
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
          </Grid>
        </CardContent>
        <Divider />
        <CardActions style={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSaveDetails}>Save details</Button>
        <Button variant="outlined" onClick={handleCloseModal}>Skip</Button>
          </CardActions>
      </Card>
    </form>
  );
}

UserDetailsForm.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    userId: PropTypes.any,
  };
