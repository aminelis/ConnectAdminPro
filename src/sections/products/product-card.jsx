import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePdt } from 'src/Actions/PdtActions';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';
import UpdateProduct from './view/UpdateProduct';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product, selected, onOpenOptions, onCloseOptions}) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 18,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderMenu = (
    <IconButton
    onClick={(event)=>setOpen(event.currentTarget)}
      sx={{
        zIndex: 9,
        top: 9,
        right: -8,
        position: 'absolute',
        }}
    >
      <Iconify icon="eva:more-vertical-fill" />
    </IconButton>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={`data:image/jpeg;base64,${product.photo}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  let colorsArray = product.colors;

  if (typeof product.colors === 'string') {
    colorsArray = product.colors.split(',');
    
  }

  const [open, setOpen] = useState(null);

  const [ openModal, setOpenModal] = useState(false);


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deletePdt(product.id, tokenFromCookie));
      
      toast.success('Product deleted with success!');
    } catch (error) {
      toast.error("Error when deleting !");
    }
  };


  return (
    <Card >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}
        
        {renderMenu}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
         {colorsArray && <ColorPreview colors={colorsArray} />}
         {!colorsArray && <ColorPreview colors={product.colors} />}
          {renderPrice}
        </Stack>
      </Stack>


<Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => setOpenModal(true)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteProduct} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

      </Popover>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%' }}>
          <UpdateProduct product={product} handleCloseModal={handleCloseModal} />
        </div>
      </Modal>

    </Card>
    
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
  selected: PropTypes.bool,
  onOpenOptions: PropTypes.func,
  onCloseOptions: PropTypes.func,
};
