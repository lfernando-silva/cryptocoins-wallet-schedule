window.onload = () => {
    let pageViewed = localStorage.getItem('pageViewed');
    let wallets = JSON.parse(localStorage.getItem('wallets') || '{}');

    if(!pageViewed){
        localStorage.setItem('pageViewed', 1);
        pageViewed = localStorage.getItem('pageViewed');
    }

    if(Object.keys(wallets).length === 0){
        localStorage.setItem('wallets', JSON.stringify({1: []}));
        wallets = JSON.parse(localStorage.getItem('wallets'));
    }

    injectWallets(wallets[pageViewed]);
    injectPagination(wallets);
};
