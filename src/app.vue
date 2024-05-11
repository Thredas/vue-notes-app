<script lang="ts" setup>
import { onMounted, watch } from 'vue';
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';

import AppHeader from '@/components/app-header.vue';
import NoteList from '@/components/note-list.vue';
import NoteForm from '@/components/note-form.vue';
import FoldersMenu from '@/components/folders-menu.vue';
import NoteInfo from '@/components/note-info.vue';
import CustomButton from '@/components/ui/custom-button.vue';
import MaterialIcon from '@/components/ui/material-icon.vue';

const notesStore = useNotesStore();
const { isLoading, showNoteInfo, showNoteForm } = storeToRefs(notesStore);
const { setIsLoading, setNotes, setNoteFolders, toggleNoteForm } = notesStore;

onMounted(async () => {
  const savedNotesLocalStorage = localStorage.getItem('notes');
  const savedFoldersFromLocalStorage = localStorage.getItem('noteFolders');

  if (savedNotesLocalStorage) {
    const parsedNotes = await JSON.parse(savedNotesLocalStorage);
    setNotes([...parsedNotes]);
  }

  if (savedFoldersFromLocalStorage) {
    const parsedFolders = await JSON.parse(savedFoldersFromLocalStorage);
    setNoteFolders([...parsedFolders]);
  }

  setIsLoading(false);
});

watch([showNoteInfo, showNoteForm], (currentValues) => {
  if (currentValues[0] || currentValues[1]) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<template>
  <AppHeader />

  <div class="app-container-wrapper">
    <div v-if="!isLoading" class="app-container">
      <FoldersMenu />
      <NoteList />

      <NoteInfo />
      <NoteForm />

      <CustomButton class="add-note-fab" @click="toggleNoteForm">
        <MaterialIcon name="note_stack_add" />
      </CustomButton>
    </div>
  </div>
</template>

<style>
.app-container-wrapper {
  position: static;
  display: flex;
  justify-content: center;
}

.app-container {
  position: relative;
  flex: 1;
  display: flex;
  gap: 48px;
  max-width: 1280px;
  margin-top: 66px;
}

.add-note-fab {
  position: fixed !important;
  bottom: 32px;
  right: calc(50% - 610px);
  width: 64px;
  height: 64px;
  background-color: var(--primary);
  color: var(--text-light);
  border-radius: 50% !important;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
}

.add-note-fab:hover {
  background-color: var(--primary-hover);
}

.add-note-fab .material-symbols-rounded {
  font-size: 28px;
}

@media (max-width: 1280px) {
  .add-note-fab {
    right: 32px;
  }
}

@media (max-width: 1200px) {
  .app-container {
    display: block;
  }
}

@media (max-width: 600px) {
  .add-note-fab {
    bottom: 16px;
    right: 16px;
  }
}
</style>

<style src="./main.css"></style>
<style src="./quill-styles.css"></style>
