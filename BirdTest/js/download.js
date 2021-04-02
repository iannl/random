function download(filename, text, type) {
    var createDl = document.createElement('a');
    createDl.setAttribute('href', 'data:'+type+';charset=utf-8,' + encodeURIComponent(text));
    createDl.setAttribute('download', filename);
    createDl.style.display = 'none';
    document.body.appendChild(createDl);
    createDl.click();
    document.body.removeChild(createDl);
}