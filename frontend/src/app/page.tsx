import Editor from '@/components/Editor';
import Navbar from '@/components/Navigation/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <Navbar />
      
      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-800">
          <Sidebar />
        </aside>
        
        <main className="flex-1 p-4">
          <Editor />
        </main>
      </div>
    </div>
  );
}