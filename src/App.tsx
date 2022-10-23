import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/Navbar/NavBar';
import MessengerContainer from './components/Messenger/MessengerContainer';
// import AllUsersContainer from './components/AllUsers/AllUsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';
import SettingsContainer from './components/Settings/SettingsContainer';
import Enter from './components/Authentication/Enter';
import Preloader from './components/common/Preloader/Preloader';
import NotFound from './components/NotFound/NotFound';

// for lazy downloading
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const AllUsersContainer = React.lazy(() => import('./components/AllUsers/AllUsersContainer'));

const App = () => {
  return (
    <BrowserRouter>
     <div className='app-wrapper'>
     <HeaderContainer/>
     <NavBar/>
     <React.Suspense fallback={<Preloader/>}>
     <Routes>
       <Route path='/profile/:userId' element={<ProfileContainer />} />
       <Route path='/profile/' element={<ProfileContainer />} />
       <Route path='/messenger/*' element={<MessengerContainer />} />
       <Route path='/settings' element={<SettingsContainer />} />
       <Route path='/allUsers' element={<AllUsersContainer />} />
       <Route path='/welcome' element={<Enter />} />
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path='*' element={<NotFound />} />
     </Routes>
     </React.Suspense>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
