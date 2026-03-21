const baseUrl = "https://notaty-1.onrender.com";

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)
    });
    return response;

}
async function updateNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData)
    });
    return response;

}

async function deleteNote(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: "DELETE",

    });
    return response;

}

async function getNoteById(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {


    });
    return response.json();

}

async function getNote(noteTitle) {
    let url=`${baseUrl}/notes`
    if (noteTitle){
        url+=`/?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();

}
