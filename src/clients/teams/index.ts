/**
 * Teams関連のAPIとスキーマ
 */
import { ErrorResponseBody, Pagination, Team } from "../types";

// チーム一覧取得: スキーマ
export type GetV1TeamsParams = {
  role?: GetV1TeamsRole;
};

export type GetV1TeamsRole =
  (typeof GetV1TeamsRole)[keyof typeof GetV1TeamsRole];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsRole = {
  member: "member",
  owner: "owner",
} as const;

export type GetV1Teams200 = Pagination & {
  teams?: Team[];
};

// チーム統計取得: スキーマ
export type GetV1TeamsTeamNameStats200 = {
  members?: number;
  posts?: number;
  posts_wip?: number;
  posts_shipped?: number;
  comments?: number;
  stars?: number;
  daily_active_users?: number;
  weekly_active_users?: number;
  monthly_active_users?: number;
};

// チーム一覧取得: API
export type getV1TeamsResponse200 = {
  data: GetV1Teams200;
  status: 200;
};

export type getV1TeamsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsResponseComposite =
  | getV1TeamsResponse200
  | getV1TeamsResponse400;

export type getV1TeamsResponse = getV1TeamsResponseComposite & {
  headers: Headers;
};

export const getGetV1TeamsUrl = (params?: GetV1TeamsParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `https://api.esa.io/v1/teams?${stringifiedParams}`
    : `https://api.esa.io/v1/teams`;
};

export const getV1Teams = async (
  params?: GetV1TeamsParams,
  options?: RequestInit
): Promise<getV1TeamsResponse> => {
  const res = await fetch(getGetV1TeamsUrl(params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsResponse;
};

// チーム取得: API
export type getV1TeamsTeamNameResponse200 = {
  data: Team;
  status: 200;
};

export type getV1TeamsTeamNameResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNameResponseComposite =
  | getV1TeamsTeamNameResponse200
  | getV1TeamsTeamNameResponse400;

export type getV1TeamsTeamNameResponse = getV1TeamsTeamNameResponseComposite & {
  headers: Headers;
};

export const getGetV1TeamsTeamNameUrl = (teamName: string) => {
  return `https://api.esa.io/v1/teams/${teamName}`;
};

export const getV1TeamsTeamName = async (
  teamName: string,
  options?: RequestInit
): Promise<getV1TeamsTeamNameResponse> => {
  const res = await fetch(getGetV1TeamsTeamNameUrl(teamName), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNameResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNameResponse;
};

// チーム統計取得: API
export type getV1TeamsTeamNameStatsResponse200 = {
  data: GetV1TeamsTeamNameStats200;
  status: 200;
};

export type getV1TeamsTeamNameStatsResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1TeamsTeamNameStatsResponseComposite =
  | getV1TeamsTeamNameStatsResponse200
  | getV1TeamsTeamNameStatsResponse400;

export type getV1TeamsTeamNameStatsResponse =
  getV1TeamsTeamNameStatsResponseComposite & {
    headers: Headers;
  };

export const getGetV1TeamsTeamNameStatsUrl = (teamName: string) => {
  return `https://api.esa.io/v1/teams/${teamName}/stats`;
};

export const getV1TeamsTeamNameStats = async (
  teamName: string,
  options?: RequestInit
): Promise<getV1TeamsTeamNameStatsResponse> => {
  const res = await fetch(getGetV1TeamsTeamNameStatsUrl(teamName), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1TeamsTeamNameStatsResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1TeamsTeamNameStatsResponse;
};
