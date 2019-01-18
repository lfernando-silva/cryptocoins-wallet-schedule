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

const getDetailsButtonElement = (wallet) => {
    const button = document.createElement('button');

    const i = document.createElement('i');
    i.className = 'fas fa-eye';

    button.className = 'btn btn-sm btn-primary';
    button.id = `btn-${wallet.id}`;
    button.appendChild(i);

    button.addEventListener('click', () => {
        alert('details of ' + wallet.label);
    });

    return button;
};

const injectWallets = wallets => {
    const trs = wallets.map(w => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');

        tr.id = w.id;
        tr['data-toggle'] = 'tooltip';
        tr['data-placement'] = 'left';
        tr.title = 'Click to Copy Lunes Wallet Address';

        th.scope = "row";
        th.innerText = w.id;

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

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        walletsListTableTbody.appendChild(tr);
        return tr;
    });
};

window.onload = () => {
    injectWallets(wallets);
};