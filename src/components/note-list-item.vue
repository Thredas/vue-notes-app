<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { useNotesStore } from '@/stores/notesStore';
import { useListAnimationStore } from '@/stores/listAnimationStore';
import { storeToRefs } from 'pinia';
import { Note } from '@/types';
import { CustomButton } from '@/components/ui';
import { QuillEditor } from '@vueup/vue-quill';
import NoteListItemContextMenu from '@/components/note-list-item-context-menu.vue';
import MaterialIcon from '@/components/ui/material-icon.vue';

type NoteListItemProps = {
  note: Note;
};

const props = defineProps<NoteListItemProps>();

const notesStore = useNotesStore();
const { currentOpenedNote } = storeToRefs(notesStore);
const { setCurrentNote, toggleNoteInfo, toggleIsNotePinned } = notesStore;

const animStore = useListAnimationStore();
const { setStartAnimInfo } = animStore;

const noteListItemRef = ref<HTMLDivElement | null>(null);

const setModalAnimationCoordinates = () => {
  if (noteListItemRef.value) {
    setStartAnimInfo(noteListItemRef.value.getBoundingClientRect());
  }
};

const openNoteInfo = () => {
  setCurrentNote(props.note.id);
  setModalAnimationCoordinates();
  toggleNoteInfo();
};
</script>

<template>
  <button
    class="note-item"
    :class="{ fading: note.id === currentOpenedNote?.id }"
    @click="openNoteInfo"
    ref="noteListItemRef"
  >
    <span class="note-item__title">
      <span class="note-item__title_text">{{ note.title }}</span>

      <span class="note-item__buttons">
        <CustomButton
          class="note-item__button"
          @click.stop
          @click="toggleIsNotePinned(note.id)"
        >
          <MaterialIcon
            class="context-menu__item__icon"
            name="keep"
            :outlined="!note.isPinned"
          />
        </CustomButton>

        <NoteListItemContextMenu
          :note="note"
          :setModalAnimationCoordinates="setModalAnimationCoordinates"
        />
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
  transition: all 100ms, opacity 0ms;
  transition-delay: 0ms, 150ms;
  cursor: default;
}

.note-item:hover {
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border: 2px #2563eb solid;
}

.note-item:hover {
  transition: 0.15s;
}

.note-item.fading {
  transition: 0.15s ease-out !important;
  opacity: 0;
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
