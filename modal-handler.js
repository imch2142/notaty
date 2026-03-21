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
    const model = document.getElementById("addNoteModal");
    const title = document.getElementById("addTitle").value.trim();
    const content = document.getElementById("addContent").value.trim();

    if (!title || !content) {
        document.getElementById("addError").innerText = "Title and Content are required!";
        return;
    }

    addNote({ title, content }).then(response => {
        if (response.ok) {
            model.style.display = "none";
            // إعادة تحميل الجدول بالكامل
            updateNotesTable(); 
        } else {
            response.text().then(err => document.getElementById("addError").innerText = err);
        }
    }).catch(err => {
        console.error(err);
        document.getElementById("addError").innerText = err;
    });
}

function clearAddModel() {
    var titleString = document.getElementById("addTitle").value = "";
    var contentString = document.getElementById("addContent").value = "";
    document.getElementById("addError").innerHTML = "";

}
function clearEditModal() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editContent").value = "";
    document.getElementById("editError").innerHTML = "";
}


function openEditModel(noteId) {
    var model = document.getElementById("editNoteModal");
    var closeSpan = document.getElementById("closeEdit");
    var cancelButton = document.getElementById("cancelEditNoteBtn");

    clearEditModal();
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
    const model = document.getElementById("editNoteModal");
    const noteId = model.getAttribute("noteid");
    const title = document.getElementById("editTitle").value.trim();
    const content = document.getElementById("editContent").value.trim();

    if (!title || !content) {
        document.getElementById("editError").innerText = "Title and Content are required!";
        return;
    }

    updateNote({ _id: noteId, title, content }).then(response => {
        if (response.ok) {
            model.style.display = "none";
            updateNotesTable(); // إعادة تحميل الجدول
        } else {
            response.text().then(err => document.getElementById("editError").innerText = err);
        }
    }).catch(err => {
        console.error(err);
        document.getElementById("editError").innerText = err;
    });
}
