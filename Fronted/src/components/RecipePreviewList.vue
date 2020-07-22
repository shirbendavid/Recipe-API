<template>
  <b-container>
    <h3 class="title">{{ title }}</h3>
    <template v-if="recipes.length > 0">
      <b-row v-for="r in recipes" :key="r.id">
        <b-col>
          <RecipePreview
            class="recipePreview"
            :recipe="r"
            v-on:remove-favorite="removeRecipe"
          />
          <br />
        </b-col>
      </b-row>
    </template>
    <b-row v-else>
      <b-col v-if="this.message != 'false'">
        <h2 class="message">{{ message }}</h2>
      </b-col>
      <b-col v-else class="no-recipes">
        <br />
        <h2 class="message2">There are no recipes!</h2>
        <br />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
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
    message: {
      type: String,
      required: false,
      default: () => "Loading...",
    },
  },
  methods: {
    removeRecipe(recipe_id) {
      this.$emit("remove-favorite", recipe_id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Special+Elite);
.container {
  min-height: 250px;
}
.title {
  color: #ced3dd;
  text-shadow: 2px 2px 2px #a196aa;
  text-align: center;
  font-family: Special Elite;
}

.message {
  color: #ced3dd;
  // text-shadow: 2px 2px 2px #a196aa;
}

.message2 {
  color: black;
  font-size: 50px;
  letter-spacing: -2.6px;
  word-spacing: 2px;
  font-style: italic;
  text-decoration: none solid rgb(68, 68, 68);
  font-variant: normal;
  text-transform: none;
}

.no-recipes {
  // background: -webkit-linear-gradient(#bec6d6, #bab0c0);
  // background: linear-gradient(#ced3dd, #a196aa);
  background-image: url(../assets/no_recipes2.jpg);
  background-repeat: no-repeat;
  margin: auto;
  text-align: center;
  border: 2px outset #a196aae8;
  border-radius: 25px;
  width: 250px;
}
</style>
