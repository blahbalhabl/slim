const fs = require('fs');
const Ordinance = require('../models/ordinancesModel');
const Barangay = require('../models/brgyOrdMOdel');

const draftOrdinance = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({err: 'No file found!'})
  }

  const { number, series, title, status, level } = req.body;
  const file = req.file.filename;

  try {
    if (level === 'BARANGAY') {
      const exists = await Barangay.findOne({ number });

      if(exists) {
        return res.status(400).json('Barangay Ordinance is Already Existing!');
      };
    };
    
    const brgyExists = await Ordinance.findOne({ number });

    if(brgyExists) {
      return res.status(400).json('Ordinance is Already Existing!')
    }

    if (level === 'BARANGAY') {
      // Create the ordinance in BarangaySchema
      await Barangay.create({ number, title, series, status, file, accessLevel: level });
    } else {
      // Create the ordinance in OrdinanceSchema
      await Ordinance.create({ number, title, series, status, file, accessLevel: level });
    }
    res.status(200).json('Successfully Uploaded!')
  } catch (err) {
    res.status(400).json({Error: err, err: 'Something went wrong.'});
  }
};

const getOrdinances = async (req, res) => {
  const level = req.query.level;
  let ordinances;
  try {
    if (level === 'LGU') {
      ordinances = await Ordinance.find().lean().exec();
    } else {
      ordinances = await Barangay.find().lean().exec();
    }
     
    res.status(200).json(ordinances);
  } catch (err) {
    return res.satus(400).json({err: 'Something went wrong!'});
  }
}

//  Delete both file and Ordinance in Database
const delOrdinance = async (req, res) => {
  try {
    const level = req.query.level;
    const fileName = req.params.fileName;

    // Delete the file from the server
    const filePath = `../server/uploads/files/${fileName}`;
    await fs.promises.unlink(filePath);

    // Delete the corresponding database object
    let deletedFile;
    if (level === 'LGU') {
      deletedFile = await Ordinance.findOneAndDelete({ file: fileName });
    } else {
      deletedFile = await Barangay.findOneAndDelete({ file: fileName });
    }
    if (!deletedFile) {
      return res.status(400).json({ message: 'File not found in the database' })
    }

    return res.status(200).json({message: 'File and database entry deleted successfully'})
  } catch (err) {
    res.status(500).json({err, message: 'Internal Server Error!'});
  }
};

// Delete just the file when user is updating the file
const updateOrdinance = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({err: 'No file found!'})
  }

  try {
    const level = req.query.level;
    const fileName = req.params.fileName;
    const updateFile = req.file.filename;
    // const { number, title, status } = req.body;
    let exists;
    if (level !== 'BARANGAY') {
      exists = await Ordinance.findOneAndUpdate(
        { file: fileName },
        { $set: { file: updateFile } },
        { new: true } // Return the updated document
      );
    } else {
      exists = await Barangay.findOneAndUpdate(
        { file: fileName },
        { $set: { file: updateFile } },
        { new: true } // Return the updated document
      );
    }

     // Check if exists contains the updated document
     if (!exists) {
      return res.status(404).json({ message: 'File not found in the database' });
    }

    // Delete the file from the server
    const filePath = `../server/uploads/files/${fileName}`;
    await fs.promises.unlink(filePath);

    return res.status(200).json({ message: 'Ordinance file updated successfully' });
  } catch (err) {
    console.error('Error updating ordinance file:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  draftOrdinance,
  getOrdinances,
  delOrdinance,
  updateOrdinance,
}
