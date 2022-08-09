import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';
import { FerramentaDeDetalhe } from '../../shared/components';
import { IVFormErrors, VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FormHandles } from '@unform/core';

interface IFormData {
    email: string,
    cidadeId: number,
    nomeCompleto: string
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().required(),
    nomeCompleto: yup.string().required().min(3)
});

export const DetalheDePessoa = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null);
    useEffect(() => {
        setIsLoading(true);
        if (id !== 'nova') {
            PessoasServices.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    }
                    else {
                        setNome(result.nomeCompleto);
                        formRef.current?.setData(result);
                    }
                });
        }
        else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: '',
            });
            setIsLoading(false);
        }
    }, [id]);


    const handleSave = (dados: IFormData) => {

        formValidationSchema.validate(dados, { abortEarly: false })
            .then(dadosValidados => {
                setIsLoading(true);
                if (id === 'nova') {
                    PessoasServices.create(dadosValidados)
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                            }
                            else {
                                navigate(`/pessoas/detalhe/${result}`);
                            }
                        });
                }
                else {
                    PessoasServices.updateById(Number(id), { id: Number(id), ...dados })
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                            }

                        });
                }
                console.log(dados);
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;
                    validationErrors[error.path] = error.message;
                });
                formRef.current?.setErrors(validationErrors);
            });

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

                    aoClicarBotaoSalvar={() => formRef.current?.submitForm()}
                    aoClicarBotaoSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarBotaoApagar={() => handleDelete(Number(id))}
                    aoClicarBotaoNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarBotaoVoltar={() => navigate('/pessoas')}

                />}
        >


            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} padding={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
                    <Grid container spacing={2} padding={2}>

                        {isLoading && <Grid item xs={12} >
                            <LinearProgress variant='indeterminate' />
                        </Grid>}

                        <Grid item xs={12}>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    label='Nome completo'
                                    name='nomeCompleto'
                                    fullWidth
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row'>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    label='Email'
                                    name='email'
                                    fullWidth
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row'>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    label='Cidade'
                                    name='cidadeId'
                                    fullWidth
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Form>

        </LayoutBaseDePagina>
    );
};