import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      addNotification({
        type: 'success',
        message: 'Successfully logged in',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to log in. Please check your credentials.',
        duration: 5000,
      });
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    try {
      await register(username, email, password);
      addNotification({
        type: 'success',
        message: 'Successfully registered and logged in',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Failed to register. Please try again.',
        duration: 5000,
      });
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                {isLogin ? (
                  <LoginForm
                    onSubmit={handleLogin}
                    onToggleForm={() => setIsLogin(false)}
                  />
                ) : (
                  <RegisterForm
                    onSubmit={handleRegister}
                    onToggleForm={() => setIsLogin(true)}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}