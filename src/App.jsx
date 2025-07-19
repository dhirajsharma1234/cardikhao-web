/** @format */

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../public/app/css/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import About from "./pages/About";
import CarListing from "./pages/CarListing";
import Cardetails from "./pages/Cardetails";
import { Toaster } from "react-hot-toast";
import ContactUs from "./pages/ContactUs";
import SellCar from "./components/SellCar";
import NotFound from "./components/NotFound";
import Error505 from "./components/Error505";
import ScrollToTop from "./components/ScrollToTop";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Don't retry on 404 errors
                if (error.response?.status === 404) return false;
                // Retry others up to 3 times
                return failureCount < 3;
            },
            onError: (error) => {
                // You can handle API errors globally here if needed
                console.error("API Error:", error);
            },
        },
    },
});

function App() {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <Header />
          <main>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/carlisting" element={<CarListing />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/car/:carId" element={<Cardetails />} />
              <Route path="/sell-car" element={<SellCar />} />

              {/* Error handling routes */}
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/error" element={<Error505 />} />

              {/* Catch-all route for unknown paths */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </QueryClientProvider>
      </>
    );
}

export default App;
