'use client';

import { FileText, Scale, Shield, AlertTriangle, CreditCard, Truck, Wrench, Users, Phone, Mail } from 'lucide-react';
import ProtectedPage from "@/components/ProtectedPage";

export default function TermsOfService() {
  return (
    <ProtectedPage allowedRoles={['guest', 'user']}>
      <div className="min-h-screen bg-[#f9f7f3]">
        {/* Header */}
        <div className="relative overflow-hidden bg-[#10100e] py-24">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#e69204]/10 rounded-full blur-3xl translate-x-32 -translate-y-32"></div>
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#e69204]/5 rounded-full blur-3xl -translate-x-48"></div>
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#e69204]/8 rounded-full blur-3xl translate-y-32"></div>
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
                      <FileText className="w-16 h-16 text-white" />
                      
                      {/* Decorative Ring */}
                      <div className="absolute -inset-4 border-2 border-[#e69204]/30 rounded-full animate-pulse"></div>
                      <div className="absolute -inset-8 border border-[#e69204]/20 rounded-full"></div>
                    </div>
                    
                    {/* Legal Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Legal
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#e69204]/20 border border-[#e69204]/30 backdrop-blur-sm text-[#e69204] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Scale className="w-4 h-4" />
                    Legal Terms & Conditions
                  </div>

                  {/* Main Title */}
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Terms of
                    <span className="block text-transparent bg-gradient-to-r from-[#e69204] to-[#f0a500] bg-clip-text">
                      Service
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                    Clear, comprehensive terms that govern your relationship with Santoshi Electric. Read our commitments to fair service, quality products, and customer satisfaction.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-6 text-center lg:text-left">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">25+</div>
                      <div className="text-sm text-gray-300">Years Experience</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">10K+</div>
                      <div className="text-sm text-gray-300">Happy Customers</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                      <div className="text-2xl font-bold text-[#e69204]">7-Day</div>
                      <div className="text-sm text-gray-300">Return Policy</div>
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
            
            {/* Agreement */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Agreement to Terms</h2>
              </div>
              <p className="text-[#666666] leading-relaxed mb-4 text-sm">
                These Terms of Service ("Terms") constitute a legally binding agreement between you and Santoshi Electric regarding your use of our website, purchase of electronics and home appliances, and access to our retail and wholesale services.
              </p>
              <p className="text-[#666666] leading-relaxed text-sm">
                By accessing our website, creating an account, or making a purchase, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Our Services</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Retail Services</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Sales of electronics and home appliances</li>
                    <li>• Product demonstrations and consultations</li>
                    <li>• Delivery and installation services</li>
                    <li>• Warranty and after-sales support</li>
                    <li>• Extended warranty plans</li>
                  </ul>
                </div>
                
                <div className="bg-[#f9f7f3] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Wholesale Services</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Bulk order processing</li>
                    <li>• Business account management</li>
                    <li>• Volume discounts and pricing</li>
                    <li>• Trade financing options</li>
                    <li>• Dedicated support channels</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Account Registration</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Account Requirements</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">You must be at least 18 years old to create an account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Provide accurate, current, and complete information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">Maintain the security of your account credentials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm">For wholesale accounts: Valid business registration and GST documentation required</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#e69204]/10 to-[#e69204]/5 rounded-xl p-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-[#e69204] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-[#10100e] mb-2">Account Responsibility</h4>
                      <p className="text-[#666666] text-sm">
                        You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized access or security breaches.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Purchase Terms</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Orders and Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <ul className="space-y-2 text-[#666666] text-sm">
                        <li>• All prices are in Indian Rupees (INR)</li>
                        <li>• Prices include applicable taxes (GST)</li>
                        <li>• We reserve the right to modify prices</li>
                        <li>• Wholesale pricing available for verified business accounts</li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-[#666666] text-sm">
                        <li>• Order confirmation does not guarantee acceptance</li>
                        <li>• We may cancel orders due to stock unavailability</li>
                        <li>• Bulk order terms may vary</li>
                        <li>• EMI options subject to bank approval</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Payment Terms</h3>
                  <div className="bg-[#f9f7f3] rounded-xl p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-[#10100e] mb-2">Retail Customers</h4>
                        <ul className="space-y-1 text-[#666666] text-sm">
                          <li>• Payment due at time of order</li>
                          <li>• Credit/Debit cards accepted</li>
                          <li>• UPI and net banking available</li>
                          <li>• Cash on delivery (select areas)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#10100e] mb-2">Wholesale Customers</h4>
                        <ul className="space-y-1 text-[#666666] text-sm">
                          <li>• Credit terms: Net 30 days</li>
                          <li>• Advance payment discounts</li>
                          <li>• Letter of credit accepted</li>
                          <li>• Bank guarantees for large orders</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#10100e] mb-2">EMI Options</h4>
                        <ul className="space-y-1 text-[#666666] text-sm">
                          <li>• 0% EMI on select products</li>
                          <li>• 3-24 month tenure</li>
                          <li>• Processing fees may apply</li>
                          <li>• Subject to credit approval</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery and Installation */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Delivery & Installation</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Delivery Terms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Standard delivery: 3-7 business days within city limits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Express delivery available for premium customers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Free delivery on orders above ₹15,000</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Customer must be present during delivery</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-4">Installation Services</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Free installation for major appliances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Certified technicians and authorized service partners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Installation scheduling within 48 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#e69204] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-[#666666] text-sm">Additional charges for complex installations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Warranty and Returns */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Warranty & Returns</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Warranty Policy</h3>
                  <div className="bg-[#f9f7f3] rounded-xl p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#10100e] mb-3">Manufacturer Warranty</h4>
                        <ul className="space-y-2 text-[#666666] text-sm">
                          <li>• All products come with manufacturer warranty</li>
                          <li>• Warranty periods vary by product category</li>
                          <li>• Warranty registration assistance provided</li>
                          <li>• Authorized service center support</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#10100e] mb-3">Extended Warranty</h4>
                        <ul className="space-y-2 text-[#666666] text-sm">
                          <li>• Optional extended warranty plans available</li>
                          <li>• Coverage beyond manufacturer warranty</li>
                          <li>• On-site service for major appliances</li>
                          <li>• Transferable with product sale</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Return & Exchange Policy</h3>
                  <div className="border-l-4 border-[#e69204] pl-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#10100e] mb-2">Return Conditions</h4>
                      <ul className="space-y-1 text-[#666666] text-sm">
                        <li>• 7-day return policy for electronics</li>
                        <li>• Product must be unused and in original packaging</li>
                        <li>• All accessories and documentation included</li>
                        <li>• No returns on custom orders or special promotions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#10100e] mb-2">Exchange Process</h4>
                      <ul className="space-y-1 text-[#666666] text-sm">
                        <li>• Exchange for defective products within 15 days</li>
                        <li>• Size/model exchanges subject to availability</li>
                        <li>• Price difference applies for upgraded models</li>
                        <li>• Return shipping arranged at no extra cost</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Limitations and Liability */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#e69204] rounded-lg flex items-center justify-center mr-4">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#10100e]">Limitations & Liability</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#e69204]/10 to-[#e69204]/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Service Limitations</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• Service availability subject to geographical limitations</li>
                    <li>• Installation services limited to standard configurations</li>
                    <li>• Wholesale pricing requires minimum order quantities</li>
                    <li>• Product availability may vary due to supply chain factors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Liability Disclaimer</h3>
                  <p className="text-[#666666] text-sm leading-relaxed mb-4">
                    Santoshi Electric's liability is limited to the purchase price of the product. We are not liable for indirect, incidental, or consequential damages arising from product use or service delivery.
                  </p>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    This limitation does not affect your statutory rights as a consumer under applicable Indian law.
                  </p>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#10100e] mb-6">Governing Law & Dispute Resolution</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Applicable Law</h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in [Your City], India.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[#10100e] mb-3">Dispute Resolution</h3>
                  <ul className="space-y-2 text-[#666666] text-sm">
                    <li>• First attempt: Direct negotiation</li>
                    <li>• Mediation through consumer forum</li>
                    <li>• Arbitration under Indian Arbitration Act</li>
                    <li>• Court proceedings as last resort</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-[#e69204] to-[#d46a04] rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Questions About These Terms?</h2>
              <p className="mb-6 opacity-90 text-sm">
                If you have any questions about these Terms of Service or need clarification on any policies, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Customer Service</div>
                    <div className="opacity-90">+91 1234567890</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Legal Department</div>
                    <div className="opacity-90">legal@santoshielectric.com</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 text-sm opacity-75">
                By continuing to use our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
} 