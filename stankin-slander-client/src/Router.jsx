import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import JournalPage from './Pages/JournalPage/JournalPage';
import UsersPage from './Pages/UsersPage/UsersPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={LandingPage}/>
                <Route exact path='/journal' Component={JournalPage}/>
                <Route exact path='/users_page' Component={UsersPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router