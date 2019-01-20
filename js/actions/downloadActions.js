const getJSONFile = () => {
    const filename = `export-json-${new Date().getTime()}.json`;
    const content = JSON.parse(localStorage.getItem('wallets'));
    const contacts = Object.keys(content).map(c => content[c]);
    const type = 'text/json;charset=utf-8;';
    return downloadFile(filename, JSON.stringify(...contacts), type);
};

const downloadFile = (filename, content, type) => {
    let blob = new Blob([content], {type});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
            let url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};