<script setup>
import ModalWindow from '@/components/ui/modal-window.vue';
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import { QuillEditor } from '@vueup/vue-quill';

const notesStore = useNotesStore();
const { toggleNoteInfo, toggleNoteForm, setCurrentNote, removeNote } =
  notesStore;
const { currentOpenedNote } = storeToRefs(notesStore);

const switchToEditMode = () => {
  toggleNoteInfo();
  toggleNoteForm();
};

const closeModal = () => {
  setCurrentNote(null);
  toggleNoteInfo();
};
</script>

<template>
  <ModalWindow class="note-info__modal" :close-modal-func="closeModal">
    <div id="note-info" class="note-info">
      <div class="note-info__header">
        <span class="note-info__title">{{ currentOpenedNote.title }}</span>

        <div class="note-info__header_buttons">
          <CustomButton
            class="title-button"
            @click="removeNote(currentOpenedNote.id)"
          >
            <span class="material-symbols-rounded">delete</span>
          </CustomButton>

          <CustomButton class="title-button" @click="switchToEditMode">
            <span class="material-symbols-rounded">edit</span>
          </CustomButton>

          <CustomButton class="title-button" @click="closeModal">
            <span class="material-symbols-rounded">close</span>
          </CustomButton>
        </div>
      </div>

      <div class="note-info__text">
        <quill-editor
          :content="currentOpenedNote.text"
          read-only
          content-type="html"
          theme=""
          :placeholder="
            !currentOpenedNote.text ? 'There`s nothing here yet' : null
          "
        >
        </quill-editor>
      </div>

      <div class="note-info__footer"></div>
    </div>
  </ModalWindow>
</template>

<style scoped>
:global(.note-info__modal) {
  padding: 0 !important;
}

.note-info {
  display: flex;
  flex-direction: column;
  min-height: 900px;
}

.note-info__header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 24px 24px 16px;
  border-bottom: 1px var(--secondary) solid;
}

.note-info__header_buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-info__title {
  display: -webkit-box;
  font-size: 24px;
  font-weight: 600;
  max-height: 64px !important;
  color: var(--text-dark);
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.note-info__text {
  overflow: hidden;
  height: 100%;
}

:global(.note-info__text .ql-editor) {
  padding: 16px 24px 16px !important;
}

.note-info__footer {
  border-top: 1px var(--secondary) solid;
  height: 48px;
}
</style>
