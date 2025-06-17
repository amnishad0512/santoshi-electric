'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import userService, { User } from '@/services/user.service';
import { formatDate } from '@/lib/utils/date';
import Image from 'next/image';
import { useStatus } from '@/contexts/StatusContext';
import { getUserStatusName } from '@/lib/utils/user';

export default function UserPageClient({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const { userStatus= [] } = useStatus();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    role: 0,
    status: 1,
    profile_photo_path: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  console.log(userStatus)

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await userService.getUserById(id);
      console.log(response);
      if (response) {
        const userData = response;
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
          role: userData.role,
          status: userData.status,
          profile_photo_path: userData.profile_photo_path || ''
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user details');
      // router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Create FormData object
      const userData = new FormData();
      
      // Append all form fields
      userData.append('name', formData.name);
      userData.append('email', formData.email);
      userData.append('phone_number', formData.phone_number);
      userData.append('role', formData.role.toString());
      userData.append('status', formData.status.toString());
      
      // Append image file if it exists
      if (imageFile) {
        userData.append('profile_photo_path', imageFile); 
        userData.append('_method', 'PUT'); 
      } else  {
        userData.append('profile_photo_path', formData.profile_photo_path);
        userData.append('_method', 'PUT'); 
      }
      await userService.updateUser(id, userData);

      toast.success('User updated successfully');
      router.push('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the actual file for form submission
      setImageFile(file);
      
      // Create a preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="mt-2 text-gray-600">The user you're looking for doesn't exist.</p>
          <Link
            href="/admin/users"
            className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  console.log(userStatus)

  const renderForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{mode === 'edit' ? 'Edit User' : 'User Details'}</h1>
        <div className="space-x-3">
          {mode === 'edit' ? (
            <Link
              href={`/admin/users/${id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              View Details
            </Link>
          ) : (
            <Link
              href={`/admin/users/${user.id}?mode=edit`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit User
            </Link>
          )}
          <Link
            href="/admin/users"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back to List
          </Link>
        </div>
      </div>

      <form onSubmit={mode === 'edit' ? handleSubmit : (e) => e.preventDefault()}>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  src={(imagePreview || (mode === 'edit' ? formData.profile_photo_path : user.profile_photo_path)) || '/images/user.jpg'}
                  alt={mode === 'edit' ? formData.name : user.name}
                  width={150}
                  height={150}
                  className="rounded-full shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/images/user.jpg';
                  }}
                />
                {mode === 'edit' && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerImageUpload}
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                  <input
                    type="text"
                    value={`#${user.id}`}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                  <input
                    type="text"
                    value={mode === 'edit' ? formData.name : user.name}
                    onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, name: e.target.value })) : undefined}
                    readOnly={mode !== 'edit'}
                    className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                    required={mode === 'edit'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={mode === 'edit' ? formData.email : user.email}
                    onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, email: e.target.value })) : undefined}
                    readOnly={mode !== 'edit'}
                    className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                    required={mode === 'edit'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={mode === 'edit' ? formData.phone_number : (user.phone_number || '-')}
                    onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, phone_number: e.target.value })) : undefined}
                    readOnly={mode !== 'edit'}
                    className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                    required={mode === 'edit'}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                  <select
                    value={mode === 'edit' ? formData.role : user.role}
                    onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, role: Number(e.target.value) })) : undefined}
                    disabled={mode !== 'edit'}
                    className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                    required={mode === 'edit'}
                  >
                    <option value={1}>Admin</option>
                    <option value={2}>User</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <select
                    value={mode === 'edit' ? formData.status : user.status}
                    onChange={mode === 'edit' ? (e) => setFormData(prev => ({ ...prev, status: Number(e.target.value) })) : undefined}
                    disabled={mode !== 'edit'}
                    className={`w-full px-4 py-2 ${mode === 'edit' ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'} text-gray-700 border rounded-lg focus:outline-none ${mode === 'edit' ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''}`}
                    required={mode === 'edit'}
                  >
                    {userStatus.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                  <input
                    type="text"
                    value={user.created_at ? formatDate(user.created_at) : '-'}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Updated At</label>
                  <input
                    type="text"
                    value={user.updated_at ? formatDate(user.updated_at) : '-'}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {mode === 'edit' && (
              <div className="mt-6 flex justify-end space-x-3">
                <Link
                  href="/admin/users"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );

  return renderForm();
} 