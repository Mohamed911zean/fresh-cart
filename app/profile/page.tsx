'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/protectedRoute';
import AccountSidebar from '@/app/components/AccountSidebar';
import { useAuth } from '@/app/context/AuthContext';
import apiClient from '@/app/lib/axios';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Package, Heart, MapPin } from 'lucide-react';

interface Stats {
  orders: number;
  wishlist: number;
  addresses: number;
}

export default function ProfilePage() {
  const { user, userId, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stats>({
    orders: 0,
    wishlist: 0,
    addresses: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Fetch real stats
  useEffect(() => {
    if (userId) {
      fetchStats();
    }
  }, [userId]);
  //console.log(userId)

  const fetchStats = async () => {
    if (!userId) return;
    
    setLoadingStats(true);
    try {
      const [ordersRes, wishlistRes, addressesRes] = await Promise.all([
        apiClient.get(`/orders/user/${userId}`).catch(() => ({ data: { data: [] } })),
        apiClient.get('/wishlist').catch(() => ({ data: { data: [] } })),
        apiClient.get('/addresses').catch(() => ({ data: { data: [] } })),
      ]);
//console.log(ordersRes.data.length)
      setStats({
        orders: ordersRes.data.length || 0,
        wishlist: wishlistRes.data.data?.length || wishlistRes.data.count || 0,
        addresses: addressesRes.data.data?.length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        phone: formData.phone
      };
      
      if (formData.email !== user?.email) {
        payload.email = formData.email;
      }

      const { data } = await apiClient.put('/users/updateMe/', payload);
      
      if (data.message === 'success') {
        // Update localStorage
        const updatedUser = {
          _id: user?._id || userId || '',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: user?.role || 'user',
        };
        localStorage.setItem('freshCartUser', JSON.stringify(updatedUser));
        
        await refreshUser();
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
  };

  const getInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  return (
    <ProtectedRoute requireAuth>
      <div className="min-h-screen bg-gray-50">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm">Home</span>
              <span>/</span>
              <span className="text-sm font-semibold">My Account</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <AccountSidebar />

            {/* Profile Content */}
            <div className="flex-1 space-y-6">
              {/* Profile Header Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-600 relative">
                  <div className="absolute -bottom-12 left-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-4 border-white flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {getInitials()}
                    </div>
                  </div>
                </div>

                <div className="pt-16 px-6 pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                      <p className="text-gray-500 mt-1">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {user?.role === 'admin' ? 'Admin Account' : 'Customer Account'}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Member since 2024
                        </span>
                      </div>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your personal details and contact information
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                          {user?.name || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                          {user?.email || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="01xxxxxxxxxx"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                          {formData.phone || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-5 h-5" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      {loadingStats ? (
                        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
                      )}
                      <p className="text-sm text-gray-500">Total Orders</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      {loadingStats ? (
                        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">{stats.wishlist}</p>
                      )}
                      <p className="text-sm text-gray-500">Wishlist Items</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      {loadingStats ? (
                        <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900">{stats.addresses}</p>
                      )}
                      <p className="text-sm text-gray-500">Saved Addresses</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Activity */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Account Created</p>
                        <p className="text-xs text-gray-500">Your FreshCart journey started</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">Recently</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Account Verified</p>
                        <p className="text-xs text-gray-500">Your email is verified</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">Recently</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}