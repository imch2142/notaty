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
    const model = document.getElementById("editNoteModal");
    model.style.display = "block";
    clearEditModal(); // مسح القيم القديمة

    loadNoteData(noteId);
}


function loadNoteData(noteId) {
    const model = document.getElementById("editNoteModal");
    model.setAttribute("noteid", noteId);

    getNoteById(noteId)
        .then(data => {
            if (data && data._id) { // تأكد من وجود البيانات
                document.getElementById("editTitle").value = data.title;
                document.getElementById("editContent").value = data.content;
            } else {
                document.getElementById("editError").innerText = "Failed to load note data!";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("editError").innerText = err;
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
