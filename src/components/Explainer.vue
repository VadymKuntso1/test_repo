<template>
  <LanguageToggle :change-locale="setLocale"/>

  <BaseExplainerComponent :is-showing="this.stage === 0">
    <p class="welcomeText">
      {{ $t('welcome') }}
    </p>
  </BaseExplainerComponent>

  <BaseExplainerComponent :is-showing="this.stage === 1">
    <div>
      <p>{{ $t('firstTitle') }}</p>
      <p>{{ $t('firstDescription') }}</p>
    </div>
    <div>
      <video
          ref="videoRef"
          src="../assets/video/Video.mp4"
          id="video-container"
          width="100%" autoplay></video>
    </div>
  </BaseExplainerComponent>

  <BaseExplainerComponent :is-showing="this.stage === 2">
    <div>
      <img src="../assets/images/Delone.jpg" alt="">
    </div>
    <div>
      <p>{{ $t('secondTitle') }}</p>
      <p>{{ $t('secondDescription') }}</p>
    </div>
  </BaseExplainerComponent>

  <BaseExplainerComponent :is-showing="this.stage === 3">
    <div>
      <p>{{ $t('thirdTitle') }}</p>
      <p>{{ $t('thirdDescription') }}</p>
    </div>
  </BaseExplainerComponent>

  <div class="buttonsContainer">
    <NextButton v-if="stage>0" is-rotated="true" @click="stage = stage - 1"/>
    <NextButton @click="this.nextStage"/>
  </div>
</template>

<script>
  import LanguageToggle from "./LanguageToggle.vue";
  import NextButton from "./NextButton.vue";
  import BaseExplainerComponent from '../components/base/BaseExplainerComponent.vue';
  import { useI18n } from "vue-i18n";
  export default {
    name: 'Explainer',
    components: { LanguageToggle, NextButton, BaseExplainerComponent },
    props: {
      changeWidget: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        stage: 0
      }
    },
    setup() {
      const { t } = useI18n({
      });
      return {
        t
      };
    },
    methods: {
      setLocale() {
        //Function that defines the initial language for the user
        this.$i18n.locale = localStorage.getItem('lang') === 'ua' ? 'en' : 'ua';
        localStorage.setItem('lang', this.$i18n.locale);
      },
      nextStage() {
        // Check is next explainer block exist and showing other component
        if (this.stage === 3){
          this.changeWidget();
        } else {
          this.stage = this.stage + 1
        }
      }
    },
  }
</script>

<style>
  .welcomeText{
    font-size: 150px;
  }
  .buttonsContainer{
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100svw;
    display: flex;
    justify-content: space-around;
  }

</style>