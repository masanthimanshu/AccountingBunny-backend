export const filterArray = (data) => {
  const out = []

  data.forEach((ele) => {
    const { _id, __v, pass, user, ...rest } = ele._doc
    out.push(rest)
  })

  return out
}

export const filterJSON = (data) => {
  const { _id, __v, pass, ...rest } = data._doc
  return rest
}
