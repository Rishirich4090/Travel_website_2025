// "use client";
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import SearchBar from '../../components/SearchBar';
// import Footer from '../../components/Footer';
// import { getPublicColorTheme } from '../../redux/slice/publicApiSlice';

// const VisaQueryPage = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const theme = useSelector((state) => state.publicApi.colorTheme) || {};
  
//     useEffect(() => {
//       dispatch(getPublicColorTheme());
//     }, [dispatch]);
//   // Theme and settings handled in Footer
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [visaType, setVisaType] = useState('');
//   const [queryForm, setQueryForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     nationality: '',
//     purpose: '',
//     duration: '',
//     message: ''
//   });

//   // useEffect for theme/settings removed, handled in Footer

//   // Popular visa destinations
//   const popularDestinations = [
//     {
//       id: 1,
//       country: 'USA',
//       flag: 'https://images.unsplash.com/photo-1471306224500-6d0d218be372?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFVTQXxlbnwwfHwwfHx8MA%3D%3D',
//       processingTime: '30-45 days',
//       fee: 'From ₹12,500',
//       types: ['Tourist', 'Business', 'Student', 'Transit']
//     },
//     {
//       id: 2,
//       country: 'UK',
//       flag: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
//       processingTime: '15-20 days',
//       fee: 'From ₹8,500',
//       types: ['Tourist', 'Business', 'Student', 'Work']
//     },
//     {
//       id: 3,
//       country: 'Canada',
//       flag: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//       processingTime: '20-25 days',
//       fee: 'From ₹6,500',
//       types: ['Tourist', 'Business', 'Student', 'Work']
//     },
//     {
//       id: 4,
//       country: 'Australia',
//       flag: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
//       processingTime: '15-30 days',
//       fee: 'From ₹9,500',
//       types: ['Tourist', 'Business', 'Student', 'Work']
//     },
//     {
//       id: 5,
//       country: 'Schengen',
//       flag: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
//       processingTime: '10-15 days',
//       fee: 'From ₹7,500',
//       types: ['Tourist', 'Business', 'Transit']
//     },
//     {
//       id: 6,
//       country: 'Dubai/UAE',
//       flag: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
//       processingTime: '3-5 days',
//       fee: 'From ₹3,500',
//       types: ['Tourist', 'Business', 'Transit']
//     }
//   ];

//   // Visa requirements data
//   const visaRequirements = {
//     documents: [
//       'Valid passport with 6+ months validity',
//       'Completed visa application form',
//       'Recent passport-size photographs',
//       'Flight itinerary/booking confirmation',
//       'Hotel booking/accommodation proof',
//       'Bank statements (last 3-6 months)',
//       'Employment letter/business proof',
//       'Travel insurance (if required)',
//       'Invitation letter (if applicable)',
//       'Previous visa copies (if any)'
//     ],
//     tips: [
//       'Apply well in advance of travel date',
//       'Ensure all documents are complete and accurate',
//       'Check specific requirements for your nationality',
//       'Keep multiple copies of important documents',
//       'Track your application status regularly',
//       'Contact embassy for any clarifications'
//     ]
//   };

