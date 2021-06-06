export class BoardUpdateDTO {
  _id?: string;
  title: string;
  content: string;
  uploadFileId: string;
  noticeYn: boolean;
  type: string;
  popupYn: boolean;
  modifyWriter: string;
  bno: string;
}
