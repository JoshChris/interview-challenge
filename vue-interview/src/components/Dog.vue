<template lang="html">
  <div class="dog" v-if="dog">
    <h2>{{ dog | titleCase }}</h2>
    <div class="image">
        <img v-bind:src="image" />
    </div>
  </div>
</template>



<script>
  import axios from 'axios'
  
  export default {
    props: ['dog'],
    methods: {
      getDog(dog) {
        this.name = dog;
        let dogObj = dog.split(" ");
        let breed = (dog.indexOf(' ') >= 0) ? dogObj[1] : dogObj[0]; //if theres a space in the dog name, then the object is the breed and the sub breed
        let subBreed = (dog.indexOf(' ') >= 0) ? dogObj[0] : null;  //otherwise, it's just the breed.
        let endpoint = (subBreed) ? this.endpoint + breed + '/' + subBreed + '/images/random' : this.endpoint + breed + '/images/random';
        axios(endpoint)
          .then(response => {
            this.image = response.data.message
          })
          .catch( error => {
            window.console.log('Axios Retrieval Error:');
            window.console.log(error)
          })
      }
    },

    data() {
      return {
        name: null,
        image: null,
        endpoint: 'https://dog.ceo/api/breed/',
      }
    },
    
    created() {
      this.getDog(this.dog);
    },
    
    watch: {
      '$route'() {
        this.image = null;
        this.getDog(this.dog);
      }
    }
  }
</script>