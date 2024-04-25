import { useState } from 'react';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import i18n from 'src/i18n';

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
  },
];

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGS[0]); // État pour suivre la langue sélectionnée

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    handleClose();
    
    // Mettre à jour l'état de la langue sélectionnée
    const newSelectedLanguage = LANGS.find(lang => lang.value === language);
    setSelectedLanguage(newSelectedLanguage);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={selectedLanguage.icon} alt={selectedLanguage.label} /> {/* Utilisez l'icône de la langue sélectionnée */}
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
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedLanguage.value}
            onClick={() => changeLanguage(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
