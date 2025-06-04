'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const settingsSchema = z.object({
  siteName: z.string().min(2, 'Site name must be at least 2 characters'),
  siteDescription: z.string().min(10, 'Description must be at least 10 characters'),
  logo: z.string().url('Must be a valid URL').optional(),
  favicon: z.string().url('Must be a valid URL').optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  currency: z.string().min(1, 'Currency is required'),
  currencySymbol: z.string().min(1, 'Currency symbol is required'),
  socialMedia: z.object({
    facebook: z.string().url('Must be a valid URL').optional(),
    twitter: z.string().url('Must be a valid URL').optional(),
    instagram: z.string().url('Must be a valid URL').optional(),
    linkedin: z.string().url('Must be a valid URL').optional(),
  }),
  seo: z.object({
    metaTitle: z.string().min(10, 'Meta title must be at least 10 characters'),
    metaDescription: z.string().min(20, 'Meta description must be at least 20 characters'),
    keywords: z.string().min(5, 'Keywords must be at least 5 characters'),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    dirtyFields,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: 'My E-commerce Store',
      siteDescription: 'Your one-stop shop for all your needs',
      logo: 'https://example.com/logo.png',
      favicon: 'https://example.com/favicon.ico',
      email: 'contact@example.com',
      phone: '+1234567890',
      address: '123 Main Street, City, Country',
      currency: 'USD',
      currencySymbol: '$',
      socialMedia: {
        facebook: 'https://facebook.com/example',
        twitter: 'https://twitter.com/example',
        instagram: 'https://instagram.com/example',
        linkedin: 'https://linkedin.com/example',
      },
      seo: {
        metaTitle: 'My E-commerce Store - Your One-Stop Shop',
        metaDescription: 'Find the best products at the best prices. Shop now!',
        keywords: 'e-commerce, online shopping, retail, products',
      },
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Settings updated:', data);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedPage allowedRoles={['admin']}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Website Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* General Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="siteName"
                    {...register('siteName')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.siteName ? 'border-red-500' : dirtyFields.siteName && !errors.siteName ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.siteName ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.siteName && (
                  <p className="mt-1 text-sm text-red-500">{errors.siteName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-500' : dirtyFields.email && !errors.email ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.email ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.phone ? 'border-red-500' : dirtyFields.phone && !errors.phone ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.phone ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.address ? 'border-red-500' : dirtyFields.address && !errors.address ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.address ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                  Logo URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="logo"
                    {...register('logo')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.logo ? 'border-red-500' : dirtyFields.logo && !errors.logo ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.logo ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.logo && (
                  <p className="mt-1 text-sm text-red-500">{errors.logo.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="favicon" className="block text-sm font-medium text-gray-700">
                  Favicon URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="favicon"
                    {...register('favicon')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.favicon ? 'border-red-500' : dirtyFields.favicon && !errors.favicon ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.favicon ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.favicon && (
                  <p className="mt-1 text-sm text-red-500">{errors.favicon.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Currency Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Currency Settings</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="currency"
                    {...register('currency')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.currency ? 'border-red-500' : dirtyFields.currency && !errors.currency ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.currency ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.currency && (
                  <p className="mt-1 text-sm text-red-500">{errors.currency.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700">
                  Currency Symbol
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="currencySymbol"
                    {...register('currencySymbol')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.currencySymbol ? 'border-red-500' : dirtyFields.currencySymbol && !errors.currencySymbol ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.currencySymbol ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.currencySymbol && (
                  <p className="mt-1 text-sm text-red-500">{errors.currencySymbol.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                  Facebook
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="facebook"
                    {...register('socialMedia.facebook')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.socialMedia?.facebook ? 'border-red-500' : dirtyFields.socialMedia?.facebook && !errors.socialMedia?.facebook ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.facebook ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.socialMedia?.facebook && (
                  <p className="mt-1 text-sm text-red-500">{errors.socialMedia.facebook.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="twitter"
                    {...register('socialMedia.twitter')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.socialMedia?.twitter ? 'border-red-500' : dirtyFields.socialMedia?.twitter && !errors.socialMedia?.twitter ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.twitter ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.socialMedia?.twitter && (
                  <p className="mt-1 text-sm text-red-500">{errors.socialMedia.twitter.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="instagram"
                    {...register('socialMedia.instagram')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.socialMedia?.instagram ? 'border-red-500' : dirtyFields.socialMedia?.instagram && !errors.socialMedia?.instagram ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.instagram ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.socialMedia?.instagram && (
                  <p className="mt-1 text-sm text-red-500">{errors.socialMedia.instagram.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    id="linkedin"
                    {...register('socialMedia.linkedin')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.socialMedia?.linkedin ? 'border-red-500' : dirtyFields.socialMedia?.linkedin && !errors.socialMedia?.linkedin ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.linkedin ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.socialMedia?.linkedin && (
                  <p className="mt-1 text-sm text-red-500">{errors.socialMedia.linkedin.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="metaTitle"
                    {...register('seo.metaTitle')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.seo?.metaTitle ? 'border-red-500' : dirtyFields.seo?.metaTitle && !errors.seo?.metaTitle ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.seo?.metaTitle ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.seo?.metaTitle && (
                  <p className="mt-1 text-sm text-red-500">{errors.seo.metaTitle.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="metaDescription"
                    rows={3}
                    {...register('seo.metaDescription')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.seo?.metaDescription ? 'border-red-500' : dirtyFields.seo?.metaDescription && !errors.seo?.metaDescription ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.seo?.metaDescription ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.seo?.metaDescription && (
                  <p className="mt-1 text-sm text-red-500">{errors.seo.metaDescription.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                  Keywords
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="keywords"
                    {...register('seo.keywords')}
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.seo?.keywords ? 'border-red-500' : dirtyFields.seo?.keywords && !errors.seo?.keywords ? 'border-green-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.seo?.keywords ? 'focus:ring-red-200' : 'focus:ring-blue-500'
                    } focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.seo?.keywords && (
                  <p className="mt-1 text-sm text-red-500">{errors.seo.keywords.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </ProtectedPage>
  );
} 