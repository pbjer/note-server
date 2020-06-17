import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db/connect';
import * as q from '../db/queries';
import {
  validateToken,
  validateReqBody
} from '../middleware/validate';

const notes = express.Router();

notes.post('/:userId/note',
  validateToken,
  validateReqBody,
  async(req, res) => {
    const { userId } = req.params;
    const { title, body } = req.body;
    const values = [ userId, uuidv4(), title, body ];
    try {
      const response = await pool.query(q.insertNote, values);
      res.status(200).json({
        userId: values[0],
        id: values[1],
        title: values[2],
        body: values[3]
      });
    } catch(e) {
      console.log(e, 'Error inserting into notes');
      res.status(500).json({ error: 'Error inserting into notes' });
    }
});

notes.get('/:userId/note/:id',
  validateToken,
  async(req, res) => {
    const { userId, id } = req.params;
    try {
      const response = await pool.query(q.getOneNote, [ userId, id ]);
      if (response.rows.length === 0) {
        res.status(404).json({
          error: `'Note not found'`,
          userId,
          id
        });
      }
      res.status(200).json(response.rows[0]);
    } catch(e) {
      console.log(e, 'Error getting note');
      res.status(500).json({ error: 'Error getting note' });
    }
});

notes.get('/:userId',
  validateToken,
  async(req, res) => {
    const { userId } = req.params;
    try {
      const response = await pool.query(q.getAllNotes(req.query), [ userId ]);
      res.status(200).json(response.rows);
    } catch(e) {
      console.log(e, 'Error getting notes');
      res.status(500).json({ error: 'Error getting notes' });
    }
});

notes.put('/:userId/note/:id',
  validateToken,
  validateReqBody,
  async(req, res) => {
    const { userId, id } = req.params;
    const { title, body } = req.body;
    const values = [ title, body, userId, id ];
    try {
      const response = await pool.query(q.updateNote, values);
      if (response.rows.length === 0) {
        res.status(404).json({
          error: `'Note not found'`,
          userId,
          id
        });
      }
      res.json({
        id: values[2],
        title: values[0],
        body: values[1]
      })
    } catch(e) {
      console.log(e, 'Error updating note');
      res.status(500).json({ error: 'Error updating note' });
    }
});

notes.delete('/:userId/note/:id',
  validateToken,
  async(req, res) => {
    const { userId, id } = req.params;
    try {
      const response = await pool.query(q.deleteNote, [ userId, id ]);
      res.status(200).json({ message: 'Note successfully deleted' });
    } catch(e) {
      console.log(e, 'Error deleting note');
      res.status(500).json({ error: 'Error deleting note' });
    }
});

export default notes
