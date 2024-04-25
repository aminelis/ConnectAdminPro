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

import { UpdatePdt, fetchPdt } from 'src/Actions/PdtActions';
import { propTypes } from 'react-bootstrap/esm/Image';

const states = [
  { value: 'Sale', label: 'Sale' },
  { value: 'New', label: 'New' },
];

// Convertir la chaîne base64 en données binaires (ArrayBuffer)
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = Array.from(binaryString).map(char => char.charCodeAt(0));
    return new Uint8Array(bytes).buffer;
  }
  
    

export function UpdateProductForm({ product, photoData, handleCloseModal }) { // Modifier la prop photoUrl en photoData
  const [Name, SetName] = useState(product.name);
  const [PriceStr, SetPrice] = useState(product.price);
  const [PriceSaleStr, SetPriceSale] = useState(product.priceSale);
  const [Status, SetStatus] = useState(product.status);

  
  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');

  const fetchUpdatedPdtData = async () => {
    try {
      await dispatch(fetchPdt(tokenFromCookie));
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données utilisateur actualisées :", error);
    }
  };
 
  const arrayBuffer = base64ToArrayBuffer(product.photo);
  
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });


  const handleSaveDetails = async () => {
    const Price = parseInt(PriceStr, 10);
    const PriceSale = parseInt(PriceSaleStr, 10);
    const Colors = selectedColors.join(",");

    if (Name === '' || Status === '' || Colors === '') {
      return;
    }

    console.log(file);

    try {
      await dispatch(UpdatePdt(product.id, photoData === null ? file : photoData, Name, Price, PriceSale, Colors, Status, tokenFromCookie));
      
      fetchUpdatedPdtData();
      toast.success('Product updated with success!');
    } catch (error) {
        toast.error("Error updating product!");
    }
  };
  

  const [selectedColors, setSelectedColors] = useState([product.colors]);

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
        
        <Modal show={show} onHide={handleClose} backdrop="static" centered style={{ zIndex: 9999 }}>
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
        <Button variant="outlined" onClick={()=>handleCloseModal()}>Skip</Button>
        <Button variant="contained" onClick={handleSaveDetails} disabled={Status === '' || Name === '' || selectedColors.length === 0}>Save details</Button>
        </CardActions>
      </div>

      </Card>
      
    </form>
  
      </>
  );
}
UpdateProductForm.propTypes = {
  product: PropTypes.object,
  photoData: propTypes.any, // Modifier la prop photoUrl en photoData
  handleCloseModal: PropTypes.func,
};
