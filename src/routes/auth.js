import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../utils/auth';

const auth = express.Router();

auth.get('/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ]}));

auth.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    const expiration = process.env.COOKIE_EXP;
    const id = req.user.id;
    const token = jwt.sign(
      { id },
      `${process.env.TOKEN_SECRET}`,
      { expiresIn: `${process.env.TOKEN_EXP}` }
    );

    res.cookie('token', token, {
      expires: new Date(Date.now() + expiration),
      secure: process.env.COOKIE_SECURE,
      httpOnly: false,
    });
    res.redirect(`${process.env.CLIENT_URL}/notes`);
  });

export default auth;
