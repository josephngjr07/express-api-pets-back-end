// controllers/pets.js
const Pet = require("../models/pet.js");
const express = require("express");
const router = express.Router();

const index = async (req, res) => {
  try {
    const pets = await Pet.find({}).exec();
    res.status(200).json({ pets });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  try {
    if (req.body.name === "") {
      return res.status(400).json({ err: "no name" });
    }
    const pet = await Pet.create(req.body);
    res.status(201).json({ pet });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const show = async (req, res) => {
  const { petId } = req.params;

  try {
    const pet = Pet.findById(petId);

    if (pet === null) {
      return res.status(404).json({ err: "not found" });
    }
    res.status(200).json({ pet });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const update = async (req, res) => {
  const { petId } = req.params;
  try {
    if (req.body.name === "") {
      return res.status(400).json({ err: "no name" });
    }

    const pet = Pet.findByIdAndUpdate(petId, req.body, {
      returnDocument: "after",
    });
    res.status(200).json({ pet });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const remove = async (req, res) => {
  const { petId } = req.params;
  try {
    await Pet.findByIdAndDelete(petId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ err });
  }
};

router.get("/", index);
router.post("/", create);
router.get("/:petId", show);
router.put("/:petId", update);
router.delete("/:petId", remove);

module.exports = router;
