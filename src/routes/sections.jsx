import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const UserDetailsPage = lazy(() => import('src/sections/user/view/UserDetails'))
export const AddProductPage = lazy(() => import('src/sections/products/view/AddProduct'))
export const PageRegistre = lazy(() => import('src/pages/RegisterPage'));
export const AddSimpleUserPage = lazy(() => import('src/sections/user/view/AddSimpleUser'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/', // Chemin racine
      element: <LoginPage />, // Affichage de la page de connexion pour le chemin racine
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'UserDetails', element: <UserDetailsPage /> },
        { path: 'AddProduct', element: <AddProductPage /> },
        { path: 'AddSimpleUser', element: <AddSimpleUserPage /> }
        
      ],
    },
    {
      path: 'PageRegistre',
      element: <PageRegistre />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
