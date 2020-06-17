import jwt from 'jsonwebtoken';

export const validate = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    // confirm token is present
    if (!token) {
      return res.status(401).json('You need to Login');
    }
    const decrypt = jwt.verify(token, process.env.TOKEN_SECRET);
    // confirm client is authorized to request this users resources
    if (req.params.userId !== decrypt.id) {
      res.status(403).json({error: 'You do not have permission to do that'});
    }
    // add users google id to the request and proceed
    req.user = {
      google_id: decrypt.id,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
