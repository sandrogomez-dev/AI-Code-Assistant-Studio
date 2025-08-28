import { useEffect, useRef } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { useTheme } from '@/hooks/useTheme';

interface CodeEditorProps extends Partial<EditorProps> {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false,
  ...props
}: CodeEditorProps) {
  const editorRef = useRef(null);
  const { theme } = useTheme();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-gray-700">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={(value) => onChange?.(value || '')}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          readOnly,
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          fontFamily: 'JetBrains Mono, monospace',
        }}
        onMount={handleEditorDidMount}
        {...props}
      />
    </div>
  );
}
