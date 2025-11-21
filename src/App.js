import React, { useState, useEffect } from 'react';

// Auth Components
import AuthProvider from './component/auth/AuthProvider.jsx';
import Logout from './component/auth/Logout.jsx';
import Profile from './component/auth/Profile.jsx';

// Common Components
import NavBar from './component/NavBar.jsx';
import Footer from './component/Footer.jsx';
import Home from './component/Home.jsx';
import { ToastProvider } from './component/ui/toaster.jsx';

// Admin Components
import Admin from './component/admin/Admin.jsx';

// Booking Components
import BookingForm from './component/booking/BookingForm.jsx';
import Checkout from './component/booking/Checkout.jsx';
import Bookings from './component/booking/Bookings.jsx';
import BookingSuccess from './component/booking/BookingSuccess.jsx';
import FindBooking from './component/booking/FindBooking.jsx';
import BookingSummary from './component/booking/BookingSummary.jsx';

// Error Page
const ErrorPage = ({ onNavigate }) => (
  <div className="p-8 text-center min-h-screen bg-gray-50 flex items-center justify-center">
    <div>
      <h2 className="text-6xl font-bold text-red-600 mb-4">404</h2>
      <p className="text-2xl text-gray-800 mb-6">Page Not Found</p>
      <button
        onClick={() => onNavigate('home')}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block"
      >
        Go Back Home
      </button>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState(null);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const page = path.substring(1) || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial page based on URL
    const initialPath = window.location.pathname;
    const initialPage = initialPath.substring(1) || 'home';
    setCurrentPage(initialPage);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation function
  const navigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo(0, 0);
  };

  // Render the current page
  const renderPage = () => {
    console.log('Current page:', currentPage);
    
    try {
      switch (currentPage) {
        case 'home':
        case '':
          return <Home onNavigate={navigate} />;
        
        case 'find-booking':
          return <FindBooking onNavigate={navigate} />;
        
        case 'bookings':
          return <Bookings onNavigate={navigate} />;
        
        case 'booking-summary':
          return <BookingSummary booking={pageData?.booking} room={pageData?.room} onNavigate={navigate} />;
        
        case 'checkout':
          return <Checkout onNavigate={navigate} />;
        
        case 'booking-success':
          return <BookingSuccess onNavigate={navigate} />;
        
        case 'book-room':
        case 'booking-form':
          return <BookingForm roomId={pageData?.roomId} onNavigate={navigate} />;
        
        case 'profile':
          return <Profile onNavigate={navigate} />;
        
        case 'logout':
          return <Logout onNavigate={navigate} />;
        
        case 'admin':
          return <Admin onNavigate={navigate} />;
        
        default:
          return <ErrorPage onNavigate={navigate} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div className="p-8 text-center min-h-screen bg-red-50">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
          <p className="text-gray-700">{error.toString()}</p>
        </div>
      );
    }
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar onNavigate={navigate} currentPage={currentPage} />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer onNavigate={navigate} />
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;