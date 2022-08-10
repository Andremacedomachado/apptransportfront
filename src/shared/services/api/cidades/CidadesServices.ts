import { Api } from '../axios-config';

import { Environmenrt } from '../../../environments';

export interface IListagemCidades {
    id: number;
    nome: string,
}

export interface IDetalheCidades {
    id: number;
    nome: string,
}

type ICidadesComTotalCount = {
    data: IListagemCidades[],
    totalCount: number,
}


const getAll = async (page = 1, filter = ''): Promise<ICidadesComTotalCount | Error> => {
    try {
        const urlRelativa = `/cidades?_page=${page}&_limit=${Environmenrt.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IListagemCidades | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;
        const { data } = await Api.get(urlRelativa);
        if (data) {
            return data;
        }

        return new Error('error ao listar o registro');

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao listar o registro');
    }
};

const create = async (dados: Omit<IDetalheCidades, 'id'>): Promise<number | Error> => {
    try {
        const urlRalativa = '/cidades';
        const { data } = await Api.post<IDetalheCidades>(urlRalativa, dados);
        if (data) {
            return data.id;
        }

        return new Error('error ao registar o registro');

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao regirtar o registro');
    }
};

const updateById = async (id: number, dados: IDetalheCidades): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;
        await Api.put(urlRelativa, dados);
    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao atualizar o registro');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const urlRelativa = `/cidades/${id}`;
        await Api.delete(urlRelativa);

    } catch (error) {
        return new Error((error as { message: string }).message || 'error ao apagar o registro');
    }
};


export const CidadesServices = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};