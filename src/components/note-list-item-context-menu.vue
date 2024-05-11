<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  ListboxOption,
  ListboxOptions,
  Listbox,
  ListboxButton,
} from '@headlessui/vue';
import { computed, defineProps, Ref, ref, watch } from 'vue';
import { Note } from '@/types';
import { useNotesStore } from '@/stores/notesStore';
import MaterialIcon from '@/components/ui/material-icon.vue';
import { storeToRefs } from 'pinia';

type NoteListItemContextMenuProps = {
  note: Note;
  setModalAnimationCoordinates: () => void;
};

const props = defineProps<NoteListItemContextMenuProps>();

const notesStore = useNotesStore();
const { noteFolders } = storeToRefs(notesStore);
const {
  toggleNoteForm,
  setCurrentNote,
  toggleIsNotePinned,
  copyNote,
  removeNote,
  changeFoldersInNote,
} = notesStore;

// Context menu positioning logic
const menuBtnRef = ref<Ref | null>(null);
const contextMenuRef = ref<Ref | null>(null);

const contextMenuPosition = computed(() => {
  if (!menuBtnRef.value) return { top: '0', left: '0' };

  let left = menuBtnRef.value.$el.offsetLeft;
  const top = menuBtnRef.value.$el.offsetTop;
  const buttonHeight = menuBtnRef.value.$el.offsetHeight;

  const contextMenuWidth = 200;
  const contextMenuGlobalX = menuBtnRef.value.$el.getBoundingClientRect().x;

  // check if menu will collide with window edge
  if (contextMenuGlobalX + contextMenuWidth > window.innerWidth) {
    left = left - contextMenuWidth + 26;
  }

  return { top: top + buttonHeight + 4 + 'px', left: left + 'px' };
});

const showSubMenuOnOtherSide = computed(() => {
  const contextMenuGlobalX = menuBtnRef.value.$el.getBoundingClientRect().x;
  return contextMenuGlobalX + 400 > window.innerWidth;
});

// select folders section logic
const selectFoldersBtnRef = ref<HTMLButtonElement | null>(null);
const showSelectedFolders = ref(false);
const selectedFolders = ref<string[]>(props.note.folders);

watch(selectedFolders, () => {
  if (props.note.id) {
    changeFoldersInNote(props.note.id, selectedFolders.value);
  }
});

// other methods
const openEditModal = () => {
  setCurrentNote(props.note.id);
  toggleNoteForm();
  props.setModalAnimationCoordinates();
};
</script>

