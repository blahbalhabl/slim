const Ordinance = require('../models/ordinancesModel');

const draftOrdinance = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({err: 'No file found!'})
  }

  const { number, title, status } = req.body;
  const file = req.file.filename;
  console.log(file);

  try {
    const exists = await Ordinance.findOne({ number });

    if(exists) {
      return res.status(400).json('Ordinance is Already Existing!');
    }

    await Ordinance.create({ number, title, status, file })
    .then((data) => {
      res.status(200).send(data);
    })
  } catch (err) {
    res.status(400).json({err: 'Something went wrong.'});
  }
}

const getOrdinances = async (req, res) => {
  try {
    const ordinances = await Ordinance.find().lean().exec();
    res.status(200).json(ordinances);
  } catch (err) {
    return res.satus(400).json({err: 'Something went wrong!'});
  }
}

module.exports = {
  draftOrdinance,
  getOrdinances,
}

// const handleFileUpload = async (req, res) => {
//   // const photo = req.file.filename
//   console.log(photo);

//   await UserModel.create({ photo })
//   .then((data) => {
//     console.log('User created', data._id );
//     res.status(200).send(data);
//   })
//   .catch ((err) => console.log(err));
// }