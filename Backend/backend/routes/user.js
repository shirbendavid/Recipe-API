var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_util = require("./utils/user_info");

//#region cookie middleware
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    await DButils.execQuery("SELECT * FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    res.sendStatus(401);
  }
});
//#endregion

router.get("/recipeInfo/:ids", (req, res) => {
  const recipes_ids = JSON.parse(req.params.ids);
  const user_id = req.user_id;
  console.log(recipes_ids, user_id);

  user_util
    .getUserInfoOnRecipes(user_id, recipes_ids)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/myFavorites", async (req, res) => {
  user_util
    .getMyFavoriteRecipes(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({
          message: "You don't have any favorite recipes",
          success: true,
        });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.put("/addFavorite/:id", async (req, res) => {
  try {
    await user_util.addFavoritRecipes(req.params.id, req.user_id);
    res.send("Done successfully");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/removeFavorite/:id", async (req, res) => {
  try {
    await user_util.removeFavoriteRecipe(req.params.id, req.user_id);
    res.send("Done successfully");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/lastWatchedRecipes", (req, res) => {
  user_util
    .getMylastWatchedRecipes(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({
          message: "There are no recently viewed recipes",
          success: true,
        });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/allWatchedRecipes", (req, res) => {
  user_util
    .getAllWatchedRecipes(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({
          message: "There are no recently viewed recipes",
          success: true,
        });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.put("/addWatched/:id", async (req, res) => {
  try {
    await user_util.addWatchInRecipe(req.params.id, req.user_id);
    res.send("Added successfully");
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/myRecipes", (req, res) => {
  user_util
    .getMyRecipes(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res
          .status(205)
          .send({ message: "You don't have personal recipes", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/myFamilyRecipes", (req, res) => {
  user_util
    .getMyFamliyRecipes(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res
          .status(205)
          .send({ message: "You don't have famliy recipes", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/showMyRecipe/:id", (req, res) => {
  user_util
    .getMyRecipe(req.params.id, req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No recipes found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/showMyFamliyRecipe/:id", (req, res) => {
  user_util
    .getMyFamliyRecipe(req.params.id, req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No recipes found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/getPorfilePicture", (req, res) => {
  user_util
    .getProfilePicture(req.user_id)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
