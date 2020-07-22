<template>
  <ParsonalRecipePreviewList title="Parsonal Recipes" :recipes="recipes" />
</template>

<script>
import ParsonalRecipePreviewList from "../components/ParsonalRecipePreviewList";
export default {
  components: {
    ParsonalRecipePreviewList,
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const user_response = await this.axios.get(
          this.$root.store.base_url + "/user/myRecipes"
        );
        console.log(user_response);
        const user_recipes = user_response.data;
        this.recipes = [];
        this.recipes.push(...user_recipes);
        console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
