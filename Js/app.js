console.log("hi, we are at tutorial 21");
showNotes();

// Function to add Notes
let addBtn = document.getElementById("addBtn");

// on clicking Add Note button notes will be added.
addBtn.addEventListener("click", function (e) {

  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  // if there is no note
  if (notes == null) {
    notesObj = [];
  }
  // if there is any note then add it in the array of the notes by converting the notes string into object.
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);

  // Store the notes in the localstorage.
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = ""; // making the textarea empty so that it can be filled again.
  console.log(notesObj);
  showNotes();
});


// Function to show the notes you added.
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }

  let html = "";

  // Printing each and every note by traversing the array of notes.
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">Note ${index + 1}</h5>
    <p class="card-text">${element}</p>
    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm btn-outline-danger">Delete Note</button>
  </div>
</div>
    `;
  });
  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  }
  else {
    notesElement.innerHTML = `<p class="text-danger">Nothing to show! Use "Add a Note" section above to add notes.</p>`;
  }
};

// Function to delete a note

function deleteNote(index){
  console.log("i m deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1); // used to delete the one element from the notes array
   // inserting the updated notes array in the localstorage
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// function to search a note using search bar.
let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){

  let inputVal = search.value.toLowerCase(); // so that we can search by capita letter also.
  var noteCards = document.getElementsByClassName("noteCard");

  // if note includes the search text then show it and hide others.
  Array.from(noteCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if(cardTxt.includes(inputVal)){
      element.style.display = "block";
    }
    else{
      element.style.display = "none";
    }
  })

})

/* Further Features
1. Add Title.
2. Mark a Note as Important.
3. Seperate notes by users.

*/