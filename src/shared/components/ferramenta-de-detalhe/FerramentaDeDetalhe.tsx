import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';


interface IFerramentaDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;

    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;

    aoClicarBotaoSalvar?: () => void;
    aoClicarBotaoSalvarEFechar?: () => void;
    aoClicarBotaoApagar?: () => void;
    aoClicarBotaoNovo?: () => void;
    aoClicarBotaoVoltar?: () => void;

}

export const FerramentaDeDetalhe: React.FC<IFerramentaDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,
    mostrarBotaoApagar = true,
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,

    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarBotaoSalvar,
    aoClicarBotaoSalvarEFechar,
    aoClicarBotaoApagar,
    aoClicarBotaoNovo,
    aoClicarBotaoVoltar,
}) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();


    return (
        <Box
            display='flex'
            alignItems='center'
            flexDirection={smDown ? 'column' : 'row'}
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            component={Paper}
            height={!smDown ? theme.spacing(5) : theme.spacing(28)}
        >
            {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (<Button
                color='primary'
                disableElevation
                variant='contained'
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarBotaoSalvar}
            >
                <Typography variant='button' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                    Salvar
                </Typography>
            </Button>)}

            {mostrarBotaoSalvarCarregando && (<Skeleton width={100} height={60} />)}

            {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && (<Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarBotaoSalvarEFechar}
            >
                <Typography variant='button' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                    Salvar e fechar
                </Typography>
            </Button>)}

            {mostrarBotaoSalvarEFecharCarregando && (<Skeleton width={180} height={60} />)}

            {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (<Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>delete</Icon>}
                onClick={aoClicarBotaoApagar}
            >
                <Typography variant='button' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                    Apagar
                </Typography>
            </Button>)}

            {mostrarBotaoApagarCarregando && (<Skeleton width={100} height={60} />)}

            {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (<Button
                color='primary'
                disableElevation
                variant='outlined'
                startIcon={<Icon>add</Icon>}
                onClick={aoClicarBotaoNovo}
            >
                <Typography variant='button' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                    {textoBotaoNovo}
                </Typography>
            </Button>)}

            {mostrarBotaoNovoCarregando && (<Skeleton width={100} height={60} />)}

            <Divider variant={smDown ? 'fullWidth' : 'middle'} orientation={smDown ? 'horizontal' : 'vertical'} sx={ smDown ? {width: theme.spacing(10)}: {width: 0}} />

            {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (mostrarBotaoApagar || mostrarBotaoNovo || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar)
                && (<Button
                    color='primary'
                    disableElevation
                    variant='outlined'
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarBotaoVoltar}
                >
                    <Typography variant='button' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                        Voltar
                    </Typography>
                </Button>)}

            {mostrarBotaoVoltarCarregando && (<Skeleton width={100} height={60} />)}

        </Box>
    );
};