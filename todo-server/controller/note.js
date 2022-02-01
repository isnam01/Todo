const Note = require("../models/note");

module.exports.postNote = async (req, res) => {
    console.log(req.body,"dataaa")
  const { title, note } = req.body;
  const newNote = new Note({
    title: title,
    note: note,
    lastModified: Date.now(),
    createdBy: req.user,
  });
  newNote
    .save()
    .then((note) => {
      return res.status(200).json({ message: "Note created Successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getNote = async (req, res) => {
  Note.find({ createdBy: req.user })
    .then((notes) => {
      return res.status(200).json({ notes: notes });
    })
    .catch((err) => {
      console.log(err);
    });
};
