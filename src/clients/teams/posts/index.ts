/**
 * Team Posts関連のAPIとスキーマ
 */
import {
  ErrorResponseBody,
  Pagination,
  PageParameter,
  PerPageParameter,
  Post,
} from "../../types";

// 投稿一覧取得: スキーマ
export type GetV1TeamsTeamNamePostsParams = {
  /**
   * 検索クエリ
   */
  q?: string;
  include?: GetV1TeamsTeamNamePostsInclude;
  sort?: GetV1TeamsTeamNamePostsSort;
  order?: GetV1TeamsTeamNamePostsOrder;
  /**
   * ページ番号
   */
  page?: PageParameter;
  /**
   * 1ページあたりのアイテム数
   */
  per_page?: PerPageParameter;
};

export type GetV1TeamsTeamNamePostsInclude =
  (typeof GetV1TeamsTeamNamePostsInclude)[keyof typeof GetV1TeamsTeamNamePostsInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNamePostsInclude = {
  comments: "comments",
  stargazers: "stargazers",
  "comments,stargazers": "comments,stargazers",
  "comments,commentsstargazers": "comments,comments.stargazers",
} as const;

export type GetV1TeamsTeamNamePostsSort =
  (typeof GetV1TeamsTeamNamePostsSort)[keyof typeof GetV1TeamsTeamNamePostsSort];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNamePostsSort = {
  updated: "updated",
  created: "created",
  number: "number",
  stars: "stars",
  watches: "watches",
  comments: "comments",
  best_match: "best_match",
} as const;

export type GetV1TeamsTeamNamePostsOrder =
  (typeof GetV1TeamsTeamNamePostsOrder)[keyof typeof GetV1TeamsTeamNamePostsOrder];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNamePostsOrder = {
  asc: "asc",
  desc: "desc",
} as const;

export type GetV1TeamsTeamNamePosts200 = Pagination & {
  posts?: Post[];
};

// 投稿作成: スキーマ
export type PostV1TeamsTeamNamePostsBodyPost = {
  name: string;
  body_md?: string;
  tags?: string[];
  category?: string;
  wip?: boolean;
  message?: string;
  user?: string;
  template_post_id?: number;
};

export type PostV1TeamsTeamNamePostsBody = {
  post?: PostV1TeamsTeamNamePostsBodyPost;
};

// 投稿取得: スキーマ
export type GetV1TeamsTeamNamePostsPostNumberParams = {
  include?: GetV1TeamsTeamNamePostsPostNumberInclude;
};

export type GetV1TeamsTeamNamePostsPostNumberInclude =
  (typeof GetV1TeamsTeamNamePostsPostNumberInclude)[keyof typeof GetV1TeamsTeamNamePostsPostNumberInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNamePostsPostNumberInclude = {
  comments: "comments",
  "comments,commentsstargazers": "comments,comments.stargazers",
  stargazers: "stargazers",
} as const;

// 投稿更新: スキーマ
export type PatchV1TeamsTeamNamePostsPostNumberBodyPostOriginalRevision = {
  body_md?: string;
  number?: number;
  user?: string;
};

export type PatchV1TeamsTeamNamePostsPostNumberBodyPost = {
  name?: string;
  body_md?: string;
  tags?: string[];
  category?: string;
  wip?: boolean;
  message?: string;
  created_by?: string;
  updated_by?: string;
  original_revision?: PatchV1TeamsTeamNamePostsPostNumberBodyPostOriginalRevision;
};

export type PatchV1TeamsTeamNamePostsPostNumberBody = {
  post?: PatchV1TeamsTeamNamePostsPostNumberBodyPost;
};

export type PatchV1TeamsTeamNamePostsPostNumber200AllOf = {
  overlapped?: boolean;
};

export type PatchV1TeamsTeamNamePostsPostNumber200 = Post &
  PatchV1TeamsTeamNamePostsPostNumber200AllOf;

// 投稿一覧取得: API
export type getV1TeamsTeamNamePostsResponse200 = {
  data: GetV1TeamsTeamNamePosts200;
  status: 200;
};

export type getV1TeamsTeamNamePostsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNamePostsResponseComposite =
  | getV1TeamsTeamNamePostsResponse200
  | getV1TeamsTeamNamePostsResponse400;

export type getV1TeamsTeamNamePostsResponse =
  getV1TeamsTeamNamePostsResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNamePostsUrl = (
  teamName: string,
  params?: GetV1TeamsTeamNamePostsParams
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `https://api.esa.io/v1/teams/${teamName}/posts?${stringifiedParams}`
    : `https://api.esa.io/v1/teams/${teamName}/posts`;
};

export const getV1TeamsTeamNamePosts = async (
  teamName: string,
  params?: GetV1TeamsTeamNamePostsParams,
  options?: RequestInit
): Promise<getV1TeamsTeamNamePostsResponse> => {
  const res = await fetch(getGetV1TeamsTeamNamePostsUrl(teamName, params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNamePostsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNamePostsResponse;
};

// 投稿作成: API
export type postV1TeamsTeamNamePostsResponse201 = {
  data: Post;
  status: 201;
};

export type postV1TeamsTeamNamePostsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type postV1TeamsTeamNamePostsResponseComposite =
  | postV1TeamsTeamNamePostsResponse201
  | postV1TeamsTeamNamePostsResponse400;

export type postV1TeamsTeamNamePostsResponse =
  postV1TeamsTeamNamePostsResponseComposite & {
    headers: Headers;
  };

export const getPostV1TeamsTeamNamePostsUrl = (teamName: string) => {
  return `https://api.esa.io/v1/teams/${teamName}/posts`;
};

export const postV1TeamsTeamNamePosts = async (
  teamName: string,
  postV1TeamsTeamNamePostsBody: PostV1TeamsTeamNamePostsBody,
  options?: RequestInit
): Promise<postV1TeamsTeamNamePostsResponse> => {
  const res = await fetch(getPostV1TeamsTeamNamePostsUrl(teamName), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(postV1TeamsTeamNamePostsBody),
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postV1TeamsTeamNamePostsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postV1TeamsTeamNamePostsResponse;
};

// 投稿取得: API
export type getV1TeamsTeamNamePostsPostNumberResponse200 = {
  data: Post;
  status: 200;
};

export type getV1TeamsTeamNamePostsPostNumberResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNamePostsPostNumberResponseComposite =
  | getV1TeamsTeamNamePostsPostNumberResponse200
  | getV1TeamsTeamNamePostsPostNumberResponse400;

export type getV1TeamsTeamNamePostsPostNumberResponse =
  getV1TeamsTeamNamePostsPostNumberResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNamePostsPostNumberUrl = (
  teamName: string,
  postNumber: number,
  params?: GetV1TeamsTeamNamePostsPostNumberParams
) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}?${stringifiedParams}`
    : `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}`;
};

export const getV1TeamsTeamNamePostsPostNumber = async (
  teamName: string,
  postNumber: number,
  params?: GetV1TeamsTeamNamePostsPostNumberParams,
  options?: RequestInit
): Promise<getV1TeamsTeamNamePostsPostNumberResponse> => {
  const res = await fetch(
    getGetV1TeamsTeamNamePostsPostNumberUrl(teamName, postNumber, params),
    {
      ...options,
      method: "GET",
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNamePostsPostNumberResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNamePostsPostNumberResponse;
};

// 投稿更新: API
export type patchV1TeamsTeamNamePostsPostNumberResponse200 = {
  data: PatchV1TeamsTeamNamePostsPostNumber200;
  status: 200;
};

export type patchV1TeamsTeamNamePostsPostNumberResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type patchV1TeamsTeamNamePostsPostNumberResponseComposite =
  | patchV1TeamsTeamNamePostsPostNumberResponse200
  | patchV1TeamsTeamNamePostsPostNumberResponse400;

export type patchV1TeamsTeamNamePostsPostNumberResponse =
  patchV1TeamsTeamNamePostsPostNumberResponseComposite & {
    headers: Headers;
  };

export const getPatchV1TeamsTeamNamePostsPostNumberUrl = (
  teamName: string,
  postNumber: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}`;
};

export const patchV1TeamsTeamNamePostsPostNumber = async (
  teamName: string,
  postNumber: number,
  patchV1TeamsTeamNamePostsPostNumberBody: PatchV1TeamsTeamNamePostsPostNumberBody,
  options?: RequestInit
): Promise<patchV1TeamsTeamNamePostsPostNumberResponse> => {
  const res = await fetch(
    getPatchV1TeamsTeamNamePostsPostNumberUrl(teamName, postNumber),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(patchV1TeamsTeamNamePostsPostNumberBody),
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: patchV1TeamsTeamNamePostsPostNumberResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as patchV1TeamsTeamNamePostsPostNumberResponse;
};

// 投稿削除: API
export type deleteV1TeamsTeamNamePostsPostNumberResponse204 = {
  data: void;
  status: 204;
};

export type deleteV1TeamsTeamNamePostsPostNumberResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type deleteV1TeamsTeamNamePostsPostNumberResponseComposite =
  | deleteV1TeamsTeamNamePostsPostNumberResponse204
  | deleteV1TeamsTeamNamePostsPostNumberResponse400;

export type deleteV1TeamsTeamNamePostsPostNumberResponse =
  deleteV1TeamsTeamNamePostsPostNumberResponseComposite & {
    headers: Headers;
  };

export const getDeleteV1TeamsTeamNamePostsPostNumberUrl = (
  teamName: string,
  postNumber: number
) => {
  return `https://api.esa.io/v1/teams/${teamName}/posts/${postNumber}`;
};

export const deleteV1TeamsTeamNamePostsPostNumber = async (
  teamName: string,
  postNumber: number,
  options?: RequestInit
): Promise<deleteV1TeamsTeamNamePostsPostNumberResponse> => {
  const res = await fetch(
    getDeleteV1TeamsTeamNamePostsPostNumberUrl(teamName, postNumber),
    {
      ...options,
      method: "DELETE",
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: deleteV1TeamsTeamNamePostsPostNumberResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as deleteV1TeamsTeamNamePostsPostNumberResponse;
};
