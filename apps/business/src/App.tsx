import { Navigate, Route, Routes } from "react-router-dom";
import { BusinessShell } from "./components/BusinessShell";
import { AvailabilityPage } from "./pages/AvailabilityPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { InvoicesPage } from "./pages/InvoicesPage";
import { MessagesPage } from "./pages/MessagesPage";
import { OverviewPage } from "./pages/OverviewPage";
import { RequestsPage } from "./pages/RequestsPage";
import { ServicesPage } from "./pages/ServicesPage";

export function App() {
  return (
    <Routes>
      <Route element={<BusinessShell />}>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/service-profile" element={<ServicesPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/services" element={<Navigate to="/service-profile" replace />} />
        <Route path="/bookings" element={<Navigate to="/requests" replace />} />
        <Route path="/billing" element={<Navigate to="/invoices" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
