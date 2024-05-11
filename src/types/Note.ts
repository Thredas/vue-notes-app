export enum NoteColors {
  default,
  classic,
  grey,
  red,
  green,
  blue,
  yellow,
  orange,
  purple,
}

export type Note = {
  id: string;
  title: string;
  text: string;
  isPinned: boolean;
  folders: string[];
  color: NoteColors;
  createDate: number | null;
  updateDate: number | null;
};
