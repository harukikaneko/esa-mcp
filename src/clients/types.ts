/**
 * 共通の型定義
 */

// ページネーション型
export interface Pagination {
  /** @nullable */
  prev_page?: number | null;
  /** @nullable */
  next_page?: number | null;
  total_count?: number;
  page?: number;
  per_page?: number;
  max_per_page?: number;
}

// チーム公開設定
export type TeamPrivacy = (typeof TeamPrivacy)[keyof typeof TeamPrivacy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamPrivacy = {
  closed: "closed",
  open: "open",
} as const;

// チーム情報
export interface Team {
  name?: string;
  privacy?: TeamPrivacy;
  description?: string;
  icon?: string;
  url?: string;
}

// メンバーロール
export type MemberRole = (typeof MemberRole)[keyof typeof MemberRole];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MemberRole = {
  owner: "owner",
  member: "member",
} as const;

// メンバー情報
export interface Member {
  myself?: boolean;
  name?: string;
  screen_name?: string;
  icon?: string;
  email?: string;
  posts_count?: number;
  role?: MemberRole;
  joined_at?: string;
  last_accessed_at?: string;
}

// 投稿タイプ
export type PostKind = (typeof PostKind)[keyof typeof PostKind];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostKind = {
  stock: "stock",
  flow: "flow",
} as const;

// ユーザー情報
export interface User {
  myself?: boolean;
  name?: string;
  screen_name?: string;
  icon?: string;
}

// 投稿情報
export interface Post {
  number?: number;
  name?: string;
  full_name?: string;
  wip?: boolean;
  body_md?: string;
  body_html?: string;
  created_at?: string;
  message?: string;
  url?: string;
  updated_at?: string;
  tags?: string[];
  /** @nullable */
  category?: string | null;
  revision_number?: number;
  created_by?: User;
  updated_by?: User;
  kind?: PostKind;
  comments_count?: number;
  tasks_count?: number;
  done_tasks_count?: number;
  stargazers_count?: number;
  watchers_count?: number;
  star?: boolean;
  watch?: boolean;
}

// コメント情報
export interface Comment {
  id?: number;
  body_md?: string;
  body_html?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
  created_by?: User;
  stargazers_count?: number;
  star?: boolean;
}

/**
 * エラーレスポンス
 * メッセージ・エラーがないケースもある
 */
export interface ErrorResponseBody {
  message?: string;
  error?: string;
}

/**
 * ページ番号パラメータ
 */
export type PageParameter = number;

/**
 * ページあたりのアイテム数パラメータ
 */
export type PerPageParameter = number;
