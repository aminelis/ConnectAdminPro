import React from 'react'; // Importez React
import SvgColor from 'src/components/svg-color';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const NavConfig = () => { // Déclarez un composant fonctionnel pour contenir le code
  const { t } = useTranslation(); // Déplacer l'appel à useTranslation à l'intérieur du composant fonctionnel

  const navConfig = [
    {
      title: t('nav.dashboard'),
      path: '/dashboard',
      icon: icon('ic_analytics'),
    },
    {
      title: t('nav.user'),
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: t('nav.product'),
      path: '/products',
      icon: icon('ic_cart'),
    },
    // {
    //  title: 'blog',
    //  path: '/blog',
    //  icon: icon('ic_blog'),
    // },
  ];

  return navConfig; // Retournez le tableau navConfig à l'intérieur du composant fonctionnel
};

export default NavConfig;
