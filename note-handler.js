function updateNotesTable(noteId, noteTitle) {
    const table = document.getElementById("notes-table");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = ""; // مسح كل الصفوف

    getNote(noteTitle).then(data => {
        data.forEach(note => {
            const row = tbody.insertRow();
            row.id = note._id;

            row.insertCell(0).innerText = note.title;
            row.insertCell(1).innerText = note.content;
            row.insertCell(2).innerText = note.updatedDate;
            row.insertCell(3).innerHTML = `
                <a onclick="openEditModel('${note._id}')" href="#">
                    <img src="images/edit.png" style="width:22px;">
                </a>
                <a onclick="confirmDeleteNote('${note._id}')" href="#">
                    <img src="images/delete.png" style="width:22px;">
                </a>
            `;
        });

        // تمييز الصف الجديد أو المعدل
        if (noteId) {
            const row = document.getElementById(noteId);
            if (row) row.style.animation = "new-row 5s";
        }
    }).catch(err => console.error(err));
}


function searchNotes(){
    const searchTitle=document.getElementById("searchInput").value;
    updateNotesTable(undefined,searchTitle);


}


function confirmDeleteNote(noteId){
    var action=confirm("Are you sure you want to delete this note?");

    if(action==true){
        deleteNote(noteId).then(()=>{
            updateNotesTable();
        })
    }

}
