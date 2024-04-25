import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchUser } from 'src/Actions/PdtActions';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';
import SvgColor from 'src/components/svg-color';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 0.7, height: 0.8 }} />
);
// ----------------------------------------------------------------------

export default function AccountPopover() {

  const tokenFromCookie = localStorage.getItem('token');

  const user = jwtDecode(tokenFromCookie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(user.userId, tokenFromCookie));
  }, [dispatch, tokenFromCookie, user.userId]);

  let account = useSelector(state => state.auth.user || []);

  if (Array.isArray(account)) {
     account = account.find(u => u.id === parseInt(user.userId,10));
  }

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const handleSettings = () => {

    navigate('/UserDetails');
  };

  const handleInLogin = async () => {
    try {
      const response = await fetch('https://localhost:7013/api/Auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }});
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/');
      } else {
        console.error('Échec de l\'authentification');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <IconButton
  onClick={handleOpen}
  sx={{
    width: 40,
    height: 40,
    background: (theme) => alpha(theme.palette.grey[500], 0.08),
    ...(open && {
      background: (theme) =>
        `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    }),
  }}
>
  {account && ( // Vérification si account et account.photo existent
    <Avatar
      src={account.photo && account.photo.length > 0 ? `data:image/jpeg;base64,${account.photo}` : '/assets/images/avatars/avatar_25.jpg'}
      alt={account?.username}
      sx={{
        width: 36,
        height: 36,
        border: (theme) => `solid 2px ${theme.palette.background.default}`,
      }}
    >
      {account && account?.username && account?.username.charAt(0).toUpperCase()}
    </Avatar>
  )}
</IconButton>


      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account?.role}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={(()=>navigate('/dashboard'))} sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
          <Icon sx={{ marginRight: '10px', marginBottom : '8px' }}>{icon('ic_home')}</Icon>
          <Typography variant="body2">{t('about.home')}</Typography>
        </MenuItem>


        <MenuItem onClick={handleSettings} sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
          <Icon sx={{ marginRight: '10px', marginBottom : '12px' }}>{icon('ic_sett')}</Icon>
          <Typography variant="body2">{t('about.settings')}</Typography>
        </MenuItem>
          
        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleInLogin}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          {t('about.logout')}
        </MenuItem>
      </Popover>
    </>
  );
}
