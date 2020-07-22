<template>
  <div>
    <RecipePreviewList title="Explore these recipes:" :recipes="recipes" />
    <button type="submit" class="mx-auto" v-on:click="toggle">
      Replace
    </button>
  </div>
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
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url + "/recipes/randomRecipes"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(recipes);
      } catch (error) {
        console.log(error);
      }
    },
    toggle() {
      this.updateRecipes();
    },
  },
};
</script>

<style>
.mx-auto:hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(29, 27, 27, 0.822);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.mx-auto:focus {
  outline: none;
}
.mx-auto {
  cursor: pointer;
  background: #a196aae8;
  border: 1px solid rgba(250, 248, 245, 0.911);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.589);
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  font-size: 19px;
  font-size: 1.2rem;
  font-family: Raleway;
  font-weight: 300;
  line-height: 2.5em;
  margin-top: auto;
  margin-bottom: 25px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  width: 100px;
  display: block;
}
</style>
