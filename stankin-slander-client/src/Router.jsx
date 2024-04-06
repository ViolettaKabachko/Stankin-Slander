import {Route, Routes, BrowserRouter} from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import JournalPage from './Pages/JournalPage/JournalPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={LandingPage}/>
                <Route exact path='/journal' Component={JournalPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router