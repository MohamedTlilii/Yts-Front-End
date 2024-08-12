import './App.scss';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './Layouts/PublicLayout';
import LandingPage from './Pages/LandingPage/LandingPage';
import ForK from './Pages/ForK/ForK';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import ConnexionLayout from './Layouts/ConnexionLayout';
import SingleMovie from './Pages/SingleMove/SingleMovie';
import UserRoute from './Routes/UserRoute';
import RequestPasswordReset from './Pages/RequestPasswordReset/RequestPasswordReset';
import Profil from './Pages/Profil/Profil';
import 'react-toastify/dist/ReactToastify.css';
import TestToast from './Components/Toast/Toast';
import UserResetPasswordTokenRoute from './Routes/UserResetPasswordTokenRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicLayout />} >
          <Route index element={<LandingPage />} />
          <Route path="forK" element={<ForK />} />
          <Route path="trending" element={<Trending />} />
          <Route path="movies" element={<Movies />} />
          <Route path="singlemovie/:id" element={
            <UserRoute>
              <SingleMovie />
            </UserRoute>
          } />
          <Route path="api/user/requestPasswordReset/:token" element={
            // <UserResetPasswordTokenRoute>
            <RequestPasswordReset />
            // </UserResetPasswordTokenRoute>
          } />
          <Route path="profil" element={
            <UserRoute>
              <Profil />
            </UserRoute>
          } />
        </Route>

        <Route path="/" element={<ConnexionLayout />}>
        </Route>
      </Routes>

      {/* ToastContainer should be outside of Routes to ensure it's available globally */}
      {/* <ToastContainer /> */}
      <TestToast />

    </>
  );
}

export default App;
