
const NoteController = require(`../controllers/note.controller`)

module.exports =(app) => {

    // CRRUD

    // Create a note POST method
    app.post(`/api/notes/new`, NoteController.addNote)
    
    // Read all
    app.get(`/api/notes`, NoteController.allNotes)

    // Read one
    app.get(`/api/note/:id`, NoteController.oneNote)

    // Update one
    app.put(`/api/note/:id`, NoteController.updateNote)

    // Delete one
    app.delete(`/api/note/:id`, NoteController.deleteNote)

    // Random
    app.get('/api/notes/random', NoteController.randomNote);
    
}