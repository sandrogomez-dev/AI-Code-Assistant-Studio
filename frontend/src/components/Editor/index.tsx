import { useState } from 'react';
import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';

export default function Editor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

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
        onLanguageChange={setLanguage}
        onFormat={handleFormat}
        onAnalyze={handleAnalyze}
      />
      <div className="flex-1">
        <CodeEditor
          value={code}
          onChange={setCode}
          language={language}
        />
      </div>
    </div>
  );
}
