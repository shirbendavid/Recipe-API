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
            <b-icon
              v-if="!this.favorite"
              @click="changeFavorite()"
              style="width: 35px; height: 50px;"
              icon="heart"
              aria-hidden="true"
              class="favorite_icon"
            ></b-icon>
            <b-icon
              v-else
              @click="changeFavorite()"
              style="width: 35px; height: 50px;"
              icon="heart-fill"
              variant="danger"
              aria-hidden="true"
              class="favorite_icon"
            ></b-icon>
            <b-icon
              v-if="this.watched"
              icon="eye"
              variant="dark"
              style="width: 40px; height: 50px;"
            ></b-icon>
            <b-icon
              v-else
              icon="eye-slash"
              variant="dark"
              style="width: 40px; height: 50px;"
            ></b-icon>
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
            {{ recipe.servings }}
          </div>
          <div class="flex-item">
            <b-icon icon="clock"></b-icon> {{ recipe.readyInMinutes }} minutes
          </div>
          <div class="flex-item">
            <b-icon icon="hand-thumbs-up"></b-icon> {{ recipe.aggregateLikes }}
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
                {{ s.fstep }}
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
      watched: null,
    };
  },
  methods: {
    async changeFavorite() {
      //add recipe to favorite
      try {
        if (!this.favorite && this.$root.store.username) {
          await this.axios.put(
            this.$root.store.base_url +
              "/user/addFavorite/" +
              this.$route.params.recipeId
          );
          this.favorite = true;
          let recipe_data = {
            recipe_id: this.$route.params.recipeId,
            watched: true,
            favorite: true,
          };
          if (this.$root.store.favoriteRecipes == 0) {
            this.$root.store.addFavoriteRecipes([recipe_data]);
          } else {
            this.$root.store.favoriteRecipes.push(recipe_data);
          }
          console.log(this.$root.store.favoriteRecipes);
        }
        // remove recipe from favorite
        else if (this.$root.store.username) {
          await this.axios.put(
            this.$root.store.base_url +
              "/user/removeFavorite/" +
              this.$route.params.recipeId
          );
          this.favorite = false;
          for (var i = 0; i < this.$root.store.favoriteRecipes.length; i++) {
            if (
              this.$root.store.favoriteRecipes[i].recipe_id ==
              this.$route.params.recipeId
            ) {
              if (this.$root.store.favoriteRecipes.length == 1) {
                this.$root.store.favoriteRecipes.splice(i, 1);
                localStorage.removeItem("favoriteRecipes");
                break;
              } else {
                this.$root.store.favoriteRecipes.splice(i, 1);
                break;
              }
            }
          }
          console.log(this.$root.store.favoriteRecipes);
        } else {
          this.$root.toast(
            "No user",
            "You Need to login or register",
            "failed"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.get(
          this.$root.store.base_url +
            "/recipes/show/" +
            this.$route.params.recipeId
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
        aggregateLikes,
        readyInMinutes,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        image,
        title,
        id,
      } = response.data[0];

      let _instructions = instructions.map((fstep) => {
        return {
          fstep,
        };
      });

      let _recipe = {
        _instructions,
        ingredients,
        aggregateLikes,
        readyInMinutes,
        vegetarian,
        vegan,
        glutenFree,
        servings,
        image,
        title,
        id,
      };

      this.recipe = _recipe;
      if (this.$root.store.username) {
        this.favorite = this.$route.params.favorite;
        this.watched = this.$route.params.watched;
        await this.axios.put(
          this.$root.store.base_url +
            "/user/addWatched/" +
            this.$route.params.recipeId
        );
      }
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
  width: 200%;
}

.favorite_icon:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.foreword {
  column-count: 2;
  margin: 0 auto;
  -moz-column-count: 2;
  -webkit-column-count: 2;
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
