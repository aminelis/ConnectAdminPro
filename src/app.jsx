/* eslint-disable perfectionist/sort-imports */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'src/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import Footer from './Footer';

// ----------------------------------------------------------------------useScrollToTop();

export default function App() {

        const token = useSelector((state) => state.auth.token);

        useEffect(() => {
          if (token) {
            localStorage.setItem('token', token); // Store token in localStorage
            console.log('Token stored in localStorage');
          }
        }, [token]);

  return (
    <ThemeProvider>
      <Router />
      <Footer />
     </ThemeProvider>
  );
}
