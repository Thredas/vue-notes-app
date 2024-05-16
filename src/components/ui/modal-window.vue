<script lang="ts" setup>
import { computed, defineOptions, defineProps, ref } from 'vue';
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

const modalWindowRef = ref<HTMLDivElement | null>(null);

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

const startAnimScaleX = computed(() => {
  if (!startAnimInfo.value || !modalWindowRef.value) return '0';

  const startAnimWidth = startAnimInfo.value.width;
  const { width } = modalWindowRef.value.getBoundingClientRect();
  return (startAnimWidth / width).toFixed(2);
});

const startAnimScaleY = computed(() => {
  if (!startAnimInfo.value || !modalWindowRef.value) return '0';

  const startAnimHeight = startAnimInfo.value.height;
  const { height } = modalWindowRef.value.getBoundingClientRect();
  return (startAnimHeight / height).toFixed(2);
});

const closeModal = () => {
  setStartAnimInfo(null);
  props.closeModalFunc();
};
</script>

<template>
  <Transition>
    <div v-if="isOpen" class="modal-window__container" @click="closeModal">
      <div
        ref="modalWindowRef"
        class="modal-window"
        :class="$attrs.class"
        @click.stop
      >
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
  transition: opacity 200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition-delay: 0.1s;
}

.v-enter-active .modal-window {
  animation: bounce-in 0.2s both cubic-bezier(0.83, 0, 0.36, 1);
}

.v-leave-active .modal-window {
  animation: bounce-in 0.2s cubic-bezier(0.83, 0, 0.36, 1) reverse forwards;
}

@keyframes bounce-in {
  0% {
    transform: translate(v-bind(startAnimX), v-bind(startAnimY))
      scaleX(v-bind(startAnimScaleX)) scaleY(v-bind(startAnimScaleY));
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.modal-window {
  position: static;
  box-sizing: border-box;
  width: 700px;
  height: calc(100svh - 15%);
  background-color: var(--item-background);
  border-radius: 24px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  z-index: 3;
  max-height: 95svh;
}

@media (max-width: 1200px) {
  .modal-window {
    border-radius: 0;
    height: 100svh;
    max-height: 100svh;
    width: 100svw;
    padding: 0;
  }

  .v-leave-active .modal-window {
    border-radius: 32px;
  }
}
</style>
