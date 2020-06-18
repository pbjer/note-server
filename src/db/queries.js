const getAllNotes = (options) => {
  // provide some basic sanitization for client provided values
  const limit = parseInt(options.limit) >= 0 ? options.limit.toString() : 'ALL';
  const order = options.order === 'asc' ? 'ASC' : 'DESC';
  const start = parseInt(options.start) >= 0 ? options.start.toString() : '0';
  // I'm using count(), LIMIT, and OFFSET here for simplicity,
  // in a production environment where speed and scalability
  // were more important, it would be worthwhile to use a
  // different query method. https://use-the-index-luke.com/no-offset
  return `
    SELECT *, count(*) OVER() AS full_count
      FROM notes
      WHERE google_user_id = $1
      ORDER BY notes.created_at ${order}
      LIMIT ${limit}
      OFFSET ${start}
  `;
};

const insertNote = `
  INSERT INTO notes(google_user_id, id, title, body)
  VALUES($1, $2, $3, $4)
`;

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
