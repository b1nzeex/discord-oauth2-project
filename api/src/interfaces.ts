export interface OAuth2TokenBody {
  code: string;
  redirectUri: string;
}

export interface OAuth2TokenResponse {
  access_token: string;
  token_type: "Bot" | "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface OAuth2MeBody {
  token: string;
}

export interface OAuth2UserResponse {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export enum Status {
  "Unauthorized" = 401,
  "NotFound" = 404,
  "OK" = 200,
}
