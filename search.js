const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search');
const foundArea = document.getElementById('foundArea')

searchForm.onsubmit=(e)=>{
    e.preventDefault();
    const notes = getStorageNotes();
    const term = searchInput.value;
    const foundNotes = notes.filter((n) => (n.title.includes(term) || n.text.includes(term)))
   for (let i = 0; i < foundNotes.length; i++) {
       const f = foundNotes[i];
       display(f);
   }
   showNoCards() 
}
function showNoCards(){
    const cards = [];
  cardsArea.innerHTML = cards.join('');
}


function display(note) {
    const li = document.createElement('li') //crea las etiquetas <li> </li>
    li.innerHTML = ` 
    <div class="card col-auto mx-auto my-4 justify-content-center" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <p class="card-text">${note.text}</p>
      </div>
    </div>
    `;
   foundArea.appendChild(li); //appendchild añade el valor de li, sin sobreescribir lo anterior
   console.log(note);
}

function clearSearch() {
   showCards();
   const cards = [];
   foundArea.innerHTML = cards.join('');
}

