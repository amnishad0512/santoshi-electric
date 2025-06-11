'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Calendar, Clock, Shield, Eye, Edit3, Save, X, ArrowLeft, UserCheck, UserX } from 'lucide-react';
import Image from 'next/image';
import userService, { User as UserType } from '@/services/user.service';
import UserProfileImage from '@/components/UserProfileImage';
import { formatDate } from '@/lib/utils/date';

export default function UserEditViewPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>({
    name: '',
    email: '',
    phone_number: '',
    role: 2,
    status: 1,
  });

  useEffect(() => {
    if (userId && userId !== 'undefined') {
      fetchUser();
    } else {
      toast.error('Invalid user ID');
      router.push('/admin/users');
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await userService.getUserById(userId);
      setUser(userData);
      setFormData({
        name: userData.name,
        email: userData.email,
        phone_number: userData.phone_number,
        role: userData.role,
        status: userData.status,
      });
    } catch (error: any) {
      console.error('Error fetching user:', error);
      toast.error('Failed to fetch user details');
      router.push('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await userService.updateUser(userId, formData);
      toast.success('User updated successfully');
      await fetchUser(); // Refresh data
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'role' || name === 'status' ? Number(value) : value,
    }));
  };

  const handleStatusToggle = async () => {
    if (!user) return;
    
    try {
      const newStatus = user.status === 1 ? 0 : 1;
      await userService.updateUserStatus(userId, newStatus);
      toast.success(`User ${newStatus === 1 ? 'activated' : 'deactivated'} successfully`);
      await fetchUser();
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error('Failed to update user status');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        status: user.status,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-4">The requested user could not be found.</p>
          <button
            onClick={() => router.push('/admin/users')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/admin/users')}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-semibold text-gray-900">
            {isEditing ? 'Edit User' : 'User Details'}
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {!isEditing && (
            <>
              <button
                onClick={handleStatusToggle}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  user.status === 1
                    ? 'text-red-700 bg-red-100 hover:bg-red-200'
                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                }`}
              >
                {user.status === 1 ? (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Activate
                  </>
                )}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit User
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {isEditing ? (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900">Edit User Information</h2>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    <option value={1}>Admin</option>
                    <option value={2}>User</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    required
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select status</option>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        ) : (
          /* View Mode */
          <div className="p-8">
            {/* Profile Header */}
            <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
              <div className="flex-shrink-0">
                <UserProfileImage
                  src={user.profile_photo_path}
                  alt={user.name}
                />
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-lg text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 1
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <Shield className="w-3 h-3 mr-1" />
                    {user.role === 1 ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <User className="w-4 h-4 mr-2" />
                    User ID
                  </dt>
                  <dd className="text-lg text-gray-900">{user.id}</dd>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </dt>
                  <dd className="text-lg text-gray-900">{user.email}</dd>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </dt>
                  <dd className="text-lg text-gray-900">{user.phone_number || 'Not provided'}</dd>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created At
                  </dt>
                  <dd className="text-lg text-gray-900">
                    {user.created_at ? formatDate(user.created_at) : 'Not available'}
                  </dd>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <dt className="text-sm font-medium text-gray-500 flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    Last Updated
                  </dt>
                  <dd className="text-lg text-gray-900">
                    {user.updated_at ? formatDate(user.updated_at) : 'Not available'}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 