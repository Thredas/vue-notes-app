<script lang="ts" setup>
import { defineOptions, defineProps } from 'vue';

type ModalWindowProps = {
  isOpen: boolean;
  closeModalFunc: () => void;
};

defineOptions({ inheritAttrs: false });
defineProps<ModalWindowProps>();
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
  max-height: 100svh;
}

@media (max-width: 1200px) {
  .modal-window {
    border-radius: 0;
    height: 100svh;
    width: 100svw;
    padding: 0;
  }
}
</style>
