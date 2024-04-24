<script setup>
import { defineOptions, defineProps } from 'vue';

defineOptions({
  inheritAttrs: false,
});

defineProps(['isOpen', 'closeModalFunc']);
</script>

<template>
  <div class="modal-window__container" @click="closeModalFunc">
    <div class="modal-window" :class="$attrs.class" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-window__container {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-window {
  position: static;
  box-sizing: border-box;
  width: 700px;
  padding: 24px;
  background-color: var(--item-background);
  border-radius: 24px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  z-index: 3;
}
</style>
