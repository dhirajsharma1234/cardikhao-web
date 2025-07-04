/** @format */

// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer";
import "../public/app/css/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import About from "./pages/About";
import CarListing from "./pages/CarListing";
import Cardetails from "./pages/Cardetails";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header />
                <main>
                    <Toaster position="top-right" reverseOrder={false} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/carlisting" element={<CarListing />} />
                        <Route
                            path="/brand/:brandId"
                            element={<CarListing />}
                        />
                        {/* <Route path="/cardetails" element={<Cardetails />} /> */}
                        <Route path="/car/:carId" element={<Cardetails />} />
                    </Routes>
                </main>
                <Footer />
            </QueryClientProvider>
        </>
    );
}

export default App;
