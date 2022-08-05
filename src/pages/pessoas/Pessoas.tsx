import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';


export const Pessoas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    return (
        <LayoutBaseDePagina
            titulo="Pessoas"
            barraDeFerramentas={
                < FerramentaDeListagem
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    textoDeBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        />
    );
};