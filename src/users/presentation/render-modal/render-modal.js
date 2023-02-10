import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../models/user';
import { getUsersById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {};
/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async (id)=>{
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if(!id) return;

    const user = await getUsersById(id);
    setFormValues(user);
}

export const hideModal = ()=>{
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {Userr} user 
 */
const setFormValues = (user)=>{
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;//conservamos el usuario para conservar los valores de los campos que no son modificados 
}

/**
 * 
 * @param {HTMLDListElement} element 
 * @param {(UserLike)=> Promise<void>} callback 
 * @returns 
 */
export const renderModal = (element, callback) =>{
    if(modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.classList.add('modal-container');
    modal.classList.add('hide-modal');

    modal.addEventListener('click', (event)=>{
        if(event.target.classList.contains('modal-container')) 
            hideModal();
    });

    form = modal.querySelector('form');

    form.addEventListener('submit', async (event)=>{
        event.preventDefault();

        const formData = new FormData(form);
        const userLike = {...loadedUser};//clonamos con el operador spread, el elemento para enviar los valores de los campos que no son modificados
        
        //se incopora porque cuando no se marca si está activo, no se incluye en el formData
        if(!form.querySelector('[name="isActive"]').checked){
            formData.append('isActive', 'off');
        }

        //for(const iterator of formData){
        //desestructuramos el iterador
        for(const [key, value] of formData){
            if(key === 'balance'){
                userLike[key] = +value;//convertimos a numero (similar a concat) y usamos la propiedades computadas,
                continue;
            }
            if(key === 'isActive'){
                userLike[key] = (value === 'on')? true: false;
                continue;
            }
            userLike[key] = value;
        }
        
        await callback(userLike);
        hideModal();
    });

    element.append(modal);


}
