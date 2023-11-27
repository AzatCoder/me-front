import { http } from '$lib';
import type { IAPIImages, IAPIMessageInput } from '../types';
import { IMAGES_URL, MESSAGES_URL } from './urls';

export const getImages = () => http.get<IAPIImages>(IMAGES_URL);
export const sendMessage = (body: IAPIMessageInput) => http.post(MESSAGES_URL, body);
