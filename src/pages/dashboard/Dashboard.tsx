import { BarraDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = ()=>{


    return(
        <LayoutBaseDePagina titulo='Dashboard' barraDeFerramentas= {<BarraDeListagem mostrarInputBusca />} >
        </LayoutBaseDePagina>
    );
};