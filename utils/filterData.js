export const filterArray = (data) => {
  return data._doc.map(({ _id, __v, ...rest }) => rest);
};

export const filterJSON = (data) => {
  const { _id, __v, ...rest } = data._doc;
  return rest;
};
