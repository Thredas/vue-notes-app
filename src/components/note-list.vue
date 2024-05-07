<script lang="ts" setup>
import { useNotesStore } from '@/stores/notesStore';
import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';

import NoteListItem from '@/components/note-list-item.vue';

const notesStore = useNotesStore();
const { notes, selectedFolderId, searchQuery, PINNED_FOLDER_ID } =
  storeToRefs(notesStore);

const notesFilteredByFolder = ref(notes.value);
const notesFilteredBySearchQuery = ref(notesFilteredByFolder.value);

const pinnedNotes = computed(() =>
  notesFilteredBySearchQuery.value
    .filter((arrNote) => arrNote.isPinned)
    .sort((a, b) => {
      if (a.updateDate && b.updateDate) {
        return b.updateDate - a.updateDate;
      } else {
        return -1;
      }
    })
);

const notPinnedNotes = computed(() =>
  notesFilteredBySearchQuery.value
    .filter((arrNote) => !arrNote.isPinned)
    .reverse()
);

watchEffect(() => {
  if (selectedFolderId.value === PINNED_FOLDER_ID.value) {
    notesFilteredByFolder.value = notes.value.filter((note) => note.isPinned);
  } else if (selectedFolderId.value) {
    notesFilteredByFolder.value = notes.value.filter((note) => {
      return note.folders?.includes(selectedFolderId.value!);
    });
  } else {
    notesFilteredByFolder.value = notes.value;
  }

  // Search logic
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
    <div class="note-list__pinned__container" v-show="pinnedNotes.length > 0">
      <span
        v-show="selectedFolderId !== PINNED_FOLDER_ID"
        class="note-list__pinned__title"
      >
        <span class="folders-item-icon material-symbols-rounded">keep</span>
        Pinned notes
      </span>

      <div class="note-list__pinned">
        <TransitionGroup name="list">
          <NoteListItem
            v-for="note in pinnedNotes"
            :key="note.id"
            :note="note"
          />
        </TransitionGroup>
      </div>
    </div>

    <div class="note-list">
      <TransitionGroup name="list">
        <NoteListItem
          v-for="note in notPinnedNotes"
          :key="note.id"
          :note="note"
        />
      </TransitionGroup>
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
  position: relative;
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

.note-list__pinned {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 256px;
  gap: 16px;
  padding: 16px 16px 32px 0;
}

.note-list__pinned__container {
  padding-top: 16px;
}

.note-list__pinned__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 0 8px;
  color: var(--text-secondary);
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}

@media (max-width: 1200px) {
  .note-list {
    padding: 6px;
    gap: 6px;
  }

  .note-list__pinned {
    padding: 16px 0 32px;
    gap: 6px;
  }

  .note-list__pinned__container {
    padding: 6px;
  }

  .note-list__pinned__title {
    margin-top: 16px;
  }
}
</style>
