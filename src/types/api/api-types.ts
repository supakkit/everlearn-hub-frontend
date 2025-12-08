import { paths } from "./api";

// Authentication
export type SignUpDto = paths["/api/auth/signup"]["post"]["requestBody"]["content"]["application/json"];
export type SignUpResponse = paths["/api/auth/signup"]["post"]["responses"]["201"]["content"]["application/json"];
export type LoginDto = paths["/api/auth/login"]["post"]["requestBody"]["content"]["application/json"];
export type LoginResponse = paths["/api/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
export type RefreshTokenResponse = paths["/api/auth/refresh"]["post"]["responses"]["200"]["content"]["application/json"];

// User
export type User = paths["/api/users/me"]["get"]["responses"]["200"]["content"]["application/json"];
export type UpdateUserDto = paths["/api/users/me"]["patch"]["requestBody"]["content"]["application/json"];
export type UpdateProfileDto = Omit<UpdateUserDto, 'role'>;

// Course
export type GetCourseParams = paths["/api/courses"]["get"]["parameters"]["query"];
export type CourseResponse = paths["/api/courses/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type AllCoursesResponse = paths["/api/courses"]["get"]["responses"]["200"]["content"]["application/json"];

// Category
export type CategoryNamesResponse = paths["/api/categories"]["get"]["responses"]["200"]["content"]["application/json"];


// Dashboard
export type DashboardResponse = paths["/api/dashboard/me"]["get"]["responses"]["200"]["content"]["application/json"];


/**
 * Recommended Naming Convention
 * 📌 Use PascalCase + Suffix Based on Purpose
 * 
 * For request bodies sent to API:
 *   SignUpRequest
 *   LoginRequest
 *   CreateCourseRequest
 *   UpdateCourseRequest
 *   RefreshTokenRequest
 * 
 * For response objects:
 *   SignUpResponse
 *   CourseListResponse
 *   CourseDetailResponse
 * 
 * For URL parameters:
 *   GetCourseParams
 *   DeleteCourseParams
 * 
 * For query parameters:
 *   CourseQuery
 *   CourseFilter
 *   GetCoursesQuery
 */

