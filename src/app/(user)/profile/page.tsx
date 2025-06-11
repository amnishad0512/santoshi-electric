'use client';

import React, { useState, useEffect } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { User, Mail, Phone, Camera, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import userService, { UpdateProfilePayload } from '@/services/userService';
import { UserProfile } from '@/types/user';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await userService.getProfile();
      setProfileData(data);
      if (data.profile_photo_path) {
        setProfileImage(data.profile_photo_path);
      }
    } catch (error: any) {
      setError('Failed to load profile. Please try again later.');
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (profileData) {
      setProfileData(prev => ({
        ...prev!,
        [name]: value,
      }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profileData) {
      try {
        const formData = new FormData();
        formData.append('profile_photo_path', file);
        formData.append('name', profileData.name);
        formData.append('email', profileData.email);
        formData.append('phone_number', profileData.phone_number);
        // formData.append('_method', 'PUT');

        const updatedProfile = await userService.updateProfile(formData);
        setProfileData(updatedProfile);
        if (updatedProfile.profile_photo_path) {
          setProfileImage(updatedProfile.profile_photo_path);
        }
        fetchProfile()
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData) return;

    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
      formData.append('phone_number', profileData.phone_number);
      // formData.append('_method', 'PUT');

      // Get the current file input element
      const fileInput = document.getElementById('profile-image') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      
      // If there's a new file selected, append it
      if (file) {
        formData.append('profile_photo_path', file);
      } else if (profileData.profile_photo_path) {
        // If no new file but we have an existing path, append it
        formData.append('profile_photo_path', profileData.profile_photo_path);
      }

      const updatedProfile = await userService.updateProfile(formData);
      setProfileData(updatedProfile);
      if (updatedProfile.profile_photo_path) {
        setProfileImage(updatedProfile.profile_photo_path);
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <ProtectedPage allowedRoles={['user']}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedPage>
    );
  }

  if (error) {
    return (
      <ProtectedPage allowedRoles={['user']}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchProfile}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage allowedRoles={['user']}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {profileData && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-40 h-40">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        fill
                        className="rounded-full object-cover border-4 border-blue-100"
                        sizes="160px"
                      />
                    ) : (
                      <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-100">
                        <User className="w-20 h-20 text-blue-300" />
                      </div>
                    )}
                    {isEditing && (
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-2 right-2 bg-blue-500 p-3 rounded-full cursor-pointer hover:bg-blue-600 shadow-lg"
                      >
                        <Camera className="w-5 h-5 text-white" />
                        <input
                          type="file"
                          id="profile-image"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      profileData.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.status === 1 ? 'Active' : 'Inactive'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {profileData.role === 2 ? 'User' : 'Admin'}
                    </span>
                  </div>
                </div>

                {/* Profile Details Section */}
                <div className="flex-grow">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      {/* Basic Information */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                        <div className="space-y-4">
                          {/* Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="block w-full rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-50"
                                required
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="block w-full pl-10 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-50"
                                required
                              />
                            </div>
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="mt-1 relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="phone_number"
                                value={profileData.phone_number}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                className="block w-full pl-10 rounded-md border border-gray-300 px-4 py-2 disabled:bg-gray-50"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Information */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                              <Calendar className="w-5 h-5" />
                              <span className="text-sm font-medium">Member Since</span>
                            </div>
                            <p className="text-gray-900">
                              {new Date(profileData.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                              <Clock className="w-5 h-5" />
                              <span className="text-sm font-medium">Last Login</span>
                            </div>
                            <p className="text-gray-900">
                              {new Date(profileData.last_login).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 text-gray-500 mb-2">
                              <Clock className="w-5 h-5" />
                              <span className="text-sm font-medium">Last Updated</span>
                            </div>
                            <p className="text-gray-900">
                              {new Date(profileData.updated_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end mt-6">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-medium"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
};

export default ProfilePage; 