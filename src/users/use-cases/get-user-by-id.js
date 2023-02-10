import {localhostUserToModel} from '../mappers/localhost-user.mapper'
import { User } from '../models/user';

/**
 * 
 * @param {String|Number} id 
 * @returns {Promise<User>}
 */
export const getUsersById = async (id) => {
    //VITE_BASE_URL se obtiene de .env
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const result = await fetch(url);
    const data = await result.json();

    const user = localhostUserToModel(data);
    
    return user;
}