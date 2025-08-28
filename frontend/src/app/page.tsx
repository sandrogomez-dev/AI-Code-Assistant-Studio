import Editor from '@/components/Editor';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900 p-4">
        <h1 className="text-2xl font-bold">AI Code Assistant Studio</h1>
      </header>
      
      <div className="flex flex-1">
        <div className="w-64 border-r border-gray-800 bg-gray-900 p-4">
          {/* Sidebar content */}
        </div>
        
        <div className="flex-1 p-4">
          <Editor />
        </div>
      </div>
    </main>
  );
}