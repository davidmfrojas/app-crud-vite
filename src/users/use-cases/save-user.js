import { UserToLocalhostModel } from "../mappers/user-localhost.mapper";
import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 * @return {Promise<Like<User>>}
 */
export const saveUser = async (userLike) => {
    const user = new User(userLike);

    if(!user.firstName || !user.lastName) throw Error('First & Last Name are requerid');

    const userToSave = UserToLocalhostModel(user);

    let userUpdated;

    if(user.id){      
        userUpdated = await updateUser(userToSave);
    }
    else{
        userUpdated = await createUser(userToSave);
    }
    return localhostUserToModel(userUpdated);
}

/**
 * 
 * @param {Like<User>} user 
 * @return {Promise<Like<User>>}
 */
const createUser = async (userLike) => {
    //VITE_BASE_URL se obtiene de .env
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(userLike),
        headers:{
            'Content-Type':'application/json'
        }
    });

    const newUser = await response.json();
    return newUser;
}

/**
 * 
 * @param {Like<User>} user 
 * @return {Promise<Like<User>>}
 */
const updateUser = async (userLike) => {
    //VITE_BASE_URL se obtiene de .env
    const url = `${import.meta.env.VITE_BASE_URL}/users/${userLike.id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(userLike),
        headers:{
            'Content-Type':'application/json'
        }
    });

    const updatedUser = await response.json();
    return updatedUser;
}