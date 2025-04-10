/**
 * Team Categories関連のAPIとスキーマ
 */
import { ErrorResponseBody } from "../types";

// カテゴリーバッチ移動: スキーマ
export type PostV1TeamsTeamNameCategoriesBatchMoveBody = {
  /** ソースカテゴリーパス */
  from: string;
  /** 移動先カテゴリーパス */
  to: string;
};

export type PostV1TeamsTeamNameCategoriesBatchMove200 = {
  /** サブカテゴリーを含む移動したカテゴリー数 */
  count?: number;
  from?: string;
  to?: string;
};

// カテゴリーバッチ移動: API
export type postV1TeamsTeamNameCategoriesBatchMoveResponse200 = {
  data: PostV1TeamsTeamNameCategoriesBatchMove200;
  status: 200;
};

export type postV1TeamsTeamNameCategoriesBatchMoveResponse400 = {
  data: ErrorResponseBody;
  status: 400;
};

export type postV1TeamsTeamNameCategoriesBatchMoveResponseComposite =
  | postV1TeamsTeamNameCategoriesBatchMoveResponse200
  | postV1TeamsTeamNameCategoriesBatchMoveResponse400;

export type postV1TeamsTeamNameCategoriesBatchMoveResponse =
  postV1TeamsTeamNameCategoriesBatchMoveResponseComposite & {
    headers: Headers;
  };

export const getPostV1TeamsTeamNameCategoriesBatchMoveUrl = (
  teamName: string
) => {
  return `https://api.esa.io/v1/teams/${teamName}/categories/batch_move`;
};

export const postV1TeamsTeamNameCategoriesBatchMove = async (
  teamName: string,
  postV1TeamsTeamNameCategoriesBatchMoveBody: PostV1TeamsTeamNameCategoriesBatchMoveBody,
  options?: RequestInit
): Promise<postV1TeamsTeamNameCategoriesBatchMoveResponse> => {
  const res = await fetch(
    getPostV1TeamsTeamNameCategoriesBatchMoveUrl(teamName),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(postV1TeamsTeamNameCategoriesBatchMoveBody),
    }
  );

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();
  const data: postV1TeamsTeamNameCategoriesBatchMoveResponse["data"] = body
    ? JSON.parse(body)
    : {};

  return {
    data,
    status: res.status,
    headers: res.headers,
  } as postV1TeamsTeamNameCategoriesBatchMoveResponse;
};
