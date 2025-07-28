"use client";
import React from 'react';
import DashboardRouter from '../../components/DashboardRouter';
import usePageDebugger from '../../hooks/usePageDebugger';

export default function DashboardPage() {
  // Add debugging
  usePageDebugger('Dashboard');
  
  return <DashboardRouter />;
}
