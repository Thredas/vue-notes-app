<script setup></script>

<template>
  <div class="folders-menu-container">
    <div class="folders-menu">
      <div class="folders-menu-item active secondary">
        <span class="folders-item-icon material-symbols-rounded">home</span>
        <span class="">All notes</span>
      </div>

      <div class="folders-menu-item">
        <span class="folders-item-icon material-symbols-rounded outlined">
          keep
        </span>
        <span class="">Pinned notes</span>
      </div>

      <hr class="folder-divider" />

      <div class="folders-menu-item">
        <span class="folders-item-icon material-symbols-rounded outlined">
          folder
        </span>
        <span class="">Note folder</span>
      </div>

      <div class="folders-menu-item">
        <span class="folders-item-icon material-symbols-rounded outlined">
          folder
        </span>
        <span class="">Note folder 2</span>
      </div>

      <hr class="folder-divider" />

      <CustomButton class="folder-create-button">
        <span class="material-symbols-rounded">add</span>
        Create note folder
      </CustomButton>
    </div>
  </div>
</template>

<style scoped>
.folders-menu-container {
  box-sizing: border-box;
  min-width: 250px;
  max-width: 250px;
  padding: 48px 0 32px 16px;
}

.folders-menu {
  position: fixed;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.folders-menu-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 8px 16px;
  transition: 0.1s ease;
  color: var(--text-secondary);
}

.folders-menu-item:hover {
  background-color: var(--secondary);
}

.folders-menu-item.active {
  background-color: var(--secondary);
  color: var(--text-dark);
}

.folders-menu-item.active .folders-item-icon {
  color: var(--accent);
}

.folders-item-icon {
  font-size: 24px;
}

.folder-divider {
  text-align: center;
  width: 100px;
  border: 1px rgba(0, 0, 0, 0.1) solid !important;
  margin: 4px 16px;
}

.folder-create-button {
  border-radius: 8px;
  padding: 8px 16px;
  transition: 0.1s ease;
  color: var(--text-secondary);
  background-color: transparent;
  width: 100%;
  justify-content: start;
  margin-left: 4px;
}

.folder-create-button:hover {
  background-color: var(--secondary);
}
</style>
