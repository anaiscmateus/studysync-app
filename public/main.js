var trash = document.getElementsByClassName("trash");
var pen = document.getElementsByClassName("pen");
const add = document.querySelector('#add')
add.addEventListener('click', addNote)

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function() {
      const date = this.parentNode.parentNode.childNodes[1].innerText
      const noteTitle = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].innerText
      const notes = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].innerText

        fetch('dashboard', {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'date': date,
              'noteTitle': noteTitle,
              'notes': notes,
            })
          }).then(function (response) {
            window.location.reload()
          })
    })
})

function addNote() {
  const noteTitle = document.querySelector('#noteTitle').value
  const notes = document.querySelector('#notes').value
  
  fetch('add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'noteTitle': noteTitle,
      'notes': notes,
    })
  }).then(function (response) {
    window.location.reload()
  })
}


// ... (your existing code)

Array.from(pen).forEach(function(element) {
  element.addEventListener('click', function(event) {
    const noteTitle = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]
    const notes = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3]
    editNotes(noteTitle, notes, event)
  })
})

function editNotes(noteTitle, notes, event) {
  const updateButton = '<button id="update" class="ml-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7"><path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" /></svg></button>'
  document.querySelector('#add').insertAdjacentHTML('afterend', updateButton) 

  const title = noteTitle.innerText
  const text = notes.innerText

  document.querySelector('#noteTitle').value = title
  document.querySelector('#notes').value = text

  // Corrected event listener addition
  document.querySelector('#update').addEventListener('click', function() {
    updateNote(title, text);
  });
}

function updateNote(oldTitle, oldNotes) {
  const newNoteTitle = document.querySelector('#noteTitle').value
  const newNotes = document.querySelector('#notes').value
  
  fetch('update', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'oldTitle': oldTitle,
      'oldNotes': oldNotes,
      'newNoteTitle': newNoteTitle,
      'newNotes': newNotes,
    })
  }).then(function (response) {
    window.location.reload()
  })
}
