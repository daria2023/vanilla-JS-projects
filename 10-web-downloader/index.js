const form = document.querySelector('.form');
const input= document.querySelector('.form-input');
const btn = document.querySelector('.submit-btn');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    btn.innerHTML = 'downloading file...'
    fetchFile(input.value);
})

async function fetchFile (url) {
   
    try {
        const response = await fetch(url);
        const file = await response.blob();
        const fileUrl = URL.createObjectURL(file);

        const aLink = document.createElement('a');
        aLink.href = fileUrl;
        aLink.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aLink);
        aLink.click();
        aLink.remove();
        URL.revokeObjectURL(fileUrl);
        btn.innerHTML = 'download file'
    } catch (error) {
        console.log(error);
        btn.innerHTML = 'download file'
    }
}