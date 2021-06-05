export class BoardCreateDTO {
  _id?: string;
  title: string;
  content: string;
  uploadFileId: string;
  noticeYn: boolean;
  type: string;
  popupYn: boolean;
  regDate?: string;
  regWriter: string;
  bno: string;
}
