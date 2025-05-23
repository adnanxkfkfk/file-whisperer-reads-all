
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/Services"));
const BookingPage = lazy(() => import("./pages/Booking"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Track = lazy(() => import("./pages/Track"));
const Payment = lazy(() => import("./pages/Payment"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const CareersPage = lazy(() => import("./pages/Careers"));

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Toggle this to true to show the Coming Soon page
const SHOW_COMING_SOON = false;

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-transport-50 to-white">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-transport-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-transport-900">Loading...</p>
    </div>
  </div>
);

const App = () => {
  if (SHOW_COMING_SOON) {
    return <ComingSoon />;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Index />
                </Suspense>
              } />
              <Route path="/services" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ServicesPage />
                </Suspense>
              } />
              <Route path="/booking" element={
                <Suspense fallback={<LoadingFallback />}>
                  <BookingPage />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<LoadingFallback />}>
                  <AboutPage />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ContactPage />
                </Suspense>
              } />
              <Route path="/track" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Track />
                </Suspense>
              } />
              <Route path="/payment" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Payment />
                </Suspense>
              } />
              <Route path="/faq" element={
                <Suspense fallback={<LoadingFallback />}>
                  <FAQPage />
                </Suspense>
              } />
              <Route path="/careers" element={
                <Suspense fallback={<LoadingFallback />}>
                  <CareersPage />
                </Suspense>
              } />
              <Route path="/Player/:id" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Track />
                </Suspense>
              } />
              {/* Catch all routes */}
              <Route path="*" element={
                <Suspense fallback={<LoadingFallback />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
