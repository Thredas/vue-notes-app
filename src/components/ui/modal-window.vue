<script lang="ts" setup>
import { computed, defineOptions, defineProps } from 'vue';
import { useListAnimationStore } from '@/stores/listAnimationStore';
import { storeToRefs } from 'pinia';

type ModalWindowProps = {
  isOpen: boolean;
  closeModalFunc: () => void;
};

defineOptions({ inheritAttrs: false });
const props = defineProps<ModalWindowProps>();

const animStore = useListAnimationStore();
const { startAnimInfo } = storeToRefs(animStore);
const { setStartAnimInfo } = animStore;

const startAnimX = computed(() => {
  if (startAnimInfo.value) {
    const { left, width } = startAnimInfo.value;
    return `${left - window.innerWidth / 2 + width / 2}px`;
  } else {
    return '0px';
  }
});

const startAnimY = computed(() => {
  if (startAnimInfo.value) {
    const { top, height } = startAnimInfo.value;
    return `${top - window.innerHeight / 2 + height / 2}px`;
  } else {
    return '0px';
  }
});

const startAnimWidth = computed(() =>
  startAnimInfo.value ? startAnimInfo.value.width / 700 : '0'
);

const startAnimHeight = computed(() =>
  startAnimInfo.value ? startAnimInfo.value.height / 960 : '0'
);

const closeModal = () => {
  setStartAnimInfo(null);
  props.closeModalFunc();
};
</script>

<template>
  <Transition>
    <div v-if="isOpen" class="modal-window__container" @click="closeModal">
      <div class="modal-window" :class="$attrs.class" @click.stop>
        <slot></slot>
      </div>
    </div>
  </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition-delay: 0.1s;
}

.v-enter-active .modal-window {
  animation: bounce-in 0.2s both cubic-bezier(0.17, 0.67, 0.83, 0.67);
}

.v-leave-active .modal-window {
  animation: 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67) reverse forwards
    bounce-in;
}

@keyframes bounce-in {
  0% {
    transform: translate(v-bind(startAnimX), v-bind(startAnimY))
      scaleX(v-bind(startAnimWidth)) scaleY(v-bind(startAnimHeight));
  }
  50% {
    transform: translate(0, 0) scale(1.023);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
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
