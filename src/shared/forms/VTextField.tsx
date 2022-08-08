import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { useField } from '@unform/core';


type TVTextField = TextFieldProps & {
    name: string;
}

export const VTextField: React.FC<TVTextField> = ({ name, ...rest }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue)
        });
    });
    return (
        <TextField
            {...rest}

            error={!!error}
            helperText={error}
            defaultValue={defaultValue}
            onKeyDown={e => { error && clearError(); rest.onKeyDown?.(e); }}

            value={value}
            onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
        />
    );
};