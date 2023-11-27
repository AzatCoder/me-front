import { PUBLIC_API } from '$env/static/public';

const API_VERSION = '/api/v1';
const API_URL = PUBLIC_API + API_VERSION;

export const MESSAGES_URL = `${API_URL}/messages`;
export const IMAGES_URL = `${API_URL}/images`;
export const imageSrc = (imageName: string) => `${PUBLIC_API}/static/${imageName}`;
