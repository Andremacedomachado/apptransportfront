import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FerramentaDeListagem } from '../../shared/components';
import { useDebounce } from '../../shared/hooks';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';


export const Pessoas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    const { debounce } = useDebounce(1000);
    useEffect(() => {
        debounce(() => {
            PessoasServices.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        console.log(result);
                    }
                });
        });
    }, [busca]);

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