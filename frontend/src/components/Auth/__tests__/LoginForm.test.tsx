import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnToggleForm = jest.fn();

  beforeEach(() => {
    render(
      <LoginForm onSubmit={mockOnSubmit} onToggleForm={mockOnToggleForm} />
    );
  });

  it('renders login form elements', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('calls onToggleForm when signup link is clicked', () => {
    const signupLink = screen.getByText(/don't have an account/i);
    fireEvent.click(signupLink);
    expect(mockOnToggleForm).toHaveBeenCalled();
  });
});
