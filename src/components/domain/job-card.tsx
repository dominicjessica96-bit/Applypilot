import * as React from "react";
import {
  Building2,
  Clock3,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusPill, type FitStatus } from "./status-pill";

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  workMode?: string;
  employmentType?: string;
  posted?: string;
  source?: string;
  fit?: FitStatus | null;
  summary?: string;
  onView?: () => void;
  onCheckFit?: () => void;
  className?: string;
};

function JobCard({
  title,
  company,
  location,
  workMode,
  employmentType,
  posted,
  source,
  fit = null,
  summary,
  onView,
  onCheckFit,
  className,
}: JobCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-h3">{title}</CardTitle>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4" aria-hidden="true" />
                {company}
              </span>
              <span aria-hidden="true" className="text-ink-300">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden="true" />
                {location}
              </span>
            </p>
          </div>
          {fit ? (
            <StatusPill status={fit} className="shrink-0" />
          ) : (
            <Badge variant="outline" className="shrink-0">
              Fit not checked
            </Badge>
          )}
        </div>

        {workMode || employmentType ? (
          <div className="flex flex-wrap gap-2">
            {workMode ? <Badge variant="neutral">{workMode}</Badge> : null}
            {employmentType ? (
              <Badge variant="outline">{employmentType}</Badge>
            ) : null}
          </div>
        ) : null}
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-ink-700">
          {summary ??
            "Check this job against your verified profile to see which requirements are supported by evidence."}
        </p>
        {posted || source ? (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {posted ? `Posted ${posted}` : null}
            {posted && source ? <span aria-hidden="true">·</span> : null}
            {source}
          </p>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between">
        <Button variant="secondary" size="sm" onClick={onView}>
          View job
          <ExternalLink aria-hidden="true" />
        </Button>
        <Button size="sm" onClick={onCheckFit}>
          <Sparkles aria-hidden="true" />
          {fit ? "Review fit" : "Check fit"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export { JobCard };
