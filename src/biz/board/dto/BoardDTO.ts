export class BoardDTO {
  _id?: string;
  title: string;
  content: string;
  uploadFileId: string;
  noticeYn: boolean;
  type: string;
  popupYn: boolean;
  useYn: boolean;
  regDate: string;
  regWriter: string;
  likeAction: number;
  dislikeAction: number;
  bno: string;
  startDate: string;
  endDate: string;
}
