import usersStore from '../../store/users-store';
import { RenderTable } from '../render-table/render-table';
import './render-buttons.css';

export const renderButtons = (element) => {
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >';
    
    const previewButton = document.createElement('button');
    previewButton.innerHTML = '< Prev';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();

    element.append(previewButton, currentPageLabel, nextButton);

    previewButton.addEventListener('click', async() =>{
        await usersStore.loadPreviousPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        RenderTable(element);
    });

    nextButton.addEventListener('click', async() =>{
        await usersStore.loadNextPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        RenderTable(element);
    });

}