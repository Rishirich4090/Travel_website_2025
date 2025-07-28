'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import {
    fetchContactUs,
    searchContactBranch,
    selectContact,
    selectContactBranches,
    selectContactLoading,
    selectContactError
} from '../../redux/slice/contactSlice';
import { IoMdCall, IoMdMail, IoMdClose } from 'react-icons/io';
import { FaSearch, FaShare, FaMapMarkerAlt, FaMapMarkedAlt, FaGlobe, FaUtensils, FaUsers, FaFlag } from 'react-icons/fa';
import { RiChat4Fill } from 'react-icons/ri';

// Redux: offices data will come from API

const popularCities = [
    'Mumbai', 'Pune', 'Kolkata', 'Bengaluru', 'Dubai',
    'Goa', 'Gujarat', 'Delhi', 'Thane', 'Navi Mumbai'
];

const specialTours = [
    {
        id: 1,
        name: 'Family',
        image: 'https://www.shutterstock.com/image-photo/happy-family-laughing-piggyback-beach-260nw-2472675721.jpg',
        tours: '294 tours',
        departures: '1,400 departures',
        guests: '6,39,729 guests travelled'
    },
    {
        id: 2,
        name: 'Honeymoon Special',
        image: 'https://images.unsplash.com/photo-1496602910407-bacda74a0fe4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9uZXltb29ufGVufDB8fDB8fHww',
        tours: '11 tours',
        departures: '28 departures',
        guests: '46,827 guests travelled'
    },
    {
        id: 3,
        name: "Women's Special",
        image: 'https://plus.unsplash.com/premium_photo-1749644736550-d003f4801094?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFdvbWVuJ3MlMjBTcGVjaWFsJTIwdG91cnxlbnwwfHwwfHx8MA%3D%3D',
        tours: '55 tours',
        departures: '91 departures',
        guests: '33,348 guests travelled'
    },
    {
        id: 4,
        name: "Seniors' Special",
        image: 'https://images.unsplash.com/photo-1639515733019-e694e4b12f1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFNlbmlvcnMnJTIwU3BlY2lhbCUyMHRvdXJ8ZW58MHx8MHx8fDA%3D',
        tours: '48 tours',
        departures: '75 departures',
        guests: '21,074 guests travelled'
    }
];


