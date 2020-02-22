const readOneRequest = async (req,res) => {
  try {
    return res.status(200)
      .json({ message: 'Hello World' });
  } catch (e) {
    return res.status(500)
      .json({ message: 'Something went wrong' });
  }
};

module.exports =  {
  readOneRequest
};
