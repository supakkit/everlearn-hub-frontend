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
export type CourseWithLessonsResponse = paths["/api/courses/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type AllCoursesResponse = paths["/api/courses"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateCourseDto = paths["/api/admin/courses"]["post"]["requestBody"]["content"]["application/json"];
export type UpdateCourseDto = paths["/api/admin/courses/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type CourseResponse = paths["/api/admin/courses"]["post"]["responses"]["201"]["content"]["application/json"];
export type ReorderLessonsDto = paths["/api/admin/courses/{id}/lessons/reorder"]["patch"]["requestBody"]["content"]["application/json"];

// Lesson
export type LessonResponse = paths["/api/lessons/{id}"]["get"]["responses"]["200"]["content"]["application/json"];
export type CreateLessonDto = paths["/api/admin/lessons"]["post"]["requestBody"]["content"]["application/json"];
export type UpdateLessonDto = paths["/api/admin/lessons/{id}"]["patch"]["requestBody"]["content"]["application/json"];
export type OverviewLessonResponse = paths["/api/admin/courses/{id}/lessons/reorder"]["patch"]["responses"]["200"]["content"]["application/json"][number];

// PDF
export type CreatePdfDto = NonNullable<paths["/api/admin/lessons"]["post"]["requestBody"]["content"]["application/json"]["createPdfs"]>[number];
export type UpdatePdfDto = NonNullable<paths["/api/admin/lessons/{id}"]["patch"]["requestBody"]["content"]["application/json"]["updatePdfs"]>[number];
export type RemovePdfDto = NonNullable<paths["/api/admin/lessons/{id}"]["patch"]["requestBody"]["content"]["application/json"]["removePdfs"]>[number];

// Admin Course
export type AllCoursesWithLessonsResponse = paths["/api/admin/courses"]["get"]["responses"]["200"]["content"]["application/json"];

// Category
export type CategoryResponse = paths["/api/categories"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type CategoryWithCourseCountResponse = paths["/api/admin/categories"]["get"]["responses"]["200"]["content"]["application/json"][number];
export type CreateCategoryDto = paths["/api/admin/categories"]["post"]["requestBody"]["content"]["application/json"];
export type UpdateCategoryDto = paths["/api/admin/categories/{id}"]["patch"]["requestBody"]["content"]["application/json"];

// Dashboard
export type DashboardResponse = paths["/api/dashboard/me"]["get"]["responses"]["200"]["content"]["application/json"];

// Progress
export type ProgressResponse = paths["/api/progress/lessons/{id}/me"]["get"]["responses"]["200"]["content"]["application/json"];
export type CourseProgressResponse = paths["/api/progress/courses/{id}/me"]["get"]["responses"]["200"]["content"]["application/json"];

// Enrollment
export type EnrolledCourseResponse = paths["/api/enrollments/courses/{id}/me"]["get"]["responses"]["200"]["content"]["application/json"];

// Payment
export type CheckoutDto = paths["/api/payments/checkout"]["post"]["requestBody"]["content"]["application/json"];
export type RedirectCheckoutResponse = paths["/api/payments/checkout"]["post"]["responses"]["201"]["content"]["application/json"];
export type CheckoutSessionResponse = paths["/api/payments/checkout-session/{sessionId}"]["get"]["responses"]["200"]["content"]["application/json"];
export type FreeCourseCheckoutResponse = paths["/api/payments/free-enroll"]["post"]["responses"]["201"]["content"]["application/json"];


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

