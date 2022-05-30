const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const minusBtn = document.querySelector('.minus-btn');
const addBtn = document.querySelector('.add-btn');
const deleteBtn = document.querySelector('.clear-btn');
const widthNum = document.querySelector('.width-num');
const colorInput = document.querySelector('.color-input');


let painting = false;
let penWidth = 10;
let penColor = 'black';


function startPosition(e) {
    painting = true;
    paint(e);
}

function endPostion() {
    painting = false;
    ctx.beginPath();
}

function paint(e) {
    if(!painting) return;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

}
canvas.addEventListener('mousedown',startPosition);
canvas.addEventListener('mouseup',endPostion)
canvas.addEventListener('mousemove',paint)

minusBtn.addEventListener('click',()=>{
    penWidth -= 5;
    if(penWidth < 5) {
        penWidth = 5;
    }
    widthNum.innerHTML = penWidth;
})

addBtn.addEventListener('click',()=>{
    penWidth += 5;
    
    if(penWidth > 50) {
        penWidth = 50;
    }
    widthNum.innerHTML = penWidth;
})

deleteBtn.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

colorInput.addEventListener('change',(e)=>{
    penColor = e.target.value
})