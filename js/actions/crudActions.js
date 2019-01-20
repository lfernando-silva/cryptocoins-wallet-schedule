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
    const pageViewed = Number(localStorage.getItem('pageViewed'));
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    const page = wallets[pageViewed].length < maxPerPage ? pageViewed : pageViewed + 1;

    if (document.getElementById('none-contact')) {
        document.getElementById('none-contact').remove();
    }

    wallet.id = wallet.timestamp;

    if (wallets[pageViewed].length < maxPerPage) {
        wallets[page].push(wallet);
        localStorage.setItem('wallets', JSON.stringify(wallets));
        buildWallet(wallet);
    } else {
        wallets[page] = [wallet];
        localStorage.setItem('wallets', JSON.stringify(wallets));
        injectWallets(wallets[page]);
        injectPagination(wallets);
    }
    close();
    return true;
};

const remove = (wallet) => {
    let pageViewed = Number(localStorage.getItem('pageViewed'));
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    wallets[pageViewed] = wallets[pageViewed].filter(w => w.id !== wallet.id);

    if(wallets[pageViewed].length === 0){
        delete wallets[pageViewed];

        localStorage.setItem('pageViewed', pageViewed - 1 < 1 ? 1 : pageViewed - 1);
        pageViewed = localStorage.getItem('pageViewed');

        localStorage.setItem('wallets', JSON.stringify(wallets));
        injectWallets(wallets[pageViewed]);
        injectPagination(wallets);
    } else {
        localStorage.setItem('wallets', JSON.stringify(wallets));
        injectWallets(wallets[pageViewed]);
    }

    close();
    return true;
};