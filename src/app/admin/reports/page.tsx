'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, MessageSquare, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import reportService, { type Report, type ReportFilters } from '@/services/reportService';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<ReportFilters>({
    category: undefined,
    status: undefined,
    priority: undefined,
    search: '',
    limit: 10,
  });
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch reports when filters or pagination changes
  useEffect(() => {
    fetchReports();
  }, [currentPage, filter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportService.getReports({
        ...filter,
        page: currentPage,
      });
      setReports(response.reports);
      setTotalPages(response.totalPages);
      setTotalReports(response.total);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (reportId: string) => {
    if (!replyText.trim()) return;
    
    try {
      setLoading(true);
      await reportService.addReply({
        reportId,
        message: replyText.trim(),
      });
      
      // Refresh the report data to show the new reply
      const updatedReport = await reportService.getReportById(reportId);
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? updatedReport : report
        )
      );
      
      setReplyText('');
      toast.success('Reply sent successfully');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reportId: string, status: 'pending' | 'resolved' | 'in_progress') => {
    try {
      setLoading(true);
      const updatedReport = await reportService.updateStatus({
        reportId,
        status,
      });
      
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? updatedReport : report
        )
      );
      
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = async (reportId: string, priority: 'low' | 'medium' | 'high') => {
    try {
      setLoading(true);
      const updatedReport = await reportService.updatePriority(reportId, priority);
      
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === reportId ? updatedReport : report
        )
      );
      
      toast.success('Priority updated successfully');
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchText: string) => {
    setFilter(prev => ({ ...prev, search: searchText }));
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = (key: keyof ReportFilters, value: string | undefined) => {
    setFilter(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }));
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const getPriorityColor = (priority: Report['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header and Filters */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={filter.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filter.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="order">Orders</option>
            <option value="customer">Customers</option>
            <option value="payment">Payments</option>
            <option value="delivery">Delivery</option>
          </select>

          <select
            value={filter.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={filter.priority || 'all'}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-600">{report.id}</span>
                  <h2 className="text-lg font-medium text-gray-900">{report.title}</h2>
                  <div className="flex space-x-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                      {report.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {expandedReport === report.id ? 'Collapse' : 'Expand'}
                </button>
              </div>

              <p className="text-gray-600 mb-2">{report.description}</p>

              {expandedReport === report.id && (
                <>
                  <div className="mt-4 space-y-4">
                    {report.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{reply.adminName}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(reply.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{reply.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="flex space-x-4">
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report.id, e.target.value as Report['status'])}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>

                      <select
                        value={report.priority}
                        onChange={(e) => handlePriorityChange(report.id, e.target.value as Report['priority'])}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleReplySubmit(report.id)}
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                <div>
                  <span>Created: {new Date(report.createdAt).toLocaleString()}</span>
                  <span className="mx-2">•</span>
                  <span>Updated: {new Date(report.updatedAt).toLocaleString()}</span>
                </div>
                <div>
                  <span>By: {report.userName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {((currentPage - 1) * filter.limit!) + 1} to {Math.min(currentPage * filter.limit!, totalReports)} of{' '}
          {totalReports} results
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1 || loading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={loading}
                className={`px-3 py-2 border rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages || loading}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
} 