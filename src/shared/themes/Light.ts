import { createTheme } from '@mui/material';
import { brown, orange } from '@mui/material/colors';

export const LightTheme = createTheme(
    {
        palette: {
            primary: {
                main: orange[700],
                dark: orange[800],
                light: orange[500],
                contrastText: '#ffffff',
            },
            secondary: {
                main: brown[700],
                dark: brown[800],
                light: brown[500],
                contrastText: '#ffffff',
            },
            background: {
                paper: '#ffffff',
                default: '#f7f6f3',
            }
        }
    }
);