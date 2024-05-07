import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useListAnimationStore = defineStore('listAnimationStore', () => {
  const startAnimInfo = ref<DOMRect | null>(null);

  const setStartAnimInfo = (newStartAnimInfo: DOMRect | null) => {
    startAnimInfo.value = newStartAnimInfo;
  };

  return {
    startAnimInfo,
    setStartAnimInfo,
  };
});
