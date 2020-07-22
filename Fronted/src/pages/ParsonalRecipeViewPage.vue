<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <b-row>
          <b-col class="title">
            <br />
            <b-row>
              <h1 style="text-align: center;">{{ recipe.title }}</h1>
            </b-row>
            <b-row>
              <div class="mb-3">
                <img
                  v-if="recipe.vegetarian"
                  src="../assets/vegetarian.png"
                  style="width: 50px;"
                />
                <img
                  v-if="recipe.vegan"
                  src="../assets/vegan.png"
                  style="width: 45px;"
                />
                <img
                  v-if="recipe.glutenFree"
                  src="../assets/glutenFree.png"
                  style="width: 42px;"
                />
              </div>
            </b-row>
          </b-col>
          <b-col class="foreword">
            <br />
            <img :src="recipe.image" class="center" />
          </b-col>
        </b-row>
      </div>
      <div class="recipe-body">
        <div class="flex-container">
          <div class="flex-item">
            <img src="../assets/dinner.png" style="width: 25px;" />
            {{ recipe.severalServings }}
          </div>
          <div class="flex-item">
            <b-icon icon="clock"></b-icon> {{ recipe.readyInMinutes }} minutes
          </div>
        </div>
        <div class="wrapper">
          <div class="wrapped">
            <b class="subtitle">Ingredients:</b>
            <ul>
              <li
                v-for="(r, index) in recipe.ingredients"
                :key="index + '_' + r.id"
              >
                {{ r.amount + " " + r.unit + " " + r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <b class="subtitle">Instructions:</b>
            <ol>
              <li v-for="s in recipe._instructions" :key="s.number">
                {{ s }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      favorite: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/user/showMyRecipe/" +
            this.$route.params.recipe_id
        );
        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let {
        ingredients,
        instructions,
        readyInMinutes,
        vegetarian,
        vegan,
        glutenFree,
        severalServings,
        image,
        title,
        recipe_id,
      } = response.data[0];

      let _instructions = instructions.split(";");

      let _recipe = {
        _instructions,
        ingredients,
        readyInMinutes,
        vegetarian,
        vegan,
        glutenFree,
        severalServings,
        image,
        title,
        recipe_id,
      };
      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Special+Elite);
.container {
  background-color: rgba(255, 255, 255, 0.89);
  border: 5px outset #a196aae8;
  border-radius: 25px;
  opacity: 95%;
  color: black;
  font-size: 16px;
  width: 80%;
  padding-left: 25px;
  padding-right: 25px;
}

.title {
  color: black;
  font-family: Special Elite;
  width: 80%;
}

.center {
  border: 1px solid #595b5f;
  border-radius: 25px;
  width: 400px;
}

.subtitle {
  font-size: 25px;
  color: #7a5699e8;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
}

.flex-item {
  padding: 1px;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
}

.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
</style>
