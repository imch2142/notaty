function updateNotesTable(noteId, noteTitle) {
    const tbody = document.getElementById("notes-table").querySelector("tbody");
    tbody.innerHTML = ""; // يفرغ الجدول

    getNote(noteTitle).then(data => {
        data.forEach(note => {
            const row = tbody.insertRow();
            row.id = note['_id'];

            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerText = note.title;
            cell2.innerText = note.content;
            cell3.innerText = note.updatedDate;
            cell4.innerHTML = `
                <a onclick="openEditModel('${note._id}')" href="#">
                    <img src="images/edit.png" style="width:22px;">
                </a>
                <a onclick="confirmDeleteNote('${note._id}')" href="#">
                    <img src="images/delete.png" style="width:22px;">
                </a>
            `;
        });
    }).then(() => {
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
