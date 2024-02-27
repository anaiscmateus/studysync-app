// notes.js
import express from "express";
import {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
  toggleImportance,
} from "../controllers/notes.js";

const router = express.Router();

// CREATE
router.post("/notes", createNote);

// READ
router.get("/notes", fetchNotes);

// UPDATE
router.put("/notes/:id/update", updateNote);

// MARK NOTE
router.put("/notes/:id/toggle", toggleImportance);

// DELETE
router.delete("/notes/:id/delete", deleteNote);

export { router };
