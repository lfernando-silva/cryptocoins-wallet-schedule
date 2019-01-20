const maxPerPage = 4;

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

const edit = (wallet) => {
    const pageViewed = localStorage.getItem('pageViewed');
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    wallets[pageViewed] = wallets[pageViewed]
        .map(w => {
            if (w.id === wallet.id) {
                return {...w, ...wallet};
            }
            return w;
        });

    localStorage.setItem('wallets', JSON.stringify(wallets));
    injectWallets(wallets[pageViewed]);
    close();
    return true;
};

const add = (wallet) => {
    const pageViewed = localStorage.getItem('pageViewed');
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    const page = wallets[pageViewed].length < maxPerPage ? pageViewed : pageViewed + 1;

    if (document.getElementById('none-contact')) {
        document.getElementById('none-contact').remove();
    }

    if (wallets[pageViewed].length < maxPerPage) {
        wallet.id = wallet.timestamp;

        wallets[page].push(wallet);

        localStorage.setItem('wallets', JSON.stringify(wallets));

        buildWallet(wallet);
    } else {
        wallets[page + 1] = Array.from({length: 1}).push(wallet);
    }
    close();
    return true;
};

const disableSaveButton = (inputField, saveButton) => {
    if (inputField.childNodes[0].value === '') {
        saveButton.className = `${saveButton.className} disabled`
    } else {
        saveButton.className = `${saveButton.className} `.replace(/disabled/g, '');
    }
    return true;
};

const getNewWalletForm = (wallet) => {
    const formDiv = document.createElement('div');
    formDiv.id = 'new-wallet-div';

    const labelField = getNewWalletInputField({id: 'label-id', placeholder: 'Exrates BTC Wallet'});
    const addressField = getNewWalletInputField({id: 'address-id', placeholder: 'Your wallet address'});
    const cryptoCurrencyField = getNewWalletInputField({id: 'cryptocurrency-id',placeholder: 'BTC, Ethereum, Lunes, etc'});

    labelField.addEventListener('keydown', () => disableSaveButton(labelField, saveButton));
    addressField.addEventListener('keydown', () => disableSaveButton(addressField, saveButton));
    cryptoCurrencyField.addEventListener('keydown', () => disableSaveButton(cryptoCurrencyField, saveButton));

    const {label = null, address = null, cryptocurrency = null, id = null} = wallet || {};

    labelField.childNodes[0].value = label || '';
    addressField.childNodes[0].value = address || '';
    cryptoCurrencyField.childNodes[0].value = cryptocurrency || '';

    const saveButton = getIconButton('fas fa-check', 'btn btn-sm btn-success');
    const cancelButton = getIconButton('fas fa-times', 'btn btn-sm btn-light', {label: 'click', handler: close});
    const closeButton = getIconButton('fas fa-times', 'btn btn-sm btn-info', {label: 'click', handler: close});

    saveButton.id = 'save-button';
    cancelButton.id = 'cancel-button';
    closeButton.id = 'close-button';

    if (id) {
        saveButton.addEventListener('click', () => {
            let label = document.getElementById('label-id').value;
            let address = document.getElementById('address-id').value;
            let cryptocurrency = document.getElementById('cryptocurrency-id').value;

            edit({label, address, cryptocurrency, timestamp: new Date().getTime(), id});
        });
    } else {
        saveButton.className = `${saveButton.className} disabled`;
        saveButton.addEventListener('click', () => {
            let label = document.getElementById('label-id').value;
            let address = document.getElementById('address-id').value;
            let cryptocurrency = document.getElementById('cryptocurrency-id').value;

            add({label, address, cryptocurrency, timestamp: new Date().getTime()})
        });
    }

    injectToolTip(closeButton, 'Cancel');
    injectToolTip(cancelButton, 'Cancel');
    injectToolTip(saveButton, 'Save Current changes');

    const actionButtonsDiv = document.createElement('div');
    actionButtonsDiv.id = 'action-buttons';

    appendMultiple(actionButtonsDiv, [cancelButton, saveButton]);

    appendMultiple(formDiv, [closeButton,labelField,addressField,cryptoCurrencyField,actionButtonsDiv]);

    formDiv.addEventListener('change', () => {
        const label = document.getElementById('label-id').value;
        const address = document.getElementById('address-id').value;
        const cryptocurrency = document.getElementById('cryptocurrency-id').value;

        if (label !== '' && address !== '' && cryptocurrency !== '') {
            saveButton.className = `${saveButton.className} `.replace(/disabled/g, '');
        } else {
            saveButton.className = `${saveButton.className} disabled`;
        }
    });
    return formDiv;
};