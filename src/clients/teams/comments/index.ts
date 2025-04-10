/**
 * Team Comments関連のAPIとスキーマ
 */
import { Comment, ErrorResponseBody, Pagination } from "../../types";

// コメント取得: スキーマ
export type GetV1TeamsTeamNameCommentsCommentIdParams = {
  include?: GetV1TeamsTeamNameCommentsCommentIdInclude;
};

export type GetV1TeamsTeamNameCommentsCommentIdInclude =
  (typeof GetV1TeamsTeamNameCommentsCommentIdInclude)[keyof typeof GetV1TeamsTeamNameCommentsCommentIdInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNameCommentsCommentIdInclude = {
  stargazers: "stargazers",
} as const;

// コメント更新: スキーマ
export type PatchV1TeamsTeamNameCommentsCommentIdBodyComment = {
  body_md?: string;
  user?: string;
};

export type PatchV1TeamsTeamNameCommentsCommentIdBody = {
  comment?: PatchV1TeamsTeamNameCommentsCommentIdBodyComment;
};

// チームコメント一覧: スキーマ
export type GetV1TeamsTeamNameComments200 = Pagination & {
  comments?: Comment[];
};

// コメント取得: API
export type getV1TeamsTeamNameCommentsCommentIdResponse200 = {
  data: Comment;
  status: 200;
};

export type getV1TeamsTeamNameCommentsCommentIdResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNameCommentsCommentIdResponseComposite =
  | getV1TeamsTeamNameCommentsCommentIdResponse200
  | getV1TeamsTeamNameCommentsCommentIdResponse400;

export type getV1TeamsTeamNameCommentsCommentIdResponse =
  getV1TeamsTeamNameCommentsCommentIdResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNameCommentsCommentIdUrl = (
  teamName: string,
  commentId: number,
  params?: GetV1TeamsTeamNameCommentsCommentIdParams
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}?${stringifiedParams}`
    : `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};

export const getV1TeamsTeamNameCommentsCommentId = async (
  teamName: string,
  commentId: number,
  params?: GetV1TeamsTeamNameCommentsCommentIdParams,
  options?: RequestInit
): Promise<getV1TeamsTeamNameCommentsCommentIdResponse> => {
  const res = await fetch(
    getGetV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId, params),
    {
      ...options,
      method: "GET",
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNameCommentsCommentIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNameCommentsCommentIdResponse;
};

// コメント更新: API
export type patchV1TeamsTeamNameCommentsCommentIdResponse200 = {
  data: Comment;
  status: 200;
};

export type patchV1TeamsTeamNameCommentsCommentIdResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type patchV1TeamsTeamNameCommentsCommentIdResponseComposite =
  | patchV1TeamsTeamNameCommentsCommentIdResponse200
  | patchV1TeamsTeamNameCommentsCommentIdResponse400;

export type patchV1TeamsTeamNameCommentsCommentIdResponse =
  patchV1TeamsTeamNameCommentsCommentIdResponseComposite & {
    headers: Headers;
  };

export const getPatchV1TeamsTeamNameCommentsCommentIdUrl = (
  teamName: string,
  commentId: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};

export const patchV1TeamsTeamNameCommentsCommentId = async (
  teamName: string,
  commentId: number,
  patchV1TeamsTeamNameCommentsCommentIdBody: PatchV1TeamsTeamNameCommentsCommentIdBody,
  options?: RequestInit
): Promise<patchV1TeamsTeamNameCommentsCommentIdResponse> => {
  const res = await fetch(
    getPatchV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(patchV1TeamsTeamNameCommentsCommentIdBody),
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: patchV1TeamsTeamNameCommentsCommentIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as patchV1TeamsTeamNameCommentsCommentIdResponse;
};

// コメント削除: API
export type deleteV1TeamsTeamNameCommentsCommentIdResponse204 = {
  data: void;
  status: 204;
};

export type deleteV1TeamsTeamNameCommentsCommentIdResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type deleteV1TeamsTeamNameCommentsCommentIdResponseComposite =
  | deleteV1TeamsTeamNameCommentsCommentIdResponse204
  | deleteV1TeamsTeamNameCommentsCommentIdResponse400;

export type deleteV1TeamsTeamNameCommentsCommentIdResponse =
  deleteV1TeamsTeamNameCommentsCommentIdResponseComposite & {
    headers: Headers;
  };

export const getDeleteV1TeamsTeamNameCommentsCommentIdUrl = (
  teamName: string,
  commentId: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};

export const deleteV1TeamsTeamNameCommentsCommentId = async (
  teamName: string,
  commentId: number,
  options?: RequestInit
): Promise<deleteV1TeamsTeamNameCommentsCommentIdResponse> => {
  const res = await fetch(
    getDeleteV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId),
    {
      ...options,
      method: "DELETE",
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: deleteV1TeamsTeamNameCommentsCommentIdResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as deleteV1TeamsTeamNameCommentsCommentIdResponse;
};

// チームコメント一覧: API
export type getV1TeamsTeamNameCommentsResponse200 = {
  data: GetV1TeamsTeamNameComments200;
  status: 200;
};

export type getV1TeamsTeamNameCommentsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNameCommentsResponseComposite =
  | getV1TeamsTeamNameCommentsResponse200
  | getV1TeamsTeamNameCommentsResponse400;

export type getV1TeamsTeamNameCommentsResponse =
  getV1TeamsTeamNameCommentsResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNameCommentsUrl = (teamName: string) => {
  return `https://api.esa.io/v1/teams/${teamName}/comments`;
};

export const getV1TeamsTeamNameComments = async (
  teamName: string,
  options?: RequestInit
): Promise<getV1TeamsTeamNameCommentsResponse> => {
  const res = await fetch(getGetV1TeamsTeamNameCommentsUrl(teamName), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNameCommentsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNameCommentsResponse;
};
