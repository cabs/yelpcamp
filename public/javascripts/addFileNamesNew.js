function previewMultiple(event) {
    const images = document.getElementById("image");
    const number = images.files.length;
    for (i = 0; i < number; i++) {
        const urls = URL.createObjectURL(event.target.files[i]);
        const filenames = event.target.files[i].name;
        document.getElementById("formFile").innerHTML += `<div><img src="${urls}"></div><div>${filenames}</div>`;
    }
}

