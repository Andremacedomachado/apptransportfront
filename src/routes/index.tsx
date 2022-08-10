import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard, DetalheDePessoa, Pessoas,Cidades, DetalheDeCidade } from '../pages';
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
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />}></Route>
            <Route path='/pessoas' element={<Pessoas />}></Route>
            <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoa />}></Route>
            <Route path='/cidades' element={<Cidades />}></Route>
            <Route path='/cidades/detalhe/:id' element={<DetalheDeCidade />}></Route>
            <Route path='*' element={<Navigate to='pagina-inicial' />}></Route>
        </Routes>
    );
};