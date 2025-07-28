'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCircle, LogOut, ChevronDown, Menu, LayoutDashboard,
  Database, BarChart2, FileText, Calendar, Mail,
  Settings, HelpCircle, Lock, Globe
} from 'lucide-react';

const PremiumSidebar = ({
  menuItems = [],
  userInfo = null,
  onLogout = null,
  accentColor = 'indigo',
}) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const sidebarRef = useRef(null);

  const { userRole, isDummyUser } = useSelector((state) => state.auth);

  let defaultMenuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'PG Manage', href: '/pg-manage', icon: <Database className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'Merchant Manage', href: '/merchant-manage', icon: <Users className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'Payment Links', href: '/payment-links', icon: <LinkIcon className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'Transaction Manage', href: '/transaction-manage', icon: <BarChart2 className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'Wallet Manage', href: '/wallet-manage', icon: <WalletIcon className="w-5 h-5" />, badge: null, section: 'Management' },
    { label: 'Transaction Reports', href: '/transaction-reports', icon: <FileText className="w-5 h-5" />, badge: null, section: 'Reports' },
    { label: 'Settlement Reports', href: '/settlement-reports', icon: <FileText className="w-5 h-5" />, badge: null, section: 'Reports' },
    { label: 'Wallet Transaction Reports', href: '/wallet-transaction-reports', icon: <FileText className="w-5 h-5" />, badge: null, section: 'Reports' },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" />, badge: null, section: 'Settings' }
  ];

  // Add admin settings if applicable
  if (userRole === 'ADMIN' && isDummyUser !== true) {
    defaultMenuItems.push({ label: 'Admin Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" />, badge: null, section: 'Settings' });
  }

  // Group menu items by section
  const itemsToUse = menuItems.length > 0 ? menuItems : defaultMenuItems;
  const sections = Array.from(new Set(itemsToUse.map(item => item.section)));

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!sidebarRef.current?.contains(e.target) && !e.target.closest('[data-sidebar-toggle]')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isDesktop) setMobileOpen(false);
  }, [pathname, isDesktop]);

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  // Custom icons for Payment Links and Wallet Manage
  function LinkIcon(props) {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 000-7.07 5 5 0 00-7.07 0l-1.41 1.41" />
        <path d="M14 11a5 5 0 01-7.07 0l-1.41-1.41a5 5 0 010-7.07 5 5 0 017.07 0l1.41 1.41" />
      </svg>
    );
  }
  function WalletIcon(props) {
    return (
      <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M2 11h20" />
      </svg>
    );
  }

  // Top Navbar
  const TopNavbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#181F2C] flex items-center justify-between px-6 border-b border-[#232B3E]">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-bold select-none">
          <span className="text-[#7B61FF]">Tour &</span>
          <span className="text-white">Travel</span>
        </span>
        <span className="ml-8 text-lg font-semibold select-none">
          {/* <span className="text-white">Admin</span>
          <span className="text-[#7B61FF]">Portal</span> */}
        </span>
      </div>
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <input
          type="text"
          placeholder="Search dashboard..."
          className="w-full px-4 py-2 rounded-lg bg-[#232B3E] text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>
      {/* Mobile menu button */}
      <button
        data-sidebar-toggle
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden ml-4 p-2 rounded-md hover:bg-[#232B3E] text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );

  return (
    <>
      <TopNavbar />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{
          x: isDesktop || mobileOpen ? 0 : '-100%',
          boxShadow: isDesktop || mobileOpen ? '0 20px 25px -5px rgba(0,0,0,0.05)' : 'none'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:sticky top-16 left-0 bottom-0 z-50 w-64 h-[calc(100vh-4rem)] bg-[#181F2C] border-r border-[#232B3E] flex flex-col transition-all"
      >
        {/* User Info */}
        {/* {userInfo && (
          <div className="px-6 py-5 bg-[#232B3E] border-b border-[#232B3E]">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center overflow-hidden border-2 border-white shadow">
                {userInfo.avatar ? (
                  <Image src={userInfo.avatar} alt="User" width={48} height={48} className="h-full w-full object-cover" unoptimized />
                ) : (
                  <UserCircle className="w-6 h-6 text-indigo-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {userInfo.name || userInfo.email}
                </div>
                <div className="text-xs text-[#B0B8C9]">{userInfo.role}</div>
              </div>
            </div>
          </div>
        )} */}

        {/* Sidebar Navigation */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-6 space-y-2"
          style={{
            scrollbarWidth: 'none',      // Firefox
            msOverflowStyle: 'none',     // IE 10+
          }}
        >
          {/* Hide scrollbar for sidebar navigation */}
          <style jsx global>{`
  .flex-1.overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
`}</style>
          {sections.map(section => (
            <div key={`section-${section}`}>
              <div className="px-4 py-2 text-xs uppercase text-[#7B8CA6] tracking-wider font-bold">
                {section}
              </div>
              {itemsToUse.filter(item => item.section === section).map((item, index) => (
                <div key={`item-${item.href || item.label}-${section}`} className="relative">
                  {item.submenu ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={`w-full flex items-center px-4 py-2.5 rounded-md text-sm transition-all ${isActive(item.href) || expandedItems[item.label]
                          ? 'bg-[#232B3E] text-white font-semibold'
                          : 'text-[#B0B8C9] hover:bg-[#232B3E]'
                          }`}
                      >
                        {item.icon && <span className="mr-3 text-white">{item.icon}</span>}
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${typeof item.badge === 'string'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-emerald-100 text-emerald-700'
                            }`}>
                            {item.badge}
                          </span>
                        )}
                        <motion.span
                          animate={{ rotate: expandedItems[item.label] ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2"
                        >
                          <ChevronDown className="w-4 h-4 text-[#B0B8C9]" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {expandedItems[item.label] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-5 pl-3 py-1 space-y-1 border-l border-[#232B3E]">
                              {item.submenu.map((subItem, subIndex) => (
                                <Link
                                  key={`submenu-${subItem.href || subItem.label}-${item.label}`}
                                  href={subItem.href}
                                  className={`block px-3 py-1.5 text-[13px] rounded-md transition-all ${isActive(subItem.href)
                                    ? 'text-white font-semibold bg-[#232B3E]'
                                    : 'text-[#B0B8C9] hover:text-white hover:bg-[#232B3E]'
                                    }`}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 rounded-md text-sm transition-all ${isActive(item.href)
                        ? 'bg-[#232B3E] text-white font-semibold'
                        : 'text-[#B0B8C9] hover:bg-[#232B3E]'
                        }`}
                    >
                      {item.icon && <span className="mr-3 text-white">{item.icon}</span>}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${typeof item.badge === 'string'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-emerald-100 text-emerald-700'
                          }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#232B3E] space-y-3">
          <div className="flex space-x-2">
            {userRole === 'ADMIN' && isDummyUser !== true && (
              <Link
                href="/admin/settings"
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm text-[#B0B8C9] rounded-lg hover:bg-[#232B3E] transition-colors"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            )}
            <Link
              href="/help"
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm text-[#B0B8C9] rounded-lg hover:bg-[#232B3E] transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </Link>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-[#B0B8C9] bg-[#232B3E] hover:bg-[#232B3E]/80 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>

          <div className="text-center pt-2">
            <p className="text-xs text-[#7B8CA6]">Enterprise Suite v2.4.1</p>
          </div>
        </div>
      </motion.aside>

      {/* Spacer for top navbar on mobile */}
      <div className="h-16" />
    </>
  );
};

export default PremiumSidebar;