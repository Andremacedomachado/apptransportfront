import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';


import { useAppThemeContext } from '../shared/contexts';
export const AppRoutes = () => {
    const {toggleTheme} = useAppThemeContext();


    return (
        <Routes>
            <Route path='pagina-inicial' element={<Button variant="contained" color="primary" onClick={toggleTheme}>teste</Button>}></Route>
            <Route path='pagina' element={<p>teste</p>}></Route>
            <Route path='*' element={<Navigate to='pagina-inicial' />}></Route>
        </Routes>
    );
};