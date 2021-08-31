const User = require("../models/user.model");
const { client } = require("../../../redis");

// Getting all user
exports.get = async (req, res) => {
  try {
    let users;

    if (req.query.accountNumber) {
      users = await User.findOne({ accountNumber: req.query.accountNumber });
    } else if (req.query.identityNumber) {
      users = await User.findOne({ identityNumber: req.query.identityNumber });
    } else {
      users = await User.find();
    }
    client.setex("user", 3600, JSON.stringify(users));
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Getting one user
exports.getById = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: `Can not found User with id= ${id}` });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while find User with id= ${id}`,
      });
    });
};

// Registering user
exports.create = async (req, res) => {
  const user = new User(req.body);
  User.findOne({ emailAddress: req.body.emailAddress })
    .then(async (data) => {
      if (data) {
        return res.status(400).json({ message: "email already exists" });
      } else {
        const newUser = await user.save();
        return res.status(201).json(newUser);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

//update a user by id
exports.update = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update user with id= ${id}. data was not found!`,
        });
      } else {
        return res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating user with id= ${id}`,
      });
    });
};

// HARD Delete a user by id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot delete user with id= ${id}. data was not found!`,
        });
      } else {
        return res.send({
          message: "user was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Could not delete user with id= ${id}`,
      });
    });
};
