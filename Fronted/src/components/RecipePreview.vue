<template>
  <b-card no-body style="max-width: 740px;" class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="6">
        <b-row>
          <router-link
            :to="{
              name: 'recipe',
              params: {
                recipeId: recipe.id,
                favorite: this.favorite,
                watched: this.watched,
              },
            }"
            class="recipe-preview"
          >
            <b-card-img
              :src="recipe.image"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </router-link>
        </b-row>
      </b-col>
      <b-col>
        <b-row v-if="this.$root.store.username">
          <b-icon
            v-if="checkFavorite()"
            style="width: 30px; height: 30px;"
            icon="heart-fill"
            variant="danger"
            v-on:click="changeFavorite"
            aria-hidden="true"
            class="favorite_icon"
          ></b-icon>
          <b-icon
            v-else
            icon="heart"
            style="width: 35px; height: 30px;"
            v-on:click="changeFavorite"
            aria-hidden="true"
            class="favorite_icon"
          ></b-icon>
          <b-icon
            v-if="checkWatched()"
            style="width: 35px; height: 30px;"
            icon="eye"
            variant="dark"
          ></b-icon>
          <b-icon
            v-else
            icon="eye-slash"
            style="width: 35px; height: 30px;"
            variant="dark"
          ></b-icon>
        </b-row>
      </b-col>
      <b-col md="6">
        <b-card-body :title="recipe.title" class="title">
          <b-card-text class="card_text">
            <b-icon icon="clock"></b-icon> {{ recipe.readyInMinutes }} minutes
            <br />
            <b-icon icon="hand-thumbs-up"></b-icon>
            {{ recipe.aggregateLikes }}
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
      watched: "",
      favorite: "",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    checkFavorite() {
      if (this.favorite != "") return this.favorite;
      for (var i = 0; i < this.$root.store.favoriteRecipes.length; i++) {
        if (this.$root.store.favoriteRecipes[i].recipe_id == this.recipe.id) {
          this.favorite = true;
          return this.$root.store.favoriteRecipes[i].favorite;
        }
      }
      this.favorite = false;
      return this.favorite;
    },
    checkWatched() {
      for (var i = 0; i < this.$root.store.viewedRecipes.length; i++) {
        if (this.$root.store.viewedRecipes[i].recipe_id == this.recipe.id) {
          this.watched = true;
          return this.$root.store.viewedRecipes[i].watched;
        }
      }
      this.watched = false;
      return this.watched;
    },
    async changeFavorite() {
      //add recipe to favorite
      try {
        if (!this.favorite && this.$root.store.username) {
          await this.axios.put(
            this.$root.store.base_url + "/user/addFavorite/" + this.recipe.id
          );
          this.favorite = true;
          if (this.$root.store.favoriteRecipes == 0) {
            this.$root.store.addFavoriteRecipes([
              {
                recipe_id: this.recipe.id,
                watched: true,
                favorite: true,
              },
            ]);
          } else {
            this.$root.store.favoriteRecipes.push({
              recipe_id: this.recipe.id,
              watched: true,
              favorite: true,
            });
          }
          console.log(this.$root.store.favoriteRecipes);
        }
        // remove recipe from favorite
        else if (this.$root.store.username) {
          await this.axios.put(
            this.$root.store.base_url + "/user/removeFavorite/" + this.recipe.id
          );
          this.favorite = false;
          for (var i = 0; i < this.$root.store.favoriteRecipes.length; i++) {
            if (
              this.$root.store.favoriteRecipes[i].recipe_id == this.recipe.id
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
          this.$emit("remove-favorite", this.recipe.id);
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
};
</script>

<style scoped>
.favorite_icon:hover {
  cursor: pointer;
  transform: scale(0.8);
}
.rounded-0 {
  border: 2px solid #ced3dd;
  background-repeat: no-repeat;
  background-position: 20% 20%;
  background-size: cover;
  width: 250px;
}
.rounded-0:hover {
  transform: scale(1.2);
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