//   // Services offered
//   const services = [
//     {
//       icon: '📋',
//       title: 'Visa Consultation',
//       description: 'Expert advice on visa requirements and process',
//       features: ['Document checklist', 'Process guidance', 'Country-specific advice']
//     },
//     {
//       icon: '📄',
//       title: 'Document Preparation',
//       description: 'Complete assistance with document compilation',
//       features: ['Form filling', 'Document review', 'Translation services']
//     },
//     {
//       icon: '🚀',
//       title: 'Fast Track Service',
//       description: 'Expedited processing for urgent travel',
//       features: ['Priority handling', 'Quick turnaround', 'Status updates']
//     },
//     {
//       icon: '📞',
//       title: 'Application Support',
//       description: '24/7 support throughout the process',
//       features: ['Application tracking', 'Query resolution', 'Embassy liaison']
//     }
//   ];

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setVisaType('');
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log('Visa query form:', {
//       ...queryForm,
//       selectedCountry,
//       visaType
//     });
//     // Handle form submission
//     alert('Your visa query has been submitted. We will contact you within 24 hours.');
//   };

//   const handleQuickApply = (country) => {
//     router.push(`/visa-query/application?country=${country.country.toLowerCase()}`);
//   };

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
//       {/* Hero Section */}
//       <section className="relative h-[60vh] flex items-center justify-center">
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//         <Image
//           src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
//           alt="Visa services"
//           fill
//           className="object-cover"
//           priority
//           unoptimized
//         />
        
//         {/* Overlapping SearchBar */}
//         <div className="absolute left-1/2 bottom-[-48px] transform -translate-x-1/2 w-[900px] max-w-4xl z-20">
//           <SearchBar
//             searchData={{ location: '', checkIn: '', checkOut: '' }}
//             setSearchData={() => {}}
//             handleSearch={() => {}}
//           />
//         </div>
//       </section>

//       {/* Popular Destinations */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
//             Popular Visa Destinations
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {popularDestinations.map((destination) => (
//               <div
//                 key={destination.id}
//                 className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//                 style={{ backgroundColor: theme.surface }}
//                 onClick={() => handleCountrySelect(destination)}
//               >
//                 <div className="relative h-32">
//                   <Image
//                     unoptimized
//                     src={destination.flag}
//                     alt={destination.country}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                   />
//                   <div className="absolute inset-0  bg-opacity-20"></div>
//                   <div className="absolute bottom-4 left-4">
//                     <h3 className="text-xl font-bold text-white">{destination.country}</h3>
//                   </div>
//                 </div>
                
//                 <div className="p-4">
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <p className="text-xs text-gray-500">Processing Time</p>
//                       <p className="font-semibold" style={{ color: theme.text }}>
//                         {destination.processingTime}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-gray-500">Visa Fee</p>
//                       <p className="font-semibold" style={{ color: theme.primary }}>
//                         {destination.fee}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="mb-4">
//                     <p className="text-xs text-gray-500 mb-2">Visa Types</p>
//                     <div className="flex flex-wrap gap-1">
//                       {destination.types.map((type, index) => (
//                         <span
//                           key={index}
//                           className="text-xs px-2 py-1 rounded"
//                           style={{
//                             backgroundColor: theme.primary + '20',
//                             color: theme.primary
//                           }}
//                         >
//                           {type}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleQuickApply(destination);
//                     }}
//                     className="w-full py-2 rounded-lg font-semibold transition-colors"
//                     style={{
//                       backgroundColor: theme.primary,
//                       color: theme.background
//                     }}
//                   >
//                     Quick Apply
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-16 px-4" style={{ backgroundColor: theme.surface }}>
//         <div className="container mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
//             Our Visa Services
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg p-6 text-center shadow-lg"
//                 style={{ backgroundColor: theme.background }}
//               >
//                 <div className="text-4xl mb-4">{service.icon}</div>
//                 <h3 className="text-xl font-semibold mb-3" style={{ color: theme.text }}>
//                   {service.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{service.description}</p>
//                 <ul className="text-sm text-gray-500 space-y-1">
//                   {service.features.map((feature, idx) => (
//                     <li key={idx}>• {feature}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Visa Query Form */}
//       <section className="py-16 px-4">
//         <div className="container mx-auto max-w-4xl">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
//             Submit Your Visa Query
//           </h2>
          
//           <div 
//             className="bg-white rounded-lg p-8 shadow-lg"
//             style={{ backgroundColor: theme.surface }}
//           >
//             <form onSubmit={handleFormSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Country Selection */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Destination Country
//                   </label>
//                   <select
//                     value={selectedCountry?.country || ''}
//                     onChange={(e) => {
//                       const country = popularDestinations.find(d => d.country === e.target.value);
//                       handleCountrySelect(country);
//                     }}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   >
//                     <option value="">Select Country</option>
//                     {popularDestinations.map((dest) => (
//                       <option key={dest.id} value={dest.country}>{dest.country}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Visa Type */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Visa Type
//                   </label>
//                   <select
//                     value={visaType}
//                     onChange={(e) => setVisaType(e.target.value)}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                     disabled={!selectedCountry}
//                   >
//                     <option value="">Select Visa Type</option>
//                     {selectedCountry?.types?.map((type, index) => (
//                       <option key={index} value={type}>{type} Visa</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     value={queryForm.name}
//                     onChange={(e) => setQueryForm({...queryForm, name: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={queryForm.email}
//                     onChange={(e) => setQueryForm({...queryForm, email: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     value={queryForm.phone}
//                     onChange={(e) => setQueryForm({...queryForm, phone: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   />
//                 </div>

//                 {/* Nationality */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Nationality
//                   </label>
//                   <input
//                     type="text"
//                     value={queryForm.nationality}
//                     onChange={(e) => setQueryForm({...queryForm, nationality: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   />
//                 </div>

//                 {/* Purpose of Travel */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Purpose of Travel
//                   </label>
//                   <select
//                     value={queryForm.purpose}
//                     onChange={(e) => setQueryForm({...queryForm, purpose: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   >
//                     <option value="">Select Purpose</option>
//                     <option value="tourism">Tourism</option>
//                     <option value="business">Business</option>
//                     <option value="education">Education</option>
//                     <option value="work">Work</option>
//                     <option value="transit">Transit</option>
//                     <option value="medical">Medical</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Duration */}
//                 <div>
//                   <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                     Duration of Stay
//                   </label>
//                   <select
//                     value={queryForm.duration}
//                     onChange={(e) => setQueryForm({...queryForm, duration: e.target.value})}
//                     className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                     style={{
//                       borderColor: theme.border,
//                       backgroundColor: theme.background,
//                       color: theme.text
//                     }}
//                     required
//                   >
//                     <option value="">Select Duration</option>
//                     <option value="less-than-1-week">Less than 1 week</option>
//                     <option value="1-2-weeks">1-2 weeks</option>
//                     <option value="2-4-weeks">2-4 weeks</option>
//                     <option value="1-3-months">1-3 months</option>
//                     <option value="3-6-months">3-6 months</option>
//                     <option value="6-months-plus">6+ months</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-sm font-medium mb-2" style={{ color: theme.text }}>
//                   Additional Message/Requirements
//                 </label>
//                 <textarea
//                   value={queryForm.message}
//                   onChange={(e) => setQueryForm({...queryForm, message: e.target.value})}
//                   rows={4}
//                   className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
//                   style={{
//                     borderColor: theme.border,
//                     backgroundColor: theme.background,
//                     color: theme.text
//                   }}
//                   placeholder="Please provide any additional information about your visa requirements..."
//                 />
//               </div>

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="px-8 py-3 rounded-lg font-semibold transition-colors"
//                   style={{
//                     backgroundColor: theme.primary,
//                     color: theme.background
//                   }}
//                 >
//                   Submit Query
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* Requirements Section */}
//       <section className="py-16 px-4" style={{ backgroundColor: theme.surface }}>
//         <div className="container mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
//             Visa Requirements & Tips
//           </h2>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Documents Required */}
//             <div 
//               className="bg-white rounded-lg p-6 shadow-lg"
//               style={{ backgroundColor: theme.background }}
//             >
//               <h3 className="text-2xl font-bold mb-4 text-blue-600">Required Documents</h3>
//               <ul className="space-y-3">
//                 {visaRequirements.documents.map((doc, index) => (
//                   <li key={index} className="flex items-start">
//                     <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-gray-700">{doc}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Tips */}
//             <div 
//               className="bg-white rounded-lg p-6 shadow-lg"
//               style={{ backgroundColor: theme.background }}
//             >
//               <h3 className="text-2xl font-bold mb-4 text-orange-600">Application Tips</h3>
//               <ul className="space-y-3">
//                 {visaRequirements.tips.map((tip, index) => (
//                   <li key={index} className="flex items-start">
//                     <svg className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-gray-700">{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-16 px-4" style={{ backgroundColor: theme.surface || '#047857', }}>
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: theme.text }}>
//             Need Immediate Assistance?
//           </h2>
//           <p className="text-lg mb-8" style={{ color: theme.textSecondary || '#CBD5E1' }}>
//             Our visa experts are available to help you with urgent queries
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
//             <div className="text-center">
//               <div 
//                 className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: theme.primary }}
//               >
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text || '#fff' }}>
//                 Call Us
//               </h3>
//               <p style={{ color: theme.textSecondary || '#CBD5E1' }}>
//                 +91 98765 43210
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div 
//                 className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: theme.primary }}
//               >
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text || '#fff' }}>
//                 Email Us
//               </h3>
//               <p style={{ color: theme.textSecondary || '#CBD5E1' }}>
//                 visa@travelportal.com
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div 
//                 className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: theme.primary }}
//               >
//                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text || '#fff' }}>
//                 Live Chat
//               </h3>
//               <p style={{ color: theme.textSecondary || '#CBD5E1' }}>
//                 Available 24/7
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//   {/* Centralized Footer */}
//   <Footer />
//     </div>
//   );
// };

// export default VisaQueryPage;
