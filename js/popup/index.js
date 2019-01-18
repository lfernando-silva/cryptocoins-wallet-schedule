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

window.onload = () => {
    injectWallets(wallets);
};