/**
 * Team Tags関連のAPIとスキーマ
 */
import { ErrorResponseBody, Pagination } from "../types";

// タグ一覧取得: スキーマ
export type GetV1TeamsTeamNameTags200TagsItem = {
  name?: string;
  posts_count?: number;
};

export type GetV1TeamsTeamNameTags200 = Pagination & {
  tags?: GetV1TeamsTeamNameTags200TagsItem[];
};

// タグ一覧取得: API
export type getV1TeamsTeamNameTagsResponse200 = {
  data: GetV1TeamsTeamNameTags200;
  status: 200;
};

export type getV1TeamsTeamNameTagsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNameTagsResponseComposite =
  | getV1TeamsTeamNameTagsResponse200
  | getV1TeamsTeamNameTagsResponse400;

export type getV1TeamsTeamNameTagsResponse =
  getV1TeamsTeamNameTagsResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNameTagsUrl = (teamName: string) => {
  return `https://api.esa.io/v1/teams/${teamName}/tags`;
};

export const getV1TeamsTeamNameTags = async (
  teamName: string,
  options?: RequestInit
): Promise<getV1TeamsTeamNameTagsResponse> => {
  const res = await fetch(getGetV1TeamsTeamNameTagsUrl(teamName), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNameTagsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNameTagsResponse;
};
