import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { muiMarkdownComponents } from "./muiMarkdownComponents";

export default function MarkdownView({ content }: { content: string }) {
  return (
    <Box component="article">
      <ReactMarkdown components={muiMarkdownComponents}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}
