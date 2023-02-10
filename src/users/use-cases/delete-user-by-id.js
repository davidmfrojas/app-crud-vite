import { User } from "../models/user";

/**
 * 
 * @param {String|Number} id 
 * @return {Promise<Like<User>>}
 */
export const deleteUserById = async (id) => {
    //VITE_BASE_URL se obtiene de .env
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });

    const deleteResult = await response.json();
    console.log({deleteResult});
    return true;
}