import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage:0,
    users: [],
}

const loadNextPage = async() =>{
    const users = await loadUsersByPage(state.currentPage + 1); 
    if(users.length === 0) return;

    //si hay usuarios significa que hay páginas
    state.currentPage++;
    state.users = users;
}

const loadPreviousPage = async() =>{
    if(state.currentPage === 1) return;
    const users = await loadUsersByPage(--state.currentPage); 
    state.users = users;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChange = (updatedUser) =>{
    let wasFound = false;
    state.users = state.users.map(user =>{
        if(user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    //si hay menos de diez usuarios significa que solo hay una página y si tampoco se encontró
    if(state.users.length < 10 && !wasFound){
        state.users.push(updatedUser);
    }

}

const reloadPage = async ()=>{
    const users = await loadUsersByPage(state.currentPage); 
    if(users.length === 0) {
        await loadPreviousPage();
        return;
    };

    //si hay usuarios significa que hay páginas
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users], //Retornamos los usuarios clonados, para que no modifiquen los originales del state desde afuera
    
    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage//al ser primitivo se pasa por valor y no por referencia como los usuarios
}