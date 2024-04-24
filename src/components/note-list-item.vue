<script setup>
import { defineProps } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useNotesStore } from '@/stores/notesStore';

const notesStore = useNotesStore();
const { setCurrentNote, toggleNoteInfo } = notesStore;

const openNoteInfo = () => {
  setCurrentNote(props.id);
  toggleNoteInfo();
};

const props = defineProps(['id', 'title', 'text']);
</script>

<template>
  <div class="note-item" @click="openNoteInfo">
    <div class="note-item__content-click-blocker"></div>

    <div class="note-item__title">
      <span class="note-item__title_text">{{ props.title }}</span>

      <div class="note-item__buttons">
        <CustomButton class="note-item__button">
          <!--<span class="material-symbols-rounded">open_in_new</span>-->
        </CustomButton>
      </div>
    </div>

    <div class="note-item__text-container">
      <quill-editor
        :content="props.text"
        content-type="html"
        theme=""
        read-only
      >
      </quill-editor>
    </div>
  </div>
</template>

<style scoped>
.note-item {
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
  //box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: 0.15s ease;
  overflow: hidden;
}

.note-item:hover {
  //scale: 1.02;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border: 2px #2563eb solid;
}

.note-item__content-click-blocker {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.note-item__title {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 16px;
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
  padding: 6px;
  border-radius: 8px;
  color: var(--text-secondary);
  background-color: transparent;
}

.note-button:hover {
  background-color: transparent;
}
</style>
