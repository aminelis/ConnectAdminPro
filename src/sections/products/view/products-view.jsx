import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPdt } from 'src/Actions/PdtActions';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const navigate = useNavigate();

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const products = useSelector(state => state.products.products);

  const dispatch = useDispatch();

  const tokenFromCookie = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchPdt(tokenFromCookie));
  }, [dispatch, tokenFromCookie]);


  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpenOptions = (productId) => {
    setSelectedProductId(productId);
  };
  
  const handleCloseOptions = () => {
    setSelectedProductId(null);
  };  

  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={(()=>navigate('/AddProduct')) }>
          New Product
        </Button>
      </Stack>
      
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard
            product={product}
            selected={selectedProductId === product.id}
            onOpenOptions={() => handleOpenOptions(product.id)}
            onCloseOptions={handleCloseOptions}
            />

          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
