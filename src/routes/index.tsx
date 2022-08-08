import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard, DetalheDePessoa, Pessoas } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { setDrawerOption } = useDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: 'Pagina inicial',
                icon: 'home',
                path: '/pagina-inicial'
            },
            {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />}></Route>
            <Route path='/pessoas' element={<Pessoas />}></Route>
            <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoa />}></Route>
            <Route path='*' element={<Navigate to='pagina-inicial' />}></Route>
        </Routes>
    );
};