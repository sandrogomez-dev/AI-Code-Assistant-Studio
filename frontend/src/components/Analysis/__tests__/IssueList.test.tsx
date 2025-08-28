import { render, screen } from '@testing-library/react';
import IssueList from '../IssueList';

describe('IssueList', () => {
  const mockIssues = [
    {
      type: 'performance',
      description: 'Inefficient loop implementation',
      severity: 'medium',
      line_number: 10,
      suggestion: 'Use map instead of for loop',
    },
    {
      type: 'security',
      description: 'SQL Injection vulnerability',
      severity: 'high',
      line_number: 15,
      suggestion: 'Use parameterized queries',
    },
  ];

  const defaultProps = {
    issues: mockIssues,
    score: 0.75,
    summary: 'Code analysis completed',
  };

  it('renders analysis results with correct score', () => {
    render(<IssueList {...defaultProps} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('Code analysis completed')).toBeInTheDocument();
  });

  it('renders all issues with their details', () => {
    render(<IssueList {...defaultProps} />);
    
    mockIssues.forEach((issue) => {
      expect(screen.getByText(issue.description)).toBeInTheDocument();
      expect(screen.getByText(issue.suggestion)).toBeInTheDocument();
      expect(screen.getByText(issue.severity.toUpperCase())).toBeInTheDocument();
      expect(screen.getByText(`Line ${issue.line_number}`)).toBeInTheDocument();
    });
  });

  it('applies correct severity colors', () => {
    render(<IssueList {...defaultProps} />);
    
    const highSeverity = screen.getByText('HIGH');
    const mediumSeverity = screen.getByText('MEDIUM');

    expect(highSeverity.className).toContain('text-red-500');
    expect(mediumSeverity.className).toContain('text-yellow-500');
  });
});
