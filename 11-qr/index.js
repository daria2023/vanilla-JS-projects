const geneForm = document.querySelector('.generate-form');
const geneInput = document.querySelector('.generate-input');
const geneImg = document.querySelector('.gene-img');
const geneQr = document.querySelector('.gene-qr');
const geneBtn = document.querySelector('.generate-btn');

geneForm.addEventListener('submit', e => {
    e.preventDefault();
    if(!geneInput.value) return;
    geneBtn.innerHTML = 'generating qr...'
    geneImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${geneInput.value}`;
    geneImg.addEventListener('load',()=>{
        geneQr.classList.add('show');
        geneBtn.innerHTML = 'generate QR' ;
    })
})


const readForm = document.querySelector('.read-form');
const readInput = document.querySelector('.read-input');
const readImg = document.querySelector('.read-img');
const readQr = document.querySelector('.read-qr');
const textArea = document.querySelector('.textarea');

async function fetchRequest(formData,file) {
    try {
    const res = await fetch('https://api.qrserver.com/v1/read-qr-code/' , {
        method:'POST',body:formData
        });
    const data = await res.json();
    readQr.classList.add('show');
    readImg.src = URL.createObjectURL(file)
    textArea.innerHTML = (data[0].symbol[0].data);
        
    } catch (error) {
        console.log(error);
    }
   
}
readQr.querySelector('.close').addEventListener('click',()=> readQr.classList.remove('show'));
readQr.querySelector('.copy').addEventListener('click',()=> {
    navigator.clipboard.writeText(textArea.innerHTML);
});



readForm.addEventListener('click',()=>readInput.click());

readInput.addEventListener('change',(e) => {
    let file  =(e.target.files[0]);
    let formData = new FormData();
    formData.append('file',file);
    fetchRequest(formData,file);
})
