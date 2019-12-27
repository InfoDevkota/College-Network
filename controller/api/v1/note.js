const fs = require('fs');
const path = require('path');

const Note = require("../../../model/note");
const User = require('../../../model/user');

exports.postCreateNote = (req,res,next) =>{
    const title = req.body.title;
    const description = req.boxy.description;

    const note = new Note({
        title: title,
        description: description,
        uploadedby: req.userId
    })

    if(req.file){
        note.file = req.file.path;
    }

    return note.save()
    .then(note =>{
        res.status(201).json({
            message: 'Note successfully Uploaded!',
            note: note
        });
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
    .populate('uploadedby', 'name _id')
    .then(note=>{
        res.status(200).json({
            message: 'note fetched successfully.',
            note: note
        });
    })
}