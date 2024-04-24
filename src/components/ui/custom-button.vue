<script>
export default {
  name: 'CustomButton',
  props: {
    additionalClass: String,
  },
};
</script>

<template>
  <button class="button" :class="additionalClass"><slot></slot></button>
</template>

<style scoped>
.button {
  font-family: 'Golos Text', sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 0;
  cursor: pointer;
  transition: 0.1s ease;
}
</style>
