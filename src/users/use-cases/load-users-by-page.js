import {localhostUserToModel} from '../mappers/localhost-user.mapper'
import { User } from '../models/user';

/**
 * 
 * @param {Number} page 
 * @returns {Promise<Userer[]>}
 */
export const loadUsersByPage = async (page = 1) => {
    //VITE_BASE_URL se obtiene de .env
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    /*const resultPromise = fetch(url);
    resultPromise.then(response =>{
        const dataPromise = response.json();
        dataPromise.then(data =>{
            console.log(data);
        });
    });*/
    const result = await fetch(url);
    const data = await result.json();

    //const users = data.map(userlike => localhostUserToModel(userlike));
    const users = data.map(localhostUserToModel);

    return users;
}