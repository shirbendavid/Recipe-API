<template>
  <div class="container">
    <br />
    <br />
    <div class="bold-line"></div>
    <div class="container">
      <div class="window">
        <div class="overlay"></div>
        <div class="content">
          <div class="welcome">Welcome!</div>
          <div class="subtitle">Log into your account.</div>
          <br />
          <br />
          <br />
          <b-form @submit.prevent="onLogin">
            <b-form-group
              id="input-group-Username"
              label-cols-sm="3"
              label="User Name"
              label-for="Username"
            >
              <b-form-input
                id="Username"
                v-model="$v.form.username.$model"
                type="text"
                :state="validateState('username')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Username is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-Password"
              label-cols-sm="3"
              label="Password"
              label-for="Password"
            >
              <b-form-input
                id="Password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Password is required
              </b-form-invalid-feedback>
            </b-form-group>

            <button
              type="submit"
              variant="primary"
              style="width: 100%; display: block;"
              class="ghost-round full-width"
            >
              Login
            </button>
            <div class="mt-2">
              Do not have an account yet?
              <router-link to="register">Register in here</router-link>
            </div>
            <br />
            <br />
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Login failed: {{ form.submitError }}
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        submitError: undefined,
      },
    }
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param]
      return $dirty ? !$error : null
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + '/Login',
          {
            username: this.form.username,
            password: this.form.password,
            // withCredentials: true,
          },
        )
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login)
        this.$root.store.login(this.form.username)

        const favoriteRecipes = await this.axios.get(
          this.$root.store.base_url + '/user/myFavorites',
        )
        //save favorite recipes
        console.log(favoriteRecipes)
        this.$root.store.addFavoriteRecipes(favoriteRecipes.data)
        console.log(this.$root.store.favoriteRecipes)
        //save profile picture
        const picture = await this.axios.get(
          this.$root.store.base_url + '/user/getPorfilePicture',
        )
        console.log(picture.data)
        this.$root.store.addProfilePicture(picture.data)

        window.location = 'pages/MainPage'
      } catch (err) {
        console.log(err.response)
        this.form.submitError = err.response.data.message
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      // console.log("login method go");

      this.Login()
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}

@import url(https://fonts.googleapis.com/css?family=Raleway);
body,
html {
  margin: 0;
  height: 100%;
}

input {
  border: none;
}

button:focus {
  outline: none;
}

::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.65);
}

::-webkit-input-placeholder .input-line:focus + ::input-placeholder {
  color: #fff;
}

.highlight {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s ease;
}

.highlight:hover {
  color: #fff;
  transition: color 0.2s ease;
}

.spacing {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 120px;
  font-weight: 300;
  text-align: center;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.65);
}

.input-line:focus {
  outline: none;
  border-color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ghost-round {
  cursor: pointer;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.65);
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
}

.ghost-round:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.input-line {
  background: none;
  margin-bottom: 10px;
  line-height: 2.4em;
  color: #fff;
  font-family: Raleway;
  font-weight: 300;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
  font-size: 19px;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.65);
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.full-width {
  width: 100%;
}

.input-fields {
  margin-top: 25px;
}

/*.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #eee;
  height: 100%;
}*/

.content {
  padding-left: 25px;
  padding-right: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  z-index: 5;
}

.welcome {
  font-weight: 200;
  margin-top: 75px;
  text-align: center;
  font-size: 40px;
  font-size: 2.5rem;
  letter-spacing: 0px;
  letter-spacing: 0.05rem;
}

.subtitle {
  text-align: center;
  line-height: 1em;
  font-weight: 100;
  letter-spacing: 0px;
  letter-spacing: 0.02rem;
}

.menu {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
}

.window {
  z-index: 100;
  color: #fff;
  font-family: Raleway;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
  -ms-flex-flow: column;
  flex-flow: column;
  box-shadow: 0px 15px 50px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  //height: 860px;
  // width: 500px;
  background: #fff;
  background: url('https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823')
    top left no-repeat;
}

.overlay {
  background: -webkit-linear-gradient(#bec6d6, #6b656e);
  background: linear-gradient(#ced3dd, #746c7a);
  opacity: 0.95;
  filter: alpha(opacity=85);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
  border-radius: 15px;
}

.bold-line {
  background: #e7e7e7;
  position: absolute;
  top: 0px;
  bottom: 0px;
  margin: auto;
  //width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  background: url('https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823')
    left no-repeat;
  background-size: cover;
}

@media (max-width: 600px) {
  .window {
    width: 100%;
    height: 100%;
  }
  .overlay {
    width: 100%;
    height: 100%;
  }
}
</style>
