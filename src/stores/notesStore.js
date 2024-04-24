import { defineStore } from 'pinia';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

export const useNotesStore = defineStore('notes', () => {
  const isLoading = ref(true);

  const notes = ref([]);
  const showNoteForm = ref(false);
  const currentOpenedNote = ref(null);
  const showNoteInfo = ref(false);

  const searchQuery = ref('');

  const noteFolders = ref([]);
  const selectedFolderId = ref(null);

  const setIsLoading = (value) => (isLoading.value = value);
  const setNotes = (newNotes) => (notes.value = newNotes);
  const toggleNoteForm = () => (showNoteForm.value = !showNoteForm.value);
  const toggleNoteInfo = () => (showNoteInfo.value = !showNoteInfo.value);

  function findNoteById(id) {
    return notes.value.findIndex((note) => note.id === id);
  }

  function setCurrentNote(id) {
    if (!id) {
      currentOpenedNote.value = null;
      return;
    }

    currentOpenedNote.value = notes.value.find((note) => note.id === id);
  }

  function addNote(title, text) {
    const newNote = { id: nanoid(), title, text };
    notes.value.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes.value));
  }

  function removeNote(id) {
    const deleteConfirmation = confirm(
      'Are you sure want to delete this note?'
    );

    if (deleteConfirmation) {
      const noteIdx = findNoteById(id);

      if (noteIdx !== -1) {
        notes.value.splice(noteIdx, 1);
        localStorage.setItem('notes', JSON.stringify(notes.value));
        toggleNoteInfo();
      } else {
        alert("Can't delete a note, that doesn't exist");
      }
    }
  }

  function editNote(id, noteObj) {
    const noteIdx = findNoteById(id);

    if (noteIdx !== -1) {
      notes.value.splice(noteIdx, 1, { ...notes.value[noteIdx], ...noteObj });
      localStorage.setItem('notes', JSON.stringify(notes.value));
      setCurrentNote(id);
    } else {
      alert("Can't edit a note, that doesn't exist");
    }
  }

  const setSelectedFolderId = (folderId) => (selectedFolderId.value = folderId);
  const setNoteFolders = (newNoteFolders) => {
    noteFolders.value = newNoteFolders;
    localStorage.setItem('noteFolders', JSON.stringify(noteFolders.value));
  };

  return {
    isLoading,
    notes,
    showNoteForm,
    showNoteInfo,
    currentOpenedNote,
    searchQuery,
    noteFolders,
    selectedFolderId,
    setIsLoading,
    setNotes,
    toggleNoteForm,
    toggleNoteInfo,
    addNote,
    editNote,
    removeNote,
    setCurrentNote,
    findNoteById,
    setSelectedFolderId,
    setNoteFolders,
  };
});
