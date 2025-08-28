import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useNotificationStore, NotificationType } from '@/stores/notificationStore';

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const colors = {
  success: 'text-green-400 bg-green-400/10',
  error: 'text-red-400 bg-red-400/10',
  warning: 'text-yellow-400 bg-yellow-400/10',
  info: 'text-blue-400 bg-blue-400/10',
};

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {notifications.map((notification) => {
        const Icon = icons[notification.type as NotificationType];
        const colorClass = colors[notification.type as NotificationType];

        return (
          <Transition
            key={notification.id}
            show={true}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`max-w-sm w-full rounded-lg shadow-lg p-4 ${colorClass}`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    {notification.message}
                  </p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md text-white hover:text-gray-200 focus:outline-none"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        );
      })}
    </div>
  );
}
