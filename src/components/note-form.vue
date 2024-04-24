<script setup>
import { ref } from 'vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor } from '@vueup/vue-quill';
import { useNotesStore } from '@/stores/notesStore';
import ModalWindow from '@/components/ui/modal-window.vue';
import { storeToRefs } from 'pinia';

const notesStore = useNotesStore();
const { addNote, editNote, toggleNoteForm, toggleNoteInfo, setCurrentNote } =
  notesStore;
const { currentOpenedNote } = storeToRefs(notesStore);

const noteTitle = ref(currentOpenedNote?.value?.title);
const noteText = ref(currentOpenedNote?.value?.text);

const closeForm = () => {
  noteTitle.value = null;
  noteText.value = null;
  setCurrentNote(null);
  toggleNoteForm();
};

const goBackToNoteInfo = () => {
  toggleNoteForm();
  toggleNoteInfo();
};

const sendFormData = () => {
  if (!noteTitle.value && !noteText.value) {
    alert("Can't create an empty note");
    return;
  }

  if (currentOpenedNote.value) {
    editNote(currentOpenedNote.value.id, {
      title: noteTitle.value,
      text: noteText.value,
    });
    goBackToNoteInfo();
  } else {
    addNote(noteTitle.value, noteText.value);
    closeForm();
  }

  noteTitle.value = null;
  noteText.value = null;
};
</script>

<template>
  <ModalWindow :close-modal-func="closeForm">
    <form class="note-form" @submit.prevent>
      <div class="note-form-title-container">
        <CustomButton
          v-if="!!currentOpenedNote"
          class="title-button"
          @click="goBackToNoteInfo"
        >
          <span class="material-symbols-rounded">arrow_back</span>
        </CustomButton>

        <TextField
          input-classes="form-title"
          placeholder="Note title"
          v-model="noteTitle"
        />

        <CustomButton
          v-if="!currentOpenedNote"
          class="title-button"
          @click="closeForm"
        >
          <span class="material-symbols-rounded">close</span>
        </CustomButton>
      </div>

      <quill-editor
        class="form-text"
        placeholder="Type something here..."
        v-model:content="noteText"
        :toolbar="[
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          ['clean'],
        ]"
        content-type="html"
        theme="snow"
      >
      </quill-editor>

      <CustomButton class="form-button" @click="sendFormData">
        Save
      </CustomButton>
    </form>
  </ModalWindow>
</template>

<style>
.note-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-form-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.form-title {
  font-size: 24px !important;
  font-weight: 600;
}

.title-button {
  padding: 6px !important;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: transparent;
  color: var(--text-secondary);
}

.title-button:hover {
  background-color: var(--secondary);
}

.form-button {
  font-size: 16px !important;
  width: 100%;
  justify-content: center;
  background-color: var(--primary);
  color: var(--text-light);
  border-radius: 8px !important;
}

.form-button:hover {
  background-color: var(--primary-hover) !important;
}
</style>
