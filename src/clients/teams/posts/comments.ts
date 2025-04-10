/**
 * Team Posts Comments関連のAPIとスキーマ
 */
import { Comment, ErrorResponseBody, Pagination } from "../../types";

// 投稿コメント一覧取得: スキーマ
export type GetV1TeamsTeamNamePostsPostNumberComments200 = Pagination & {
  comments?: Comment[];
};

// コメント作成: スキーマ
export type PostV1TeamsTeamNamePostsPostNumberCommentsBodyComment = {
  body_md: string;
  user?: string;
};

export type PostV1TeamsTeamNamePostsPostNumberCommentsBody = {
  comment?: PostV1TeamsTeamNamePostsPostNumberCommentsBodyComment;
};

// 投稿コメント一覧取得: API
export type getV1TeamsTeamNamePostsPostNumberCommentsResponse200 = {
  data: GetV1TeamsTeamNamePostsPostNumberComments200;
  status: 200;
};

export type getV1TeamsTeamNamePostsPostNumberCommentsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNamePostsPostNumberCommentsResponseComposite =
  | getV1TeamsTeamNamePostsPostNumberCommentsResponse200
  | getV1TeamsTeamNamePostsPostNumberCommentsResponse400;

export type getV1TeamsTeamNamePostsPostNumberCommentsResponse =
  getV1TeamsTeamNamePostsPostNumberCommentsResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNamePostsPostNumberCommentsUrl = (
  teamName: string,
  postNumber: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}/comments`;
};

export const getV1TeamsTeamNamePostsPostNumberComments = async (
  teamName: string,
  postNumber: number,
  options?: RequestInit
): Promise<getV1TeamsTeamNamePostsPostNumberCommentsResponse> => {
  const res = await fetch(
    getGetV1TeamsTeamNamePostsPostNumberCommentsUrl(teamName, postNumber),
    {
      ...options,
      method: "GET",
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNamePostsPostNumberCommentsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNamePostsPostNumberCommentsResponse;
};

// コメント作成: API
export type postV1TeamsTeamNamePostsPostNumberCommentsResponse201 = {
  data: Comment;
  status: 201;
};

export type postV1TeamsTeamNamePostsPostNumberCommentsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type postV1TeamsTeamNamePostsPostNumberCommentsResponseComposite =
  | postV1TeamsTeamNamePostsPostNumberCommentsResponse201
  | postV1TeamsTeamNamePostsPostNumberCommentsResponse400;

export type postV1TeamsTeamNamePostsPostNumberCommentsResponse =
  postV1TeamsTeamNamePostsPostNumberCommentsResponseComposite & {
    headers: Headers;
  };

export const getPostV1TeamsTeamNamePostsPostNumberCommentsUrl = (
  teamName: string,
  postNumber: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}/comments`;
};

export const postV1TeamsTeamNamePostsPostNumberComments = async (
  teamName: string,
  postNumber: number,
  postV1TeamsTeamNamePostsPostNumberCommentsBody: PostV1TeamsTeamNamePostsPostNumberCommentsBody,
  options?: RequestInit
): Promise<postV1TeamsTeamNamePostsPostNumberCommentsResponse> => {
  const res = await fetch(
    getPostV1TeamsTeamNamePostsPostNumberCommentsUrl(teamName, postNumber),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(postV1TeamsTeamNamePostsPostNumberCommentsBody),
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postV1TeamsTeamNamePostsPostNumberCommentsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postV1TeamsTeamNamePostsPostNumberCommentsResponse;
};
