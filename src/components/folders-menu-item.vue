<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
import TextField from '@/components/ui/text-field.vue';
import { useNotesStore } from '@/stores/notesStore';

type FolderMenuItemProps = {
  id?: string;
  name?: string;
  icon?: string | null;
  isActive?: boolean;
  isForm?: boolean;
};

defineProps<FolderMenuItemProps>();
const { addNoteFolder, deleteNoteFolder } = useNotesStore();

const newFolderName = ref(null);
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => inputRef.value && inputRef.value.focus());
</script>

<template>
  <div
    class="folders-menu__item"
    :class="{ active: isActive, 'no-hover': isForm }"
  >
    <div class="folders-menu__item__title_container">
      <span
        class="folders-item-icon material-symbols-rounded"
        :class="{ outlined: !isActive }"
      >
        {{ icon ?? 'folder' }}
      </span>

      <span v-show="!isForm">{{ name }}</span>
    </div>

    <form
      v-show="isForm"
      class="folders-menu__item__form"
      @submit.prevent
      @submit="addNoteFolder(newFolderName as string)"
    >
      <TextField
        ref="inputRef"
        v-model="newFolderName"
        @focusout="$emit('closeShallowNoteFolder')"
      />
    </form>

    <CustomButton
      v-show="!isForm && !icon"
      class="folders-menu__item__form__button"
      @click.stop
      @click="deleteNoteFolder(id as string)"
    >
      <span class="material-symbols-rounded">delete</span>
    </CustomButton>
  </div>
</template>

<style scoped>
.folders-menu__item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  padding: 8px 16px;
  transition: 0.08s ease;
  color: var(--text-secondary);
}

.folders-menu__item:hover {
  background-color: var(--secondary);
}

.folders-menu__item__title_container {
  display: flex;
  align-items: center;
  gap: 12px;
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
  opacity: 0;
}

.folders-menu__item__form__button:hover {
  background-color: transparent !important;
  color: var(--danger);
}

.folders-menu__item:hover .folders-menu__item__form__button {
  opacity: 1;
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
