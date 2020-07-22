const DButils = require("./DButils");

async function getUserInfoOnRecipes(user_id, recipes_ids) {
  promises = [];
  recipes_ids.map((id_recipe) =>
    promises.push(getUserInfoRecipes(id_recipe, user_id))
  );
  let info_response = await Promise.all(promises);
  relevantData = extractRelevantData(info_response);
  return relevantData;
}

async function getUserInfoRecipes(recipe_id, user_id) {
  users = await DButils.execQuery("SELECT * FROM watchAndFavorite");
  if (users.find((x) => x.user_id == user_id && x.recipe_id == recipe_id)) {
    recipeInfoAboutUser = await DButils.execQuery(
      `SELECT * FROM watchAndFavorite WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
    );
  } else {
    return {
      recipe_id: recipe_id,
      watched: false,
      favorite: false,
    };
  }
  console.log(recipeInfoAboutUser[0]);
  return recipeInfoAboutUser[0];
}

function extractRelevantData(infoAboutUser) {
  return infoAboutUser.map((info) => {
    const { recipe_id, watched, favorite } = info;

    return {
      recipe_id: recipe_id,
      watched: watched,
      favorite: favorite,
    };
  });
}

async function getMyFavoriteRecipes(user_id) {
  recipes = await DButils.execQuery(
    `SELECT * FROM watchAndFavorite WHERE user_id='${user_id}' AND favorite='1'`
  );
  return extractRelevantData(recipes);
}

async function addFavoritRecipes(recipe_id, user_id) {
  users = await DButils.execQuery("SELECT * FROM watchAndFavorite");
  if (
    (user = users.find((x) => x.user_id == user_id && x.recipe_id == recipe_id))
  ) {
    if (user.favorite == "0") {
      await DButils.execQuery(
        `UPDATE watchAndFavorite SET favorite='1',time=default WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
      );
    }
  }
}

