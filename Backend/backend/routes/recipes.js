var express = require("express");
var router = express.Router();

const search_util = require("./utils/search_recipes");

router.use((req, res, next) => {
  console.log("Recipes route");
  next();
});

router.get("/search/query/:searchQuery/amount/:number", (req, res) => {
  const { searchQuery, number } = req.params;
  search_params = {};
  search_params.query = searchQuery;
  search_params.number = number;
  search_params.instructionsRequired = true;

  //check if querirs params exists
  console.log(req.query);
  search_util.extractQueriesParams(req.query, search_params);

  search_util
    .searchForRecipes(search_params)
    .then((info_array) => {
      if (info_array.length == 0)
        res
          .status(205)
          .send({
            message: "No recipes found for the search params",
            success: true,
          });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/randomRecipes", (req, res) => {
  search_util
    .randomRecipes()
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/show/:id", (req, res) => {
  search_util
    .showRecipeById(req.params)
    .then((info_array) => {
      if (info_array.length == 0)
        res.status(205).send({ message: "No recipe found", success: true });
      else res.send(info_array);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/recipeInfo/:ids", (req, res) => {
  const recipes_ids = JSON.parse(req.params.ids);

  search_util
    .getInfoOnRecipes(recipes_ids)
    .then((info_array) => res.send(info_array))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
