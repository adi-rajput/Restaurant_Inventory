import axios from 'axios';
import { Item, CreateItemDTO, CreateMovementDTO } from '../types/inventory';

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_URL as string) || '/api',
});

export const getItems = async (): Promise<Item[]> => {
    const response = await api.get('/items');
    return response.data.data;
};

export const createItem = async (data: CreateItemDTO): Promise<Item> => {
    const response = await api.post('/items', { item: data });
    return response.data.data;
};

export const createMovement = async (data: CreateMovementDTO): Promise<void> => {
    await api.post('/movements', { movement: data });
};
