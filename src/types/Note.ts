export type Note = {
  id: string;
  title: string;
  text: string;
  isPinned: boolean;
  folders: string[];
  createDate: number | null;
  updateDate: number | null;
};
