/**
 * User関連のAPIとスキーマ
 */
import { ErrorResponseBody } from "../types";

// 認証ユーザー取得: スキーマ
export type GetV1UserParams = {
  include?: GetV1UserInclude;
};

export type GetV1UserInclude =
  (typeof GetV1UserInclude)[keyof typeof GetV1UserInclude];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1UserInclude = {
  teams: "teams",
} as const;

export type GetV1User200 = {
  id?: number;
  name?: string;
  screen_name?: string;
  created_at?: string;
  updated_at?: string;
  icon?: string;
  email?: string;
};

// 認証ユーザー取得: API
export type getV1UserResponse200 = {
  data: GetV1User200;
  status: 200;
};

export type getV1UserResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getV1UserResponseComposite =
  | getV1UserResponse200
  | getV1UserResponse400;

export type getV1UserResponse = getV1UserResponseComposite & {
  headers: Headers;
};

export const getGetV1UserUrl = (params?: GetV1UserParams) => {
  const normalizedParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      normalizedParams.append(key, value === null ? "null" : value.toString());
    }
  });

  const stringifiedParams = normalizedParams.toString();

  return stringifiedParams.length > 0
    ? `https://api.esa.io/v1/user?${stringifiedParams}`
    : `https://api.esa.io/v1/user`;
};

export const getV1User = async (
  params?: GetV1UserParams,
  options?: RequestInit
): Promise<getV1UserResponse> => {
  const res = await fetch(getGetV1UserUrl(params), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getV1UserResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getV1UserResponse;
};
