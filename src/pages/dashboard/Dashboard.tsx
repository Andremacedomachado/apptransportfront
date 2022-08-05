import { FerramentaDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {


    return (
        <LayoutBaseDePagina titulo='Dashboard' barraDeFerramentas={<FerramentaDeDetalhe />} >
        </LayoutBaseDePagina>
    );
};