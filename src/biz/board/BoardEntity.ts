export interface BoardEntity {
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
  modifyDate?: string;
  modifyWriter?: string;
  delDate?: string;
  delWriter?: string;
  likeAction: number;
  dislikeAction: number;
  hideYn?: boolean;
  bno: string;
  startDate: string;
  endDate: string;
}
