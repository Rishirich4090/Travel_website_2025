"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { getPublicColorTheme } from '@/redux/slice/publicApiSlice';

const InternationalHolidaysPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  
      const theme = useSelector((state) => state.publicApi.colorTheme) || {};
    
      useEffect(() => {
        dispatch(getPublicColorTheme());
      }, [dispatch]);
  // Theme and settings handled in Footer
  const [searchData, setSearchData] = useState({
    destination: '',
    departure: '',
    return: '',
    travelers: '2 travelers'
  });

  // useEffect for theme/settings removed, handled in Footer

  // International destinations
  const popularDestinations = [
    {
      id: 1,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 45,
      startingPrice: 85000
    },
    {
      id: 2,
      name: 'Thailand',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 38,
      startingPrice: 65000
    },
    {
      id: 3,
      name: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 28,
      startingPrice: 75000
    },
    {
      id: 4,
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 22,
      startingPrice: 125000
    },
    {
      id: 5,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 35,
      startingPrice: 55000
    },
    {
      id: 6,
      name: 'Turkey',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      packages: 26,
      startingPrice: 95000
    }
  ];

  // Featured international packages
  const featuredPackages = [
    {
      id: 1,
      title: 'Dubai Deluxe - City & Desert Experience',
      destination: 'Dubai, UAE',
      duration: '6 days / 5 nights',
      originalPrice: 95000,
      discountPrice: 85500,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'Desert Safari', 'City Tour'],
      discount: 10,
      trending: true
    },
    {
      id: 2,
      title: 'Thailand Paradise - Bangkok & Phuket',
      destination: 'Bangkok, Phuket',
      duration: '7 days / 6 nights',
      originalPrice: 75000,
      discountPrice: 67500,
      rating: 4.9,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'Island Tours', 'Cultural Tours'],
      discount: 10
    },
    {
      id: 3,
      title: 'Singapore Highlights with Universal Studios',
      destination: 'Singapore',
      duration: '5 days / 4 nights',
      originalPrice: 85000,
      discountPrice: 76500,
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Universal Studios', 'City Tour', 'Gardens by Bay'],
      discount: 10
    },
    {
      id: 4,
      title: 'Maldives Luxury Resort Experience',
      destination: 'Maldives',
      duration: '5 days / 4 nights',
      originalPrice: 150000,
      discountPrice: 135000,
      rating: 4.9,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1540202404-1b927e27fa8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Seaplane', 'Water Villa', 'All Meals', 'Water Sports', 'Spa'],
      discount: 10,
      luxury: true
    },
    {
      id: 5,
      title: 'Bali Cultural & Beach Getaway',
      destination: 'Bali, Indonesia',
      duration: '6 days / 5 nights',
      originalPrice: 65000,
      discountPrice: 58500,
      rating: 4.6,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'Temple Tours', 'Beach Activities'],
      discount: 10
    },
    {
      id: 6,
      title: 'Turkey Heritage - Istanbul & Cappadocia',
      destination: 'Istanbul, Cappadocia',
      duration: '8 days / 7 nights',
      originalPrice: 110000,
      discountPrice: 99000,
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'Hot Air Balloon', 'Heritage Tours'],
      discount: 10
    },
    {
      id: 7,
      title: 'European Explorer - 4 Countries',
      destination: 'Europe',
      duration: '12 days / 11 nights',
      originalPrice: 195000,
      discountPrice: 175500,
      rating: 4.7,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'Euro Rail', 'City Tours'],
      discount: 10,
      trending: true
    },
    {
      id: 8,
      title: 'Japan Sakura Season Special',
      destination: 'Tokyo, Kyoto, Osaka',
      duration: '9 days / 8 nights',
      originalPrice: 165000,
      discountPrice: 148500,
      rating: 4.9,
      reviews: 123,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: ['Flights', 'Hotels', 'Visa', 'JR Pass', 'Cultural Tours'],
      discount: 10,
      seasonal: true
    }
  ];

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  const handlePackageClick = (pkg) => {
    router.push(`/international-holidays/${pkg.id}`);
  };

  const handleDestinationClick = (destination) => {
    router.push(`/destination/${destination.id}`);
  };


  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.backgroundColor || theme.background }}>
      {/* Hero Section with overlapping SearchBar */}
      <section className="relative h-[60vh] flex items-center justify-center p-0 m-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="International Holidays"
          fill
          className="object-cover"
          priority
          unoptimized
        />
       
        {/* Overlapping SearchBar */}
        <div className="absolute left-1/2 bottom-[-48px] transform -translate-x-1/2 w-full max-w-4xl z-20">
          <SearchBar searchData={searchData} setSearchData={setSearchData} handleSearch={handleSearch} />
        </div>
      </section>


      {/* Popular Destinations */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
            Popular International Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group cursor-pointer"
                onClick={() => handleDestinationClick(destination)}
              >
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0  bg-opacity-20 group-hover:bg-opacity-30 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{destination.name}</h3>
                    <p className="text-sm">{destination.packages} packages available</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded">
                    <span className="text-sm font-semibold" style={{ color: theme.primary }}>
                      From ₹{destination.startingPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.surface }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
            Featured International Packages
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer relative"
                style={{ backgroundColor: theme.background }}
                onClick={() => handlePackageClick(pkg)}
              >
                {/* Special tags */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {pkg.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                      -{pkg.discount}%
                    </span>
                  )}
                  {pkg.trending && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm">
                      Trending
                    </span>
                  )}
                  {pkg.luxury && (
                    <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">
                      Luxury
                    </span>
                  )}
                  {pkg.seasonal && (
                    <span className="bg-pink-500 text-white px-2 py-1 rounded text-sm">
                      Seasonal
                    </span>
                  )}
                </div>
                
                <div className="relative h-48">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    unoptimized
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: theme.primary }}>
                      {pkg.destination}
                    </span>
                    <span className="text-xs" style={{ color: theme.textSecondary }}>
                      {pkg.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2" style={{ color: theme.text }}>
                    {pkg.title}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(Math.floor(pkg.rating))].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm" style={{ color: theme.textSecondary }}>
                      {pkg.rating} ({pkg.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: theme.surface,
                          color: theme.textSecondary
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                    {pkg.features.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: theme.surface,
                          color: theme.textSecondary
                        }}
                      >
                        +{pkg.features.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {pkg.originalPrice && (
                        <span className="text-sm line-through mr-2" style={{ color: theme.textSecondary }}>
                          ₹{pkg.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg font-bold" style={{ color: theme.primary }}>
                        ₹{pkg.discountPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: theme.textSecondary }}>
                      per person
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: theme.text }}>
            Why Choose Our International Packages?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                Visa Assistance
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Complete visa support and documentation assistance
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                24/7 Support
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Round-the-clock assistance during your travels
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                Best Prices
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Guaranteed best prices with exclusive deals
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                Customizable
              </h3>
              <p style={{ color: theme.textSecondary }}>
                Tailor-made packages to suit your preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4" style={{ backgroundColor: theme.primary || '#059669' }}>
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.background }}>
            Get the Latest International Travel Deals
          </h2>
          <p className="text-lg mb-8" style={{ color: theme.background }}>
            Subscribe to receive exclusive offers on international holiday packages
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
            <button
              className="px-6 py-3 rounded-r-lg font-semibold transition-colors"
              style={{
                backgroundColor: theme.secondary || '#10B981',
                color: theme.background
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
  {/* Centralized Footer */}
  <Footer  />
    </div>
  );
};

export default InternationalHolidaysPage;
