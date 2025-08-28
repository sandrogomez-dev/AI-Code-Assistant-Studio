import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (language: string) => void;
  onFormat: () => void;
  onAnalyze: () => void;
}

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
  'php',
  'ruby',
];

export default function EditorToolbar({
  language,
  onLanguageChange,
  onFormat,
  onAnalyze,
}: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-4 p-2 bg-gray-800 border-b border-gray-700">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-gray-700 hover:bg-gray-600">
          {language}
          <ChevronDownIcon className="w-4 h-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 w-48 mt-2 origin-top-left bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {LANGUAGES.map((lang) => (
                <Menu.Item key={lang}>
                  {({ active }) => (
                    <button
                      onClick={() => onLanguageChange(lang)}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-200`}
                    >
                      {lang}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <button
        onClick={onFormat}
        className="px-3 py-1.5 text-sm rounded-md bg-gray-700 hover:bg-gray-600"
      >
        Format
      </button>

      <button
        onClick={onAnalyze}
        className="px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-500"
      >
        Analyze
      </button>
    </div>
  );
}
