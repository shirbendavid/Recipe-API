<template>
  <div id="app">
    <NavBar />
    <br />
    <router-view />
    <br />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: {
    NavBar,
  },
  name: "App",
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url(https://fonts.googleapis.com/css?family=Raleway);

#app {
  font-family: Raleway;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url("assets/2757336.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
