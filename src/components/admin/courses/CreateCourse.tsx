import { CourseFormDialog } from "@/components/admin/courses/CourseFormDialog";
import { courseAPI } from "@/services/courses";
import { CreateCourseDto } from "@/types/api/api-types";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

export function CreateCourse({ open, onClose }: PropsType) {
  const initialData: CreateCourseDto = {
    title: "",
    description: "",
    categoryId: "",
    isFree: false,
    priceBaht: 0,
    isPublished: false,
  };

  const handleCreateCourse = async (form: CreateCourseDto, imageFile: File) => {
    const formData = new FormData();
    type KeyOfFormData = keyof CreateCourseDto;

    Object.keys(form).forEach((key) => {
      formData.append(key, String(form[key as KeyOfFormData]));
    });
    formData.append("imageFile", imageFile);

    return courseAPI.createCourse(formData);
  };

  return (
    <CourseFormDialog
      mode="create"
      initialData={initialData}
      submitLabel="Create Course"
      onSubmit={handleCreateCourse}
      open={open}
      onClose={onClose}
    />
  );
}
