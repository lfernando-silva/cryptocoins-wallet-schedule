/*const wallets = {
    1: [
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
    ],
    2: [
        {
            id: 5,
            label: "Lunes Wallet",
            cryptocurrency: "Lunes",
            address: "598jrejoiewiojfepfepmqwp932iuj",
            timestamp: new Date().getTime()
        },
        {
            id: 6,
            label: "Lunes NEWC",
            cryptocurrency: "Lunes",
            address: "598crejoiewiojfepfepmqwp932iuj",
            timestamp: new Date().getTime()
        },
        {
            id: 7,
            label: "ETH Chrome",
            cryptocurrency: "Ethereum",
            address: "598jrejoiewiojfepfvpmqwp932iuj",
            timestamp: new Date().getTime()
        },
        {
            id: 8,
            label: "Freebitcoin",
            cryptocurrency: "Bitcoin",
            address: "698jrejoiewiojfepfepmqwp932ixj",
            timestamp: new Date().getTime()
        },
    ],
    3: [
        {
            id: 9,
            label: "ETH Chrome",
            cryptocurrency: "Ethereum",
            address: "598jrejoiewiojfepfvpmqwp932iuj",
            timestamp: new Date().getTime()
        },
        {
            id: 10,
            label: "Freebitcoin",
            cryptocurrency: "Bitcoin",
            address: "698jrejoiewiojfepfepmqwp932ixj",
            timestamp: new Date().getTime()
        },
        {
            id: 11,
            label: "ETH Chrome",
            cryptocurrency: "Ethereum",
            address: "598jrejoiewiojfepfvpmqwp932iuj",
            timestamp: new Date().getTime()
        },
        {
            id: 12,
            label: "Freebitcoin",
            cryptocurrency: "Bitcoin",
            address: "698jrejoiewiojfepfepmqwp932ixj",
            timestamp: new Date().getTime()
        },
    ],
    4: [
        {
            id: 13,
            label: "ETH Chrome",
            cryptocurrency: "Ethereum",
            address: "598jrejoiewiojfepfvpmqwp932iuj",
            timestamp: new Date().getTime()
        },
    ]
};*/

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
