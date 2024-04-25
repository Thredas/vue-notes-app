<script setup>
import NoteListItem from '@/components/note-list-item.vue';
import { useNotesStore } from '@/stores/notesStore';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

const notesStore = useNotesStore();
const { notes, selectedFolderId, searchQuery } = storeToRefs(notesStore);

const notesFilteredByFolder = ref([...notes.value]);
const notesFilteredBySearchQuery = ref([...notesFilteredByFolder.value]);

watchEffect(() => {
  if (selectedFolderId.value) {
    notesFilteredByFolder.value = notes.value.filter((note) => {
      return note.folders?.includes(selectedFolderId.value);
    });
  } else {
    notesFilteredByFolder.value = [...notes.value];
  }

  if (searchQuery.value) {
    const formattedSearchQuery = searchQuery.value.toLowerCase().trim();

    notesFilteredBySearchQuery.value = notesFilteredByFolder.value.filter(
      (note) => {
        const formattedTitle = note.title?.toLowerCase().trim();
        const formattedText = note.text
          ?.toLowerCase()
          .trim()
          .replace(/<[^>]*>/g, ''); // remove all html tags

        return (
          formattedTitle?.includes(formattedSearchQuery) ||
          formattedText?.includes(formattedSearchQuery)
        );
      }
    );
  } else {
    notesFilteredBySearchQuery.value = [...notesFilteredByFolder.value];
  }
});
</script>

<template>
  <div v-if="notesFilteredBySearchQuery.length > 0">
    <div class="note-list">
      <NoteListItem
        v-for="note in notesFilteredBySearchQuery"
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
