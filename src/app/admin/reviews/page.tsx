'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import reviewService, { Review } from '@/services/review.service';

const ReviewsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await reviewService.approveReview(id);
      toast.success('Review approved successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to approve review');
      console.error(error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await reviewService.rejectReview(id);
      toast.success('Review rejected successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to reject review');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await reviewService.deleteReview(id);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
      console.error(error);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    return review.status === filter;
  });

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReviews.map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {review.product?.image && (
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <Image
                          src={review.product.image}
                          alt={review.product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {review.product?.name || 'Unknown Product'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{review.user?.name || 'Unknown User'}</div>
                  <div className="text-sm text-gray-500">{review.user?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">{renderStars(review.rating)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2">{review.comment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      review.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : review.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(review.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Approve"
                      >
                        <ThumbsUp className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleReject(review.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Reject"
                      >
                        <ThumbsDown className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsPage; 