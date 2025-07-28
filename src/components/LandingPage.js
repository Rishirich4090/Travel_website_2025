"use client";
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaHotel, FaUtensils, FaBus, FaUserTie, FaClipboardList, FaPlane, FaStar, FaRegStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

// Dummy data
const incredibleIndiaPackages = [
  { id: 1, price: '₹25,000', days: '4 Days', dept: '5 Dept.', title: 'Munnar Cochin', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 2, price: '₹35,000', days: '5 Days', dept: '2 Dept.', title: 'Dharamshala Dalhousie', img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: 3, price: '₹40,000', days: '7 Days', dept: '13 Dept.', title: 'Jaipur Udaipur Kumbhalgarh', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
  { id: 4, price: '₹45,000', days: '6 Days', dept: '2 Dept.', title: 'Bhopal Pachmarhi Madhai', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80' },
  { id: 5, price: '₹50,000', days: '5 Days', dept: '2 Dept.', title: 'Gangtok Darjeeling', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
  { id: 6, price: '₹60,000', days: '5 Days', dept: '3 Dept.', title: 'Highlights of Andaman', img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { id: 7, price: '₹75,000', days: '9 Days', dept: '2 Dept.', title: 'Hampi Badami Chikmagalur', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80' },
];

const exploreTabs = [
  'South East Asia',
  'Australia New Zealand',
  'Africa Mauritius',
  'Far East Asia',
  'Nepal Bhutan Sri Lanka',
];

const explorePackages = [
  {
    id: 1,
    tag: 'GROUP TOUR',
    code: 'ASAT',
    title: 'All of Thailand',
    allInclusive: true,
    days: 15,
    destinations: '1 Country 8 Cities',
    departures: '3 Dates',
    emi: '₹5,901/mo',
    price: '₹1,75,000',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Experience the best of Thailand with this comprehensive tour covering all major attractions from bustling Bangkok to serene beaches.'
  },
  {
    id: 2,
    tag: 'GROUP TOUR',
    code: 'ASTL',
    title: 'Highlights of Thailand',
    allInclusive: true,
    days: 4,
    destinations: '1 Country 2 Cities',
    departures: '11 Dates',
    emi: '₹1,686/mo',
    price: '₹50,000',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    reviews: 41,
    description: 'Perfect for first-time visitors, this tour covers the must-see attractions of Thailand in a compact itinerary.'
  },
  {
    id: 3,
    tag: 'GROUP TOUR',
    code: 'ASPI',
    title: 'Philippines Manila Cebu',
    allInclusive: true,
    days: 8,
    destinations: '1 Country 4 Cities',
    departures: '2 Dates',
    emi: '₹6,778/mo',
    price: '₹2,01,000',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80',
    description: 'Discover the stunning islands and vibrant culture of the Philippines on this unforgettable journey.'
  },
  {
    id: 4,
    tag: 'GROUP TOUR',
    code: 'ASJW',
    title: 'Singapore Thailand Malaysia',
    allInclusive: true,
    days: 10,
    destinations: '3 Countries 5 Cities',
    departures: '13 Dates',
    emi: '₹5,732/mo',
    price: '₹1,70,000',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
    rating: 4,
    reviews: 134,
    badge: 'Durga Pujo Spl. Departures',
    description: 'Experience the diversity of Southeast Asia with this multi-country tour covering the best of each destination.'
  },
];

import Link from 'next/link';
import Footer from './Footer';
import {
  getPublicColorTheme,
  getPublicLandingMedia,
  getPublicWebsiteSettings,
  getTopDestinations,
  getTopPackages,
  selectPublicColorTheme,
  selectPublicLandingMedia,
  selectPublicWebsiteSettings,
  selectColorThemeLoading,
  selectLandingMediaLoading,
  selectWebsiteSettingsLoading,
  selectTopDestinations,
  selectTopDestinationsLoading,
  selectTopPackages,
  selectTopPackagesLoading
} from '../redux/slice/publicApiSlice';

const LandingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);
  const theme = useSelector(selectPublicColorTheme);
  const landingMedia = useSelector(selectPublicLandingMedia);
  const websiteSettings = useSelector(selectPublicWebsiteSettings);
  const colorThemeLoading = useSelector(selectColorThemeLoading);
  const mediaLoading = useSelector(selectLandingMediaLoading);
  const websiteSettingsLoading = useSelector(selectWebsiteSettingsLoading);
  const topDestinations = useSelector(selectTopDestinations);
  const topDestinationsLoading = useSelector(selectTopDestinationsLoading);
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2 guests, 1 room'
  });
  const [activeExploreTab, setActiveExploreTab] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Top Packages state
  const topPackages = useSelector(selectTopPackages);
  const topPackagesLoading = useSelector(selectTopPackagesLoading);

  // Load public landing media on component mount
  useEffect(() => {
    dispatch(getPublicColorTheme());
    dispatch(getPublicLandingMedia());
    dispatch(getPublicWebsiteSettings());
    dispatch(getTopDestinations());
    dispatch(getTopPackages());
  }, [dispatch]);
  // Handle click on top package card (use top-level id for API call)
  const handleTopPackageClick = (pkg) => {
    if (pkg && pkg.id) {
      router.push(`/top-packages/${pkg.id}`);
    }
  };

  // Handle click on top destination card (open details page with id)
  const handleDestinationClick = (dest) => {
    if (dest && dest.id) {
      router.push(`/top-packages/${dest.id}`);
    }
  };
  // Helper for top package card display
  const getTopPackageCardData = (pkg) => ({
  id: pkg.id,
  packageId: pkg.packageId,
  name: typeof pkg.packageName === 'string' ? pkg.packageName : '',
  image: typeof pkg.image === 'string' ? pkg.image : '/images/placeholder.svg',
  days: typeof pkg.numberOfDays === 'number' || typeof pkg.numberOfDays === 'string' ? pkg.numberOfDays : '',
  nights: typeof pkg.numberOfNights === 'number' || typeof pkg.numberOfNights === 'string' ? pkg.numberOfNights : '',
  city: (pkg.city && typeof pkg.city === 'object' && pkg.city !== null && typeof pkg.city.name === 'string') ? pkg.city.name : (typeof pkg.city === 'string' ? pkg.city : ''),
  themeType: typeof pkg.themeType === 'string' ? pkg.themeType : '',
  active: !!pkg.active,
  ...pkg
  });
  // ...existing code...

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const getDestinationDisplayData = (dest) => ({
    id: dest.id,
    name: dest.cityName || dest.name || 'USA',
    image: dest.image || '/images/placeholder.svg',
    hotels: dest.hotels || 0,
    tours: dest.tours || 0,
    rentals: dest.rentals || 0,
    cars: dest.cars || 0,
    activities: dest.activities || 0,
    ...dest
  });

  const dummyTopDestinations = [
    {
      id: 101,
      cityName: 'USA',
      image: 'https://images.unsplash.com/photo-1610224736592-ce444a93b7f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FsaWZvcm5pYXxlbnwwfHwwfHx8MA%3D%3D',
      hotels: 10,
      tours: 5,
      rentals: 3,
      cars: 2,
      activities: 4
    },
    {
      id: 102,
      cityName: 'New York City',
      image: 'https://images.unsplash.com/photo-1448317846460-907988886b33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TmV3JTIwWW9yayUyMENpdHl8ZW58MHx8MHx8fDA%3D',
      hotels: 8,
      tours: 6,
      rentals: 2,
      cars: 1,
      activities: 3
    },
    {
      id: 103,
      cityName: 'Los Angeles',
      image: 'https://images.unsplash.com/flagged/photo-1575555201693-7cd442b8023f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TG9zJTIwQW5nZWxlc3xlbnwwfHwwfHx8MA%3D%3D',
      hotels: 7,
      tours: 4,
      rentals: 5,
      cars: 3,
      activities: 2
    },
    {
      id: 104,
      cityName: 'San Francisco',
      image: 'https://images.unsplash.com/photo-1719858403455-9a2582eca805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2FuJTIwRnJhbmNpc2NvfGVufDB8fDB8fHww',
      hotels: 9,
      tours: 7,
      rentals: 4,
      cars: 2,
      activities: 5
    }
  ];

  const recommendedTours = [
    {
      id: 1,
      title: 'Two Hour Walking Tour of Manhattan',
      rating: 5,
      reviews: 3,
      originalPrice: 200,
      discountPrice: 180,
      duration: '10 hours',
      location: 'Los Angeles',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      discount: 10
    },
    {
      id: 2,
      title: 'American Parks Trail end Rapid City',
      rating: 5,
      reviews: 3,
      price: 150,
      duration: '8 hours',
      location: 'Nevada',
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Northern California Summer 2019',
      rating: 5,
      reviews: 3,
      price: 150,
      duration: '5 days',
      location: 'San Francisco',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Los Angeles to San Francisco Express',
      rating: 5,
      reviews: 3,
      price: 180,
      duration: 'Full day',
      location: 'New Jersey',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'New York: Museum of Modern Art',
      rating: 5,
      reviews: 3,
      price: 200,
      duration: 'Full day',
      location: 'San Francisco',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'Rockies, Yellowstone & Mt Rushmore',
      rating: 5,
      reviews: 2,
      price: 200,
      duration: '10 hours',
      location: 'California',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Meet the Steve Jobs of the Travel Industry',
      excerpt: 'Vulputate amet magna bibendum et nibh at. Pretium tincidunt non turpis fermentum enim scelerisque nec enim odio...',
      category: 'TRAVEL',
      image: 'https://images.unsplash.com/photo-1650821414031-cf7291ce938c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWVldCUyMHRoZSUyMFN0ZXZlJTIwSm9icyUyMG9mJTIwdGhlJTIwVHJhdmVsJTIwSW5kdXN0cnl8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 2,
      title: 'The Ultimate Cheat Sheet on Travel',
      excerpt: 'relocated by your company, it can seem daunting to visit a new country for the first time. Looking for some tips and tricks to mastering international travel?',
      category: 'BOOKING',
      image: 'https://images.unsplash.com/photo-1632178151697-fd971baa906f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VGhlJTIwVWx0aW1hdGUlMjBDaGVhdCUyMFNoZWV0JTIwb24lMjBUcmF2ZWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 3,
      title: 'The Best Kept Secrets About Travel',
      excerpt: 'PENNSYLVANIA, USA — The difference between a tourist and a traveler is getting to know a culture, according to Karen Gershowitz...',
      category: 'HOTEL',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const fallbackWebsiteSettings = {
    companyName: 'Weekly Travel Portal',
    phoneNumber: '+91 9876543210',
    emailId: 'info@weeklytravel.com',
    whatsappNumber: '+91 9876543210',
    gstNumber: '29ABCDE1234F1Z5',
    officeAddress: {
      officeNo: '123',
      buildingName: 'Travel Plaza',
      streetName: 'MG Road',
      location: 'City Center',
      district: 'Central District',
      city: 'Mumbai',
      pin: '400001'
    },
    branchAddresses: [
      {
        officeNo: '456',
        buildingName: 'Branch Tower',
        streetName: 'Park Street',
        location: 'Business District',
        district: 'South District',
        city: 'Delhi',
        pin: '110001'
      }
    ],
    supportContacts: [
      { type: 'Customer Support', contact: '+91 9876543210' },
      { type: 'Emergency', contact: '+91 9876543211' }
    ]
  };

  const settings = websiteSettings || fallbackWebsiteSettings;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.backgroundColor }}>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center p-0 mt-16 m-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {mediaLoading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading...</p>
            </div>
          </div>
        ) : landingMedia && landingMedia.length > 0 ? (
          landingMedia[0].mediaType === 'video' ? (
            <video
              src={landingMedia[0].mediaUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={landingMedia[0].mediaUrl}
              alt="Travel destination"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1530023367847-a683933f4172?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Travel destination"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}

        <div className="relative z-10 text-center px-4 max-w-6xl w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Let the journey begin v22
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Get the best prices on 2,000,000+ properties, worldwide
          </p>
        </div>
      </section>

      {/* Landing Media Showcase Section */}
      {landingMedia && landingMedia.length > 1 && (
        <section className="py-16 px-4" style={{ backgroundColor: theme.backgroundColor || '#f8fafc' }}>
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
              Explore Our Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landingMedia
                .slice(0, 6)
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .map((media, index) => (
                  <div key={media.id || index} className="relative h-64 rounded-lg overflow-hidden shadow-lg group">
                    {media.mediaType === 'video' ? (
                      <video
                        src={media.mediaUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                      />
                    ) : (
                      <Image
                        src={media.mediaUrl}
                        alt={`Gallery item ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">
                        {media.mediaType === 'video' ? 'Video Gallery' : 'Photo Gallery'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Incredible India Section - Improved Card Layout */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Incredible India
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover the diverse beauty of India with our specially curated packages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
            {incredibleIndiaPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="group relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-40 w-full">
                  <Image
                    src={pkg.img}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Price Badge */}
                  <div className="absolute top-3 left-3 bg-white text-black text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
                    ₹{pkg.price.toLocaleString()}
                  </div>

                  {/* Days and Dept Info */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm font-medium">
                    <span>{pkg.days}</span>
                    <span>{pkg.dept}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm">{pkg.title}</h3>
                </div>
              </div>
            ))}
          </div>


          <div className="flex justify-center mb-8">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all hover:shadow-xl">
              View More Packages
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex-1 mb-4 md:mb-0">
                  <h3 className="font-bold text-xl mb-2">All Set to Explore?</h3>
                  <p className="text-gray-700 mb-4">
                    From Europe to Asia, from families to solo journeys your perfect travel plan starts here...
                  </p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow transition flex items-center gap-2">
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">New</span>
                    View Travel Planner
                  </button>
                </div>
                <div className="w-full md:w-auto md:ml-6">
                  <Image
                    src="/increadible.png"
                    alt="Travel Planner"
                    width={150}
                    height={120}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Top Destinations
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
          </div>
          

          {topDestinationsLoading ? (
            <div className="text-center py-8">Loading top destinations...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(() => {
                const apiData = topDestinations && Array.isArray(topDestinations) ? topDestinations : [];
                const countApi = apiData.length;
                const dummyNeeded = Math.max(0, 6 - countApi);
                const combined = [...apiData, ...dummyTopDestinations.slice(0, dummyNeeded)].slice(0, 5);
                return combined.map((destination, idx) => {
                  const display = getDestinationDisplayData(destination);
                  const gridClass = idx === 0 ? "lg:col-span-2 lg:row-span-1" : "";
                  const imageHeight = idx === 0 ? "h-64 md:h-80 lg:h-64" : "h-64";
                  return (
                    <div
                      key={display.id}
                      className={`group cursor-pointer ${gridClass}`}
                      onClick={() => handleDestinationClick(display)}
                    >
                      <div className={`relative w-full rounded-xl overflow-hidden mb-4 ${imageHeight}`}>
                        <Image
                          src={display.image}
                          alt={display.name}
                          fill
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                          onError={(e) => { e.target.src = '/images/placeholder.svg'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white text-2xl font-bold">{display.name}</h3>
                          <div className="flex text-white text-sm mt-1">
                            <span>{display.hotels} Hotels</span>
                            <span className="mx-2">•</span>
                            <span>{display.tours} Tours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Top Packages Section (moved below Top Destinations) */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Top Packages
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Discover our most popular packages, handpicked for you
            </p>
          </div>

          {topPackagesLoading ? (
            <div className="text-center py-8">Loading top packages...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {Array.isArray(topPackages) && topPackages.length > 0 ? (
                topPackages.map((pkg) => {
                  const card = getTopPackageCardData(pkg);
                  return (
                    <div
                      key={card.id}
                      className="group relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      onClick={() => handleTopPackageClick(card)}
                    >
                      {/* Image Section */}
                      <div className="relative h-40 w-full">
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {/* Days and Nights Info */}
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-sm font-medium">
                          <span>{card.days} Days</span>
                          <span>{card.nights} Nights</span>
                        </div>
                      </div>
                      {/* Title */}
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-gray-900 text-sm">{card.name}</h3>
                        <div className="text-xs text-gray-500 mt-1">{typeof card.city === 'string' ? card.city : ''}</div>
                        <div className="text-xs text-blue-700 mt-1">{typeof card.themeType === 'string' ? card.themeType : ''}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center text-gray-500">No top packages found.</div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* All Inclusive Section - Improved Layout */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#222' }}>
              All inclusive tours, <span className="font-normal">Chalo Bag Bharo Nikal Pado!</span>
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <FaHotel className="text-4xl mb-4" />, title: "Accommodation", description: "Comfortable & convenient hotels cherry picked by our hotel management team" },
              { icon: <FaUtensils className="text-4xl mb-4" />, title: "All meals", description: "Eat to your heart's content Breakfast. Lunch. Dinner." },
              { icon: <FaBus className="text-4xl mb-4" />, title: "On-tour transport", description: "Our itineraries include all rail, sea and road transport as part of the itinerary so you can enjoy tension free" },
              { icon: <FaUserTie className="text-4xl mb-4" />, title: "Tour managers", description: "We have an exclusive team of 350 tour managers specialising in India and World tours" },
              { icon: <FaClipboardList className="text-4xl mb-4" />, title: "Best value itinerary", description: "Our dedicated product & destination research team spends hours curating the best value for money itineraries" },
              { icon: <FaPlane className="text-4xl mb-4" />, title: "To and fro airfare", description: "Veena World tours are inclusive of airfare from many hubs within India unless you pick the joining-leaving option" }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <div className="text-yellow-400">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Image Showcase */}
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="All inclusive tour"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center p-6 max-w-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">Experience Hassle-Free Travel</h3>
                <p className="text-white mb-6">
                  Our all-inclusive packages take care of everything so you can focus on creating memories
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg text-lg shadow transition">
                  Explore Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore the World Section - Improved with Tabs and Content */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Explore the World
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Discover amazing destinations across the globe with our expertly crafted tours
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {exploreTabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-full font-medium border transition-all ${activeExploreTab === idx ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'}`}
                onClick={() => setActiveExploreTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards with Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {explorePackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col relative hover:shadow-xl transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={pkg.img} alt={pkg.title} fill className="object-cover" unoptimized />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.tag} <span className="ml-1">{pkg.code}</span>
                  </div>
                  {pkg.badge && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {pkg.badge}
                    </div>
                  )}
                  <button
                    className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(pkg.id);
                    }}
                  >
                    {wishlist.includes(pkg.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-700 text-lg">∞</span>
                    <span className="text-blue-700 font-semibold text-sm">All Inclusive</span>
                    {pkg.rating && (
                      <div className="ml-auto flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            i < pkg.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                          ))}
                        </div>
                        {pkg.reviews && (
                          <span className="ml-1 text-xs text-gray-500">({pkg.reviews})</span>
                        )}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-gray-900">{pkg.title}</h3>

                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-700 mb-4">
                    <div>
                      <div className="font-bold">Days</div>
                      <div>{pkg.days}</div>
                    </div>
                    <div>
                      <div className="font-bold">Destinations</div>
                      <div>{pkg.destinations}</div>
                    </div>
                    <div>
                      <div className="font-bold">Departures</div>
                      <div>{pkg.departures}</div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-xs text-gray-500">
                        EMI from <span className="font-bold text-blue-700">{pkg.emi}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Starts from <span className="font-bold text-black">{pkg.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="border border-blue-700 text-blue-700 font-bold py-2 px-3 rounded-lg text-sm hover:bg-blue-50 transition">
                        View Details
                      </button>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-lg text-sm transition">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Content Section */}
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our International Tours?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Expertly curated itineraries covering all major attractions",
                "Local guides with in-depth knowledge of each destination",
                "Comfortable accommodations in prime locations",
                "All meals included - enjoy local cuisines",
                "Small group sizes for personalized attention",
                "24/7 customer support during your tour"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 rounded-full p-1 mr-3 mt-1">
                    <IoIosArrowForward size={14} />
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all">
              View All International Tours
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs Section */}
      <section className="py-8 px-4" style={{ backgroundColor: theme.surface }}>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {['Tour', 'Activity', 'Rental', 'Hotel', 'Car'].map((type, idx) => (
              <button
                key={type}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${idx === 0 ? 'bg-blue-700 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-500'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Tours Section */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.surface }}>
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Recommended Tours for You
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative"
                onClick={() => handleTourClick(tour)}
              >
                {tour.discount && (
                  <div className="absolute z-10 top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
                    -{tour.discount}%
                  </div>
                )}

                <div className="absolute z-10 top-4 right-4">
                  <button
                    className="rounded-full p-2 bg-white/80 hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(tour.id);
                    }}
                  >
                    {wishlist.includes(tour.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="relative h-56">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-500">{tour.location}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 leading-tight text-gray-800">
                    {tour.title}
                  </h3>

                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(tour.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {tour.rating}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({tour.reviews} Reviews)
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-500">{tour.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {tour.originalPrice && (
                        <span className="text-sm line-through mr-2 text-gray-500">
                          €{tour.originalPrice}.00
                        </span>
                      )}
                      <span className="text-sm mr-1 text-gray-500">From</span>
                      <span className="text-xl font-bold text-blue-600">
                        €{tour.discountPrice || tour.price}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
              Load more
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2" style={{ color: '#222' }}>
              Stories, tips, and guides
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-1 bg-blue-800 rounded-full" style={{ marginTop: '-8px' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                <div className="mb-2">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-blue-100 text-blue-700">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.primary || '#059669' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get special offers, and more from Traveler
          </h2>
          <p className="text-lg mb-8 text-white">
            Subscribe to see secret deals prices drop the moment you sign up!
          </p>

          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
              style={{
                backgroundColor: theme.background || '#FFFFFF',
                color: theme.text
              }}
            />
            <button className="px-6 py-3 rounded-r-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;