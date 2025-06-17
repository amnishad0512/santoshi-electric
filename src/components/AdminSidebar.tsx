import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import authService from '@/services/auth.service';

const AdminSidebar = () => {
  const user = authService.getCurrentUser();

  return (
    <div className="bg-white h-full shadow-lg">
      <div className="p-4 border-b">
        <Link href="/admin/profile" className="flex flex-col items-center group">
          <div 
            className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mb-3" 
          >
            <Image
              src={user?.profile_photo_path || '/images/user.jpg'}
              alt="Profile"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/user.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Edit Profile
            </div>
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm group-hover:text-blue-600 transition-colors">{user?.name}</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
        </Link>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-1">
          <li>
            <Link 
              href="/admin/dashboard" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/admin/profile" 
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>Profile</span>
            </Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar; 