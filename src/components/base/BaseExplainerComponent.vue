<template>
  <div class="container" v-if="this.isShowing">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    // A styled component for displaying a welcome messages
    name: "BaseExplainerComponent",
    props: {
      isShowing: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
      }
    }
  }
</script>

<style>
  .container{
    display: flex;
    justify-content: space-around;
    animation: 2s linear slideIn;
  }
  .container>div{
    width: 50%;
  }
  .container>div:first-child{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .container>div>p:first-child{
    font-size: 50px;
  }
  .container>div>p:last-child{
    font-size: 30px;
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(100%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
</style>