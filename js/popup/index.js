const wallets = [
    {
        id: 1,
        label: "Lunes Wallet",
        cryptocurrency: "Lunes",
        address: "598jrejoiewiojfepfepmqwp932iuj",
        timestamp: new Date().getTime()
    },
    {
        id: 2,
        label: "Lunes NEWC",
        cryptocurrency: "Lunes",
        address: "598crejoiewiojfepfepmqwp932iuj",
        timestamp: new Date().getTime()
    },
    {
        id: 3,
        label: "ETH Chrome",
        cryptocurrency: "Ethereum",
        address: "598jrejoiewiojfepfvpmqwp932iuj",
        timestamp: new Date().getTime()
    },
    {
        id: 4,
        label: "Freebitcoin",
        cryptocurrency: "Bitcoin",
        address: "698jrejoiewiojfepfepmqwp932ixj",
        timestamp: new Date().getTime()
    },
];

const walletsListTableTbody = document.getElementById('wallet-list-table-tbody');

const getIconButton = (iconClassName, buttonClassName) => {
    const button = document.createElement('button');
    const i = document.createElement('i');
    i.className = iconClassName;
    button.className = buttonClassName || 'btn btn-sm btn-primary';
    button.appendChild(i);

    return button;
};

const getDetailsButtonElement = (wallet) => {
    const button = getIconButton('fas fa-eye', 'btn btn-sm btn-info');

    button.id = `btn-${wallet.id}`;

    button.addEventListener('click', () => {
        alert('details of ' + wallet.label);
    });
    return button;
};

const createTableRole = () => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    
    return {tr, th, td1, td2, td3};
};

const injectTableRole = ({tr, th, td1, td2, td3}) => {
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    walletsListTableTbody.appendChild(tr);
};

const injectWallets = wallets => {
    wallets.forEach((w, index) => {
        const {tr, th, td1, td2, td3} = createTableRole();

        tr.id = w.id;
        tr['data-toggle'] = 'tooltip';
        tr['data-placement'] = 'left';
        tr.title = 'Click to Copy Lunes Wallet Address';

        th.scope = "row";
        th.innerText = index + 1;

        td1.innerText = w.label;
        td2.innerText = w.cryptocurrency;
        td3.appendChild(getDetailsButtonElement(w));

        const copyableEvent = () => {
            const input = document.createElement('input');
            input.style.position = 'fixed';
            input.style.opacity = 0;
            input.value = w.address;
            document.body.appendChild(input);
            input.select();
            document.execCommand('Copy');
            document.body.removeChild(input);

            alert('copied');
        };

        th.addEventListener('click', copyableEvent);
        td1.addEventListener('click', copyableEvent);
        td2.addEventListener('click', copyableEvent);

        injectTableRole({tr, th, td1, td2, td3});
    });

    const addButton = getIconButton('fas fa-plus');

    const {tr, th, td1, td2, td3} = createTableRole();
    
    td3.appendChild(addButton);

    injectTableRole({tr, th, td1, td2, td3});
};

window.onload = () => {
    injectWallets(wallets);
};