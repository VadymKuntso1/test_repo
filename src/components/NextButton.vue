<template>
  <button :style="[isRotated?{ 'transform': 'rotate(180deg)' } : {} ]"></button>
</template>

<script>
  export default {
    name: 'NextButton',
    props: {
      isRotated: {
        type: String,
        required: false
      }
    },
    data() {
      return{
      }
    }
  }
</script>

<style scoped>
button {
  width: 48px;
  height: 48px;
  background-color: #fff;
  border-radius: 48px;
  border: 2px solid #f2af29;
  transition: all 0.3s ease;
}

button::after {
  content: "\279C";
  font-size: 18px;
  color: #f2af29;
  transition: all 0.3s ease;
}

button:hover {
  border-color: #14519f;
}

button:hover::after {
  color: #14519f;
}

</style>