<template class="container">
  <RecipePreviewList
    title="Favorite Recipes"
    :recipes="recipes"
    v-on:remove-favorite="removeRecipe"
    :message="message"
  />
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
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
        const user_recipes = this.$root.store.favoriteRecipes;
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
        this.recipes = [];
        this.recipes.push(...recipes);

        if (this.recipes.length == 0) {
          console.log(recipes.length);
          this.message = "false";
        }

        for (let index = 0; index < this.recipes.length; index++) {
          this.recipes[index].watched = user_recipes[index].watched;
          this.recipes[index].favorite = user_recipes[index].favorite;
        }

        console.log(recipes);
      } catch (error) {
        console.log(error);
      }
    },
    removeRecipe(recipe_id) {
      let index_recipe = this.recipes.findIndex((r) => r.id === recipe_id);
      this.$delete(this.recipes, index_recipe);
      if (this.recipes.length == 0) {
        console.log(123);
        this.message = "false";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 550px;
  margin: 0 auto;
}
</style>
