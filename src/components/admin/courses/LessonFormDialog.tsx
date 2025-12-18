"use client";

import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Dialog,
  Alert,
  Chip,
  DialogContent,
} from "@mui/material";
import {
  CreateLessonDto,
  CreatePdfDto,
  LessonResponse,
  OverviewLessonResponse,
  RemovePdfDto,
  UpdateLessonDto,
  UpdatePdfDto,
} from "@/types/api/api-types";
import { lessonAPI } from "@/services/lessons";
import { useToast } from "@/providers/ToastProvider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type PdfForm = {
  id?: string;
  publicId?: string;
  name: string;
  description?: string;
  fileName?: string;
  file?: File;
  isRemoved: boolean;
};

type LessonFormMode = "create" | "update";

type PropsType = {
  mode: LessonFormMode;
  open: boolean;
  onClose: () => void;
  courseId: string;
  initialData?: LessonResponse;
  onLessonChange: (lesson: OverviewLessonResponse) => void;
};

export function LessonFormDialog({
  mode,
  open,
  onClose,
  courseId,
  initialData,
  onLessonChange,
}: PropsType) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [isPreview, setIsPreview] = useState(initialData?.isPreview ?? false);
  const [pdfs, setPdfs] = useState<PdfForm[]>(
    initialData?.pdfs?.map((pdf) => ({
      id: pdf.id,
      publicId: pdf.publicId,
      name: pdf.name,
      description: pdf.description || undefined,
      isRemoved: false,
    })) ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  const handlePdfUpload = (files: FileList | null) => {
    if (!files) return;

    const newPdfs: PdfForm[] = Array.from(files).map((file) => ({
      name: file.name.replace(/.pdf/i, ""),
      file,
      fileName: file.name,
      isRemoved: false,
    }));

    setPdfs((prev) => [...prev, ...newPdfs]);
  };

  const handleRemovePdf = (index: number) => {
    setPdfs((prev) =>
      prev.map((pdf, i) => (i === index ? { ...pdf, isRemoved: true } : pdf))
    );
  };

  const buildPdfPayload = useCallback(() => {
    const createPdfs: CreatePdfDto[] = [];
    const updatePdfs: UpdatePdfDto[] = [];
    const removePdfs: RemovePdfDto[] = [];
    const files: File[] = [];

    for (const pdf of pdfs) {
      // REMOVE
      if (pdf.isRemoved && pdf.publicId) {
        removePdfs.push({ publicId: pdf.publicId });
        continue;
      }

      // CREATE
      if (pdf.file && pdf.fileName) {
        createPdfs.push({
          name: pdf.name,
          description: pdf.description,
          fileName: pdf.fileName,
        });
        files.push(pdf.file);
        continue;
      }

      // UPDATE
      if (pdf.id) {
        updatePdfs.push({
          id: pdf.id,
          name: pdf.name,
          description: pdf.description,
        });
      }
    }

    return { createPdfs, updatePdfs, removePdfs, files };
  }, [pdfs]);

  const buildFormData = useCallback((): FormData => {
    const { createPdfs, updatePdfs, removePdfs, files } = buildPdfPayload();

    const formData = new FormData();
    if (mode === "create") {
      const payload: CreateLessonDto = {
        title,
        content,
        courseId,
        isPreview,
        createPdfs,
      };

      type KeyOfPayload = keyof CreateLessonDto;

      Object.keys(payload).forEach((key) => {
        const value = payload[key as KeyOfPayload];
        if (value) {
          const transformValue =
            typeof value === "object" ? JSON.stringify(value) : String(value);
          formData.append(key, transformValue);
        }
      });
    } else {
      const payload: UpdateLessonDto = {
        title,
        content,
        courseId,
        isPreview,
        createPdfs,
        updatePdfs,
        removePdfs,
      };

      type KeyOfPayload = keyof UpdateLessonDto;

      Object.keys(payload).forEach((key) => {
        const value = payload[key as KeyOfPayload];
        if (value) {
          const transformValue =
            typeof value === "object" ? JSON.stringify(value) : String(value);
          formData.append(key, transformValue);
        }
      });
    }

    if (files.length) {
      files.forEach((file) => {
        formData.append("pdfFiles", file);
      });
    }

    return formData;
  }, [buildPdfPayload, content, courseId, isPreview, mode, title]);

  const handleSubmit = useCallback(async () => {
    const formData = buildFormData();
    setError("");
    setLoading(true);
    try {
      let lesson: LessonResponse;
      if (mode === "create") {
        lesson = await lessonAPI.createLesson(formData);
        showToast("Created lesson successfully", "success");
      } else {
        lesson = await lessonAPI.updateLesson(initialData!.id, formData);
        showToast("Updated lesson successfully", "success");
      }

      onLessonChange({
        id: lesson.id,
        title: lesson.title,
        position: lesson.position,
        isPreview: lesson.isPreview,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode} lesson`);
    } finally {
      setLoading(false);
    }
  }, [buildFormData, initialData, mode, onClose, onLessonChange, showToast]);

  return (
    <Dialog scroll="paper" maxWidth="lg" open={open} onClose={onClose}>
      <DialogContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
          {mode === "update" ? "Edit Lesson" : "Add Lesson"}
        </Typography>

        {!!error && (
          <Alert security="error" color="error" variant="filled" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Lesson title"
          value={title}
          disabled={loading}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          minRows={6}
          label="Lesson content"
          value={content}
          disabled={loading}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isPreview}
              disabled={loading}
              onChange={(e) => setIsPreview(e.target.checked)}
            />
          }
          label="Preview lesson"
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" mb={1}>
          PDFs
        </Typography>

        <Button
          disabled={loading}
          component="label"
          variant="outlined"
          size="small"
        >
          Upload PDFs
          <input
            type="file"
            hidden
            multiple
            accept="application/pdf"
            onChange={(e) => handlePdfUpload(e.target.files)}
          />
        </Button>

        <List sx={{ mt: 1 }}>
          {pdfs.map((pdf, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  disabled={loading || pdf.isRemoved}
                  onClick={() => handleRemovePdf(index)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <Box component="span">
                    {pdf.name}
                    {pdf.isRemoved && (
                      <Chip label="removed" size="small" sx={{ ml: 1 }} />
                    )}
                  </Box>
                }
                secondary={pdf.fileName}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            disabled={loading}
            onClick={onClose}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