async function removeFavoriteRecipe(recipe_id, user_id) {
  users = await DButils.execQuery("SELECT * FROM watchAndFavorite");
  if (
    (user = users.find((x) => x.user_id == user_id && x.recipe_id == recipe_id))
  ) {
    if (user.favorite == "1") {
      await DButils.execQuery(
        `UPDATE watchAndFavorite SET favorite='0',time=default WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
      );
    }
  }
}

async function getMylastWatchedRecipes(user_id) {
  recipes = await DButils.execQuery(
    `SELECT * FROM watchAndFavorite WHERE user_id='${user_id}' AND watched='1' ORDER BY time desc`
  );
  if (recipes.length > 3) {
    top3 = [];
    top3.push(recipes[0]);
    top3.push(recipes[1]);
    top3.push(recipes[2]);
    return extractRelevantData(top3);
  } else {
    return extractRelevantData(recipes);
  }
}

async function getAllWatchedRecipes(user_id) {
  recipes = await DButils.execQuery(
    `SELECT * FROM watchAndFavorite WHERE user_id='${user_id}' AND watched='1'`
  );
  return extractRelevantData(recipes);
}

async function addWatchInRecipe(recipe_id, user_id) {
  users = await DButils.execQuery("SELECT * FROM watchAndFavorite");
  if (users.find((x) => x.user_id == user_id && x.recipe_id == recipe_id)) {
    await DButils.execQuery(
      `UPDATE watchAndFavorite SET watched='1',time=default WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
    );
  } else {
    console.log(recipe_id, user_id);
    await DButils.execQuery(
      `INSERT INTO watchAndFavorite VALUES ('${recipe_id}', '${user_id}', '1', '0', default)`
    );
  }
}

async function getMyRecipes(user_id) {
  recipes = await DButils.execQuery(
    `SELECT * FROM myRecipes WHERE user_id='${user_id}'`
  );
  promises = [];
  recipes.map((recipe_row) => promises.push(recipe_row));
  let info_response = await Promise.all(promises);
  return extractPriviewRecipe(info_response);
}

async function getMyFamliyRecipes(user_id) {
  recipes = await DButils.execQuery(
    `SELECT * FROM myFamliyRecipes WHERE user_id='${user_id}'`
  );
  promises = [];
  recipes.map((recipe_row) => promises.push(recipe_row));
  let info_response = await Promise.all(promises);
  return extractPriviewFamliyRecipe(info_response);
}

function extractPriviewRecipe(infoRecipes) {
  return infoRecipes.map((recipe_info) => {
    const {
      recipe_id,
      title,
      readyInMinutes,
      vegetarian,
      vegan,
      glutenFree,
      image,
    } = recipe_info;
    return {
      recipe_id: recipe_id,
      title: title,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
    };
  });
}

function extractPriviewFamliyRecipe(infoRecipes) {
  return infoRecipes.map((recipe_info) => {
    const {
      recipe_id,
      title,
      family_member,
      whenMakeIt,
      readyInMinutes,
      vegetarian,
      vegan,
      glutenFree,
      image,
    } = recipe_info;
    return {
      recipe_id: recipe_id,
      title: title,
      family_member: family_member,
      whenMakeIt: whenMakeIt,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
    };
  });
}

async function getMyRecipe(recipe_id, user_id) {
  recipe = await DButils.execQuery(
    `SELECT * FROM myRecipes WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
  );
  promises = [];
  recipe.map((recipe_row) => promises.push(recipe_row));
  let info_response = await Promise.all(promises);
  ingredients = await DButils.execQuery(
    `SELECT * FROM recipesIngredients WHERE recipe_id='${recipe_id}'`
  );
  return extractRecipesData(info_response, ingredients);
}

function extractRecipesData(infoRecipes, ingredientsInfo) {
  console.log(infoRecipes);
  return infoRecipes.map((recipe_info) => {
    const {
      recipe_id,
      title,
      readyInMinutes,
      vegetarian,
      vegan,
      glutenFree,
      image,
      severalServings,
      instructions,
    } = recipe_info;
    return {
      recipe_id: recipe_id,
      title: title,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
      severalServings: severalServings,
      instructions: instructions,
      ingredients: extractIngredientsData(ingredientsInfo),
    };
  });
}

function extractIngredientsData(extendedIngredients) {
  return extendedIngredients.map((ingredients_info) => {
    const { name, amount, unit } = ingredients_info;

    return {
      name: name,
      amount: amount,
      unit: unit,
    };
  });
}

async function getMyFamliyRecipe(recipe_id, user_id) {
  recipe = await DButils.execQuery(
    `SELECT * FROM myFamliyRecipes WHERE user_id='${user_id}' AND recipe_id='${recipe_id}'`
  );
  promises = [];
  recipe.map((recipe_row) => promises.push(recipe_row));
  let info_response = await Promise.all(promises);
  ingredients = await DButils.execQuery(
    `SELECT * FROM recipesIngredients WHERE recipe_id='${recipe_id}'`
  );
  return extractFamliyRecipe(info_response, ingredients);
}

function extractFamliyRecipe(infoRecipes, ingredientsInfo) {
  return infoRecipes.map((recipe_info) => {
    const {
      recipe_id,
      title,
      family_member,
      whenMakeIt,
      readyInMinutes,
      vegetarian,
      vegan,
      glutenFree,
      image,
      severalServings,
      instructions,
    } = recipe_info;
    return {
      recipe_id: recipe_id,
      title: title,
      family_member: family_member,
      whenMakeIt: whenMakeIt,
      readyInMinutes: readyInMinutes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
      severalServings: severalServings,
      instructions: instructions,
      ingredients: extractIngredientsData(ingredientsInfo),
    };
  });
}

async function getProfilePicture(user_id) {
  user = await DButils.execQuery(
    `SELECT * FROM users WHERE user_id='${user_id}'`
  );
  return extractPicture(user);
}

function extractPicture(user) {
  return user.map((info) => {
    const { image } = info;

    return {
      image: image,
    };
  });
}

exports.getUserInfoOnRecipes = getUserInfoOnRecipes;
exports.addFavoritRecipes = addFavoritRecipes;
exports.getMyFavoriteRecipes = getMyFavoriteRecipes;
exports.addWatchInRecipe = addWatchInRecipe;
exports.removeFavoriteRecipe = removeFavoriteRecipe;
exports.getMylastWatchedRecipes = getMylastWatchedRecipes;
exports.getMyRecipes = getMyRecipes;
exports.getMyFamliyRecipes = getMyFamliyRecipes;
exports.getMyRecipe = getMyRecipe;
exports.getMyFamliyRecipe = getMyFamliyRecipe;
exports.getAllWatchedRecipes = getAllWatchedRecipes;
exports.getProfilePicture = getProfilePicture;
