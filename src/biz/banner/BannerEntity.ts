export interface BannerEntity {
  _id?: string;
  bannerId: string;
  name: string;
  imgUrl: string;
  width: number;
  height: number;
  location: string;
  useYn: string;
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  sort: number;
  deployYn: string;
}
