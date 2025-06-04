'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { toast } from 'react-hot-toast';
import ProtectedPage from '@/components/ProtectedPage';

const forgotPasswordSchema = z.object({
  phone_number: z
    .string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number starting with 6-9'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange'
  });

  // Check if the required field has been touched and is valid
  const isFormValid = isValid && dirtyFields.phone_number;

  const formatMobile = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    // Remove any non-digit characters
    value = value.replace(/\D/g, '');
    // Limit to 10 digits
    value = value.slice(0, 10);
    event.target.value = value;
  };

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authService.forgotPassword(data);
      toast.success('Password reset link has been sent to your phone number.');
      router.push(`/change-password?type=forget`);
    } catch (error: any) {
      console.error('Password reset request failed:', error);
      toast.error(error.response?.data?.message || 'Password reset request failed. Please try again.');
    }
  };

  return (
    <ProtectedPage allowedRoles={['guest']}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your phone number and we'll send you a reset link
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <span className="absolute left-3 top-2 text-gray-500">+91</span>
                <input
                  id="phone_number"
                  type="tel"
                  {...register('phone_number')}
                  onChange={(e) => {
                    formatMobile(e);
                    register('phone_number').onChange(e);
                  }}
                  className={`appearance-none rounded-md relative block w-full px-12 py-2 border ${errors.phone_number ? 'border-red-500' : dirtyFields.phone_number && !errors.phone_number ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${errors.phone_number ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </ProtectedPage>
  );
} 