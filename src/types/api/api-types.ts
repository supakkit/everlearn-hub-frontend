import { paths } from "./api";

export type SignUpDto = paths["/api/auth/signup"]["post"]["requestBody"]["content"]["application/json"];
export type SignUpResponse = paths["/api/auth/signup"]["post"]["responses"]["201"]["content"]["application/json"];
export type LoginDto = paths["/api/auth/login"]["post"]["requestBody"]["content"]["application/json"];
export type LoginResponse = paths["/api/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
export type RefreshTokenResponse = paths["/api/auth/refresh"]["post"]["responses"]["200"]["content"]["application/json"];

export type User = paths["/api/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
