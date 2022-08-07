import { useEffect, useMemo, useState } from 'react';
import { LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IListagemPessoas, PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environmenrt } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';

export const Pessoas = () => {
    const [rows, setRows] = useState<IListagemPessoas[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);
    const { debounce } = useDebounce(1000);
    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            PessoasServices.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        console.log(result);

                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });
    }, [busca, pagina]);


    return (
        <LayoutBaseDePagina
            titulo="Pessoas"
            barraDeFerramentas={
                < FerramentaDeListagem
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    textoDeBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} sx={{ margin: 1, width: 'auto' }} variant='outlined'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environmenrt.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant='indeterminate'></LinearProgress>
                                </TableCell>
                            </TableRow>)
                        }
                        {(totalCount > 0 && totalCount > Environmenrt.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        variant='outlined'
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environmenrt.LIMITE_DE_LINHAS)}
                                        onChange={(e, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                                    />
                                </TableCell>
                            </TableRow>)
                        }
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
};