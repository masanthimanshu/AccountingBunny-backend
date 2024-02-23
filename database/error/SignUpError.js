export const signUpError = (err, res) => {
  err.code === 11000
    ? res.status(409).send({ error: "User Already Exists" })
    : res.status(502).send({ error: err.message });
};
