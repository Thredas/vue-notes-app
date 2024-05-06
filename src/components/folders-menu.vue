<script lang="ts" setup>
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import CustomButton from '@/components/ui/custom-button.vue';
import FoldersMenuItem from '@/components/folders-menu-item.vue';

const notesStore = useNotesStore();
const { noteFolders, selectedFolderId, PINNED_FOLDER_ID } =
  storeToRefs(notesStore);
const { setSelectedFolderId } = notesStore;

const hasShallowNoteFolder = ref(false);

watch(noteFolders, () => (hasShallowNoteFolder.value = false));
</script>

<template>
  <div class="folders-menu__container">
    <div class="folders-menu">
      <FoldersMenuItem
        name="All notes"
        icon="home"
        :isActive="!selectedFolderId"
        @click="setSelectedFolderId(null)"
      />

      <FoldersMenuItem
        name="Pinned notes"
        icon="keep"
        :isActive="selectedFolderId === PINNED_FOLDER_ID"
        @click="setSelectedFolderId(PINNED_FOLDER_ID)"
      />

      <hr class="folder-divider" />

      <FoldersMenuItem
        v-for="noteFolder in noteFolders"
        :key="noteFolder.id"
        :id="noteFolder.id"
        :name="noteFolder.name"
        :isActive="selectedFolderId === noteFolder.id"
        @click="setSelectedFolderId(noteFolder.id)"
      />

      <FoldersMenuItem
        v-if="hasShallowNoteFolder"
        :isForm="true"
        @closeShallowNoteFolder="hasShallowNoteFolder = false"
      />

      <hr v-if="noteFolders.length > 0" class="folder-divider" />

      <CustomButton
        class="folder-create-button"
        @click="() => (hasShallowNoteFolder = true)"
        :disabled="hasShallowNoteFolder"
      >
        <span class="material-symbols-rounded outlined">add</span>
        Create {{ noteFolders.length > 0 ? 'new' : 'note' }} folder
      </CustomButton>
    </div>
  </div>
</template>

<style scoped>
.folders-menu__container {
  box-sizing: border-box;
  min-width: 250px;
  max-width: 250px;
  padding: 32px 0 32px 16px;
}

.folders-menu {
  position: fixed;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.folder-divider {
  text-align: center;
  width: 100px;
  border: 1px rgba(0, 0, 0, 0.1) solid !important;
  margin: 4px 16px;
}

.folder-create-button {
  border-radius: 8px;
  padding: 8px 16px 8px 20px !important;
  transition: 0.1s ease;
  color: var(--text-secondary);
  background-color: transparent;
  width: 100%;
  justify-content: start;
}

.folder-create-button:hover {
  background-color: var(--secondary);
}

@media (max-width: 1200px) {
  .folders-menu__container {
    display: none;
  }
}
</style>
