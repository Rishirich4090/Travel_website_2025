"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "../../../components/Footer";
import {
  getPackageDetails,
  selectPackageDetails,
  selectPackageDetailsLoading,
  selectPackageDetailsError
} from "../../../redux/slice/publicApiSlice";
import { FaCalendarAlt, FaMapMarkerAlt, FaBed, FaPlane, FaBus, FaTrain, FaShip, FaUtensils, FaInfoCircle, FaTimesCircle, FaCheckCircle, FaStar, FaPhoneAlt, FaRupeeSign, FaChevronRight } from "react-icons/fa";
// Dummy travel tips data for bottom cards
const travelTips = [
  {
    img: "/images/food.jpg",
    title: "10 Must Visit Restaurants In Munnar Town For Foodies"
  },
  {
    img: "/images/scenic.jpg",
    title: "Top 10 Scenic Places to Visit Near Kochi for a Dream..."
  },
  {
    img: "/images/bird.jpg",
    title: "8 Best Places in Nelliyampathy which are a Sight to Behold"
  },
  {
    img: "/images/beach.jpg",
    title: "9 Captivating Places to Visit in Kovalam"
  },
  {
    img: "/images/things.jpg",
    title: "Here are 10 Exciting Things To Do in Kochi"
  }
];

const PackageDetailsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { packageId } = params;
  const details = useSelector(selectPackageDetails);
  const loading = useSelector(selectPackageDetailsLoading);
  const error = useSelector(selectPackageDetailsError);

  useEffect(() => {
    if (packageId) {
      dispatch(getPackageDetails(packageId));
    }
  }, [dispatch, packageId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
        <p className="text-gray-600">Loading package details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-red-700 mb-2">Failed to load package details</h2>
        <p className="text-gray-600">Please try again later or contact support if the problem persists.</p>
      </div>
    </div>
  );

  if (!details) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 max-w-md mx-auto">
        <div className="text-gray-400 text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">No details found</h2>
        <p className="text-gray-500">The package you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
      </div>
    </div>
  );

  const pkg = details.tourPackage || {};
  
  const getTransportIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'flight': return <FaPlane className="inline mr-2" />;
      case 'bus': return <FaBus className="inline mr-2" />;
      case 'train': return <FaTrain className="inline mr-2" />;
      case 'cruise': return <FaShip className="inline mr-2" />;
      default: return <FaPlane className="inline mr-2" />;
    }
  };

  return (
  <div className="min-h-screen bg-[#fafbfc] pt-[72px] mt-8" >
      {/* Hero Section */}
      <section className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-8 py-6">
          {/* Left: Main Image and Details */}
          <div className="flex-1 min-w-0">
            <div className="relative w-full h-[260px] md:h-[340px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={pkg.image || "/images/placeholder.svg"}
                alt={pkg.packageName}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <span className="absolute top-4 left-4 bg-[#e74c3c] text-xs font-bold px-4 py-1 rounded-full text-white shadow">Newly Launched</span>
            </div>
            <div className="flex gap-2 mt-4 mb-2">
              <span className="bg-[#ff7f2a] text-xs font-bold px-3 py-1 rounded-full text-white shadow">GROUP TOUR</span>
              <span className="bg-[#ffe066] text-xs font-bold px-3 py-1 rounded-full text-black shadow">KLIM</span>
            </div>
            <h1 className="text-[2rem] leading-tight font-extrabold text-[#22223b] mb-1">{pkg.packageName}</h1>
            <div className="flex flex-wrap gap-6 items-center text-[#4a4e69] text-[15px] mb-2">
              <span className="flex items-center gap-2"><FaCalendarAlt /> {pkg.numberOfDays} Days</span>
              <span className="flex items-center gap-2"><FaMapMarkerAlt /> 2 Cities</span>
            </div>
            <div className="flex items-center gap-3 text-[#6c757d] text-[15px] mb-2">
              <span>India Cochin (1N)</span>
              <span className="text-lg">&#8594;</span>
              <span>Munnar (2N)</span>
            </div>
            <a href="#itinerary" className="text-[#1d4ed8] underline text-[15px] font-semibold hover:text-[#0a2540]">View daywise tour itinerary</a>
          </div>
          {/* Right: Sidebar with Call Back and Price Summary */}
          <div className="w-full lg:w-[370px] flex flex-col gap-6">
            {/* Call Back Form */}
            <div className="bg-[#f0f6ff] rounded-2xl shadow p-6 mb-1">
              <div className="font-semibold text-[#22223b] mb-3">Want us to call you?</div>
              <input type="text" placeholder="Full Name*" className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#ffe066]" />
              <div className="flex gap-3 mb-3">
                <select className="border border-gray-300 rounded-lg px-3 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#ffe066]">
                  <option value="IN">🇮🇳 +91</option>
                </select>
                <input type="text" placeholder="Phone Number" className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#ffe066]" />
              </div>
              <button className="w-full bg-[#ffe066] hover:bg-[#ffd700] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-3 transition">
                <FaPhoneAlt /> Request Call Back
              </button>
            </div>
            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex flex-col gap-3 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#22223b] text-[15px]">Mumbai to Mumbai<br /><span className="font-bold text-2xl text-black">₹26,000</span></span>
                  <span className="text-[#4a4e69] text-xs max-w-[160px] text-right">All-inclusive tour from Mumbai to Mumbai</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#22223b] text-[15px]">Joining/Leaving<br /><span className="font-bold text-2xl text-black">₹18,000</span></span>
                  <span className="text-[#4a4e69] text-xs max-w-[160px] text-right">Book your own flights & join the tour at the first destination.</span>
                </div>
              </div>
              <div className="bg-[#1d3557] text-white text-xs text-center py-2 rounded-lg mb-3">Mentioned prices are on a twin-sharing basis.</div>
              <button className="w-full bg-[#ffe066] hover:bg-[#ffd700] text-black font-bold py-3 rounded-lg transition mb-3">Dates & Prices</button>
              <div className="text-xs text-[#4a4e69] text-center mb-2">EMI start at <span className="font-bold">₹877/mo</span></div>
              <a href="#" className="text-[#1d4ed8] underline text-xs text-center block">View Pricing Table</a>
            </div>
          </div>
        </div>
      </section>

      {/* Departure City, Dates & Booking Summary Section */}
      <section className="w-full bg-[#fafbfc] border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col lg:flex-row gap-8 py-8">
          {/* Left: Departure City, Dates, Guests */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow p-6 mb-4">
              <div className="text-lg font-semibold mb-2">Select departure city, dates & add guest to book your tour</div>
              <div className="text-xs text-[#6c757d] mb-4">As seats fill, prices increase! So book today!</div>
              <div className="border rounded-xl overflow-hidden">
                <div className="border-b px-4 py-3 font-semibold bg-[#f8fafc]">1. SELECT DEPARTURE CITY & DATE</div>
                <div className="p-4">
                  <div className="flex gap-3 mb-4">
                    <button className="px-4 py-1 rounded-full border border-[#1d4ed8] bg-[#1d4ed8] text-white text-sm font-semibold flex items-center gap-2 focus:outline-none">All departures</button>
                    <button className="px-4 py-1 rounded-full border border-gray-300 text-[#22223b] text-sm font-semibold flex items-center gap-2 focus:outline-none">Mumbai</button>
                    <button className="px-4 py-1 rounded-full border border-gray-300 text-[#22223b] text-sm font-semibold flex items-center gap-2 focus:outline-none">Joining / Leaving</button>
                  </div>
                  <div className="text-[#1db954] text-xs font-semibold mb-2">All inclusive tours, lock in at this great price today.</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Example date cards, static for now */}
                    <div className="flex flex-col items-center bg-[#f8fafc] rounded-lg border p-2 relative">
                      <div className="text-xs text-[#6c757d]">Sep<br />2025</div>
                      <div className="bg-[#1db954] text-white text-xs px-2 py-1 rounded mb-1 mt-1">THU</div>
                      <div className="font-bold text-[#1db954] text-lg">11</div>
                      <div className="font-semibold text-black text-sm">₹26,000</div>
                      <div className="text-[#1db954] text-xs mt-1">Lowest Price</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#f8fafc] rounded-lg border p-2 relative">
                      <div className="text-xs text-[#6c757d]">Oct<br />2025</div>
                      <div className="bg-gray-200 text-[#6c757d] text-xs px-2 py-1 rounded mb-1 mt-1">THU</div>
                      <div className="font-bold text-[#6c757d] text-lg">09</div>
                      <div className="font-semibold text-black text-sm">₹29,000</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#f8fafc] rounded-lg border p-2 relative">
                      <div className="text-xs text-[#6c757d]">Dec<br />2025</div>
                      <div className="bg-gray-200 text-[#6c757d] text-xs px-2 py-1 rounded mb-1 mt-1">THU</div>
                      <div className="font-bold text-[#6c757d] text-lg">11</div>
                      <div className="font-semibold text-black text-sm">₹32,000</div>
                    </div>
                    <div className="flex flex-col items-center bg-[#f8fafc] rounded-lg border p-2 relative">
                      <div className="text-xs text-[#6c757d]">Feb<br />2026</div>
                      <div className="bg-gray-200 text-[#6c757d] text-xs px-2 py-1 rounded mb-1 mt-1">THU</div>
                      <div className="font-bold text-[#6c757d] text-lg">19</div>
                      <div className="font-semibold text-black text-sm">₹31,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Booking Summary */}
          <div className="w-full lg:w-[350px]">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-bold text-[#22223b] mb-4 border-b pb-2">BOOKING SUMMARY</div>
              <div className="mb-2 text-sm text-[#6c757d]">Dept. city <span className="font-semibold text-[#22223b]">Mumbai</span></div>
              <div className="mb-2 text-sm text-[#6c757d]">Dept. date <span className="font-semibold text-[#22223b]">11 Sep 2025 → 14 Sep 2025</span></div>
              <div className="mb-2 text-sm text-[#6c757d]">Travellers <span className="font-semibold text-[#22223b]">0 Adult(s) | 0 Child | 0 Infant</span></div>
              <div className="mb-2 text-sm text-[#6c757d]">Rooms <span className="font-semibold text-[#22223b]">0 Room</span></div>
              <div className="flex items-center justify-between mt-4 mb-2">
                <span className="text-lg font-bold text-[#1db954] flex items-center"><FaRupeeSign className="mr-1" />26,000</span>
              </div>
              <div className="text-xs text-[#6c757d] mb-2">per person on twin sharing</div>
              <div className="text-sm text-[#1d4ed8] mb-2">EMI Available <span className="font-semibold">₹877/month</span></div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-white border border-[#6c757d] text-[#22223b] font-bold py-2 rounded transition">Enquire Now</button>
                <button className="flex-1 bg-[#ffe066] hover:bg-[#ffd700] text-black font-bold py-2 rounded transition">Book Online</button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#6c757d]">
                <FaPhoneAlt className="text-[#1d4ed8]" /> 1800 22 7979
                <a href="#" className="ml-2 text-[#1d4ed8] underline">Locate nearest Veena World</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
  <main className="max-w-[1200px] mx-auto px-4 py-10">
    {/* Tabs Navigation */}
    <div className="flex flex-wrap border-b border-gray-200 mb-8">
      {['Itinerary', 'Tour Details', 'Tour Information', 'Need to Know', 'Policy & Terms', 'Upgrades'].map((tab, idx) => (
        <button
          key={tab}
          className={`px-6 py-3 text-[16px] font-medium focus:outline-none transition border-b-2 ${idx === 0 ? 'border-[#2346a0] text-[#2346a0] bg-white' : 'border-transparent text-[#22223b] bg-[#f6f8fc]'} rounded-t-[8px]`}
          style={{ minWidth: 120 }}
        >
          {tab}
        </button>
      ))}
    </div>
    {/* Main Content Grid */}
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left: Timeline & Details */}
      <div className="flex-1 min-w-0">
        {/* Itinerary Timeline */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Timeline */}
            <div className="flex flex-col items-center md:items-start w-full md:w-[320px]">
              <h2 className="text-[1.5rem] font-bold text-[#22223b] mb-2">Itinerary <span className="text-xs text-[#6c757d]">(Day Wise)</span></h2>
              <a href="#" className="text-[#2346a0] text-sm font-medium mb-4 self-end md:self-start">View all days</a>
              <div className="relative flex flex-col gap-0.5">
                {details.dayWiseItenaries && details.dayWiseItenaries.map((day, idx) => (
                  <div key={day.id} className="flex items-start gap-3 mb-2">
                    <div className="flex flex-col items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${idx === 0 ? 'border-[#2346a0] bg-[#2346a0] text-white' : 'border-[#d1d5db] bg-white text-[#bdbdbd]'}`}>{idx === 0 ? <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="8" fill="#2346a0" /><path d="M6.5 8.5l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : <svg width="16" height="16" fill="none"><circle cx="8" cy="8" r="8" fill="#f3f4f6" /><circle cx="8" cy="8" r="7" stroke="#d1d5db" strokeWidth="2"/></svg>}</span>
                      {idx < details.dayWiseItenaries.length - 1 && <span className="w-px h-8 bg-[#d1d5db] mx-auto"></span>}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-xs ${idx === 0 ? 'text-[#2346a0]' : 'text-[#6c757d]'}`}>Day {day.dayNumber} / {day.date}</span>
                      <span className={`font-medium ${idx === 0 ? 'text-[#2346a0]' : 'text-[#22223b]'} text-[15px]`}>{day.titleName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map & Actions */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex justify-end mb-2">
                <button className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-lg px-4 py-2 shadow-sm text-[#2346a0] font-medium"><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#f6f8fc"/><path d="M10 4v12M4 10h12" stroke="#2346a0" strokeWidth="2"/></svg> Map View</button>
              </div>
              <div className="flex gap-6 flex-wrap justify-end">
                <button className="flex flex-col items-center text-xs text-[#2346a0] font-medium"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#e6f4ea"/><path d="M8 12l2 2 4-4" stroke="#1db954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Send Itinerary</button>
                <button className="flex flex-col items-center text-xs text-[#2346a0] font-medium"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#e6f4ea"/><rect x="8" y="8" width="8" height="8" rx="2" fill="#2346a0"/></svg>Print Itinerary</button>
                <button className="flex flex-col items-center text-xs text-[#2346a0] font-medium"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#e6f4ea"/><path d="M8 12h8" stroke="#2346a0" strokeWidth="2"/></svg>Email Itinerary</button>
                <button className="flex flex-col items-center text-xs text-[#2346a0] font-medium"><svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="12" fill="#e6f4ea"/><path d="M12 8v8M8 12h8" stroke="#2346a0" strokeWidth="2"/></svg>Compare Tour</button>
              </div>
            </div>
          </div>
        </div>
        {/* Tour Details Tabs */}
        <div className="bg-white rounded-xl shadow p-8 mt-8">
          <h3 className="text-xl font-bold text-[#22223b] mb-2">Tour details</h3>
          <p className="text-sm italic text-[#6c757d] mb-6">Best facilities with no added cost.</p>
          {/* Tabs for Flight, Accommodation, Reporting & Dropping */}
          <div className="flex border-b border-[#e5e7eb] mb-4">
            {['Flight Details', 'Accommodation Details', 'Reporting & Dropping'].map((tab, idx) => (
              <button key={tab} className={`px-6 py-3 text-[15px] font-medium focus:outline-none transition border-b-2 ${idx === 1 ? 'border-[#2346a0] text-[#2346a0] bg-white' : 'border-transparent text-[#22223b] bg-[#f6f8fc]'} rounded-t-[8px]`} style={{ minWidth: 180 }}>{tab}</button>
            ))}
          </div>
          {/* Table Example: Accommodation Details */}
          <div className="overflow-x-auto rounded-b-xl border border-t-0">
            <table className="min-w-full text-[15px]">
              <thead className="bg-[#f6f8fc]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[#22223b] text-left">City - Country</th>
                  <th className="px-4 py-3 font-semibold text-[#22223b] text-left">Hotel</th>
                  <th className="px-4 py-3 font-semibold text-[#22223b] text-left">Check In - Check Out</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">Munnar - India</td>
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">Elysium Gardens Hill Resorts/ Eastend Munnar/ TBA /or similar</td>
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">11 Sep - 13 Sep</td>
                </tr>
                <tr className="bg-[#f6f8fc]">
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">Cochin - India</td>
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">Starlit Suites/ Keys Select Hotel, Kochi Kerala/ TBA - Cochin /or similar</td>
                  <td className="px-4 py-3 border-t border-[#e5e7eb]">13 Sep - 14 Sep</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xs text-[#6c757d] mt-2"><span className="font-semibold">Note:</span> Flight details are tentative only. The airline, departure, arrival times and routing may change.<br />Hotel details are tentative only. The hotel or place of accommodation may change.</div>
        </div>
      </div>
      {/* Right: (empty or future content) */}
      <div className="w-full lg:w-[350px]">{/* Reserved for future sidebar or sticky content */}</div>
    </div>
  </main>
  {/* Move all the content after </main> inside the main JSX tree */}
  {/* Transport Plan */}
  {details.tourTransportPlan && (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#22223b] mb-6 border-b pb-2">Transport Plan</h2>
        {details.tourTransportPlan.remarks && (
          <div className="bg-[#f0f6ff] text-[#1d4ed8] p-4 rounded-lg mb-6">
            <p className="font-medium">{details.tourTransportPlan.remarks}</p>
          </div>
        )}
        {Array.isArray(details.tourTransportPlan.transports) && details.tourTransportPlan.transports.length > 0 && (
          <div className="space-y-4">
            {details.tourTransportPlan.transports.map((t) => (
              <div key={t.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  {getTransportIcon(t.type)}
                  <h3 className="text-lg font-semibold text-[#22223b]">{t.type}: {t.name} ({t.number})</h3>
                </div>
                {t.segment && (
                  <div className="ml-8">
                    <div className="flex items-center text-sm text-[#4a4e69] mb-1">
                      <span className="font-medium">Departure:</span> 
                      <span className="ml-2">{t.segment.departureCity} at {t.segment.departureTime?.hour}:{t.segment.departureTime?.minute}</span>
                    </div>
                    <div className="flex items-center text-sm text-[#4a4e69] mb-1">
                      <span className="font-medium">Arrival:</span> 
                      <span className="ml-2">{t.segment.arrivalCity} at {t.segment.arrivalTime?.hour}:{t.segment.arrivalTime?.minute}</span>
                    </div>
                    {t.segment.totalTravelTime && (
                      <div className="text-xs text-[#6c757d] mt-1">
                        Total Travel: {t.segment.totalTravelTime}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )}
  {/* Need to Know & Advance Preparation */}
  {(details.needToKnow || details.advancePreparation) && (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#22223b] mb-6 border-b pb-2">Important Information</h2>
        <div className="space-y-6">
          {details.needToKnow && (
            <div className="bg-[#fffbe6] border-l-4 border-[#ffe066] p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-[#ffe066]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-[#b59f3b]">Need to Know</h3>
                  <div className="mt-2 text-sm text-[#b59f3b]">
                    <p>{details.needToKnow}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {details.advancePreparation && (
            <div className="bg-[#f0f6ff] border-l-4 border-[#1d4ed8] p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaCheckCircle className="h-5 w-5 text-[#1d4ed8]" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-[#1d4ed8]">Advance Preparation</h3>
                  <div className="mt-2 text-sm text-[#1d4ed8]">
                    <p>{details.advancePreparation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
  {/* Cancellation Policies */}
  {Array.isArray(details.cancellationPolicies) && details.cancellationPolicies.length > 0 && (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#22223b] mb-6 border-b pb-2">Cancellation Policies</h2>
        <div className="space-y-4">
          {details.cancellationPolicies.map((policy) => (
            <div key={policy.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#22223b]">Period: {policy.fromDate} to {policy.toDate}</h3>
                  <div className="text-[#e74c3c] font-medium mt-1">
                    Cancellation Fee: {policy.cancellationFeePercent}%
                  </div>
                </div>
                <div className="bg-[#ffeaea] text-[#e74c3c] px-3 py-1 rounded-full text-sm">
                  Strict
                </div>
              </div>
              {policy.description && (
                <p className="text-[#4a4e69] mt-2 text-sm">{policy.description}</p>
              )}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {policy.paymentTerms && (
                  <div className="text-[#6c757d]">
                    <span className="font-medium">Payment Terms:</span> {policy.paymentTerms}
                  </div>
                )}
                {policy.remarks && (
                  <div className="text-[#6c757d]">
                    <span className="font-medium">Remarks:</span> {policy.remarks}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
 
  {/* Travel Tips Section */}
  <section className="bg-white py-10 border-t border-gray-100">
    <div className="max-w-[1200px] mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#22223b]">Travel tips, hacks, tricks and a whole lot more...</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {travelTips.map((tip, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-[#f8fafc] flex flex-col">
            <div className="h-36 w-full relative">
              <Image src={tip.img} alt={tip.title} fill className="object-cover" />
            </div>
            <div className="p-3 flex-1 flex items-center">
              <span className="text-sm font-medium text-[#22223b]">{tip.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  <Footer />
    </div>
  );
}

export default PackageDetailsPage;