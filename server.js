const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const Database = require("./Database");
const db = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//create post api 
app.post("/notes", (req, res) => {
    const body = req.body;
    console.log("body:", body);
    db.addNote(body).then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500);
    });

});


app.get("/notes", (req, res) => {
    const {title}=req.query;
    if (title){
        db.getNoteByTitle(title).then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err);
    }) 
    }else{
         db.getNote().then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send(err);
    })
    }
   
})

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteByID(id).then(data => {
        if (!data) {
            res.status(404).send("Note id dos not exist  "+id);

        }
        else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
})


app.put('/notes', (req, res) => {
   
    db.UpdateNote(req.body).then(data => {
        if (!data) {
            res.status(404).send("Note id dos not exist  " +id);

        }
        else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id).then(data => {
        if (!data) {
            res.status(404).send("Note id dos not exist  "+id);

        }
        else {
            res.send(data);
        }
    }).catch((err) => {
        res.status(500).send(err);
    })
})

port = process.env.PORT|| 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    db.connect()
});