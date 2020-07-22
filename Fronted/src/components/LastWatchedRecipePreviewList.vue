<template>
  <RecipePreviewList
    title="Last watched recipes:"
    :recipes="recipes"
    :message="message"
  />
</template>

<script>
import RecipePreviewList from "./RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
      message: undefined,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const user_response = await this.axios.get(
          this.$root.store.base_url + "/user/lastWatchedRecipes"
        );
        console.log(user_response);
        const user_recipes = user_response.data;
        let recipes_id = "";
        for (let index = 0; index < user_recipes.length; index++) {
          recipes_id += user_recipes[index].recipe_id;
          if (index + 1 < user_recipes.length) {
            recipes_id += ",";
          }
        }
        console.log(recipes_id);
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/recipeInfo/[" + recipes_id + "]"
        );

        const recipes = response.data;
        if (recipes.length > 0) {
          this.recipes = [];
          this.recipes.push(...recipes);
          console.log(recipes);
        } else {
          this.message = "false";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
