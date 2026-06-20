import { Navigate, Route, Routes } from "react-router-dom";
import { BusinessShell } from "./components/BusinessShell";
import { AvailabilityPage } from "./pages/AvailabilityPage";
import { BillingPage } from "./pages/BillingPage";
import { BookingsPage } from "./pages/BookingsPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { MessagesPage } from "./pages/MessagesPage";
import { OverviewPage } from "./pages/OverviewPage";
import { ServicesPage } from "./pages/ServicesPage";

export function App() {
  return (
    <Routes>
      <Route element={<BusinessShell />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
