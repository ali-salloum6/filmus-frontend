import IApiWholeRsponse from "@/interfaces/ApiWholeResponse";

export default interface ICardsListProps extends IApiWholeRsponse {
  isPlanned: boolean;
  isWatched: boolean;
  isFavourite: boolean;
}
