<script setup>
import NoteListItem from '@/components/note-list-item.vue';
import { useNotesStore } from '@/stores/notesStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const notesStore = useNotesStore();
const { notes, selectedFolderId } = storeToRefs(notesStore);

const filteredNotes = ref([...notes.value]);

watch(selectedFolderId, () => {
  if (!selectedFolderId.value) {
    filteredNotes.value = notes.value;
    return;
  }

  filteredNotes.value = notes.value.filter((note) =>
    note.folders?.includes(selectedFolderId.value)
  );
});
</script>

<template>
  <div v-if="filteredNotes.length > 0">
    <div class="note-list">
      <NoteListItem
        v-for="note in filteredNotes"
        :key="note.id"
        :id="note.id"
        :title="note.title"
        :text="note.text"
      />
    </div>
  </div>

  <div v-else class="empty-note-list-container">
    <span class="empty-note-list-text">
      There's no notes yet<br />
      Click "Add note" button to add one
    </span>
  </div>
</template>

<style scoped>
.note-list {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 256px;
  gap: 16px;
  padding: 32px 16px 32px 0;
}

.empty-note-list-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 128px;
}

.empty-note-list-text {
  color: #656565;
}
</style>
