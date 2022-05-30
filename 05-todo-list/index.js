const input = document.querySelector('.input');
const form = document.querySelector('.form');
const listDiv = document.querySelector('.list');


let list = localStorage.getItem('list');
list = list === null ? [] : JSON.parse(list);
renderList(list);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    list.push({value:input.value,checked:false});
    localStorage.setItem('list',JSON.stringify([...list]));
    renderList(list);
    renderNum(list);
    renderMsg('item added')
    input.value = '';
})

function renderList (list) {
    if(list.length !== 0) {
        listDiv.innerHTML = '';
        list.map(item => {
            renderItem(item);
        })
    }
}

//         // 
function renderItem(item) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <button class="check-box">${ item.checked ? '✔️': '🔲'}</button>  
        <div id='item-content' class=${item.checked ? "done" : ""}>${item.value}</div>
    `
    let checkBtn = itemDiv.querySelector('.check-box');
    let itemContent = itemDiv.querySelector('#item-content')
    checkBtn.addEventListener('click',()=>{
        item.checked = !item.checked;
        localStorage.setItem('list',JSON.stringify([...list]))
        item.checked ? checkBtn.innerHTML = '✔️': checkBtn.innerHTML = '🔲'             
        itemContent.classList.toggle('done');
        renderNum(list);
        item.checked ? renderMsg('item done!') : null;
    })
    listDiv.appendChild(itemDiv);
}

function renderNum(list) {
    const num = document.querySelector('.num');
    let uncheckedList = list.filter(item => item.checked === false);
    num.innerHTML = uncheckedList.length;
}

function renderMsg(msg) {
    const msgPara = document.querySelector('.status-msg');
    msgPara.innerHTML = msg;   
    setTimeout(()=>{
        msgPara.innerHTML = '';
    },1500)
}