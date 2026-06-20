import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BookingPage } from "./pages/BookingPage";
import {
  DashboardApprovalsPage,
  DashboardBookingsPage,
  DashboardDocumentsPage,
  DashboardInvoicesPage,
  DashboardMessagesPage,
  DashboardPage,
  DashboardProfilePage,
  DashboardServicesPage,
  DashboardSettingsPage,
} from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { ServicesPage } from "./pages/ServicesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/book/:serviceId" element={<BookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/bookings" element={<DashboardBookingsPage />} />
        <Route path="/dashboard/bookings/:id" element={<DashboardBookingsPage />} />
        <Route path="/dashboard/messages" element={<DashboardMessagesPage />} />
        <Route path="/dashboard/approvals" element={<DashboardApprovalsPage />} />
        <Route path="/dashboard/services" element={<DashboardServicesPage />} />
        <Route path="/dashboard/invoices" element={<DashboardInvoicesPage />} />
        <Route path="/dashboard/documents" element={<DashboardDocumentsPage />} />
        <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
        <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
