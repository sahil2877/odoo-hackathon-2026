import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import LoginSignup from '../pages/LoginSignup';
import Dashboard from '../pages/Dashboard';
import OrganizationSetup from '../pages/OrganizationSetup';
import AssetDirectory from '../pages/AssetDirectory';
import AssetAllocation from '../pages/AssetAllocation';
import ResourceBooking from '../pages/ResourceBooking';
import MaintenanceManagement from '../pages/MaintenanceManagement';
import AssetAudit from '../pages/AssetAudit';
import ReportsAnalytics from '../pages/ReportsAnalytics';
import NotificationsLog from '../pages/NotificationsLog';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginSignup />} />

      {/* Protected Layout Routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organization-setup" element={<OrganizationSetup />} />
        <Route path="/asset-directory" element={<AssetDirectory />} />
        <Route path="/asset-allocation" element={<AssetAllocation />} />
        <Route path="/resource-booking" element={<ResourceBooking />} />
        <Route path="/maintenance-management" element={<MaintenanceManagement />} />
        <Route path="/asset-audit" element={<AssetAudit />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/notifications-log" element={<NotificationsLog />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
