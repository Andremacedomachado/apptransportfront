import { Api } from '../axios-config';

import { Environmenrt } from '../../../environments';

export interface IListagemPessoas {
    id: number;
    email: string,
    cidadeId: number,
    nomeCompleto: string,

}

export interface IDetalhePessoas {
    id: number;
    email: string,
    cidadeId: number,
    nomeCompleto: string,

}

type IPessoasComTotalCount = {
    data: IListagemPessoas[],
    totalCount: number,
}


const getAll = async (page = 1, filter = ''): Promise<IPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environmenrt.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environmenrt.LIMITE_DE_LINHAS),
            };
        }

        return new Error('error ao listar os registros');

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao listar os registros');
    }
};

const getById = async (id: number): Promise<IListagemPessoas | Error> => {
    try {
        const urlRelativa = `/pessoas/${id}`;
        const { data } = await Api.get(urlRelativa);
        if (data) {
            return data;
        }

        return new Error('error ao listar o registro');

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao listar o registro');
    }
};

const create = async (dados: Omit<IDetalhePessoas, 'id'>): Promise<number | Error> => {
    try {
        const urlRalativa = '/pessoas';
        const { data } = await Api.post<IDetalhePessoas>(urlRalativa, dados);
        if (data) {
            return data.id;
        }

        return new Error('error ao registar o registro');

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao regirtar o registro');
    }
};

const updateById = async (id: number, dados: IDetalhePessoas): Promise<void | Error> => {
    try {
        const urlRelativa = `/pessoas/${id}`;
        await Api.put(urlRelativa, dados);
    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao atualizar o registro');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelativa = `/pessoas/${id}`;
        await Api.delete(urlRelativa);

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao apagar o registro');
    }
};




export const PessoasServices = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};