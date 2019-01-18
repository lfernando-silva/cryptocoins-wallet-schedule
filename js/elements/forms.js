const getNewWalletInputField = ({id, type, placeholder}) => {
    const div = document.createElement('div');
    const input = document.createElement('input');

    div.className = 'form-group';

    input.id = id;
    input.type = type || 'text';
    input.className = 'form-control';
    input.placeholder = placeholder;

    div.appendChild(input);

    return div;
};

const close = () => {
    const newWalletDiv = document.getElementById('new-wallet-div');

    if (newWalletDiv) {
        newWalletDiv.remove();
        document.getElementById('description-area-card').remove();
    }
};

const getNewWalletForm = (wallet) => {
    const formDiv = document.createElement('div');
    formDiv.id = 'new-wallet-div';

    const labelField = getNewWalletInputField({id: 'label-id', placeholder: 'Exrates BTC Wallet'});
    const addressField = getNewWalletInputField({id: 'address-id', placeholder: 'Your wallet address'});
    const cryptoCurrencyField = getNewWalletInputField({id: 'cryptocurrency-id', placeholder: 'BTC, Ethereum, Lunes, etc'});

    const {label, address, cryptocurrency } = wallet;

    labelField.childNodes[0].value = label || '';
    addressField.childNodes[0].value = address || '';
    cryptoCurrencyField.childNodes[0].value = cryptocurrency || '';

    const saveButton = getIconButton('fas fa-check', 'btn btn-sm btn-success');
    const cancelButton = getIconButton('fas fa-times', 'btn btn-sm btn-light', {label: 'click', handler: close});
    const closeButton = getIconButton('fas fa-times', 'btn btn-sm btn-info', {label: 'click', handler: close});

    saveButton.id = 'save-button';
    cancelButton.id = 'cancel-button';
    closeButton.id = 'close-button';

    injectToolTip(closeButton, 'Cancel');
    injectToolTip(cancelButton, 'Cancel');
    injectToolTip(saveButton, 'Save Current changes');

    const actionButtonsDiv = document.createElement('div');
    actionButtonsDiv.id = 'action-buttons';
    actionButtonsDiv.appendChild(cancelButton);
    actionButtonsDiv.appendChild(saveButton);

    formDiv.appendChild(closeButton);
    formDiv.appendChild(labelField);
    formDiv.appendChild(addressField);
    formDiv.appendChild(cryptoCurrencyField);
    formDiv.appendChild(actionButtonsDiv);

    return formDiv;
};