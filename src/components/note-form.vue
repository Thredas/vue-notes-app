<script lang="ts" setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import { Note } from '@/types';
import { TextField, ModalWindow, CustomButton } from '@/components/ui';
import { QuillEditor } from '@vueup/vue-quill';

const notesStore = useNotesStore();
const { addNote, editNote, toggleNoteForm, toggleNoteInfo, setCurrentNote } =
  notesStore;
const { currentOpenedNote, showNoteForm } = storeToRefs(notesStore);

const noteTitle = ref<string | undefined>(undefined);
const noteText = ref<string | undefined>(undefined);

const mobileKeyboardY = ref('100%');

watch(currentOpenedNote, () => {
  noteTitle.value = currentOpenedNote?.value?.title;
  noteText.value = currentOpenedNote.value?.text;
});

const mobileKeyboardWatcher = (event: Event) => {
  const target = event.target as VisualViewport;
  const scrollingElement = document.scrollingElement!;

  if (target.height + 30 < scrollingElement.clientHeight) {
    mobileKeyboardY.value = target.height - 155 + 'px';
  } else {
    mobileKeyboardY.value = '100%';
  }
};

onMounted(() => {
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', mobileKeyboardWatcher);
  }
});

onUnmounted(() => {
  if ('visualViewport' in window) {
    window.visualViewport.removeEventListener('resize', mobileKeyboardWatcher);
  }
});

const closeForm = () => {
  noteTitle.value = undefined;
  noteText.value = undefined;
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
    } as Note);
    goBackToNoteInfo();
  } else {
    addNote(noteTitle.value!, noteText.value!);
    closeForm();
  }

  noteTitle.value = undefined;
  noteText.value = undefined;
};
</script>

<template>
  <ModalWindow :isOpen="showNoteForm" :close-modal-func="closeForm">
    <form class="note-form" @submit.prevent @submit="sendFormData">
      <div class="note-form-title-container">
        <CustomButton
          v-if="!!currentOpenedNote"
          class="title-button"
          @click="goBackToNoteInfo"
          type="button"
        >
          <span class="material-symbols-rounded">arrow_back</span>
        </CustomButton>

        <TextField
          class="form-title"
          input-classes="form-title"
          placeholder="Note title"
          v-model="noteTitle"
        />

        <CustomButton
          v-if="!currentOpenedNote"
          class="title-button"
          @click="closeForm"
          type="button"
        >
          <span class="material-symbols-rounded">close</span>
        </CustomButton>
      </div>

      <div class="note-form__textarea">
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
      </div>

      <CustomButton class="form-button" type="submit">Save</CustomButton>
    </form>
  </ModalWindow>
</template>

<style>
.note-form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 24px;
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

.note-form__textarea {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  max-height: calc(100% - 92px);
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

@media (max-width: 1200px) {
  .note-form {
    overflow: scroll;
    box-sizing: border-box;
    min-height: 100%;
    padding: 8px;
    height: auto;
  }

  .form-title {
    font-size: 20px !important;
    height: 48px;
  }

  .title-button {
    justify-content: center;
    padding: 6px !important;
    width: 48px;
    height: 48px;
  }

  .note-form__textarea {
    justify-content: start;
    flex-direction: column-reverse;
    max-height: calc(100svh - 130px);
  }

  .form-button {
    height: 48px;
  }

  .ql-container {
    height: v-bind(mobileKeyboardY) !important;
    min-height: v-bind(mobileKeyboardY) !important;
    max-height: v-bind(mobileKeyboardY) !important;
  }

  .ql-formats {
    position: static !important;
  }

  .ql-picker {
    position: relative !important;
  }

  .ql-picker-options {
    top: -135px !important;
    right: 0 !important;
    bottom: 0;
  }
}
</style>