<template>
  <Menu ref="contextMenuRef">
    <MenuButton
      as="button"
      ref="menuBtnRef"
      class="context-menu__button"
      @click.stop
    >
      <MaterialIcon class="context-menu__item__icon" name="more_vert" />
    </MenuButton>

    <Transition>
      <MenuItems class="context-menu" :style="contextMenuPosition">
        <MenuItem>
          <button class="context-menu__item">
            <span class="context-menu__item__title">
              <MaterialIcon
                class="context-menu__item__icon"
                name="open_in_full"
                outlined
              />
              Open
            </span>
          </button>
        </MenuItem>

        <MenuItem @click.stop="openEditModal">
          <button class="context-menu__item">
            <span class="context-menu__item__title">
              <MaterialIcon
                class="context-menu__item__icon"
                name="edit"
                outlined
              />
              Edit
            </span>
          </button>
        </MenuItem>

        <MenuItem @click.stop="() => toggleIsNotePinned(note.id)">
          <button class="context-menu__item">
            <span class="context-menu__item__title">
              <MaterialIcon
                class="context-menu__item__icon"
                :name="note.isPinned ? 'keep_off' : 'keep'"
                outlined
              />
              {{ note.isPinned ? 'Unpin' : 'Pin' }}
            </span>
          </button>
        </MenuItem>

        <MenuItem @click.stop="() => copyNote(note.id)">
          <button class="context-menu__item">
            <span class="context-menu__item__title">
              <MaterialIcon
                class="context-menu__item__icon"
                name="content_copy"
                outlined
              />
              Copy
            </span>
          </button>
        </MenuItem>

        <MenuItem
          @mouseenter="showSelectedFolders = true"
          @mouseleave="showSelectedFolders = false"
        >
          <Listbox
            as="div"
            v-model="selectedFolders"
            style="position: relative; width: 100%"
            multiple
          >
            <ListboxButton
              ref="selectFoldersBtnRef"
              class="context-menu__item"
              :class="{ active: showSelectedFolders }"
              @click.stop
            >
              <span class="context-menu__item__title">
                <MaterialIcon
                  v-show="showSubMenuOnOtherSide"
                  class="context-menu__item__icon"
                  name="navigate_before"
                  outlined
                />
                <MaterialIcon
                  class="context-menu__item__icon"
                  name="bookmark_manager"
                  outlined
                />
                Select folders
              </span>

              <MaterialIcon
                v-show="!showSubMenuOnOtherSide"
                class="context-menu__item__icon"
                name="navigate_next"
                outlined
              />
            </ListboxButton>

            <Transition>
              <ListboxOptions
                class="context-menu context-menu__sub-menu"
                :class="{ other_side: showSubMenuOnOtherSide }"
                v-show="showSelectedFolders"
                @click.stop
                as="div"
                static
              >
                <ListboxOption
                  as="button"
                  class="context-menu__item"
                  v-for="noteFolder in noteFolders"
                  :key="noteFolder.id"
                  :value="noteFolder.id"
                  @click.stop
                  v-slot="{ selected }"
                >
                  <span class="context-menu__item__title">
                    <MaterialIcon
                      class="context-menu__item__icon"
                      name="folder"
                      outlined
                    />
                    {{ noteFolder.name }}
                  </span>

                  <MaterialIcon
                    class="context-menu__item__icon"
                    v-show="selected"
                    name="done"
                  />
                </ListboxOption>
              </ListboxOptions>
            </Transition>
          </Listbox>
        </MenuItem>

        <!--   TODO: Develop color change functionality     -->
        <!--        <MenuItem>-->
        <!--          <button class="context-menu__item" @click.stop>-->
        <!--            <span class="context-menu__item__title">-->
        <!--              <MaterialIcon-->
        <!--                v-show="showSubMenuOnOtherSide"-->
        <!--                class="context-menu__item__icon"-->
        <!--                name="navigate_before"-->
        <!--                outlined-->
        <!--              />-->
        <!--              <MaterialIcon-->
        <!--                class="context-menu__item__icon"-->
        <!--                name="palette"-->
        <!--                outlined-->
        <!--              />-->
        <!--              Change color-->
        <!--            </span>-->

        <!--            <MaterialIcon-->
        <!--              v-show="!showSubMenuOnOtherSide"-->
        <!--              class="context-menu__item__icon"-->
        <!--              name="navigate_next"-->
        <!--              outlined-->
        <!--            />-->
        <!--          </button>-->
        <!--        </MenuItem>-->

        <MenuItem @click="() => removeNote(note.id)">
          <button class="context-menu__item" @click.stop>
            <span class="context-menu__item__title">
              <MaterialIcon
                class="context-menu__item__icon delete_icon"
                name="delete"
                outlined
              />
              Delete
            </span>
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
  box-shadow: 0 4px 4px rgba(28, 20, 13, 0.2);
  border-radius: 8px;
  z-index: 2;
  //overflow: hidden;
}

.context-menu__sub-menu {
  position: absolute;
  border-radius: 0 8px 8px 8px;
  top: 0;
  left: 200px;
  box-shadow: 4px 4px 4px rgba(28, 20, 13, 0.1);
  z-index: 2;
}

.context-menu__sub-menu.other_side {
  left: -200px;
  border-radius: 8px 0 8px 8px;
  box-shadow: -1px 4px 4px rgba(28, 20, 13, 0.1);
}

.context-menu__item {
  width: 100%;
  font-family: 'Golos Text', sans-serif;
  font-size: 1.08em;
  color: var(--text-dark);
  font-weight: 400;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: start;
  background-color: transparent;
  border: 0;
  padding: 10px 10px 10px 16px;
  cursor: pointer;
  transition: 50ms;
}

.context-menu__item.active {
  background-color: var(--secondary);
}

.context-menu__item:hover {
  background-color: var(--secondary);
}

.context-menu__item__title {
  display: flex;
  align-items: center;
  gap: 12px;
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
