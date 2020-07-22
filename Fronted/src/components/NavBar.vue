<template>
  <b-navbar class="navbar">
    <router-link tag="b-navbar-brand" :to="{ name: 'main' }">
      <img src="../assets/logo.png" style="width: 50px;" />
    </router-link>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'main' }">
          Home
        </router-link>

        <router-link class="nav" tag="b-nav-item" :to="{ name: 'search' }">
          Search
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'about' }">
          About
        </router-link>
      </b-navbar-nav>

      <b-navbar-nav
        class="ml-auto"
        v-if="!$root.store.username && !this.$cookies.get('session')"
      >
        <b-nav-text>Hello Guset!</b-nav-text>
        <p class="h3 mb-2">
          <b-icon icon="person" variant="secondary"></b-icon>
        </p>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'register' }">
          Register
        </router-link>
        <router-link class="nav" tag="b-nav-item" :to="{ name: 'login' }">
          Login
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-text>Welcome</b-nav-text>
        <img
          :src="this.$root.store.profilePicture[0].image"
          height="45"
          alt=""
          center
        />
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ $root.store.username }}</em>
          </template>
          <router-link
            class="nav"
            tag="b-dropdown-item"
            :to="{ name: 'favoritesRecipes' }"
          >
            My Favorites Recipes
          </router-link>
          <router-link
            class="nav"
            tag="b-dropdown-item"
            :to="{ name: 'personalRecipes' }"
          >
            My Parsonal Recipes
          </router-link>
          <router-link
            class="nav"
            tag="b-dropdown-item"
            :to="{ name: 'famliyRecipes' }"
          >
            My Famliy Recipes
          </router-link>
        </b-nav-item-dropdown>
        <button class="button" tag="b-nav-item" @click="Logout()">
          Logout
        </button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    Logout() {
      this.$root.store.logout()
      this.$root.toast('Logout', 'User logged out successfully', 'success')

      this.$router.push('/').catch(() => {
        this.$forceUpdate()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Special+Elite');
.navbar {
  background-color: #ced3dde3;
  // position: fixed; /* Set the navbar to fixed position */
  // width: 100%; /* Full width */
  float: inline-start;
  font-size: 18px;
  font-family: Special Elite;
  height: 60px;
}
.nav :hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(29, 27, 27, 0.822);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.nav :focus {
  border: 1px solid rgba(29, 27, 27, 0.822);
  font-size: 20px;
}

.button {
  background-color: #bac0cee3;
  // border: 1px solid rgba(250, 248, 245, 0.911);
  // border-radius: 25px;
  border: none;
}
</style>
