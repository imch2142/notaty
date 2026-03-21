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
     const title = document.getElementById("addTitle").value.trim();
    const content = document.getElementById("addContent").value.trim();
    if (!title || !content) return;

    addNote({ title, content }).then(res => {
        if (res.ok) {
            res.json().then(note => {
                updateNotesTable(note._id); // عرض الجدول مع تمييز الملاحظة الجديدة
                document.getElementById("addNoteModal").style.display = "none";
                clearAddModel();
            });
        }
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

    updateNote({ _id: noteId, title, content }).then(res => {
        if (res.ok) {
            updateNotesTable(noteId); // عرض الجدول مع تمييز الملاحظة المعدلة
            model.style.display = "none";
            clearEditModal();
        }
    });
}
