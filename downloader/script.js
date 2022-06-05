const fileInput = document.querySelector("input"),
downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file..."
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    // fetching file an returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createObjURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // passing tempUrl as href value of <a> tag
        // passing filename as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '')
        document.body.appendChild(aTag); // adding <a> tag inside body
        aTag.click(); // clicking <a> tag so the file downloads
        aTag.remove(); // removing <a> tag once file has downloaded
        URL.revokeObjectURL(tempUrl)
        downloadBtn.innerText = "Downloaded File"
    }).catch(() => {
        downloadBtn.innerText = "Downloaded File"
        alert("Failed to download file!")
    })
}