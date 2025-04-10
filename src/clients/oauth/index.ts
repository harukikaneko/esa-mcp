/**
 * OAuth関連のAPIとスキーマ
 */
import { ErrorResponseBody } from "../types";

// OAuthトークン発行: スキーマ
export type PostOauthTokenBodyGrantType =
  (typeof PostOauthTokenBodyGrantType)[keyof typeof PostOauthTokenBodyGrantType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostOauthTokenBodyGrantType = {
  authorization_code: "authorization_code",
} as const;

export type PostOauthTokenBody = {
  client_id: string;
  client_secret: string;
  grant_type: PostOauthTokenBodyGrantType;
  redirect_uri: string;
  code: string;
};

export type PostOauthToken200 = {
  access_token?: string;
  token_type?: string;
  scope?: string;
  created_at?: number;
};

// OAuthトークン情報取得: スキーマ
export type GetOauthTokenInfo200ExpiresIn = number | null;

export type GetOauthTokenInfo200Application = {
  uid?: string;
};

export type GetOauthTokenInfo200User = {
  id?: number;
};

export type GetOauthTokenInfo200 = {
  resource_owner_id?: number;
  scope?: string[];
  expires_in?: GetOauthTokenInfo200ExpiresIn;
  application?: GetOauthTokenInfo200Application;
  created_at?: number;
  user?: GetOauthTokenInfo200User;
};

// OAuthトークン取消: スキーマ
export type PostOauthRevokeBody = {
  client_id: string;
  client_secret: string;
  token: string;
};

export type PostOauthRevoke200 = { [key: string]: unknown };

// OAuthトークン発行: API
export type postOauthTokenResponse200 = {
  data: PostOauthToken200;
  status: 200;
};

export type postOauthTokenResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type postOauthTokenResponseComposite =
  | postOauthTokenResponse200
  | postOauthTokenResponse400;

export type postOauthTokenResponse = postOauthTokenResponseComposite & {
  headers: Headers;
};

export const getPostOauthTokenUrl = () => {
  return `https://api.esa.io/oauth/token`;
};

export const postOauthToken = async (
  postOauthTokenBody: PostOauthTokenBody,
  options?: RequestInit
): Promise<postOauthTokenResponse> => {
  const res = await fetch(getPostOauthTokenUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(postOauthTokenBody),
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postOauthTokenResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postOauthTokenResponse;
};

// OAuthトークン情報取得: API
export type getOauthTokenInfoResponse200 = {
  data: GetOauthTokenInfo200;
  status: 200;
};

export type getOauthTokenInfoResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type getOauthTokenInfoResponseComposite =
  | getOauthTokenInfoResponse200
  | getOauthTokenInfoResponse400;

export type getOauthTokenInfoResponse = getOauthTokenInfoResponseComposite & {
  headers: Headers;
};

export const getGetOauthTokenInfoUrl = () => {
  return `https://api.esa.io/oauth/token/info`;
};

export const getOauthTokenInfo = async (
  options?: RequestInit
): Promise<getOauthTokenInfoResponse> => {
  const res = await fetch(getGetOauthTokenInfoUrl(), {
    ...options,
    method: "GET",
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: getOauthTokenInfoResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as getOauthTokenInfoResponse;
};

// OAuthトークン取消: API
export type postOauthRevokeResponse200 = {
  data: PostOauthRevoke200;
  status: 200;
};

export type postOauthRevokeResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type postOauthRevokeResponseComposite =
  | postOauthRevokeResponse200
  | postOauthRevokeResponse400;

export type postOauthRevokeResponse = postOauthRevokeResponseComposite & {
  headers: Headers;
};

export const getPostOauthRevokeUrl = () => {
  return `https://api.esa.io/oauth/revoke`;
};

export const postOauthRevoke = async (
  postOauthRevokeBody: PostOauthRevokeBody,
  options?: RequestInit
): Promise<postOauthRevokeResponse> => {
  const res = await fetch(getPostOauthRevokeUrl(), {
    ...options,
    method: "POST",
    headers: { "Content-Type": "application/json", ...options?.headers },
    body: JSON.stringify(postOauthRevokeBody),
  });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postOauthRevokeResponse["data"] = body ? JSON.parse(body) : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postOauthRevokeResponse;
};
