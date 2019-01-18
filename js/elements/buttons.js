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
    const descriptionAreaCard = document.createElement('div');
    descriptionAreaCard.className = 'card text-white bg-info mb-3 card-body';
    descriptionAreaCard.id = 'description-area-card';
    descriptionAreaCard.appendChild(getNewWalletForm(wallet));
    return descriptionAreaCard;
};

const getDetailsButtonElement = (wallet) => {
    const button = getIconButton('fas fa-eye', 'btn btn-sm btn-info');

    button.id = `btn-${wallet.id}`;

    button.addEventListener('click', () => {
        close();
        descriptionArea.appendChild(getDescriptionAreaCard(wallet));
    });
    return button;
};

addButton.click('click', () => {
    descriptionArea.appendChild(getDescriptionAreaCard());
});