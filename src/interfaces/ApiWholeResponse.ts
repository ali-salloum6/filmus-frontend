import IApiResponse from "./ApiResponse";

export default interface IApiWholeRsponse {
  page: number;
  results: IApiResponse[];
  total_pages: number;
  total_results: number;
}
