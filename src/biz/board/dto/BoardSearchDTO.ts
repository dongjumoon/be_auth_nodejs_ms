import { BoardDTO } from '@/biz/board/dto/BoardDTO';

class BoardSearchDTO extends BoardDTO {
  paging?: number;
  pageNumber?: number;
  offset?: number;
  max?: number;
  sort?: string;
  order?: string;
  keyword?: string;
  gnb?: string;
}
