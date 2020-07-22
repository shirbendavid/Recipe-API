<template>
  <div class="container">
    <br />
    <div class="bold-line"></div>
    <div class="container">
      <div class="window">
        <div class="overlay"></div>
        <div class="content">
          <div class="welcome">Hello There!</div>
          <div class="subtitle">
            We're almost done.
            <br />
            Before using our services you need to create an account.
          </div>
          <br />
          <br />
          <br />

          <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
            <b-form-group
              id="input-group-username"
              label-cols-sm="3"
              label="User Name"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="$v.form.username.$model"
                type="text"
                :state="validateState('username')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.username.required">
                Username is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.username.length">
                Username length should be between 3-8 characters long
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.username.alpha">
                Username must contain only letters
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-firstName"
              label-cols-sm="3"
              label="First Name"
              label-for="firstName"
            >
              <b-form-input
                id="firstName"
                v-model="$v.form.firstName.$model"
                type="text"
                :state="validateState('firstName')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                First name is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-lastName"
              label-cols-sm="3"
              label="Last Name"
              label-for="lastName"
            >
              <b-form-input
                id="lastName"
                v-model="$v.form.lastName.$model"
                type="text"
                :state="validateState('lastName')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                Last name is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-country"
              label-cols-sm="3"
              label="Country"
              label-for="country"
            >
              <b-form-select
                id="country"
                v-model="$v.form.country.$model"
                :options="countries"
                :state="validateState('country')"
              ></b-form-select>
              <b-form-invalid-feedback>
                Country is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-Password"
              label-cols-sm="3"
              label="Password"
              label-for="password"
            >
              <b-form-input
                id="password"
                type="password"
                v-model="$v.form.password.$model"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.password.required">
                Password is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.password.length">
                Have length between 5-10 characters long
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.password.containsSpecial">
                The password must contain at least: one special character
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.password.containsNumber">
                The password must contain at least: one number
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-confirmedPassword"
              label-cols-sm="3"
              label="Confirm Password"
              label-for="confirmedPassword"
            >
              <b-form-input
                id="confirmedPassword"
                type="password"
                v-model="$v.form.confirmedPassword.$model"
                :state="validateState('confirmedPassword')"
              ></b-form-input>
              <b-form-invalid-feedback
                v-if="!$v.form.confirmedPassword.required"
              >
                Password confirmation is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback
                v-else-if="!$v.form.confirmedPassword.sameAsPassword"
              >
                The confirmed password is not equal to the original password
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-email"
              label-cols-sm="3"
              label="Email"
              label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                v-model="$v.form.email.$model"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.email.required">
                Email address is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.email.email">
                Email is not a properly formatted email address
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              id="input-group-image"
              label-cols-sm="3"
              label="Profile Picture (URL)"
              label-for="image"
              description="*Is not a required field, there is a default image for a new account."
            >
              <b-form-input
                id="image"
                type="text"
                v-model="$v.form.image.$model"
                :state="validateState('image')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.image.url">
                profile picture is only URL
              </b-form-invalid-feedback>
            </b-form-group>

            <button
              type="submit"
              variant="primary"
              style="width: 100%;"
              class="ghost-round full-width"
            >
              Create Account
            </button>
            <br />
            <b-button
              type="reset"
              variant="danger"
              style="border-radius: 25px;"
            >
              Reset
            </b-button>

            <div class="mt-2">
              You have an account already?
              <router-link to="login"><b>Log in here</b></router-link>
              <br />
              <br />
              <br />
            </div>
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show
          >
            Register failed: {{ form.submitError }}
          </b-alert>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import countries from '../assets/countries'
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url,
  regex,
  helpers,
} from 'vuelidate/lib/validators'
const containsNumber = helpers.regex('containsNumber ', /[0-9]/)
const containsSpecial = helpers.regex('containsSpecial ', /[#?!@$%^&*-]/)
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        firstName: '',
        lastName: '',
        country: null,
        password: '',
        confirmedPassword: '',
        email: '',
        image: '',
        submitError: undefined,
      },
      countries: [{ value: null, text: '', disabled: true }],
      errors: [],
      validated: false,
    }
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      country: {
        required,
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        containsNumber,
        containsSpecial,
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
      email: {
        required,
        email,
      },
      image: {
        url,
      },
    },
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries)
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param]
      return $dirty ? !$error : null
    },
    async Register() {
      if (this.form.image == '') {
        this.form.image =
          'https://res.cloudinary.com/dfhrbnvty/image/upload/v1591787513/propile_anfsci.jpg'
      }
      try {
        const response = await this.axios.post(
          this.$root.store.base_url + '/Register',
          {
            username: this.form.username,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
            image: this.form.image,
            password: this.form.password,
          },
        )
        this.$router.push('/login')
        // console.log(response);
      } catch (err) {
        console.log(err.response)
        this.form.submitError = err.response.data.message
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      // console.log("register method go");
      this.Register()
    },
    onReset() {
      this.form = {
        username: '',
        firstName: '',
        lastName: '',
        country: null,
        password: '',
        confirmedPassword: '',
        email: '',
        image: '',
      }
      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  max-width: 700px;
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
  background: -webkit-linear-gradient(#bec6d6, #bab0c0);
  background: linear-gradient(#ced3dd, #a196aa);
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
