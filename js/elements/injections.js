const walletsListTableTbody = document.getElementById('wallet-list-table-tbody');

const injectToolTip = (element, title) => {
    element['data-toggle'] = 'tooltip';
    element['data-placement'] = 'left';
    element.title = title;
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
        injectToolTip(tr, `Click to Copy ${w.label} Address`);

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
};

