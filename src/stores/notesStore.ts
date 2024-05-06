import { defineStore } from 'pinia';
import { ref } from 'vue';
import { nanoid } from 'nanoid';

import { Note, NoteFolder } from '@/types';

export const useNotesStore = defineStore('notes', () => {
  const isLoading = ref<boolean>(true);

  const notes = ref<Note[]>([]);
  const currentOpenedNote = ref<Note | null>(null);
  const showNoteForm = ref<boolean>(false);
  const showNoteInfo = ref<boolean>(false);

  const PINNED_FOLDER_ID = ref<'pinned_folder_id'>('pinned_folder_id');
  const noteFolders = ref<NoteFolder[]>([]);
  const selectedFolderId = ref<string | null>(null);

  const searchQuery = ref<string>('');

  // main setters
  const setIsLoading = (value: boolean) => (isLoading.value = value);

  const setNotes = (newNotes: Note[]) => (notes.value = newNotes);

  const setCurrentNote = (id: string | null) => {
    if (!id) {
      currentOpenedNote.value = null;
      return;
    }

    currentOpenedNote.value =
      notes.value.find((note) => note.id === id) ?? null;
  };

  const findNoteById = (id: string) => {
    return notes.value.findIndex((note) => note.id === id);
  };

  // modal toggle options
  const toggleNoteForm = () => (showNoteForm.value = !showNoteForm.value);

  const toggleNoteInfo = () => (showNoteInfo.value = !showNoteInfo.value);

  // Actions with notes
  const addNote = (title: string, text: string) => {
    const newNote: Note = {
      id: nanoid(),
      title,
      text,
      isPinned: false,
      folders: [],
      createDate: Date.now(),
      updateDate: null,
    };

    notes.value.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes.value));
  };

  const removeNote = (id: string) => {
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

  const editNote = (id: string, noteObj: Note) => {
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
  const setNoteFolders = (newFolders: NoteFolder[]) => {
    noteFolders.value = newFolders;
  };

  const setSelectedFolderId = (folderId: string | null) => {
    selectedFolderId.value = folderId;
  };

  const addNoteFolder = (newFolderName: string) => {
    noteFolders.value.push({ id: nanoid(), name: newFolderName });
  };

  const deleteNoteFolder = (folderId: string) => {
    const deleteConfirmation = confirm(
      'Are you sure want to delete this note folder?'
    );

    if (deleteConfirmation) {
      const noteFolderIdx = noteFolders.value.findIndex(
        (folder) => folder.id === folderId
      );

      if (noteFolderIdx !== -1) {
        // delete folder from folders array
        noteFolders.value.splice(noteFolderIdx, 1);

        // delete folder from every note, that contained this folder
        notes.value = notes.value.map((note) => {
          if (!note.folders) return note;

          const folderInNoteIdx = note.folders.findIndex(
            (folderInNoteId) => folderInNoteId === folderId
          );

          if (folderInNoteIdx !== -1) {
            note.folders.splice(folderInNoteIdx, 1);
          }

          return note;
        });

        localStorage.setItem('notes', JSON.stringify(notes.value));
        localStorage.setItem('noteFolders', JSON.stringify(noteFolders.value));
      } else {
        alert("Can't delete a folder, that doesn't exist");
      }
    }
  };

  const changeFoldersInNote = (noteId: string, newFolders: string[]) => {
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

  const toggleIsNotePinned = (noteId: string) => {
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
    setNoteFolders,
    setSelectedFolderId,
    addNoteFolder,
    deleteNoteFolder,
    changeFoldersInNote,
    toggleIsNotePinned,
  };
});
