import { useState } from 'react';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { bgBlur } from 'src/theme/css';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [highlightColor] = useState('orange'); // Couleur de surbrillance par défaut

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setSearchText('');
    setOpen(false);
    setSearchResults([]);
    removeHighlight();
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const allElements = document.querySelectorAll('*');
      const foundElements = [];

      allElements.forEach((element) => {
        if (element.innerText && element.innerText.toLowerCase().includes(searchText.toLowerCase())) {
          foundElements.push(element);
        }
      });

      setSearchResults(foundElements);
      highlightSearchResults();
    }
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const highlightSearchResults = () => {
    searchResults.forEach((element) => {
      const textNodes = element.childNodes;
      textNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.toLowerCase();
          const newText = text.replace(new RegExp(searchText, 'gi'), (match) => `<span style="background-color: ${highlightColor}">${match}</span>`); // Utilisation de la couleur de surbrillance définie dans highlightColor
          const spanElement = document.createElement('span');
          spanElement.innerHTML = newText;
          element.replaceChild(spanElement, node);
        }
      });
    });
  };

  const removeHighlight = () => {
    searchResults.forEach((element) => {
      const textNodes = element.childNodes;
      textNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN' && node.style.backgroundColor === highlightColor) {
          const text = node.textContent;
          const textNode = document.createTextNode(text);
          element.replaceChild(textNode, node);
        }
      });
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              value={searchText}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
