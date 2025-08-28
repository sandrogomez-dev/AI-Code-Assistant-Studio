import { useCallback } from 'react';
import CodeEditor from './CodeEditor';
import EditorToolbar from './EditorToolbar';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAuthStore } from '@/stores/authStore';

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
  const { isAuthenticated } = useAuthStore();

  const handleMessage = useCallback((message: any) => {
    if (message.type === 'code_update' && message.code !== value) {
      onChange(message.code);
    }
  }, [value, onChange]);

  const { sendMessage } = useWebSocket({
    onMessage: handleMessage,
  });

  const handleCodeChange = (newValue: string) => {
    onChange(newValue);
    if (isAuthenticated) {
      sendMessage({
        type: 'code_update',
        code: newValue,
      });
    }
  };

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
          onChange={handleCodeChange}
          language={language}
        />
      </div>
    </div>
  );
}