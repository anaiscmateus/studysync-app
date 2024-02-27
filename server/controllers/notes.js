// notes.js
import { Note } from "../models/Note.js";
import { User } from "../models/User.js";
import pkg from "mongodb";
const { ObjectID } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

// create a new note
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
      important: req.body.important,
      user: req.user.id,
    });

    res.status(200).send({
      message: "Success!",
      data: note,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "An error occurred", error: err.message });
  }
};

// fetch all notes
export const fetchNotes = async (req, res) => {
  try {
    // fetch all notes
    const notes = await Note.find({ user: req.user.id });

    res.json({ notes: notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// update Note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    note.title = req.body.title;
    note.content = req.body.content;
    note.lastUpdated = Date.now();

    await note.save();

    res.json({ note: note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// mark note as important
export const toggleImportance = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Toggle the importance
    note.important = !note.important;
    note.lastUpdated = Date.now();
    await note.save();

    res.json({ note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete note
export const deleteNote = async (req, res) => {
  try {
    // Find note by ID
    const note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    // Delete note from MDB
    await Note.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting note" });
  }
};
