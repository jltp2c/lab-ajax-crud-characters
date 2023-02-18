const router = require("express").Router();
const Character = require("../models/Character.model");
const mongoose = require("mongoose");
/**
 * !All the routes here are prefixed with /api/characters
 */

/**
 * ? This route should respond with all the characters
 */
router.get("/", async (req, res, next) => {
  try {
    const allCharacters = await Character.find();
    res.status(200).json(allCharacters); // Le code de statut de réponse HTTP 200 OK indique la réussite d'une requête. Une réponse 200 est mise en cache par défaut.
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should create one character and respond with
 * ? the created character
 */
router.post("/", async (req, res, next) => {
  /**Your code goes here */
  try {
    const character = {
      name: req.body.name,
      occupation: req.body.occupation,
      cartoon: req.body.cartoon,
      weapon: req.body.weapon,
    };

    const createdCharacter = await Character.created(character);
    res.status(200).json(createdCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should respond with one character
 */
router.get("/:id", async (req, res, next) => {
  try {
    const oneCharacter = await Character.findById(req.params.id);
    res.status(200).json(oneCharacter);
  } catch (error) {
    next(error);
  }
});

/**
 * ? This route should update a character and respond with
 * ? the updated character
 */
router.patch("/:id", async (req, res, next) => {
  const { characterId } = req.params;
  const characterToUpdate = { ...req.body };
  try {
    if (!characterToUpdate) {
      return res.json({ message: `Character ${characterId} not found` });
    } else {
      await Character.findByIdAndUpdate(characterId, characterToUpdate, {
        new: true,
      });
      res.json({ message: `You're updating your character : ${characterId}` });
    }
  } catch (error) {
    next(200);
  }
});

/**
 * ? Should delete a character and respond with a success or
 * ? error message
 */
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Character id");
    }
    const oneCharacter = await Character.findByIdAndDelete(req.params.id);

    res.json({
      message: `the character has been deleted`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
