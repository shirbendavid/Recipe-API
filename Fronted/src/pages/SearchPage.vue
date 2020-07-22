<template>
  <div class="container">
    <h1 class="title">What Do You Desire?</h1>
    <h2 class="title">Search for the perfect recipe</h2>
    <br />
    <div class="search">
      <div class="content">
        <b-row>
          <b-col>
            <b-form @submit.prevent="onSearch">
              <b-form-input
                id="searchWord"
                type="text"
                style="width: 100%;"
                class="ghost-round full-width"
                size="sm"
                placeholder="Search"
                v-model="form.searchWord"
                :state="validateState('searchWord')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.searchWord.required">
                search word is required
              </b-form-invalid-feedback>
              <b-form-group label="Amount:" label-cols-sm="4">
                <b-form-select
                  id="amount"
                  v-model="form.selectedNumber"
                  :options="numbersOptions"
                  size="sm"
                  class="mr-sm-1"
                  value-field="item"
                  text-field="name"
                ></b-form-select>
              </b-form-group>
              <b>Filters:</b>
              <b-form-group
                id="input-group-cuisine"
                label-cols-sm="4"
                label="Cuisine:"
                label-for="cuisine"
              >
                <b-form-select
                  id="cuisine"
                  v-model="form.selectedCuisine"
                  :options="cuisines"
                  size="sm"
                  class="mr-sm-2"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                id="input-group-diet"
                label-cols-sm="4"
                label="Diet:"
                label-for="diet"
              >
                <b-form-select
                  id="diet"
                  v-model="form.selectedDiet"
                  :options="diets"
                  size="sm"
                  class="mr-sm-2"
                ></b-form-select>
              </b-form-group>
              <b-form-group
                id="input-group-intolerance"
                label-cols-sm="4"
                label="Intolerance:"
                label-for="intolerance"
              >
                <b-form-select
                  id="intolerance"
                  v-model="form.selectedIntolerance"
                  :options="intolerances"
                  size="sm"
                  class="mr-sm-2"
                ></b-form-select>
              </b-form-group>

              <b-form-group label="Sort by:">
                <b-form-radio
                  v-model="form.selectedSort"
                  name="some-radios"
                  value="aggregateLikes"
                >
                  Recipe popularity
                </b-form-radio>
                <b-form-radio
                  v-model="form.selectedSort"
                  name="some-radios"
                  value="readyInMinutes"
                >
                  Preparation time
                </b-form-radio>
              </b-form-group>
              <b-button
                size="sm"
                class="ghost-round"
                type="submit"
                style="width: 30%; cursor: pointer;"
              >
                Search
              </b-button>
            </b-form>
          </b-col>
          <b-col v-if="recipes.length == 0">
            <img
              src="../assets/search.jpg"
              style="width: 100%; border-radius: 25px; opacity: 0.75;"
            />
          </b-col>
          <b-col v-else>
            <RecipePreviewList
              class="RandomRecipes"
              :recipes="recipes"
              title="Search Results:"
            />
          </b-col>
        </b-row>
      </div>
    </div>

    <br />
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import RecipePreviewList from '../components/RecipePreviewList'
import cuisine from '../assets/cuisine'
import diet from '../assets/diet'
import intolerance from '../assets/intolerance'
export default {
  name: 'Search',
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      form: {
        searchWord: '',
        selectedNumber: '5',
        selectedCuisine: '',
        selectedDiet: '',
        selectedIntolerance: '',
        selectedSort: '',
      },
      validated: false,
      numbersOptions: [
        { item: '5', name: '5' },
        { item: '10', name: '10' },
        { item: '15', name: '15' },
      ],

      cuisines: [{ value: '', text: '', disabled: false }],

      diets: [{ value: '', text: '', disabled: false }],

      intolerances: [{ value: '', text: '', disabled: false }],

      recipes: [],
    }
  },
  validations: {
    form: {
      searchWord: {
        required,
      },
    },
  },
  mounted() {
    this.cuisines.push(...cuisine)
    this.diets.push(...diet)
    this.intolerances.push(...intolerance)
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param]
      return $dirty ? !$error : null
    },
    async searchRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.base_url +
            '/recipes/search/query/' +
            this.form.searchWord +
            '/amount/' +
            this.form.selectedNumber,
          {
            params: {
              cuisine: this.form.selectedCuisine,
              diet: this.form.selectedDiet,
              intolerances: this.form.selectedIntolerance,
            },
          },
        )
        if (response.status == 205) {
          this.$root.toast(
            'Not Fount',
            'Search not found, try again!',
            'failed',
          )
        } else {
          console.log(response)
          const recipes = response.data
          //sort by ready in minutes
          if (this.form.selectedSort == 'readyInMinutes') {
            recipes.sort((a, b) => {
              return a[this.form.selectedSort] > b[this.form.selectedSort]
                ? 1
                : -1
            })
          }
          //sort by likes
          else if (this.form.selectedSort == 'aggregateLikes') {
            recipes.sort((a, b) => {
              return a[this.form.selectedSort] > b[this.form.selectedSort]
                ? -1
                : 1
            })
          }

          this.recipes = []
          this.recipes.push(...recipes)
          //store last search
          if (this.$root.store.username) {
            let haveUser = false
            let search_recipes = JSON.parse(
              localStorage.getItem('searchRecipes'),
            )
            for (let i = 0; i < search_recipes.length; i++) {
              if (search_recipes[i].username === this.$root.store.username) {
                search_recipes[i].recipes = this.recipes
                haveUser = true
              }
            }
            if (!haveUser) {
              search_recipes.push({
                username: this.$root.store.username,
                recipes: this.recipes,
              })
            }
            this.$root.store.addSearchRecipes(search_recipes)
            console.log(this.$root.store.searchRecipes)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    onSearch() {
      // console.log("register method called");
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        return
      }
      // console.log("register method go");
      this.searchRecipes()
    },
  },
  async created() {
    if (this.$root.store.username) {
      console.log(JSON.parse(localStorage.getItem('searchRecipes')))
      //first time for search
      if (this.$root.store.searchRecipes.length == 0) {
        this.$root.store.addSearchRecipes([
          {
            username: this.$root.store.username,
            recipes: [],
          },
        ])
        console.log(this.$root.store.searchRecipes)
      } else {
        let search_recipes = JSON.parse(localStorage.getItem('searchRecipes'))
        for (let i = 0; i < search_recipes.length; i++) {
          console.log('ok for')
          if (search_recipes[i].username == this.$root.store.username) {
            this.recipes.push(...search_recipes[i].recipes)
          }
        }
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.RandomRecipes {
  width: 550px;
  margin: 0 auto;
}
.search {
  margin: 6px;
  padding: 8px;
  background: rgba(26, 26, 26, 0.74);

  opacity: 0.997;
  width: 100%;
  color: #fff;

  //margin: auto;
  font-size: large;
  border-radius: 20px;
}

@import url('https://fonts.googleapis.com/css?family=Special+Elite');
.title {
  font-family: 'Special Elite';
  color: #fff;
  text-align: center;
}
.b-form-input:focus {
  outline: none;
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
.ghost-round:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.ghost-round {
  background: rgba(177, 177, 177, 0.733);
  border: 1px solid rgba(255, 255, 255, 0.822);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.589);
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
.mr-sm-2 {
  width: 200px;
}
.mr-sm-1 {
  width: 70px;
}
.full-width {
  width: 100%;
}
</style>
