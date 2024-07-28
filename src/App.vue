<template>
  <div v-if="explainerEnded">
    <MainPage/>
  </div>
  <div v-else>
    <Explainer :change-widget="()=>this.explainerEnded = true"/>
  </div>

</template>

<script>
  import MainPage from './components/MainPage.vue';
  import Explainer from './components/Explainer.vue';

  export default {
  name: 'App',
  components: { MainPage, Explainer },
  setup() {
    localStorage.setItem('lang', 'ua');
  },
  data() {
    return{
      explainerEnded: false
    }
  },
}
</script>