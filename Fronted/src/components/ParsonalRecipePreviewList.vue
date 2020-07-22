<template>
  <b-container>
    <h3 class="title">{{ title }}:</h3>
    <b-row v-for="r in recipes" :key="r.recipe_id">
      <b-col>
        <ParsonalRecipePreview class="recipePreview" :recipe="r" />
        <br />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ParsonalRecipePreview from "./ParsonalRecipePreview.vue";
export default {
  name: "ParsonalRecipePreviewList",
  components: {
    ParsonalRecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Special+Elite);
.container {
  min-height: 50px;
}
.recipePreview {
  width: 500px;
  margin: 0 auto;
}
.title {
  color: #ced3dd;
  text-shadow: 2px 2px 3px #a196aa;
  text-align: center;
  font-family: Special Elite;
}
</style>
