<script lang="ts" setup>
import { onUpdated, ref, watch } from 'vue';
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import { ModalWindow, CustomButton } from '@/components/ui';
import { QuillEditor } from '@vueup/vue-quill';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

const notesStore = useNotesStore();
const { currentOpenedNote, noteFolders, showNoteInfo } =
  storeToRefs(notesStore);
const {
  toggleNoteInfo,
  toggleNoteForm,
  setCurrentNote,
  removeNote,
  changeFoldersInNote,
} = notesStore;

const selectedFolders = ref<string[]>([]);

onUpdated(() => {
  if (currentOpenedNote.value?.folders) {
    selectedFolders.value = [...currentOpenedNote.value.folders];
  }
});

watch(selectedFolders, () => {
  if (currentOpenedNote.value?.id) {
    changeFoldersInNote(currentOpenedNote.value.id, selectedFolders.value);
  }
});

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
  <ModalWindow
    :isOpen="showNoteInfo"
    class="note-info__modal"
    :close-modal-func="closeModal"
  >
    <div id="note-info" class="note-info">
      <div class="note-info__header">
        <span class="note-info__title">{{ currentOpenedNote?.title }}</span>

        <div class="note-info__header_buttons">
          <CustomButton class="note-info__header_button" @click="closeModal">
            <span class="material-symbols-rounded">close</span>
          </CustomButton>
        </div>
      </div>

      <div class="note-info__text">
        <quill-editor
          :content="currentOpenedNote?.text"
          read-only
          content-type="html"
          theme=""
          :placeholder="
            !currentOpenedNote?.text ? 'There`s nothing here yet' : null
          "
        >
        </quill-editor>
      </div>

      <div class="note-info__footer">
        <Listbox
          as="div"
          v-model="selectedFolders"
          style="position: relative"
          multiple
        >
          <ListboxOptions class="note-info__footer__folder-select__options">
            <ListboxOption
              class="note-info__footer__folder-select__option"
              v-for="noteFolder in noteFolders"
              :key="noteFolder.id"
              :value="noteFolder.id"
              v-slot="{ selected }"
            >
              <span class="note-info__footer__folder-select__option__text">
                <span class="material-symbols-rounded outlined">folder</span>
                {{ noteFolder.name }}
              </span>

              <span v-show="selected" class="material-symbols-rounded outlined"
                >done</span
              >
            </ListboxOption>
          </ListboxOptions>

          <ListboxButton class="note-info__footer__folder-select">
            <span class="material-symbols-rounded">folder</span>

            <span
              v-if="selectedFolders.length"
              class="note-info__footer__folder-text"
            >
              {{
                selectedFolders
                  .map((folderId) => {
                    // some strange bug in webstorm
                    // @ts-ignore
                    const folder = noteFolders.find(
                      (folder) => folder.id === folderId
                    );
                    return folder?.name;
                  })
                  .join(', ')
              }}
            </span>

            <span v-else class="note-info__footer__folder-text placeholder">
              Select folders
            </span>
          </ListboxButton>
        </Listbox>

        <div class="note-info__footer_buttons">
          <CustomButton
            class="note-info__header_button"
            @click="switchToEditMode"
          >
            <span class="material-symbols-rounded">edit</span>
          </CustomButton>

          <CustomButton
            class="note-info__header_button"
            @click="removeNote(currentOpenedNote?.id ?? '')"
          >
            <span class="material-symbols-rounded">delete</span>
          </CustomButton>
        </div>
      </div>
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
  height: 100%;
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

.note-info__header_button {
  justify-content: center;
  border-radius: 8px;
  background-color: transparent;
  color: var(--text-secondary);
  padding: 4px !important;
  width: 28px;
  height: 28px;
}

.note-info__header_button:hover {
  background-color: var(--secondary);
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
  flex: 1;
}

:global(.note-info__text .ql-editor) {
  padding: 16px 24px 16px !important;
}

.note-info__footer {
  box-sizing: border-box;
  border-top: 1px var(--secondary) solid;
  height: 70px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.note-info__footer_buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-info__footer__folder-select {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 200px;
  width: 150px;
  height: 100%;
  background-color: transparent;
  border: 2px var(--secondary) solid;
  border-radius: 8px;
  padding: 4px 8px;
  cursor: pointer;
}

.material-symbols-rounded {
  color: var(--text-secondary);
}

.note-info__footer__folder-text {
  font-family: 'Golos Text', sans-serif;
  text-align: start;
  max-height: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.note-info__footer__folder-text.placeholder {
  color: var(--text-secondary);
}

.note-info__footer__folder-select__options {
  box-sizing: border-box;
  position: absolute;
  bottom: 36px;
  min-width: 250px;
  width: fit-content;
  background-color: var(--item-background);
  border: 2px var(--secondary) solid;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  height: fit-content;
  padding-left: 0 !important;
  overflow: hidden;
}

.note-info__footer__folder-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px !important;
  cursor: pointer;
}

.note-info__footer__folder-select__option__text {
  display: flex;
  align-items: center;
  gap: 12px;
}

.note-info__footer__folder-select__option:hover {
  background-color: var(--secondary);
}

@media (max-width: 1200px) {
  .material-symbols-rounded {
    font-size: 24px;
  }

  .note-info {
    min-height: 100%;
    height: 100svh;
  }

  .note-info__title {
    font-size: 20px;
  }

  .note-info__footer_buttons {
    gap: 16px;
  }

  .note-info__text {
    overflow-y: scroll;
    flex: 1;
    height: 100%;
  }

  .note-info__header {
    border-bottom: 2px var(--secondary) solid;
  }

  .note-info__footer {
    border-top: 2px var(--secondary) solid;
  }

  .note-info__footer__folder-select {
    width: 150px;
  }
}
</style>
