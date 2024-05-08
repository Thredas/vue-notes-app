<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { computed, Ref, ref } from 'vue';

const menuButtonRef = ref<Ref | null>(null);

const contextMenuPosition = computed(() => {
  if (menuButtonRef.value) {
    const top = menuButtonRef.value.$el.offsetTop;
    const left = menuButtonRef.value.$el.offsetLeft;
    const buttonHeight = menuButtonRef.value.$el.offsetHeight;

    console.log(top, left);

    return { top: top + buttonHeight + 8 + 'px', left: left + 'px' };
  } else return {};
});
</script>

<template>
  <Menu>
    <MenuButton
      as="button"
      ref="menuButtonRef"
      class="context-menu__button"
      @click.stop
    >
      <span class="material-symbols-rounded">more_vert</span>
    </MenuButton>

    <Transition>
      <MenuItems class="context-menu" :style="contextMenuPosition">
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              open_in_full
            </span>
            Open
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              edit
            </span>
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              keep
            </span>
            Pin
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              content_copy
            </span>
            Copy
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              bookmark_manager
            </span>
            Select folders
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon"
            >
              palette
            </span>
            Change color
          </button>
        </MenuItem>
        <MenuItem>
          <button class="context-menu__item">
            <span
              class="material-symbols-rounded outlined context-menu__item__icon delete_icon"
            >
              delete
            </span>
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped>
.context-menu__button {
  position: relative;
  width: 26px;
  height: 26px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  cursor: pointer;
  transition: 0.1s ease;
  padding: 4px !important;
  border-radius: 8px;
  color: var(--text-secondary);
  background-color: transparent;
}

.context-menu__button:hover {
  background-color: var(--secondary);
}

.context-menu {
  position: absolute;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: var(--item-background);
  border: 1px var(--secondary) solid;
  box-shadow: 0 2px 10px rgba(28, 20, 13, 0.3);
  border-radius: 12px;
  overflow: hidden;
  z-index: 2;
}

.context-menu__item {
  font-family: 'Golos Text', sans-serif;
  font-size: 1.08em;
  color: var(--text-dark);
  font-weight: 400;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: start;
  background-color: transparent;
  border: 0;
  padding: 10px 16px;
  cursor: pointer;
  transition: 50ms;
}

.context-menu__item:hover {
  background-color: var(--secondary);
}

.context-menu__item__icon {
  color: var(--text-secondary);
}

.delete_icon {
  color: var(--danger);
}

.v-enter-active,
.v-leave-active {
  transition: 50ms;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active {
  animation: slide-in 150ms;
}

.v-leave-active {
  animation: slide-out 150ms;
}

@keyframes slide-in {
  0% {
    transform: translateY(50px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}
</style>
