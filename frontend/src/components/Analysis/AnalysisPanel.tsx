import { useAnalysisStore } from '@/stores/analysisStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Tab } from '@headlessui/react';
import { classNames } from '@/utils/styles';
import IssueList from './IssueList';

interface AnalysisPanelProps {
  code: string;
  language: string;
}

export default function AnalysisPanel({ code, language }: AnalysisPanelProps) {
  const {
    isLoading,
    performanceResult,
    securityResult,
    analyzePerformance,
    analyzeSecurity,
  } = useAnalysisStore();
  const { addNotification } = useNotificationStore();

  const handleAnalyze = async (type: 'performance' | 'security') => {
    try {
      if (type === 'performance') {
        await analyzePerformance(code, language);
        addNotification({
          type: 'success',
          message: 'Performance analysis completed',
          duration: 3000,
        });
      } else {
        await analyzeSecurity(code, language);
        addNotification({
          type: 'success',
          message: 'Security analysis completed',
          duration: 3000,
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: `Failed to analyze ${type}. Please try again.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 border-l border-gray-800">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-gray-800 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                selected
                  ? 'bg-gray-800 text-white shadow'
                  : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <ChartBarIcon className="h-5 w-5" />
              Performance
            </div>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                selected
                  ? 'bg-gray-800 text-white shadow'
                  : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
              )
            }
          >
            <div className="flex items-center justify-center gap-2">
              <ShieldCheckIcon className="h-5 w-5" />
              Security
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="flex-1 overflow-auto">
          <Tab.Panel className="h-full">
            {performanceResult ? (
              <IssueList
                issues={performanceResult.issues}
                score={performanceResult.score}
                summary={performanceResult.summary}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <button
                  onClick={() => handleAnalyze('performance')}
                  disabled={isLoading}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Performance'}
                </button>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel className="h-full">
            {securityResult ? (
              <IssueList
                issues={securityResult.issues}
                score={securityResult.score}
                summary={securityResult.summary}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <button
                  onClick={() => handleAnalyze('security')}
                  disabled={isLoading}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Security'}
                </button>
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}