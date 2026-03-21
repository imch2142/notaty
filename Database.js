const mongoose = require('mongoose')
const Note = require('./schema/note')

class Database {
    constructor() {
        // this.Url = "mongodb://localhost:27017/notaty"
       this.Url=process.env.MONGODB_URL|| "mongodb://admin:admin123@ac-omivog3-shard-00-00.ybyfsvg.mongodb.net:27017,ac-omivog3-shard-00-01.ybyfsvg.mongodb.net:27017,ac-omivog3-shard-00-02.ybyfsvg.mongodb.net:27017/notaty?ssl=true&replicaSet=atlas-dkz8we-shard-0&authSource=admin&retryWrites=true&w=majority"

       }

    connect() {
        mongoose.connect(this.Url)
            .then(() => {
                console.log("database connected successfully");

            }).catch((err) => {
                console.log("error to connect to database...", err);
            })
    }
    addNote(note) {
        return new Promise((resolve, reject) => {
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();

            let newNote = new Note(note);
            newNote.save().then(doc => {
                resolve(doc);
            })
                .catch((err) => {
                    reject(err);
                })

        })

    }

    getNote() {
        return new Promise((resolve, reject) => {
            Note.find({}).then(data => {
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    getNoteByID(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id).then(data => {
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    getNoteByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            const query = { title: { $regex: new RegExp(noteTitle, 'i') } };
            Note.find(query).then(data => {
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    UpdateNote(note) {
        return new Promise((resolve, reject) => {
            note["updatedDate"] = new Date();
            note.findByIdAndUpdate(note["_id"], note).then(data => {
                console.log(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    deleteNote(id) {
        return new Promise((resolve, reject) => {

            Note.findByIdAndDelete(id).then(data => {
                console.log(data);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}
module.exports = Database
