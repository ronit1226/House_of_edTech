export function WeakTopicHeatmap({
  data,
}: {
  data: { topic: string; score: number }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => {
        const intensity = 100 - item.score;
        return (
          <div
            key={item.topic}
            className="rounded-md border border-slate-200 p-4"
            style={{ backgroundColor: `rgba(244, 63, 94, ${Math.max(0.08, intensity / 140)})` }}
          >
            <p className="font-medium">{item.topic}</p>
            <p className="text-sm text-slate-700">{intensity}% weakness signal</p>
          </div>
        );
      })}
    </div>
  );
}
