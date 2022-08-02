import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


import { useDrawerContext } from '../shared/contexts';
export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: 'Pagina inicial',
                icon: 'home',
                path: '/pagina-inicial'
            },
            {
                label: 'Cidades',
                icon: 'star',
                path: '/cidades'
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='pagina-inicial' element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>toggle drawer</Button>}></Route>
            <Route path='pagina' element={<p>teste</p>}></Route>
            <Route path='*' element={<Navigate to='pagina-inicial' />}></Route>
        </Routes>
    );
};