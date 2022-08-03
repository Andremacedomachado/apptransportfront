import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';

import { Dashboard } from '../pages';

export const AppRoutes = () => {
    const {setDrawerOption } = useDrawerContext();

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
            <Route path='pagina-inicial' element={<Dashboard />}></Route>
            <Route path='pagina' element={<p>teste</p>}></Route>
            <Route path='*' element={<Navigate to='pagina-inicial' />}></Route>
        </Routes>
    );
};