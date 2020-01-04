const fs = require('fs');
const path = require('path');

const Note = require("../../../model/note");
const User = require('../../../model/user');
const { validationResult } = require('express-validator');
exports.noteCreateNote = (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    if(req.files.length === 0) {
        return res.status(422).json({errors: "Note validation failed: files: Path `files` is required."})
    }
    const title = req.body.title;
    const description = req.body.description;

    const note = new Note({
        title: title,
        description: description,
        uploadedby: req.userId
    })

    if(req.files){
        note.files = req.files.map(file => file.path);
    }

    return note.save()
    .then(note =>{
        User.findById(req.userId)
        .then(user =>{
            // user.projects.push(project)
            user.save();
            return note;
        }).then(note =>{
            res.status(201).json({
                message: 'Note successfully Uploaded!',
                note: note
            });
        })
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    });
}

exports.getNotes = (req,res,next) =>{
    const currentPage = parseInt(req.query.page) || 1;
    const perPage =  parseInt(req.query.size) || 10;
    let totalNotes;

    Note.find()
    .countDocuments()
    .then(notesNo =>{
        totalNotes = notesNo;
    })
    .then( ()=>{
        Note.find()
        .sort({date:-1})
        .populate('uploadedby', 'name _id profileImage')
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .then(notes =>{
            res.status(200).json({
                message: 'Fetched notes successfully.',
                notes: notes,
                totalNotes: totalNotes
            });
        })
    })
}

exports.getNote = (req,res,next) =>{
    let noteId = req.params.noteId;
    Note.findById(noteId)
    .populate('uploadedby', 'name _id profileImage')
    .then(note=>{
        res.status(200).json({
            message: 'note fetched successfully.',
            note: note
        });
    })
}
exports.deleteNote = (req,res,next) =>{
    let noteId = req.params.noteId;
    let files;
    Note.findById(noteId)
    .then(note=>{
        files = note.files;
        if(note.uploadedby != req.userId){
            res.status(405).json({
                message: 'You have no permission to delete this note.'
            });
        } else {
            clearFiles(files);
            Note.findByIdAndDelete(noteId)
            .then(bool =>{
                res.status(202).json({
                    message: 'note successfully deleted.'
                });
            })
        }
    })
}

const clearFiles = filePaths => {
    for(let i=0; i<filePaths.length; i++){
        filePath = path.join(__dirname, '..', filePaths[i]);
        fs.unlink(filePath, err => console.log(err));
    }    
};