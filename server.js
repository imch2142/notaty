const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const Database = require("./Database");
const db = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Serve index.html for any other route (fix for PathError on Render)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


// CRUD API
app.post("/notes", (req, res) => {
    const body = req.body;
    db.addNote(body)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err));
});

app.get("/notes", (req, res) => {
    const { title } = req.query;
    if (title) {
        db.getNoteByTitle(title)
          .then(data => res.send(data))
          .catch(err => res.status(500).send(err));
    } else {
        db.getNote()
          .then(data => res.send(data))
          .catch(err => res.status(500).send(err));
    }
});

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteByID(id)
      .then(data => {
          if (!data) res.status(404).send("Note id does not exist: " + id);
          else res.send(data);
      })
      .catch(err => res.status(500).send(err));
});

app.put('/notes', (req, res) => {
    db.UpdateNote(req.body)
      .then(data => {
          if (!data) res.status(404).send("Note id does not exist");
          else res.send(data);
      })
      .catch(err => res.status(500).send(err));
});

app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.deleteNote(id)
      .then(data => {
          if (!data) res.status(404).send("Note id does not exist: " + id);
          else res.send(data);
      })
      .catch(err => res.status(500).send(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    db.connect();
});
