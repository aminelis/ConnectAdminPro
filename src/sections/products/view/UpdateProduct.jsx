import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { UpdateProductForm } from './Update-Product-Form';

export default function UpdateProduct({product, handleCloseModal}) {
  


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

  const renderImg = (
    <Box
      component="img"
      src={photoData && photoData.length > 0 ? URL.createObjectURL(new Blob([photoData], { type: 'image/jpeg' })) : `data:image/jpeg;base64,${product.photo}`}
       sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">New Product</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} xs={8}>
        <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderImg}
      </Box>
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
          < UpdateProductForm product={product} photoData={photo} handleCloseModal={handleCloseModal} />
        </Grid>
      </Grid>
          </Stack>
  );
} 
UpdateProduct.propTypes = {
    product: PropTypes.object,
    handleCloseModal: PropTypes.func,
  };