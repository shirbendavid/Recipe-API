<template>
  <b-container class="container">
    <b-row>
      <b-col>
          <FamliyRecipePreviewList title="Famliy Recipes" :recipes="recipes" />
      </b-col>
    </b-row>
  </b-container>  
</template>

<script>
import FamliyRecipePreviewList from "../components/FamliyRecipePreviewList";
export default {
  components: {
    FamliyRecipePreviewList,
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
          this.$root.store.base_url + "/user/myFamilyRecipes"
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
