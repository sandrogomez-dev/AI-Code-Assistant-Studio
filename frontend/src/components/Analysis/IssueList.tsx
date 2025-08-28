interface Issue {
  type: string;
  description: string;
  severity: string;
  line_number?: number;
  suggestion: string;
}

interface IssueListProps {
  issues: Issue[];
  score: number;
  summary: string;
}

const severityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export default function IssueList({ issues, score, summary }: IssueListProps) {
  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Analysis Results</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Score:</span>
            <span
              className={`text-sm font-medium ${
                score >= 0.8
                  ? 'text-green-500'
                  : score >= 0.6
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {Math.round(score * 100)}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-400">{summary}</p>
      </div>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-800 bg-gray-800/50 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      severityColors[issue.severity as keyof typeof severityColors]
                    }`}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                  {issue.line_number && (
                    <span className="text-sm text-gray-500">
                      Line {issue.line_number}
                    </span>
                  )}
                </div>
                <h4 className="mt-1 text-sm font-medium text-white">
                  {issue.description}
                </h4>
                <p className="mt-2 text-sm text-gray-400">{issue.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
