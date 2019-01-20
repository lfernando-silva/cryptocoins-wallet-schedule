const descriptionArea = document.getElementById('description-area');
const addButton = document.getElementById('add-button');

const getIconButton = (iconClassName, buttonClassName, event) => {
    const button = document.createElement('button');
    const i = document.createElement('i');
    i.className = iconClassName;
    button.className = buttonClassName || 'btn btn-sm btn-primary';
    button.appendChild(i);

    if(event){
        button.addEventListener(event.label, event.handler);
    }

    return button;
};

const getDescriptionAreaCard = (wallet) => {
    close();
    const descriptionAreaCard = document.createElement('div');
    descriptionAreaCard.className = 'card text-white bg-info mb-3 card-body';
    descriptionAreaCard.id = 'description-area-card';
    descriptionAreaCard.appendChild(getNewWalletForm(wallet));
    return descriptionAreaCard;
};

const getDetailsButtonElement = (wallet) => {
    const button = getIconButton('fas fa-eye', 'btn btn-sm btn-info');
    button.id = `btn-${wallet.id}`;
    button.addEventListener('click', () => descriptionArea.appendChild(getDescriptionAreaCard(wallet)));
    injectToolTip(button, `Details of ${wallet.label}`);
    return button;
};

const getRemoveButtonElement = (wallet) => {
    const button = getIconButton('fa fa-trash', 'btn btn-sm btn-danger');
    button.id = `btn-remove`;
    button.addEventListener('click', () => remove(wallet));
    injectToolTip(button, `Remove ${wallet.label}`);
    return button;
};

addButton.addEventListener('click', () => descriptionArea.appendChild(getDescriptionAreaCard()));