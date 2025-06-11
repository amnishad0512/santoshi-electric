'use client';

import { Shield, Lock, Eye, UserCheck, Database, Globe, Phone, Mail } from 'lucide-react';
import ProtectedPage from "@/components/ProtectedPage";

export default function PrivacyPolicy() {
  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
      <div className="min-h-screen bg-[#f9f7f3]">
        {/* Header */}
        <div className="relative overflow-hidden bg-[#10100e] py-24">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#e69204]/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#e69204]/5 rounded-full blur-3xl translate-x-48"></div>
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#e69204]/8 rounded-full blur-3xl translate-y-32"></div>
          </div>

          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="border border-[#e69204]/20 h-12"></div>
              ))}
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                
                {/* Left Side - Icon and Badge */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    {/* Main Icon Container */}
                    <div className="relative w-32 h-32 bg-gradient-to-br from-[#e69204] to-[#d46a04] rounded-3xl flex items-center justify-center shadow-2xl">
                      <Shield className="w-16 h-16 text-white" />
                      
                      {/* Decorative Ring */}
                      <div className="absolute -inset-4 border-2 border-[#e69204]/30 rounded-full animate-pulse"></div>
                      <div className="absolute -inset-8 border border-[#e69204]/20 rounded-full"></div>
                    </div>
                    
                    {/* Security Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Secure
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#e69204]/20 border border-[#e69204]/30 backdrop-blur-sm text-[#e69204] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Lock className="w-4 h-4" />
                    Data Protection & Privacy
                  </div>

                  {/* Main Title */}
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Privacy
                    <span className="block text-transparent bg-gradient-to-r from-[#e69204] to-[#f0a500] bg-clip-text">
                      Policy
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    Your privacy is our top priority. Discover how Santoshi Electric protects, manages, and respects your personal information with industry-leading security measures.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-center lg:text-left">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">256-bit</div>
                      <div className="text-sm text-gray-300">SSL Encryption</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">PCI DSS</div>
                      <div className="text-sm text-gray-300">Compliant</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">GDPR</div>
                      <div className="text-sm text-gray-300">Ready</div>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-[#e69204] rounded-full animate-pulse"></div>
                    Last updated: January 15, 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
              <path d="M0,120 L48,110 C96,100 192,80 288,70 C384,60 480,60 576,65 C672,70 768,80 864,85 C960,90 1056,90 1152,85 C1248,80 1344,70 1392,65 L1440,60 L1440,120 L0,120 Z" fill="#f9f7f3"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Introduction</h2>
              </div>
              <p className="text-[#666666] leading-relaxed mb-4 text-sm">
                Santoshi Electric ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make purchases, or engage with our electronics retail and wholesale services.
              </p>
              <p className="text-[#666666] leading-relaxed text-sm">
                By using our services, you consent to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Name, email address, phone number, and billing/shipping addresses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Business information for wholesale customers (company name, GST number, trade license)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Payment information (processed securely through our payment partners)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Transaction Information</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Purchase history, product preferences, and order details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Warranty registration information for electronics purchases</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Service and installation requests</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Technical Information</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">IP address, browser type, device information, and browsing patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Cookies and similar tracking technologies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">How We Use Your Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Service Delivery</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Process and fulfill orders</li>
                    <li>• Arrange delivery and installation</li>
                    <li>• Provide customer support</li>
                    <li>• Manage warranty services</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Business Operations</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Manage wholesale accounts</li>
                    <li>• Process bulk orders</li>
                    <li>• Maintain inventory records</li>
                    <li>• Generate invoices and receipts</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Communication</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Send order confirmations</li>
                    <li>• Notify about product availability</li>
                    <li>• Share promotional offers</li>
                    <li>• Provide technical support</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Improvement</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Enhance website experience</li>
                    <li>• Develop new services</li>
                    <li>• Analyze purchasing trends</li>
                    <li>• Personalize recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Information Sharing</h2>
              </div>
              
              <p className="text-[#666666] mb-6 text-sm">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#e69204] pl-6">
                  <h3 className="font-semibold text-[#10100e] mb-2">Service Providers</h3>
                  <p className="text-[#666666] text-sm">Payment processors, shipping companies, and installation service partners who help us deliver our services.</p>
                </div>
                
                <div className="border-l-4 border-[#e69204] pl-6">
                  <h3 className="font-semibold text-[#10100e] mb-2">Manufacturers</h3>
                  <p className="text-[#666666] text-sm">Electronics manufacturers for warranty registration and product support services.</p>
                </div>
                
                <div className="border-l-4 border-[#e69204] pl-6">
                  <h3 className="font-semibold text-[#10100e] mb-2">Legal Requirements</h3>
                  <p className="text-[#666666] text-sm">When required by law, regulation, or legal process, including tax authorities and regulatory bodies.</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Data Security</h2>
              </div>
              
              <div className="bg-gradient-to-r from-[#e69204]/10 to-[#e69204]/5 rounded-xl p-6 mb-6">
                <p className="text-[#666666] leading-relaxed text-sm">
                  We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission, secure payment processing, and regular security audits.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#e69204]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-[#e69204]" />
                  </div>
                  <h4 className="font-semibold text-[#10100e] mb-2">Encryption</h4>
                  <p className="text-[#666666] text-sm">All sensitive data is encrypted in transit and at rest</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#e69204]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-[#e69204]" />
                  </div>
                  <h4 className="font-semibold text-[#10100e] mb-2">Secure Payments</h4>
                  <p className="text-[#666666] text-sm">PCI DSS compliant payment processing</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-[#e69204]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Database className="w-6 h-6 text-[#e69204]" />
                  </div>
                  <h4 className="font-semibold text-[#10100e] mb-2">Access Control</h4>
                  <p className="text-[#666666] text-sm">Restricted access to personal information</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#10100e] mb-6">Your Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Data Access & Control</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Access your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Update or correct your data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Request data deletion</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Communication Preferences</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Opt-out of marketing emails</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Manage cookie preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Control data sharing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <div className="bg-gradient-to-r from-[#e69204] to-[#d46a04] rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Questions About Privacy?</h2>
              <p className="mb-6 opacity-90 text-sm">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="opacity-90">+91 1234567890</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="opacity-90">privacy@santoshielectric.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
} 