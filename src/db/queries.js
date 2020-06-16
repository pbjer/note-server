const insertNote = `
  INSERT INTO notes(google_user_id, id, title, body)
  VALUES($1, $2, $3, $4)
`;

const getAllNotes = (options) => {
  const limit = parseInt(options.limit) ? options.limit.toString() : 'ALL'
  const order = options.order === 'ASC' ? 'ASC' : 'DESC'
  const start = parseInt(options.start) ? options.start.toString() : '0'
  return `
    SELECT * FROM notes WHERE google_user_id = $1
      ORDER BY notes.created_at ${order}
      LIMIT ${limit}
      OFFSET ${start}
  `;
};

const getOneNote = `
  SELECT * FROM notes
  WHERE google_user_id = $1 AND id = $2
`;

const updateNote = `
  UPDATE notes
  SET title = $1, body = $2
  WHERE google_user_id = $3 AND id = $4
`;

const deleteNote = `
  DELETE FROM notes
  WHERE google_user_id = $1 AND id = $2
`;

export {
  insertNote,
  getAllNotes,
  getOneNote,
  updateNote,
  deleteNote
};
