 walletsListTableTbody = document.getElementById('wallet-list-table-tbody');
const paginationUl = document.getElementById('pagination-ul');
let numberOfPages = null;

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

    if (!wallets || wallets.length === 0) {
        const trNone = document.createElement('tr');
        const tdNone = document.createElement('td');
        trNone.id = 'none-contact';
        tdNone.colSpan = '5';
        tdNone.innerText = 'No contact yet. Click on \"+\" to add one!';
        trNone.appendChild(tdNone);
        walletsListTableTbody.appendChild(trNone);
        return true;
    }

    while (walletsListTableTbody.firstChild) {
        walletsListTableTbody.removeChild(walletsListTableTbody.firstChild);
    }

    wallets.forEach(w => {
        const {tr, th, td1, td2, td3} = createTableRole();

        tr.id = w.id;
        injectToolTip(tr, `Click to Copy ${w.label} Address`);

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

        injectTableRole({tr, th, td1, td2, td3});
    });
};

const getExtremityPaginateButton = (ariaLabel, innerText) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const spanAriaHidden = document.createElement('span');
    const spanSrOnly = document.createElement('span');

    li.className = 'page-item';
    a.className = 'page-link';
    a.href = '#';
    a.setAttribute('aria-label', ariaLabel);
    spanAriaHidden.setAttribute('aria-hidden', true);
    spanAriaHidden.innerText = innerText;
    spanSrOnly.className = 'sr-only';
    spanSrOnly.innerText = ariaLabel;

    a.appendChild(spanAriaHidden);
    a.appendChild(spanSrOnly);
    li.appendChild(a);

    return li;
};

const previous = getExtremityPaginateButton('Previous', '<<');
const next = getExtremityPaginateButton('Next', '>>');

const injectPagination = wallets => {
    numberOfPages = Object.keys(wallets).length;

    const pageViewed = Number(localStorage.getItem('pageViewed'));

    if (pageViewed === 1) {
        previous.className = `${previous.className} disabled`;
    }

    if(pageViewed === numberOfPages){
        next.className = `${next.className} disabled`;
    }

    previous.addEventListener('click', () => {
        const pageViewed = Number(localStorage.getItem('pageViewed'));
        if (pageViewed === 1) {
            previous.className = `${previous.className} disabled`;
            next.className = `${next.className}`.replace('disabled', '');
        } else {
            const page = pageViewed - 1;
            previous.className = `${previous.className}`.replace('disabled', '');
            next.className = `${next.className}`.replace('disabled', '');
            localStorage.setItem('pageViewed', page);

            if(page === 1){
                previous.className = `${previous.className} disabled`;
                next.className = `${next.className}`.replace('disabled', '');
            }

            injectWallets(wallets[page]);
        }
    });

    next.addEventListener('click', () => {
        const pageViewed = Number(localStorage.getItem('pageViewed'));
        if(pageViewed === numberOfPages){
            next.className = `${next.className} disabled`;
            previous.className = `${previous.className}`.replace('disabled', '');
        } else {
            const page = pageViewed + 1;
            previous.className = `${previous.className}`.replace('disabled', '');
            next.className = `${next.className}`.replace('disabled', '');
            localStorage.setItem('pageViewed', page);

            if(page === numberOfPages){
                previous.className = `${previous.className}`.replace('disabled', '');
                next.className = `${next.className} disabled`;
            }

            injectWallets(wallets[page]);
        }
    });

    paginationUl.appendChild(previous);
    paginationUl.appendChild(next);
};
