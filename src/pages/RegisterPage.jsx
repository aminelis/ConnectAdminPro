import { Helmet } from 'react-helmet-async';

import AddUser from 'src/sections/login/Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | Minimal UI </title>
      </Helmet>

      <AddUser />
    </>
  );
}