// Add this hook at the top of your component
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default function ContactPage() {
    const dispatch = useDispatch();
    const contact = useSelector(selectContact);
    const branches = useSelector(selectContactBranches);
    const loading = useSelector(selectContactLoading);
    const error = useSelector(selectContactError);

    const [showEnquiry, setShowEnquiry] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        dispatch(fetchContactUs());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
        setShowEnquiry(false);
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            dispatch(searchContactBranch(searchQuery));
        }
    };

    const popupRef = useRef(null);

    useOutsideClick(popupRef, () => {
        if (showEnquiry) setShowEnquiry(false);
    });

    return (
        <div className="min-h-screen font-sans bg-white relative lg:mt-28">
            {/* Font Family Setup */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
            {/* Hero Section */}
            <div className="relative bg-blue-900 text-white overflow-hidden">
                <div className="container text-white mx-auto px-4 lg:px-8 pt-6 text-sm">
                    <span>Home</span>
                    <span className="mx-1">&gt;</span>
                    <span className="font-semibold">Contact Us</span>
                </div>
                <div className="absolute inset-0 bg-black/50 z-0">
                    <Image
                        src="/contact-hero.jpg"
                        alt="Contact Background"
                        unoptimized
                        width={1920}
                        height={600}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
                    <div className="max-w-4xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6 relative pb-2">
                            Contact Us Today!
                            <span className="absolute bottom-0 left-0 w-24 h-1 bg-yellow-400"></span>
                        </h1>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Indian Guests */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">For Indian Guests</h2>
                                <div className="flex items-center gap-3 mb-2">
                                    <IoMdCall className="text-yellow-400 text-xl" />
                                    <span className="font-medium">1800 22 7979, 1800 313 5555</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IoMdMail className="text-yellow-400 text-xl" />
                                    <span className="font-medium">travel@Tour and Travelworld.com</span>
                                </div>
                            </div>

                            {/* Foreign Nationals */}
                            <div>
                                <h2 className="text-lg font-semibold mb-3">For Foreign Nationals/NRIs travelling to India</h2>
                                <div className="flex items-center gap-3 mb-2">
                                    <IoMdCall className="text-yellow-400 text-xl" />
                                    <span className="font-medium">+91 915 200 4511</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IoMdMail className="text-yellow-400 text-xl" />
                                    <span className="font-medium">inbound@Tour and Travelworld.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Call Back Form */}
                        <div className="w-full max-w-3xl">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                                {/* Full Name Field */}
                                <div className="sm:col-span-3">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-1">Full Name*</label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full border-2 border-white/30 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
                                    />
                                </div>

                                {/* Country Code Selector */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="countryCode" className="block text-sm font-medium text-white/80 mb-1">Country</label>
                                    <div className="relative">
                                        <div className="flex items-center border-2 border-white/30 bg-white/10 rounded-lg px-3 py-3 h-full backdrop-blur-sm">
                                            <span className="mr-2" style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="24" height="16" rx="2" fill="#FF9933" />
                                                    <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
                                                    <rect y="10.67" width="24" height="5.33" fill="#138808" />
                                                    <circle cx="12" cy="8" r="2" fill="#000088" />
                                                    <circle cx="12" cy="8" r="1.2" fill="#FFFFFF" />
                                                    <g>
                                                        <circle cx="12" cy="8" r="1.5" fill="none" stroke="#000088" strokeWidth="0.2" />
                                                        {
                                                            Array.from({ length: 24 }).map((_, i) => (
                                                                <line
                                                                    key={i}
                                                                    x1={12}
                                                                    y1={8}
                                                                    x2={12 + 1.5 * Math.cos((i * 15) * Math.PI / 180)}
                                                                    y2={8 + 1.5 * Math.sin((i * 15) * Math.PI / 180)}
                                                                    stroke="#000088"
                                                                    strokeWidth="0.15"
                                                                />
                                                            ))
                                                        }
                                                    </g>
                                                </svg>
                                            </span>
                                            <span className="text-white text-sm">+91</span>
                                            <svg className="w-4 h-4 ml-2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Number Field */}
                                <div className="sm:col-span-3">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-white/80 mb-1">Phone Number*</label>
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        placeholder="98765 43210"
                                        className="w-full border-2 border-white/30 bg-white/10 text-white placeholder-white/50 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="sm:col-span-4">
                                    <button
                                        type="button"
                                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <IoMdCall className="text-xl" />
                                        <span>Request Call Back</span>
                                    </button>
                                </div>
                            </div>

                            {/* Privacy Note */}
                            <p className="text-xs text-white/60 mt-3">
                                By submitting, you agree to our <a href="#" className="text-yellow-400 hover:underline">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Offices */}
                    <div className="flex-1">
                        {/* Search Section */}
                        <div className="bg-gradient-to-r from-white via-yellow-50 to-white rounded-xl shadow-md p-6 mb-8 border border-yellow-200">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4">Find the nearest Tour and Travel World</h2>
                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by country, city or pincode"
                                        className="w-full border-2 border-yellow-400 rounded-lg px-4 py-3 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <FaSearch className="absolute left-3 top-4 text-gray-400" />
                                </div>
                                <button
                                    className="bg-blue-900 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition"
                                    onClick={handleSearch}
                                    disabled={loading}
                                >
                                    <FaSearch className="text-lg" /> {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-700 mb-2">Search by country: city or pincode</h3>
                                <div className="flex flex-wrap gap-2">
                                    {popularCities.map(city => (
                                        <span
                                            key={city}
                                            className="bg-yellow-100 px-3 py-1 rounded-full text-blue-900 text-sm font-medium hover:bg-yellow-200 cursor-pointer transition"
                                        >
                                            {city}
                                        </span>
                                    ))}
                                    <span className="text-blue-900 text-sm font-medium">+135 more...</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <span className="font-semibold text-blue-900">SALES OFFICE</span>
                                    <span className="text-green-600 font-medium">FOREX Available</span>
                                    <span className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer">
                                        <FaMapMarkerAlt /> Get Directions
                                    </span>
                                    <span className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer">
                                        <FaShare /> Share
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Office Cards */}
                        <div className="space-y-6">
                            {(searchQuery.trim() ? branches : contact?.branchs || []).map(office => (
                                <div
                                    key={office.branchName + office.addressLine}
                                    className={`bg-gradient-to-r from-white via-yellow-50 to-white rounded-xl shadow-md p-6 border ${office.branchStatus === 'TEMPORARILY CLOSED' ? 'border-red-200' : 'border-yellow-200'
                                        }`}
                                >
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="bg-purple-700 text-white px-2 py-1 rounded text-xs font-bold">
                                            {office.branchType}
                                        </span>
                                        {office.services?.toLowerCase().includes('forex') && (
                                            <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-bold">
                                                FOREX Available
                                            </span>
                                        )}
                                        <span className={`font-bold ml-auto ${office.branchStatus === 'OPEN' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {office.branchStatus}
                                        </span>


                                        {office.branchStatus === 'TEMPORARILY CLOSED' && (
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                Renovation
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">{office.branchName}</h3>
                                    <div className='flex gap-2'>
                                        <p className="text-gray-700 text-sm mb-4">{office.addressLine}</p>
                                        <p className="text-gray-700 text-sm mb-4">{office.pinCode}  </p>
                                        <p className="text-gray-700 text-sm mb-4">{office.city.name}</p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold text-sm text-gray-600">Office Details</p>
                                        <p className="text-blue-600 font-medium">{office.phoneNumber}</p>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex flex-wrap items-center gap-4 text-sm">
                                            <span className="font-semibold text-blue-900">
                                                {office.branchType}
                                            </span>
                                            {office.services?.toLowerCase().includes('forex') && (
                                                <span className="text-green-600 font-medium">FOREX Available</span>
                                            )}
                                            <span className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer">
                                                <FaMapMarkerAlt /> <a href={office.branchGoogleMapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                            </span>
                                            <span className="text-blue-600 font-medium flex items-center gap-1 cursor-pointer">
                                                <FaShare /> Share
                                            </span>
                                        </div>
                                    </div>
                                    {office.description && (
                                        <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg">
                                            {office.description}
                                        </div>
                                    )}
                                    {office.branchStatus === 'TEMPORARILY CLOSED' && office.description && (
                                        <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                                            {office.description}
                                        </div>
                                    )}
                                    {office.openingTime && office.closingTime && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">Working Hours</p>
                                            <p className="font-medium">{new Date(office.openingTime).toLocaleTimeString()} - {new Date(office.closingTime).toLocaleTimeString()}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {loading && <div className="text-center text-blue-900 font-semibold">Loading...</div>}
                            {error && <div className="text-center text-red-600 font-semibold">{error}</div>}
                            {!(searchQuery.trim() ? branches : contact?.branchs)?.length && !loading && (
                                <div className="text-center text-gray-500">No offices found.</div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="w-full lg:w-96 space-y-6">
                        {/* Special Tours */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {specialTours.map(tour => (
                                <div
                                    key={tour.id}
                                    className="relative h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    {/* Background Image with overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                                    <Image
                                        src={tour.image}
                                        alt={tour.name}
                                        fill
                                        unoptimized
                                        className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <Image
                                        src={tour.image}
                                        alt={tour.name}
                                        unoptimized
                                        fill
                                        className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Tour Name at Top */}
                                    <div className="relative z-20 p-4">
                                        <h3 className="text-xl font-bold text-white drop-shadow-md">
                                            {tour.name}
                                        </h3>
                                    </div>

                                    {/* Tour Details at Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex justify-between text-white text-sm">
                                            <div className="text-yellow-300 font-medium">
                                                {tour.tours}
                                            </div>
                                            <div>
                                                {tour.departures}
                                            </div>
                                        </div>
                                        <div className="text-white text-xs mt-1">
                                            {tour.guests}
                                        </div>
                                    </div>

                                    {/* Hover effect indicator */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl transition-all duration-300 z-30 pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        {/* Tour Manager */}
                        <div className="relative rounded-xl overflow-hidden h-80 w-full group">
                            {/* Background Image with Gradient Overlay */}
                            <Image
                                src="https://www.yellowbrick.co/wp-content/uploads/2022/07/CopyofYBBlog-FeaturedImageCareerPage6_a9aaeea01f11a0660656234677264d27_2000-1024x683.png"
                                alt="Tour Manager Background"
                                fill
                                unoptimized
                                className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <Image
                                src="https://www.yellowbrick.co/wp-content/uploads/2022/07/CopyofYBBlog-FeaturedImageCareerPage6_a9aaeea01f11a0660656234677264d27_2000-1024x683.png"
                                alt="Tour Manager Background"
                                unoptimized
                                fill
                                className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent" />

                            {/* Content Container */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                                {/* Top Section - Title */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 relative pb-2">
                                        The Tour World Tour Manager
                                        <span className="absolute bottom-0 left-0 w-20 h-1 bg-yellow-400 rounded-full"></span>
                                    </h3>

                                    {/* Benefits List */}
                                    <ul className="space-y-2 mt-4">
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2 text-lg">✓</span>
                                            <span>With you throughout the entire tour</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2 text-lg">✓</span>
                                            <span>Professional photography guidance</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2 text-lg">✓</span>
                                            <span>Expert sightseeing information</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-yellow-400 mr-2 text-lg">✓</span>
                                            <span>We handle everything so you can relax</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 rounded-xl transition-all duration-300 pointer-events-none" />
                        </div>
                        {/* All-inclusive Tours Card */}
                        <div className="bg-blue-900 rounded-xl shadow-md p-6 text-white mt-6">
                            <ul className="space-y-4 mb-6">
                                <li className="flex items-start">
                                    <FaGlobe className="text-yellow-400 text-2xl mr-3 mt-1" />
                                    <div>
                                        <span className="font-bold">All-inclusive tours</span>
                                        <div className="text-sm">No hidden costs, you book and relax, we handle the rest</div>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <FaMapMarkedAlt className="text-yellow-400 text-2xl mr-3 mt-1" />
                                    <div>
                                        <span className="font-bold">Best-in-class tour itineraries</span>
                                        <div className="text-sm">We have the best value for money itineraries for you</div>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <FaUtensils className="text-yellow-400 text-2xl mr-3 mt-1" />
                                    <div>
                                        <span className="font-bold">Food included</span>
                                        <div className="text-sm">All Tour and Travel World group tours have breakfast, lunch, dinner included in the tour price</div>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <FaUsers className="text-yellow-400 text-2xl mr-3 mt-1" />
                                    <div>
                                        <span className="font-bold">Join from anywhere</span>
                                        <div className="text-sm">Opt for the Joining & Leaving option and join the tour from anywhere in the world</div>
                                    </div>
                                </li>
                            </ul>
                            <div className="bg-gray-100 rounded-lg p-4 text-gray-800 flex flex-col md:flex-row justify-between items-center">
                                <div className="italic text-sm mb-2 md:mb-0">
                                    We are making memories and celebrating life on tour with our guests! It&apos;s your turn now...
                                </div>
                                <div className="flex space-x-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-900">8,68,294</div>
                                        <div className="text-xs">happy travellers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-900">67,228</div>
                                        <div className="text-xs">successful tours</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Corporate Office Card */}
                        <div className="bg-blue-900 rounded-xl shadow-md p-6 text-white mt-6">
                            <h3 className="text-xl font-bold mb-2 text-yellow-400">Corporate Office</h3>
                            <div className="text-sm mb-4">
                                7th Floor, Tour and Travel Gaya, Bihar 823001
                            </div>
                            <button className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded mb-4">Directions</button>
                            <div className="flex items-center justify-between text-xs">
                                <div>
                                    <span className="font-bold">For Foreign Nationals only</span>
                                    <div className="flex items-center mt-1">
                                        <IoMdCall className="text-yellow-400 text-xl" />
                                        <span className="font-bold">+91 887 997 2221</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="font-bold">Working Hours</span>
                                    <div>10AM - 7PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chatbot-style Enquiry Popup */}
            <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${showEnquiry ? 'w-[380px]' : 'w-16 h-16'}`}>
                {!showEnquiry ? (
                    <button
                        onClick={() => setShowEnquiry(true)}
                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-xl flex items-center justify-center text-blue-900 hover:from-yellow-500 hover:to-yellow-600 transition-all transform hover:scale-105"
                    >
                        <RiChat4Fill className="text-2xl" />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">1</span>
                    </button>
                ) : (
                    <div
                        ref={popupRef}
                        className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[580px] border border-gray-200 transform transition-all duration-300"
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                                    <RiChat4Fill className="text-xl text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Quick Enquiry</h3>
                                    <p className="text-xs text-blue-200">We&apos;ll respond within 24 hours</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowEnquiry(false)}
                                className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-700 transition"
                            >
                                <IoMdClose className="text-xl" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            <div className="flex mb-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-800 mr-2">
                                    VW
                                </div>
                                <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                                    <p className="font-medium text-gray-800">Hello! How can we help you today?</p>
                                    <p className="text-xs text-gray-500 mt-1">Tour and Travel World Support</p>
                                </div>
                            </div>

                            <div className="text-xs text-gray-400 text-center my-4">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Chat Form */}
                        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message*</label>
                                    <textarea
                                        name="message"
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}