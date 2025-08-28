import { CodeBracketIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Code Editor', icon: CodeBracketIcon, href: '#', current: true },
  { name: 'Analysis', icon: ChartBarIcon, href: '#', current: false },
  { name: 'Security', icon: ShieldCheckIcon, href: '#', current: false },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-gray-900">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md
                ${
                  item.current
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-6 w-6 flex-shrink-0
                  ${
                    item.current
                      ? 'text-white'
                      : 'text-gray-400 group-hover:text-white'
                  }
                `}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
