import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorPreview } from 'src/components/color-utils';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { Stack, Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
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

import { addProduit, fetchPdt } from 'src/Actions/PdtActions';

const states = [
  { value: 'Sale', label: 'Sale' },
  { value: 'New', label: 'New' },
];

export function ProductDetailsForm({ photoData }) { // Modifier la prop photoUrl en photoData
  const [Name, SetName] = useState('');
  const [PriceStr, SetPrice] = useState(0);
  const [PriceSaleStr, SetPriceSale] = useState(0);
  const [Status, SetStatus] = useState('');

  
  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');

  const fetchUpdatedPdtData = async () => {
    try {
      await dispatch(fetchPdt(tokenFromCookie));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données utilisateur actualisées :", error);
    }
  };
 

  const handleSaveDetails = async () => {
    const Price = parseInt(PriceStr, 10);
    const PriceSale = parseInt(PriceSaleStr, 10);
    const Colors = selectedColors.join(",");
    
    if (Name === '' || Status === '' || photoData === null || Colors === '') {
      return;
    }

    try {
      await dispatch(addProduit(photoData, Name, Price, PriceSale, Colors, Status, tokenFromCookie));
      
      fetchUpdatedPdtData();
      toast.success('Ajout de produit avec succès!');
    } catch (error) {
      console.error("Une erreur s'est produite lors de l'ajout de produit' :", error.message);
    }
  };
  

  const [selectedColors, setSelectedColors] = useState([]);

  const handleColorChange = (selectedColor) => {
    setSelectedColors([...selectedColors, selectedColor.hex]);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpenColorPicker = () => {
    setShow(true);
  };
  
  const handleReset = () => {
    setSelectedColors([]);
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
                <InputLabel> Name</InputLabel>
                <OutlinedInput value={Name} label="Name" name="Name" onChange={(e) => SetName(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth >
                <InputLabel>Price</InputLabel>
                <OutlinedInput value={PriceStr} label="Price" name="Price" onChange={(e) =>{
                    const newValue = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters except the decimal point

                    const regex = /^\d*\.?\d*$/;
              
                    if (regex.test(newValue)) {
                      SetPrice(newValue);
                    }

                }
                } />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Price Sale</InputLabel>
                <OutlinedInput value={PriceSaleStr} label="PriceSale" name="PriceSale" onChange={(e) => {
                const newValue = e.target.value.replace(/[^\d.]/g, ''); // Remove non-numeric characters except the decimal point

                const regex = /^\d*\.?\d*$/;
          
                if (regex.test(newValue)) {
                  SetPriceSale(newValue);
                }
                
              }} />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select value={Status } label="Status" name="Status" variant="outlined" onChange={(e) => SetStatus(e.target.value)}>
                  {states.map((option) => (
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ marginTop: '20px', marginLeft: '20px' }}>
        <ColorPreview colors={selectedColors} />
      </Stack>
        
        <Modal show={show} onHide={handleClose} backdrop="static" centered >
        <Modal.Header closeButton>
          <Modal.Title>Add color</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <ChromePicker
          color={selectedColors[selectedColors.length - 1] || '#ffffff'}
          disableAlpha
          presetColors={['green', '#00FF00', '#0000FF']} // Couleurs prédéfinies
          onChange={handleColorChange}
          width="100%"
        />

        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        
          <Button variant="primary" onClick={handleReset}>
            Reset
          </Button>
          <ColorPreview colors={selectedColors} />
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleOpenColorPicker}>Colors</Button>
        </CardActions>
  
        <CardActions style={{ justifyContent: 'flex-start' }}>
        <Button variant="contained" onClick={handleSaveDetails} disabled={Status === '' || Name === '' || photoData === null || selectedColors.length === 0}>Save details</Button>
        </CardActions>
      </div>

      </Card>
      
    </form>
  
      </>
  );
}
ProductDetailsForm.propTypes = {
  photoData: PropTypes.any, // Modifier la prop photoUrl en photoData
};
