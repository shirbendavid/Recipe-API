<template>
  <b-container class="container">
    <h1 class="title">
      "A recipe has no soul. You, as the cook, must
      <br />
      bring soul to the recipe."
    </h1>
    <br />
    <div class="header">
      <div class="title1">
        <b>RECIPES</b>
        HOUSE
      </div>
      <h3 class="title">Best recipes with best ingredients</h3>
    </div>
    <b-row>
      <b-col>
        <RandomRecipePreviewList class="RandomRecipes center" />
      </b-col>
      <b-col v-if="!$root.store.username">
        <login-page></login-page>
      </b-col>
      <b-col v-else>
        <LastWatchedRecipePreviewList
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></LastWatchedRecipePreviewList>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RandomRecipePreviewList from '../components/RandomRecipePreviewList'
import LastWatchedRecipePreviewList from '../components/LastWatchedRecipePreviewList'
import LoginPage from '../pages/LoginPage'
export default {
  components: {
    RandomRecipePreviewList,
    LastWatchedRecipePreviewList,
    LoginPage,
  },
  data() {
    return {
      component: RandomRecipePreviewList,
    }
  },
  async created() {
    if (this.$root.store.username) {
      const viewedRecipes = await this.axios.get(
        this.$root.store.base_url + '/user/allWatchedRecipes',
      )

      this.$root.store.addViewedRecipes(viewedRecipes.data)
      console.log(this.$root.store.viewedRecipes)
    }
  },
}
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.container {
  width: 100%;
  height: 100%;
}

@import url('https://fonts.googleapis.com/css?family=Allura');
@import url('https://fonts.googleapis.com/css?family=Raleway');

.title {
  font-family: 'Allura';
  color: #fff;
  text-align: center;
}
.title1 {
  font-family: 'Raleway';
  color: #fff;
  text-align: center;
  font-size: 70px;
}
.header {
  margin: 6px;
  padding: 6px;
  background: rgba(26, 26, 26, 0.74);
  opacity: 0.997;
  border-radius: 100px;
  margin: auto;
  width: 60%;
}
</style>
