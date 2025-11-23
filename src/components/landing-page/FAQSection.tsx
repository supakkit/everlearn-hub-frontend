"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "@/data/faq";

export function FAQSection() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
        Frequently Asked Questions
      </Typography>

      {faqs.map((item, index) => (
        <Accordion key={index} sx={{ border: '1px solid' }} disableGutters elevation={2}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700} fontSize={18}>{item.q}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography fontSize={14}>{item.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
