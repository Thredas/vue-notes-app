import { defineStore } from 'pinia';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

export const useNotesStore = defineStore('notes', () => {
  const isLoading = ref(true);

  const notes = ref([]);
  const showNoteForm = ref(false);
  const currentOpenedNote = ref(null);
  const showNoteInfo = ref(false);

  const PINNED_FOLDER_ID = ref('pinned_folder_id');
  const noteFolders = ref([]);
  const selectedFolderId = ref(null);

  const searchQuery = ref('');

  // main setters
  const setIsLoading = (value) => (isLoading.value = value);
  const setNotes = (newNotes) => (notes.value = newNotes);
  const setCurrentNote = (id) => {
    if (!id) {
      currentOpenedNote.value = null;
      return;
    }

    currentOpenedNote.value = notes.value.find((note) => note.id === id);
  };

  const findNoteById = (id) => notes.value.findIndex((note) => note.id === id);

  // modal toggle options
  const toggleNoteForm = () => (showNoteForm.value = !showNoteForm.value);
  const toggleNoteInfo = () => (showNoteInfo.value = !showNoteInfo.value);

  // Actions with notes
  const addNote = (title, text) => {
    const newNote = {
      id: nanoid(),
      title,
      text,
      createDate: Date.now(),
      updateDate: null,
    };

    notes.value.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes.value));
  };
  const removeNote = (id) => {
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
  };
  const editNote = (id, noteObj) => {
    const noteIdx = findNoteById(id);

    if (noteIdx !== -1) {
      notes.value[noteIdx] = {
        ...notes.value[noteIdx],
        ...noteObj,
        updateDate: Date.now(),
      };

      localStorage.setItem('notes', JSON.stringify(notes.value));
      setCurrentNote(id);
    } else {
      alert("Can't edit a note, that doesn't exist");
    }
  };

  // Actions with folders
  const setSelectedFolderId = (folderId) => (selectedFolderId.value = folderId);
  const setNoteFolders = (newNoteFolders) => {
    noteFolders.value = newNoteFolders;
    localStorage.setItem('noteFolders', JSON.stringify(noteFolders.value));
  };
  const changeFoldersInNote = (noteId, newFolders) => {
    const noteIdx = findNoteById(noteId);
    const note = notes.value[noteIdx];

    if (note) {
      if (!note.folders) note.folders = [];
      note.folders = newFolders;

      editNote(noteId, note);
    } else {
      alert('Note with this ID was not found');
    }
  };
  const toggleIsNotePinned = (noteId) => {
    const noteIdx = findNoteById(noteId);
    const note = notes.value[noteIdx];

    if (note.isPinned === undefined) note.isPinned = false;

    editNote(noteId, { ...notes.value[noteIdx], isPinned: !note.isPinned });
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
    PINNED_FOLDER_ID,
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
    changeFoldersInNote,
    toggleIsNotePinned,
  };
});
