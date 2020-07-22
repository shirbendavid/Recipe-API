const axios = require("axios");
//spopnacular settings
const recipes_api_url = "https://api.spoonacular.com/recipes";
const api_key = "apiKey=" + process.env.spooncular_apiKey;

//for search recipes
function extractQueriesParams(query_params, search_params) {
  const params_list = ["diet", "cuisine", "intolerances"];
  params_list.forEach((param) => {
    if (query_params[param]) {
      search_params[param] = query_params[param];
    }
  });
  console.log(search_params);
}
async function searchForRecipes(search_params) {
  let search_response = await axios.get(
    `${recipes_api_url}/search?${api_key}`,
    {
      params: search_params,
    }
  );

  const recipes_id_list = extractSearchResultIds(search_response);
  console.log(recipes_id_list);
  //Get recipe info by id
  let info_array = await getRecipesInfo(recipes_id_list);
  console.log("info array:", info_array);
  return info_array;
}

async function getRecipesInfo(recipes_id_list) {
  let promises = [];
  recipes_id_list.map((id) =>
    promises.push(axios.get(`${recipes_api_url}/${id}/information?${api_key}`))
  );
  let info_response1 = await Promise.all(promises);
  console.log(info_response1);
  relevantRecipesData = extractRelevantRecipeData(info_response1);
  return relevantRecipesData;
}

//return data like  our API -dic with  id.
function extractRelevantRecipeData(recipes_Info) {
  return recipes_Info.map((recipe_info) => {
    const {
      id,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
      image,
    } = recipe_info.data;

    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
    };
  });
}

function extractSearchResultIds(search_response) {
  let recipes = search_response.data.results;
  recipes_id_list = [];
  recipes.map((recipe) => {
    console.log(recipe.title);
    recipes_id_list.push(recipe.id);
  });
  return recipes_id_list;
}

//random recipes
async function randomRecipes() {
  let random_response = await axios.get(
    `${recipes_api_url}/random?${api_key}&number=3&instructionsRequired=true`
  );
  for (let i = 0; i < 3; i++) {
    if (
      random_response.data.recipes[i].analyzedInstructions === undefined ||
      random_response.data.recipes[i].analyzedInstructions[0] === undefined ||
      random_response.data.recipes[i].analyzedInstructions[0].steps.length ===
        0 ||
      random_response.data.recipes[i].image === undefined
    ) {
      random_response == undefined;
      random_response = await axios.get(
        `${recipes_api_url}/random?${api_key}&number=3&instructionsRequired=true`
      );
      i == 0;
    }
  }
  return extractRandomRecipes(random_response);
}

function extractRandomRecipes(recipes_Info) {
  let recipes = recipes_Info.data.recipes;
  return recipes.map((recipe_info) => {
    const {
      id,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
      image,
    } = recipe_info;

    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
    };
  });
}
//show recipe by id
async function showRecipeById(parm) {
  let recipeInfo = [];
  recipeInfo.push(
    await axios.get(`${recipes_api_url}/${parm.id}/information?${api_key}`)
  );
  recipesData = extractRecipeData(recipeInfo);
  return recipesData;
}

function extractRecipeData(recipes_info) {
  return recipes_info.map((recipe_info) => {
    const {
      id,
      title,
      readyInMinutes,
      aggregateLikes,
      vegetarian,
      vegan,
      glutenFree,
      image,
      servings,
      extendedIngredients,
      analyzedInstructions,
    } = recipe_info.data;

    let instructions = analyzedInstructions[0].steps.map((s) => s.step);

    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      aggregateLikes: aggregateLikes,
      vegetarian: vegetarian,
      vegan: vegan,
      glutenFree: glutenFree,
      image: image,
      servings: servings,
      instructions: instructions,
      ingredients: extractIngredients(extendedIngredients),
    };
  });
}

function extractIngredients(extendedIngredients) {
  return extendedIngredients.map((ingredients_info) => {
    const { originalName, amount, unit } = ingredients_info;

    return {
      name: originalName,
      amount: amount,
      unit: unit,
    };
  });
}

async function getInfoOnRecipes(recipes_id) {
  let info_array = await getRecipesInfo(recipes_id);
  console.log("info array:", info_array);
  return info_array;
}

exports.searchForRecipes = searchForRecipes;

exports.extractQueriesParams = extractQueriesParams;

exports.randomRecipes = randomRecipes;

exports.showRecipeById = showRecipeById;

exports.getInfoOnRecipes = getInfoOnRecipes;
