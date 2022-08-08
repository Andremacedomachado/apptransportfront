import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';

export const DetalheDePessoa = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasServices.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    }
                    else {
                        setNome(result.nomeCompleto);
                        console.log(result);
                    }
                });
        }
    }, [id]);


    const handleSave = () => {
        console.log('Save');
    };
    const handleDelete = (id: number) => {
        if (confirm('realmente deseja apagar o registro?')) {
            PessoasServices.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        alert('Registro apagado com sucesso');
                        navigate('/pessoas');
                    }
                });
        }
    };
    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramentas={
                <FerramentaDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoSalvarEFechar

                    aoClicarBotaoSalvar={() => handleSave()}
                    aoClicarBotaoSalvarEFechar={() => handleSave()}
                    aoClicarBotaoApagar={() => handleDelete(Number(id))}
                    aoClicarBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarBotaoVoltar={() => navigate('/pessoas')}

                />}
        >
            {(id !== 'nova' && isLoading) && <LinearProgress variant='indeterminate'></LinearProgress>}

        </LayoutBaseDePagina>
    );
};