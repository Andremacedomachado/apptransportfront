import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListagemCidades, CidadesServices } from '../../shared/services/api/cidades/CidadesServices';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Environmenrt } from '../../shared/environments';
import { useDebounce } from '../../shared/hooks';

export const Cidades = () => {
    const [rows, setRows] = useState<IListagemCidades[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();
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
            CidadesServices.getAll(pagina, busca)
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

    const handleDelete = (id: number) => {
        if (confirm('Deseja realmente apagar o registro?')) {
            CidadesServices.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        setRows((oldRows) => [
                            ...oldRows.filter(oldRow => oldRow.id !== id)
                        ]);
                        alert('Registro excluido com sucesso');
                    }
                });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo="Cidades"
            barraDeFerramentas={
                < FerramentaDeListagem
                    mostrarInputBusca
                    textoBotaoNovo='Nova'
                    aoClicarBotaoNovo={() => navigate('/cidades/detalhe/nova')}
                    textoDeBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} sx={{ margin: 1, width: 'auto' }} variant='outlined'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row.id)}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/Cidades/detalhe/${row.id}`)}>
                                        <Icon>edit</Icon>
                                    </IconButton>

                                </TableCell>
                                <TableCell>{row.nome}</TableCell>

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