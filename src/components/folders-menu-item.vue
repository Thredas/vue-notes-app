<script setup>
import { defineProps, ref, onMounted } from 'vue';
import TextField from '@/components/ui/text-field.vue';
import { useNotesStore } from '@/stores/notesStore';
import { nanoid } from 'nanoid';

const props = defineProps(['id', 'name', 'icon', 'isActive', 'isForm']);
const notesStore = useNotesStore();
const { setNoteFolders } = useNotesStore();

const newFolderName = ref(null);
const inputRef = ref(null);

onMounted(() => inputRef.value && inputRef.value.focus());

const addToNoteFolders = () => {
  setNoteFolders([
    ...notesStore.noteFolders,
    { id: nanoid(), name: newFolderName.value },
  ]);
};
</script>

<template>
  <div
    class="folders-menu__item"
    :class="{ active: isActive, 'no-hover': isForm }"
  >
    <span
      class="folders-item-icon material-symbols-rounded"
      :class="{ outlined: !isActive }"
    >
      {{ icon ?? 'folder' }}
    </span>

    <span v-if="!isForm">{{ props.name }}</span>

    <form
      v-if="isForm"
      class="folders-menu__item__form"
      @submit.prevent
      @submit="addToNoteFolders"
    >
      <TextField
        ref="inputRef"
        v-model="newFolderName"
        @focusout="$emit('closeShallowNoteFolder')"
      />

      <!--      <CustomButton class="folders-menu__item__form__button" type="submit">-->
      <!--        <span class="material-symbols-rounded outlined">done</span>-->
      <!--      </CustomButton>-->
    </form>
  </div>
</template>

<style scoped>
.folders-menu__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 8px 16px;
  transition: 0.1s ease;
  color: var(--text-secondary);
}

.folders-menu__item:hover {
  background-color: var(--secondary);
}

.folders-menu__item.active {
  background-color: var(--secondary);
  color: var(--text-dark);
}

.folders-menu__item.active .folders-item-icon {
  color: var(--accent);
}

.folders-item-icon {
  font-size: 24px;
}

.folders-menu__item__form {
  display: flex;
  align-items: center;
  gap: 8px;
}

.folders-menu__item__form__button {
  background-color: transparent;
  color: var(--text-secondary);
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 4px;
}

.folders-menu__item__form__button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.no-hover {
  cursor: default !important;
}

.no-hover:hover {
  background-color: transparent;
}
</style>
