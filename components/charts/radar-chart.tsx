"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
} from "recharts";

export function SkillRadarChart({
  data,
}: {
  data: { topic: string; score: number }[];
}) {
  return (
    <div className="h-72">
      <ResponsiveContainer>
        <RechartsRadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12 }} />
          <Radar dataKey="score" fill="#059669" fillOpacity={0.35} stroke="#047857" />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
