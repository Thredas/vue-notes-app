<script lang="ts" setup>
import { useNotesStore } from '@/stores/notesStore';
import { storeToRefs } from 'pinia';

import { TextField, CustomButton } from '@/components/ui';
import MaterialIcon from '@/components/ui/material-icon.vue';

const notesStore = useNotesStore();
const { searchQuery } = storeToRefs(notesStore);
const { toggleNoteForm } = notesStore;
</script>

<template>
  <div class="header__container">
    <header>
      <div class="header__title_container">
        <img
          class="header__title_logo"
          src="@/assets/images/logo.png"
          alt="logo"
        />
        <span class="header__title_text">Notes</span>
      </div>

      <div class="header__right-side">
        <TextField
          icon="search"
          class="header__search-input"
          input-classes="header__search-input"
          type="search"
          placeholder="Search..."
          v-model="searchQuery"
        />

        <CustomButton class="header__create-button" @click="toggleNoteForm">
          <MaterialIcon name="note_stack_add" />
          Create note
        </CustomButton>

        <!--   TODO: Profile context menu     -->
        <!--        <CustomButton class="header__user-avatar-button">-->
        <!--          <MaterialIcon name="person" class="user-avatar-placeholder" />-->
        <!--        </CustomButton>-->
      </div>
    </header>
  </div>
</template>

<style>
.header__container {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--item-background);
  border: 1px rgba(17, 17, 17, 0.1) solid;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  z-index: 2;
  height: 64px;
}

header {
  box-sizing: border-box;
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.header__title_container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header__right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 32px;
  height: 100%;
}

.header__title_logo {
  width: 32px;
}

.header__title_text {
  font-size: 1.25rem;
  font-weight: 600;
}

.header__search-input {
  height: 100%;
  width: 350px !important;
  font-size: 16px;
  border-radius: 32px !important;
  background-color: var(--secondary);
  transition: 0.1s;
  border: 0 !important;
}

.header__search-input:focus {
  background-color: var(--item-background) !important;
}

.header__create-button {
  background-color: var(--primary);
  color: var(--text-light);
  font-size: 15px !important;
  width: fit-content !important;
  border-radius: 32px !important;
}

.header__create-button:hover {
  background-color: var(--primary-hover);
}

.header__user-avatar-button {
  box-sizing: border-box;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50% !important;
}

.user-avatar-placeholder {
  color: var(--text-secondary);
  font-size: 24px !important;
}

@media (max-width: 1200px) {
  .header__right-side {
    display: none;
  }
}
</style>
