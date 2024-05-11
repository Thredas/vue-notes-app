<script setup lang="ts">
import { defineProps } from 'vue';

type MaterialIconProps = {
  name: string;
  outlined?: boolean;
};

defineProps<MaterialIconProps>();
</script>

<template>
  <span class="material-symbols-rounded" :class="{ outlined }">
    {{ name }}
  </span>
</template>

<style scoped>
.material-symbols-rounded {
  font-size: 18px;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 200, 'opsz' 20;
}

.material-symbols-rounded.outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' -25, 'opsz' 24;
}
</style>
