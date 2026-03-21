function openAddModal() {
    var model = document.getElementById("addNoteModal");
    var closeSpan = document.getElementById("closeAdd");
    var cancelButton = document.getElementById("cancelAddNoteBtn");

    clearAddModel();
    model.style.display = "block";
    closeSpan.onclick = () => {
        model.style.display = "none";

    }
    
    cancelButton.onclick = () => {
        model.style.display = "none";

    }


}

function saveNewNote() {
    var model = document.getElementById("addNoteModal");

    var titleString = document.getElementById("addTitle").value;
    var contentString = document.getElementById("addContent").value;
    if (titleString === "" || contentString === "") {
        document.getElementById("addError").innerHTML = "Title and Content are required!";
        return;
    }
    const noteData = {
        title: titleString,
        content: contentString
    }
    addNote(noteData).then(response => {
        if (response.ok) {
            model.style.display = "none";
            response.json().then(json=>{
                var newNoteId=json['_id'];
                updateNotesTable(newNoteId);
            });

          
        } else {
            response.text().then(err => {
                document.getElementById("addError").innerHTML = err;
            })


        }
    }).catch(err => {
        console.log(err);
        document.getElementById("addError").innerHTML = err;

    })
}
function clearAddModel() {
    var titleString = document.getElementById("addTitle").value = "";
    var contentString = document.getElementById("addContent").value = "";
    document.getElementById("addError").innerHTML = "";

}

function openEditModel(noteId) {
    var model = document.getElementById("editNoteModal");
    var closeSpan = document.getElementById("closeEdit");
    var cancelButton = document.getElementById("cancelEditNoteBtn");

    clearAddModel();
    model.style.display = "block";
    closeSpan.onclick = () => {
        model.style.display = "none";

    }
    cancelButton.onclick = () => {
        model.style.display = "none";

    }
    loadNoteData(noteId);
}

function loadNoteData(noteId) {
    var model=document.getElementById("editNoteModal");
    var noteIdAttribute=document.createAttribute("noteid");
    noteIdAttribute.value=noteId;
    model.setAttributeNode(noteIdAttribute);

    getNoteById(noteId).then(data => {
        document.getElementById("editTitle").value = data["title"];
        document.getElementById("editContent").value = data["content"];


    });

}




function saveEditNote() {
    var model=document.getElementById("editNoteModal");
    const noteId=model.getAttribute("noteid");
    const  titleString = document.getElementById("editTitle").value;
    const  contentString = document.getElementById("editContent").value;
    const noteData = {
        _id:noteId,
        title: titleString,
        content: contentString
    }
    updateNote(noteData).then(response=>{
        if (response.ok) {
            model.style.display = "none";
            updateNotesTable(noteId);
        } else {
            response.text().then(err => {
                document.getElementById("editError").innerHTML = err;
            })


        }
    }).catch(err => {
        console.log(err);
        document.getElementById("editError").innerHTML = err;

    })
}