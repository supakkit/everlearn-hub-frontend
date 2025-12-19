import type { Components } from 'react-markdown'
import {
  Typography,
  Link,
  List,
  ListItem,
  Box,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const muiMarkdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <Typography component="h1" variant="h4" gutterBottom {...props}>
      {children}
    </Typography>
  ),

  h2: ({ children, ...props }) => (
    <Typography
      component="h2"
      variant="h5"
      gutterBottom
      sx={{ mt: 4 }}
      {...props}
    >
      {children}
    </Typography>
  ),

  h3: ({ children, ...props }) => (
    <Typography
      component="h3"
      variant="h6"
      gutterBottom
      sx={{ mt: 3 }}
      {...props}
    >
      {children}
    </Typography>
  ),

  p: ({ children, ...props }) => (
    <Typography component="p" variant="body1" fontSize={18} {...props}>
      {children}
    </Typography>
  ),

  a: ({ href, children, ...props }) => (
    <Link href={href} {...props}>
      {children}
    </Link>
  ),

  ul: ({ children, ...props }) => (
    <List component="ul" sx={{ pl: 3, listStyleType: 'disc' }} {...props}>
      {children}
    </List>
  ),

  ol: ({ children, ...props }) => (
    <List component="ol" sx={{ pl: 3, listStyleType: 'decimal' }} {...props}>
      {children}
    </List>
  ),

  li: ({ children, ...props }) => (
    <ListItem
      component="li"
      sx={{ display: 'list-item', py: 0 }}
      {...props}
    >
      {children}
    </ListItem>
  ),

  blockquote: ({ children, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: 'divider',
        pl: 2,
        my: 3,
        opacity: 0.8,
      }}
      {...props}
    >
      {children}
    </Box>
  ),

  code: ({ className, children, ...props }) => {
    const theme = useTheme()
    const match = /language-(\w+)/.exec(className || '')

    // Code block
    if (match) {
      return (
        <Box sx={{ my: 3 }}>
          <SyntaxHighlighter
            language={match[1]}
            style={theme.palette.mode === 'dark' ? oneDark : oneLight}
            PreTag="div"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      )
    }

    // Inline code
    return (
      <Box
        component="code"
        sx={{
          px: 0.5,
          py: 0.2,
          borderRadius: 1,
          fontSize: '0.85em',
          bgcolor: 'action.hover',
        }}
        {...props}
      >
        {children}
      </Box>
    )
  },
}
