const container = document.querySelector('.container');
const addBtn = document.querySelector('.add-btn');

let notes = JSON.parse(localStorage.getItem('notes'));
renderNotes();

addBtn.addEventListener('click', ()=>addNote())

function addNote(textareaContent='') {
    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
            <div class="tools">
                <button class="btn edit-btn" >Md</button>
                <button class="btn delete-btn">🗑️</button>
            </div>
            <div class="content">
                <textarea class="input"></textarea>
                <div class="note-md"></div>
            </div>           
    `

    const editBtn = noteDiv.querySelector('.edit-btn');
    const deleteBtn = noteDiv.querySelector('.delete-btn');
    const input = noteDiv.querySelector('.input');
    const output = noteDiv.querySelector('.note-md');

    input.value = textareaContent;

    editBtn.addEventListener('click',()=>{      
        output.classList.toggle('show');
        output.innerHTML = '';
        output.innerHTML = marked.parse(input.value);
        changeNotes();
    });
    

    deleteBtn.addEventListener('click',()=>{
        container.removeChild(noteDiv);
        changeNotes();
    })
    container.appendChild(noteDiv);
    
}

function renderNotes () {
   
    if(notes) {
        notes.map( note => {
            addNote(note);
        })
    }
}


function changeNotes() {
    const allContents = document.querySelectorAll('textarea');
    let notes = [];
    allContents.forEach(content => {
        notes.push(content.value);
    })
    localStorage.setItem('notes',JSON.stringify(notes))
}