<template>
  <b-card no-body style="max-width: 740px;" class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="6">
        <router-link
          :to="{
            name: 'parsonalRecipe',
            params: { recipe_id: recipe.recipe_id },
          }"
          class="recipe-preview"
        >
          <b-card-img
            :src="recipe.image"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </router-link>
      </b-col>
      <b-col md="6">
        <b-card-body :title="recipe.title">
          <b-card-text>
            <b-icon icon="clock"></b-icon> {{ recipe.readyInMinutes }} minutes
            <br />
            <img
              v-if="recipe.vegetarian"
              src="../assets/vegetarian.png"
              style="width: 33px;"
            />
            <img
              v-if="recipe.vegan"
              src="../assets/vegan.png"
              style="width: 30px;"
            />
            <img
              v-if="recipe.glutenFree"
              src="../assets/glutenFree.png"
              style="width: 30px;"
            />
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      image_load: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.rounded-0 {
  border: 5px 5px 5px 5px solid #ced3dd;
  background-repeat: no-repeat;
  background-position: 20% 20%;
  background-size: cover;
  width: 250px;
}
.rounded-0:hover {
  transform: scale(1.5);
}

.overflow-hidden {
  border: 5px outset #a196aae8;
  border-radius: 25px;
  background-color: rgba(250, 248, 245, 0.911);
}

.card_text {
  text-align: left;
}

.title {
  font-size: small;
  color: black;
  text-align: center;
}
</style>
