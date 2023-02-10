import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { RenderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";

export const UsersApp = async (element) =>{
    element.innerHTML = 'Loading....';

    /*const loadUsersPromise = usersStore.loadNextPage();
    loadUsersPromise.then(()=>{
        console.log(usersStore.getUsers());
    });*/

    await usersStore.loadNextPage();
    element.innerHTML = '';
    RenderTable(element);
    renderButtons(element);
    renderAddButton(element);
    renderModal(element, async (userLike) =>{
        const user = await saveUser(userLike);
        usersStore.onUserChange(user);
        RenderTable();
    });
}