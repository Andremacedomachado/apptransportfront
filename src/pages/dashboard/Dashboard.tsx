import { Box, Card, CardContent, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { FerramentaDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CidadesServices } from '../../shared/services/api/cidades/CidadesServices';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';

export const Dashboard = () => {
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);

    const [totalCountPessoas, setTotalCountPessoas] = useState(0);
    const [totalCountCidades, setTotalCountCidades] = useState(0);

    const theme = useTheme();

    useEffect(() => {
        setIsLoadingPessoas(true);
        setIsLoadingCidades(true);

        PessoasServices.getAll(1)
            .then((dados) => {
                if (dados instanceof Error) {
                    alert(dados.message);
                }
                else {
                    setIsLoadingPessoas(false);
                    setTotalCountPessoas(dados.totalCount);
                }
            });
        CidadesServices.getAll(1)
            .then((dados) => {
                if (dados instanceof Error) {
                    alert(dados.message);
                }
                else {
                    setIsLoadingCidades(false);
                    setTotalCountCidades(dados.totalCount);
                }
            });
    }, []);

    return (
        <LayoutBaseDePagina titulo='Dashboard' barraDeFerramentas={<FerramentaDeListagem mostrarBotaoNovo={false} mostrarInputBusca={false} />} >
            <Box width='100%' display='flex'>
                <Grid container margin={1}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} >
                            <Card elevation={10} >
                                <CardContent>
                                    <Typography variant='h4' align='center' color={theme.palette.primary.main}>
                                        Total de pessoas
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingPessoas && (<Typography variant='h3' >
                                            {totalCountPessoas}
                                        </Typography>)}

                                        {isLoadingPessoas && (<Typography variant='h3'>
                                            Carregando...
                                        </Typography>)}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <Card elevation={10}>
                                <CardContent>
                                    <Typography variant='h4' align='center' color={theme.palette.primary.main}>
                                        Total de pessoas
                                    </Typography>
                                    <Box display='flex' justifyContent='center' alignItems='center'>
                                        {!isLoadingCidades && (<Typography variant='h3'>
                                            {totalCountCidades}
                                        </Typography>)}

                                        {isLoadingCidades && (<Typography variant='h3'>
                                            Carregando...
                                        </Typography>)}
                                    </Box >
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};