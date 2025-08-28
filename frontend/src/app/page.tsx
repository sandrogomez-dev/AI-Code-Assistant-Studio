import { useState } from 'react';
import Editor from '@/components/Editor';
import Navbar from '@/components/Navigation/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import AnalysisPanel from '@/components/Analysis/AnalysisPanel';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-800">
          <Sidebar />
        </aside>
        
        <main className="flex flex-1">
          <div className="flex-1 p-4">
            <Editor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>
          <div className="w-96">
            <AnalysisPanel code={code} language={language} />
          </div>
        </main>
      </div>
    </div>
  );
}