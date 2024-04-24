<script setup>
import { onMounted, watch } from 'vue';

import AppHeader from '@/components/app-header.vue';
import NoteList from '@/components/note-list.vue';
import NoteForm from '@/components/note-form.vue';
import FoldersMenu from '@/components/folders-menu.vue';

import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import NoteInfo from '@/components/note-info.vue';

const notesStore = useNotesStore();
const { isLoading, showNoteInfo, showNoteForm } = storeToRefs(notesStore);
const { setIsLoading, setNotes } = notesStore;

onMounted(async () => {
  const savedNotesLocalStorage = localStorage.getItem('notes');
  const parsedNotes = await JSON.parse(savedNotesLocalStorage);

  if (parsedNotes) setNotes([...parsedNotes]);
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
      <NoteInfo v-if="showNoteInfo" />
      <NoteForm v-if="showNoteForm" />
    </div>
  </div>
</template>

<style>
.app-container-wrapper {
  display: flex;
  justify-content: center;
}

.app-container {
  flex: 1;
  display: flex;
  gap: 48px;
  max-width: 1280px;
  margin-top: 64px;
}
</style>

<style src="./main.css"></style>
<style src="./quill-styles.css"></style>
