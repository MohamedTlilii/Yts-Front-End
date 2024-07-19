import './App.scss';
// import CustomComponent from './Components/CustomComponent/CustomComponent';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './Layouts/PublicLayout';
import LandingPage from './Pages/LandingPage/LandingPage';
import ForK from './Pages/ForK/ForK';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import ConnexionLayout from './Layouts/ConnexionLayout';
// import Login from './Pages/Login/Login';
// import Register from './Pages/Register/Register';
import SingleMovie from './Pages/SingleMove/SingleMovie';
import UserRoute from './Routes/UserRoute';
import Login from './Components/Login/Login';
import ResetPassword from './Pages/ResetPassword/ResetPassword';


function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />} >
        <Route index element={<LandingPage />} />
        <Route path="forK" element={<ForK />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="singlemovie/:id" element={
          <UserRoute>
            <SingleMovie />
          </UserRoute>
        } />
        <Route path="/resetPassword" element={<ResetPassword />} />
        </Route>






      <Route path="/" element={<ConnexionLayout />}>

        {/* <Route path="/login" component={<Login />} /> */}

      </Route>
    </Routes>
  );
}

export default App;
