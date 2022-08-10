import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useField } from '@unform/core';

import { CidadesServices } from '../../../shared/services/api/cidades/CidadesServices';
import { useDebounce } from '../../../shared/hooks';


type TAutoCompleteOption = {
    id: number,
    label: string
}
interface IAutoCompleteCidadeProps {
    isExternalLoading: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {

    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [busca, setBusca] = useState('');

    const { fieldName, registerField} = useField('cidadeId');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        });
    }, [fieldName, registerField, selectedId]);

    const { debounce } = useDebounce();
    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            CidadesServices.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    }
                    else {
                        console.log(result);
                        setOpcoes(result.data.map(data => ({ id: data.id, label: data.nome })));
                    }
                });
        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (selectedId === undefined) return null;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (selectedId === undefined) return null;

        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            options={opcoes}
            disablePortal
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); }}
            renderInput={(params) => (
                <TextField
                    {...params}

                    label='Cidade'
                />
            )}
        />
    );
};