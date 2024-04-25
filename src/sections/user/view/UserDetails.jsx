import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchAllUser } from 'src/Actions/PdtActions';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';

import { AccountDetailsForm } from './account-details-form';

export default function UserDetails() {
  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');
  const user = jwtDecode(tokenFromCookie);

  const [loading, setLoading] = useState(true); // État du chargement
  const [accountDetail, setAccountDetail] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUser(tokenFromCookie))
      .then(() => setLoading(false)) // Met fin au chargement une fois terminé
      .catch(error => {
        console.error('Erreur lors du chargement des détails de l\'utilisateur:', error);
        setLoading(false); // Gère également les erreurs en arrêtant le chargement
      });
  }, [dispatch, tokenFromCookie]);

  // Met à jour les détails de l'utilisateur une fois qu'ils sont récupérés
  const userDetail = useSelector(state => state.auth.user || []);
  useEffect(() => {
    if (!loading) {
      
      if (Array.isArray(userDetail)) {
        const foundUser = userDetail.find(u => u.id === parseInt(user.userId, 10));
        setAccountDetail(foundUser);
      }
    }
  }, [userDetail,loading, user.userId]);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const [photoData, setPhotoData] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const photoD = new Uint8Array(reader.result);
      setPhotoData(photoD);
      setPhoto(file);
    };
    reader.onerror = (error) => {
      console.error('Erreur lors de la lecture du fichier :', error);
    };
    if (file) {
      reader.readAsArrayBuffer(file);
    } else {
      console.error('Aucun fichier sélectionné.');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">User details</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} xs={8}>
          <Card>
            <CardContent>
              <Stack spacing={2} alignItems='center'>
                <div>
{accountDetail && (
  <Avatar src={photoData && photoData.length > 0 ? URL.createObjectURL(new Blob([photoData], { type: 'image/jpeg' })) : `data:image/jpeg;base64,${accountDetail.photo}`} sx={{ height: '80px', width: '80px' }} />
)}

                  </div>
                  {accountDetail && (
  <Stack spacing={1} textAlign='center'>
    <Typography variant='h5'>{accountDetail.username}</Typography>
    <Typography color='text.secondary' variant='body2'>
      {accountDetail.role}
    </Typography>
  </Stack>
)}

              </Stack>
            </CardContent>
            <Divider />
            <CardActions>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
              <Button fullWidth variant='text' onClick={handleUploadClick}>
                Upload picture
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
        {accountDetail && (
          <AccountDetailsForm photo={photo} accountDetail={accountDetail} />
        )}
        </Grid>
      </Grid>
    </Stack>
  );
}
