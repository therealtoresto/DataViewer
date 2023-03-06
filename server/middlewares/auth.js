export const authMiddleware = (req, res, done) => {
  const password = req.body.password;
  if (password === '1234') {
    done();
  } else {
    res.status(403).send('Password is not correct');
  }
}