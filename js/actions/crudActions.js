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

const remove = (wallet) => {
    const pageViewed = localStorage.getItem('pageViewed');
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    wallets[pageViewed] = wallets[pageViewed].filter(w => w.id !== wallet.id);

    localStorage.setItem('wallets', JSON.stringify(wallets));

    injectWallets(wallets[pageViewed]);
    close();
    return true;
};