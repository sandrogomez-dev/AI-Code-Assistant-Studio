import { render, screen } from '@testing-library/react';
import CodeEditor from '../CodeEditor';

// Mock Monaco Editor
jest.mock('@monaco-editor/react', () => {
  return function MockEditor({ value, onChange, language }: any) {
    return (
      <div data-testid="mock-monaco-editor">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          data-language={language}
        />
      </div>
    );
  };
});

describe('CodeEditor', () => {
  const defaultProps = {
    value: 'console.log("Hello, World!");',
    onChange: jest.fn(),
    language: 'javascript',
  };

  it('renders Monaco Editor with correct props', () => {
    render(<CodeEditor {...defaultProps} />);
    const editor = screen.getByTestId('mock-monaco-editor');
    expect(editor).toBeInTheDocument();
  });

  it('renders with correct language', () => {
    render(<CodeEditor {...defaultProps} language="python" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('data-language', 'python');
  });

  it('renders in read-only mode when specified', () => {
    render(<CodeEditor {...defaultProps} readOnly />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
  });
});
