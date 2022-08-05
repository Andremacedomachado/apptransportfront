import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environmenrt } from '../../environments';

interface IBarraDeListagemProps {
    textoDeBusca?: string;
    mostrarInputBusca: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarBotaoNovo?: () => void;

}


export const BarraDeListagem: React.FC<IBarraDeListagemProps> = ({
    textoDeBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    aoClicarBotaoNovo
}) => {

    const theme = useTheme();
    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display='flex'
            alignItems='center'
            height={theme.spacing(5)}
            component={Paper}
        >
            {mostrarInputBusca && (<TextField
                size='small'
                value={textoDeBusca}
                onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                placeholder={Environmenrt.INPUT_DE_BUSCA}
            />)}

            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarBotaoNovo && (<Button
                    color='primary'
                    disableElevation
                    variant='contained'
                    endIcon={<Icon>add</Icon>}
                    onClick={aoClicarBotaoNovo}
                >
                    {textoBotaoNovo}
                </Button>)}
            </Box>
        </Box >
    );
};