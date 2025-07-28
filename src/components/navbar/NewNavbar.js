"use client";

import React, { useState, useRef, useEffect } from "react";
import Portal from "./Portal";
import { useRouter } from "next/navigation";
import { Mic, User, ChevronDown, Star, Search, Phone, Calendar, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const secondaryMenuData = [
  {
  title: "Domestic",
    path: "/domestic-holidays",
    submenus: [
      {
        title: "Top Destinations",
        items: [
          { name: "Goa", id: "goa" },
          { name: "Kerala", id: "kerala" },
          { name: "Rajasthan", id: "rajasthan" },
          { name: "Delhi", id: "delhi" },
        ],
      },
      {
        title: "Popular Cities",
        items: [
          { name: "Mumbai", id: "mumbai" },
          { name: "Bangalore", id: "bangalore" },
          { name: "Chennai", id: "chennai" },
          { name: "Hyderabad", id: "hyderabad" },
        ],
      },
    ],
  },
  {
  title: "International",
    path: "/international-holidays",
    submenus: [
      {
        title: "Europe",
        items: [
          { name: "France", id: "france" },
          { name: "Germany", id: "germany" },
          { name: "Italy", id: "italy" },
          { name: "Spain", id: "spain" },
        ],
      },
      {
        title: "America",
        items: [
          { name: "USA", id: "usa" },
          { name: "Canada", id: "canada" },
          { name: "Mexico", id: "mexico" },
        ],
      },
      {
        title: "South East Asia",
        items: [
          { name: "Thailand", id: "thailand" },
          { name: "Vietnam", id: "vietnam" },
          { name: "Malaysia", id: "malaysia" },
        ],
      },
      {
        title: "Australia New Zealand",
        items: [
          { name: "Australia", id: "australia" },
          { name: "New Zealand", id: "new-zealand" },
        ],
      },
      {
        title: "Africa",
        items: [
          { name: "South Africa", id: "south-africa" },
          { name: "Egypt", id: "egypt" },
          { name: "Kenya", id: "kenya" },
        ],
      },
    ],
  },

  {
  title: "Speciality Tours",
    path: "/international-holidays",
    submenus: [
      {
        title: "Europe",
        items: [
          { name: "France", id: "france" },
          { name: "Germany", id: "germany" },
          { name: "Italy", id: "italy" },
          { name: "Spain", id: "spain" },
        ],
      },
      {
        title: "America",
        items: [
          { name: "USA", id: "usa" },
          { name: "Canada", id: "canada" },
          { name: "Mexico", id: "mexico" },
        ],
      },
      {
        title: "South East Asia",
        items: [
          { name: "Thailand", id: "thailand" },
          { name: "Vietnam", id: "vietnam" },
          { name: "Malaysia", id: "malaysia" },
        ],
      },
      {
        title: "Australia New Zealand",
        items: [
          { name: "Australia", id: "australia" },
          { name: "New Zealand", id: "new-zealand" },
        ],
      },
      {
        title: "Africa",
        items: [
          { name: "South Africa", id: "south-africa" },
          { name: "Egypt", id: "egypt" },
          { name: "Kenya", id: "kenya" },
        ],
      },
    ],
  },

  {
  title: "Customized Holidays",
    path: "/international-holidays",
    submenus: [
      {
        title: "Europe",
        items: [
          { name: "France", id: "france" },
          { name: "Germany", id: "germany" },
          { name: "Italy", id: "italy" },
          { name: "Spain", id: "spain" },
        ],
      },
      {
        title: "America",
        items: [
          { name: "USA", id: "usa" },
          { name: "Canada", id: "canada" },
          { name: "Mexico", id: "mexico" },
        ],
      },
      {
        title: "South East Asia",
        items: [
          { name: "Thailand", id: "thailand" },
          { name: "Vietnam", id: "vietnam" },
          { name: "Malaysia", id: "malaysia" },
        ],
      },
      {
        title: "Australia New Zealand",
        items: [
          { name: "Australia", id: "australia" },
          { name: "New Zealand", id: "new-zealand" },
        ],
      },
      {
        title: "Africa",
        items: [
          { name: "South Africa", id: "south-africa" },
          { name: "Egypt", id: "egypt" },
          { name: "Kenya", id: "kenya" },
        ],
      },
    ],
  },

  {
  title: "Corporate Travel",
    path: ""
  },

  {
  title: "Inbound",
    path: "/international-holidays",
    submenus: [
      {
        title: "Europe",
        items: [
          { name: "France", id: "france" },
          { name: "Germany", id: "germany" },
          { name: "Italy", id: "italy" },
          { name: "Spain", id: "spain" },
        ],
      },
      {
        title: "America",
        items: [
          { name: "USA", id: "usa" },
          { name: "Canada", id: "canada" },
          { name: "Mexico", id: "mexico" },
        ],
      },
      {
        title: "South East Asia",
        items: [
          { name: "Thailand", id: "thailand" },
          { name: "Vietnam", id: "vietnam" },
          { name: "Malaysia", id: "malaysia" },
        ],
      },
      {
        title: "Australia New Zealand",
        items: [
          { name: "Australia", id: "australia" },
          { name: "New Zealand", id: "new-zealand" },
        ],
      },
      {
        title: "Africa",
        items: [
          { name: "South Africa", id: "south-africa" },
          { name: "Egypt", id: "egypt" },
          { name: "Kenya", id: "kenya" },
        ],
      },
    ],
  },


  {
  title: "Gift a Tour",
    path: "/"
  },

  {
  title: "Contact",
    path: "/contact"
  },
];

const NewNavbar = () => {
  const router = useRouter();
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubgroup, setHoveredSubgroup] = useState(null);
  const [popupPos, setPopupPos] = useState({ left: 0, top: 0, width: 960, direction: 'right' });
  const menuRefs = useRef({});
  const callRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePopupPosition = (menuTitle) => {
    const menuElement = menuRefs.current[menuTitle];
    if (!menuElement) return;

    const rect = menuElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const popupWidth = Math.min(960, windowWidth - 40); // Adjust width based on screen size

    let left = rect.left;
    let direction = 'right';

    // Check if the popup would overflow on the right
    if (rect.left + popupWidth > windowWidth) {
      left = windowWidth - popupWidth - 20;
      direction = 'left';
    }

    // For center-aligned menus
    if (rect.left + rect.width / 2 > windowWidth * 0.4 && rect.left + rect.width / 2 < windowWidth * 0.6) {
      left = Math.max(20, (windowWidth - popupWidth) / 2);
      direction = 'center';
    }

    setPopupPos({
      left,
      top: rect.bottom,
      width: popupWidth,
      direction
    });
  };

  const handleMenuHover = (menuTitle) => {
    if (isMobile) return;
    calculatePopupPosition(menuTitle);
    setHoveredMenu(menuTitle);
    const menu = secondaryMenuData.find(m => m.title === menuTitle);
    if (menu?.submenus) {
      setHoveredSubgroup(menu.submenus[0]?.title || null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
  {/* Main nav */}
  <nav className="bg-[#181F2C] shadow-sm border-b border-gray-900 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Logo */}
              <div
                onClick={() => router.push("/")}
                className="flex items-center cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md mr-3 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="font-bold text-white text-xl tracking-tight">
                  <span className="text-blue-400">Tour</span> &#39; Travel
                </span>
              </div>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="flex-1 max-w-xl mx-6 hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations, hotels..."
                  className="w-full border border-gray-700 bg-[#232B3A] rounded-full py-2.5 px-5 pl-12 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 shadow-sm hover:shadow-md"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                  <Search className="h-5 w-5" />
                </div>
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1.5 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Mobile Search Button - Visible only on mobile */}
              <button className="md:hidden text-gray-300 hover:text-blue-400">
                <Search className="h-6 w-6" />
              </button>

              {/* Travel Planner */}
              <button
                onClick={() => router.push("/travel-planner")}
                className="hidden md:flex items-center space-x-1 text-gray-200 hover:text-blue-400 transition-colors duration-200 group"
              >
                <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Planner</span>
              </button>

              {/* Contact Number with Enhanced Popup */}
              <div
                ref={callRef}
                className="relative group"
                onMouseEnter={() => !isMobile && setShowPopup(true)}
                onMouseLeave={() => !isMobile && setShowPopup(false)}
                onClick={() => isMobile && setShowPopup(!showPopup)}
              >
                <button className="flex items-center space-x-1.5 bg-blue-700 text-white rounded-full px-4 py-2 hover:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md">
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold text-sm hidden sm:inline">1800 22 7979</span>
                </button>

                {/* Enhanced Contact Popup */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute ${isMobile ? 'right-0 mt-2 w-80' : 'right-0 mt-2 w-80 sm:w-96'} bg-white rounded-xl shadow-xl overflow-hidden z-50`}
                    >
                      {/* Popup Header */}
                      <div className="bg-blue-700 px-6 py-4">
                        <h3 className="text-lg font-bold text-white">Contact Our Travel Experts</h3>
                        <p className="text-blue-100 text-sm">We&#39;re available 10AM - 7PM</p>
                      </div>

                      {/* Popup Content */}
                      <div className="p-6 space-y-4">
                        {/* Toll Free Numbers */}
                        <div>
                          <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Toll Free Numbers</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <Phone className="h-4 w-4 text-blue-800" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">1800 22 7979</p>
                                <p className="font-bold text-gray-900">1800 313 5555</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Standard Numbers */}
                        <div>
                          <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Direct Numbers</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <Phone className="h-4 w-4 text-blue-800" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">+91 22 2101 7979</p>
                                <p className="font-bold text-gray-900">+91 22 2101 6969</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* International Numbers */}
                        <div>
                          <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">International Clients</h4>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 rounded-full p-2 mr-3">
                                <Phone className="h-4 w-4 text-blue-800" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Within India: +91 915 200 4511</p>
                                <p className="font-bold text-gray-900">Outside India: +91 887 997 2221</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Email */}
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-full p-2 mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <a href="mailto:travel@tourworld.com" className="font-semibold text-blue-600 hover:underline">travel@tourworld.com</a>
                          </div>
                        </div>
                      </div>

                      {/* Popup Footer */}
                      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
                        <button 
                          onClick={() => setShowPopup(false)}
                          className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Close
                        </button>
                        <button className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center">
                          Request callback
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => router.push("/login")}
                className="flex items-center space-x-1.5 text-gray-200 hover:text-blue-400 transition-colors duration-200 group"
              >
                <div className="relative">
                  <LogIn className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 rounded-full border-2 border-white"></span>
                </div>
                <span className="hidden md:inline font-medium">Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-white shadow-lg z-40 overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-gray-200">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations, hotels..."
                    className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
              
              <div className="space-y-2">
                {secondaryMenuData.map((menu) => (
                  <div key={menu.title} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => {
                        if (!menu.submenus) {
                          router.push(menu.path);
                          setShowMobileMenu(false);
                        } else {
                          setHoveredMenu(hoveredMenu === menu.title ? null : menu.title);
                        }
                      }}
                      className="flex items-center justify-between w-full py-3 text-left font-medium text-gray-800 hover:text-blue-600"
                    >
                      {menu.title}
                      {menu.submenus && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${hoveredMenu === menu.title ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    
                    {menu.submenus && hoveredMenu === menu.title && (
                      <div className="pl-4 pb-2 space-y-3">
                        {menu.submenus.map((group) => (
                          <div key={group.title}>
                            <h4 className="font-semibold text-sm text-gray-700 mb-1">{group.title}</h4>
                            <ul className="space-y-1">
                              {group.items.map((item) => (
                                <li key={item.id}>
                                  <button
                                    onClick={() => {
                                      router.push(`${menu.path}/${item.id}`);
                                      setShowMobileMenu(false);
                                    }}
                                    className="text-sm text-gray-600 hover:text-blue-600 w-full text-left py-1"
                                  >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      <nav className="bg-black text-white fixed top-16 left-0 right-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex overflow-x-auto flex-center justify-center scrollbar-hide h-12 items-center">
            {secondaryMenuData.map((menu) => {
              const hasSubmenus = !!menu.submenus;
              const isOpen = hoveredMenu === menu.title && hasSubmenus && !isMobile;
              return (
                <div
                  key={menu.title}
                  className={`relative group ${isOpen ? "bg-white text-blue-900 rounded-t-md" : ""}`}
                  ref={(el) => (menuRefs.current[menu.title] = el)}
                  onMouseEnter={() => !isMobile && handleMenuHover(menu.title)}
                  onMouseLeave={() => !isMobile && setHoveredMenu(null)}
                >
                  <button
                    className={`flex items-center gap-1 font-medium px-3 py-2 whitespace-nowrap ${isOpen ? "font-semibold" : "hover:bg-gray-800"}`}
                    onClick={() => {
                      if (isMobile || !hasSubmenus) {
                        const targetPath = menu.path ? menu.path : `/${menu.title.toLowerCase().replace(/\s+/g, "-")}`;
                        router.push(targetPath);
                      } else {
                        handleMenuHover(menu.title);
                      }
                    }}
                    type="button"
                  >
                    {menu.title}
                    {hasSubmenus && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                      />
                    )}
                  </button>

                  {hasSubmenus && (
                    <AnimatePresence>
                      {isOpen && (
                        <Portal>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: "fixed",
                              left: popupPos.left,
                              top: popupPos.top,
                              width: popupPos.width,
                              zIndex: 2000,
                            }}
                            className="bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 flex flex-col"
                            onMouseLeave={() => setHoveredMenu(null)}
                          >
                            {/* Top Recommended Destinations - full width */}
                            <div className="w-full border-b border-gray-200 p-4 bg-gray-50">
                              <h4 className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
                                <Star size={16} className="text-blue-600" />
                                Top Recommended Destinations
                              </h4>
                              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700">
                                {["Kerala", "Rajasthan", "Andaman", "North East", "Sikkim"].map(
                                  (place) => (
                                    <button
                                      key={place}
                                      onClick={() => {
                                        router.push(`/${place.toLowerCase().replace(/\s+/g, "-")}`);
                                        setHoveredMenu(null);
                                      }}
                                      className="hover:text-blue-600 transition-colors"
                                    >
                                      {place}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row">
                              {/* Left Subgroup */}
                              <div className="w-full md:w-1/3 bg-gray-50 md:border-r border-gray-200 max-h-[400px] overflow-y-auto p-4">
                                {menu.submenus.map((group) => (
                                  <div
                                    key={group.title}
                                    className={`py-2 cursor-pointer transition-colors duration-150 hover:bg-blue-50 px-3 rounded ${hoveredSubgroup === group.title
                                        ? "bg-blue-50 font-semibold text-blue-700 border-l-2 border-blue-600"
                                        : ""
                                      }`}
                                    onMouseEnter={() => setHoveredSubgroup(group.title)}
                                    onClick={() => {
                                      if (isMobile) {
                                        setHoveredSubgroup(hoveredSubgroup === group.title ? null : group.title);
                                      }
                                    }}
                                  >
                                    <div className="flex justify-between items-center">
                                      {group.title}
                                      {isMobile && (
                                        <ChevronDown
                                          size={16}
                                          className={`transition-transform ${hoveredSubgroup === group.title ? 'rotate-180' : ''}`}
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Right Group Items */}
                              <div className="w-full md:w-2/3 p-4 max-h-[400px] overflow-y-auto">
                                {menu.submenus.map((group) => (
                                  <div
                                    key={group.title}
                                    className={`${hoveredSubgroup === group.title ? "block" : isMobile ? "hidden" : "hidden"}`}
                                  >
                                    <h4 className="font-semibold mb-3 border-b border-gray-200 pb-2 text-blue-800">
                                      {group.title}
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                      {group.items.map((item) => (
                                        <li
                                          key={item.id}
                                          className="py-1"
                                        >
                                          <button
                                            onClick={() => {
                                              router.push(`${menu.path}/${item.id}`);
                                              setHoveredMenu(null);
                                            }}
                                            className="w-full text-left hover:text-blue-600 transition-colors"
                                          >
                                            {item.name}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </Portal>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

     

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default NewNavbar;