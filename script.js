const formNote = document.getElementById('formNote');
const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const cardsArea = document.getElementById('cardsArea');
const cardInput = document.getElementById('card');
const noteTitle = document.getElementById('noteTitle');
const noteText = document.getElementById('noteText');
const globalID ='';

const getStorageNotes = () => JSON.parse(localStorage.getItem('notes'))   || [] 

var gernerateID = function(){
  return '_' + Math.random().toString(36).substr(2, 9);  
}

function showCards(){
  const notes = JSON.parse(localStorage.getItem('notes'))   || [] 
  const cards = [];
for (let i = 0; i < notes.length ; i++){   
  const note = notes[i];
  const card =  `
  <div class="card col-auto mx-auto my-4 justify-content-center" style="width: 18rem;">
 
    <div class="card-body">
      <h5 class="card-title">${note.title}</h5>
      <p class="card-text">${note.text}</p>

      <div class="text-center">
      <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteNote('${note.id}')">Borrar</button>
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick="modalEdit('${note.id}')" >
Editar
</button>
    </div>
    </div>
  </div>
  `;
  cards.push(card);
}
cardsArea.innerHTML = cards.join('');
}

formNote.onsubmit = (e) => {
    e.preventDefault();
    const notes = getStorageNotes();
    const title = titleInput.value;
    const text = textInput.value;

    notes.push({ title,text, id: gernerateID()});
    
    localStorage.setItem('notes', JSON.stringify(notes));
    console.log(notes)
    showCards();
    formNote.reset();
 

}

function deleteNote(ID){
  const notes = getStorageNotes();
  const nonDeletedNotes = notes.filter(n => n.id !== ID);
  localStorage.setItem('notes', JSON.stringify(nonDeletedNotes));
  showCards()
}

function editNote(id){
  const notes = getStorageNotes();
  const title = noteTitle.value;
  const text = noteText.value;
  const editedNotes = notes.map((n) => (n.id == id) ? {...n, title, text } : n);
  localStorage.setItem('notes', JSON.stringify(editedNotes));
  showCards()
  $('#exampleModal').modal('hide')
  }



const modalEdit = (ID) =>{

    const notes = getStorageNotes();
  
    const note = notes.find((u) => u.id === ID);
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteText').value = note.text;
    document.getElementById('editButtons').innerHTML = `
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar sin guardar</button>
      <button type="submit" class="btn btn-primary" onclick="editNote('${note.id}')" >Editar</button>
      `


}
showCards();

