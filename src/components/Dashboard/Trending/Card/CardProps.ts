export default interface ICardProps {
  id: number;
  imgPath: string | null;
  name: string;
  date: string;
  rating: number;
  votes: number;
  isPlanned: boolean;
  isFavourite: boolean;
}
