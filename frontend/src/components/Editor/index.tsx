import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export default function Editor({
  value,
  onChange,
  language,
  onLanguageChange,
}: EditorProps) {
  const handleFormat = () => {
    // TODO: Implement code formatting
    console.log('Format code');
  };

  const handleAnalyze = () => {
    // TODO: Implement code analysis
    console.log('Analyze code');
  };

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar
        language={language}
        onLanguageChange={onLanguageChange}
        onFormat={handleFormat}
        onAnalyze={handleAnalyze}
      />
      <div className="flex-1">
        <CodeEditor
          value={value}
          onChange={onChange}
          language={language}
        />
      </div>
    </div>
  );
}