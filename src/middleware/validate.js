import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    // confirm token is present
    if (!token) {
      return res.status(401).json('You need to Login');
    }
    const decrypt = jwt.verify(token, process.env.TOKEN_SECRET);
    // confirm client is authorized to request this users resources
    if (req.params.userId !== decrypt.id) {
      return res.status(403).json({ error: 'You do not have permission to do that' });
    }
    // add users google id to the request and proceed
    req.user = {
      google_id: decrypt.id,
    };
    next();
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};

export const validateReqBody = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(422).json({ error: 'Title and body must be present' });
    }
    if (title === '' || body === '') {
      return res.status(422).json({ error: 'Title and body can not be empty' });
    }
    next();
  } catch (e) {
    return res.status(500).json(e.toString());
  }
};
