import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { DefaultLayout } from './layouts';
import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/Scroll/scrollToTop';

function App() {
  const isAuthenticated = useSelector((state) => state.admin.isAdminLoggedIn);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                    <ToastContainer />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAuthenticated ? (
                    <Layout>
                      <Page />
                      <ToastContainer />
                    </Layout>
                  ) : (
                    <Navigate to="/admin-login" />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
