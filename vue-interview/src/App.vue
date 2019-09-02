<template>
  <div id="application">
    <h1>Pics of Pups</h1>
    <main class='wrapper'>
      <aside id="list">
        <div class='search'>
          <font-awesome-icon icon="search" />
          <input type="text" id="search" placeholder="Search" value='' v-model="textSearch" />
        </div>
        <VuePerfectScrollbar ref="scrollList" class="scroll-area" :settings="settings">
          <ul v-if="dogsFilter && dogsFilter.length">
            <li v-for="dog in dogsFilter" v-bind:key="dog['name']">
              <router-link active-class="is-active" class="link" :to="{ name: 'dog', params: { dog: dog['name'] } }">{{ dog['name'] | titleCase }} <font-awesome-icon icon="arrow-right" /></router-link>
              <ul v-if='dog.subBreeds.length > 0'>
                <li v-for="breed in dog.subBreeds" v-bind:key="breed['name']">
                  <router-link active-class="is-active" v-if="breed.show" class="link" :to="{ name: 'dog', params: { dog: breed['name'] + ' ' +  dog['name'] } }">{{ breed['name'] | titleCase }} {{  dog['name'] | titleCase }} <font-awesome-icon icon="arrow-right" /></router-link>
                </li>
              </ul>
            </li>
          </ul>
        </VuePerfectScrollbar>
      </aside>
      <div id="detail">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'PupPics',
  components: {
    VuePerfectScrollbar
  },
  props:['dog'],
  data () {
    return {
      settings: {
        maxScrollbarLength: 80,
        minScrollbarLength: 30
      },
      dogs: [],
      textSearch: "",
      endpoint: 'https://dog.ceo/api/breeds/list/all'      
    }
  },
  computed: {
    dogsFilter: function() {
      var textSearch = this.textSearch;
      return this.dogs.filter(function(el) {
        var keepEl = false;
        var hasBreed = el.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
        var hasSubBreed = 0;
        if (el.subBreeds.length > 0) {
          if (hasBreed == false) { 
            el.subBreeds.forEach(element => {
              hasSubBreed = (element.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1) ? hasSubBreed + 1 : hasSubBreed;
              element.show = element.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
            });
          } else {
            el.subBreeds.forEach(element => {
              element.show = true;
            });
          }
        } else {
          hasSubBreed = false;
        }
        if (hasBreed || hasSubBreed) {
          keepEl = true;
        }
        return keepEl;
      });
    }
  },

  created() {
    this.getAllDogs();
  },

  methods: {
    updateScroll() {
      this.$refs.scrollList.ps.update();
      this.$refs.scrollList.$el.scrollTop = 0;
    },
    getAllDogs() {
      axios.get(this.endpoint)
        .then(response => {
          var dogBreeds = response.data.message, dogs = [];

          Object.keys(dogBreeds).forEach(function(key) {
            var dog = {}, subBreeds = [];
            dog.name = key;

            if (dogBreeds[key].length > 0) {
              dogBreeds[key].forEach(function(key2) {
                var subBreed = {}
                subBreed.name = key2;
                subBreed.show = true;
                
                subBreeds.push(subBreed);
              });
            }
            dog.subBreeds = subBreeds;
            dogs.push(dog);
          });
          this.dogs = dogs;
          this.$refs.scrollList.ps.update();
          
        })
        .catch(error => {
          window.console.log('-----error-------');
          window.console.log(error);
        })
    }
  },
  watch: {
    // whenever question changes, this function will run
    dogsFilter: function () {
      this.updateScroll()
    }
  }
}
</script>

<style lang="scss">
  @import 'scss/style.scss'
</style>
