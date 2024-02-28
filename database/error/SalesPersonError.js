export const salesPersonError = (err, res) => {
  err.code === 11000
    ? res.status(409).send({ error: 'Salesperson Already Exists' })
    : res.status(502).send({ error: err.message })
}
