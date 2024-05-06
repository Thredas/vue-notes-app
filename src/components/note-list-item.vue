<script lang="ts" setup>
import { defineProps } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useNotesStore } from '@/stores/notesStore';
import { Note } from '@/types';

type NoteListItemProps = {
  note: Note;
};

const props = defineProps<NoteListItemProps>();

const notesStore = useNotesStore();
const { setCurrentNote, toggleNoteInfo, toggleIsNotePinned } = notesStore;

const openNoteInfo = () => {
  setCurrentNote(props.note.id);
  toggleNoteInfo();
};
</script>

<template>
  <button class="note-item" @click="openNoteInfo">
    <span class="note-item__title">
      <span class="note-item__title_text">{{ note.title }}</span>

      <span class="note-item__buttons">
        <CustomButton
          class="note-item__button"
          @click.stop
          @click="toggleIsNotePinned(note.id)"
        >
          <span
            class="material-symbols-rounded"
            :class="{ outlined: !note.isPinned }"
          >
            keep
          </span>
        </CustomButton>

        <CustomButton class="note-item__button" @click.stop>
          <span class="material-symbols-rounded">more_vert</span>
        </CustomButton>
      </span>
    </span>

    <span class="note-item__text-container">
      <quill-editor :content="note.text" content-type="html" theme="" read-only>
      </quill-editor>
    </span>
  </button>
</template>

<style scoped>
.note-item {
  font-family: 'Golos Text', sans-serif;
  text-align: start;
  box-sizing: border-box;
  position: relative;
  flex: 1;
  min-width: 311px;
  max-width: 311px;
  height: 360px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 24px;
  border: 2px rgba(17, 17, 17, 0.1) solid;
  background-color: var(--item-background);
  //cursor: pointer;
  transition: 0.15s ease;
  overflow: hidden;
}

.note-item:hover {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border: 2px #2563eb solid;
}

.note-item__title {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
}

.note-item__title_text {
  display: -webkit-box;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-dark);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-item__text-container {
  max-height: 280px;
  overflow: hidden;
}

:global(.note-item__text-container .ql-editor) {
  overflow: hidden;
}

:global(
    .note-item__text-container .ql-container.ql-disabled .ql-editor.ql-blank
  ) {
  padding: 0 !important;
}

.note-item__buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-item__button {
  padding: 4px !important;
  border-radius: 8px;
  color: var(--text-secondary);
  background-color: transparent;
}

.note-item__button:hover {
  background-color: var(--secondary);
}

@media (max-width: 1200px) {
  .note-item {
    flex: 1;
    min-width: 170px;
    max-width: calc(50%);
    height: 270px;
    padding: 16px;
    border-radius: 16px;
    gap: 8px;
  }

  .note-item__title {
    gap: 4px;
  }

  .note-item__buttons {
    gap: 4px;
  }

  .note-item__title_text {
    font-size: 16px;
  }

  .note-item__text-container {
    max-height: 280px;
    overflow: hidden;
  }

  :global(
      .note-item__text-container .ql-container.ql-disabled .ql-editor.ql-blank
    ) {
    font-size: 14px;
  }
}
</style>
