"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { navigation } from "@/data/navigation";
import { CourseList } from "./CourseList";
import { DashboardResponse } from "@/types/api/api-types";

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label: string;
  value: string;
  href: string;
  selected?: boolean;
}

type PropType = {
  learning: DashboardResponse["enrolledCourses"];
  completed: DashboardResponse["enrolledCourses"];
}

export default function DashboardTabs({ learning, completed }: PropType) {
  const params = useSearchParams();
  const status = params.get('status') ?? 'learning';
  const [value, setValue] = useState(status);

  const courses = status === "learning" ? learning : completed;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (
      event.type !== "click" ||
      (event.type === "click" &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs dashboard"
        role="navigation"
        textColor='inherit'
        indicatorColor='secondary'
        sx={{ mb: 3 }}
      >
        <LinkTab
          label="Continue Learning"
          value='learning'
          href={`${navigation.dashboard.href}?status=learning`}
        />

        <LinkTab
          label="Completed Courses"
          value='completed'
          href={`${navigation.dashboard.href}?status=completed`}
        />
      </Tabs>

      <CourseList courses={courses} />
    </Box>
  );
}

function LinkTab(props: LinkTabProps) {
  return <Tab component={Link} {...props} sx={{ fontSize: 18 }} />;
}
