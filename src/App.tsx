import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Layout & Transitions
import Layout from "./components/layout/Layout";
import PageTransition from "./components/layout/PageTransition";

// Public Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Aboutus from "./pages/Aboutus";

// Admin Pages
import AdminLogin from "./pages/admin/adminlogin";
import AdminDashboard from "./pages/admin/admindashboard";
import AddDish from "./pages/admin/AddDish";
import ManageDishes from "./pages/admin/ManageDishes";
import EditDish from "./pages/admin/EditDish";

// Auth
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

const queryClient = new QueryClient();

// All route animations happen here
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public Routes */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/aboutus" element={<PageTransition><Aboutus /></PageTransition>} />

        {/* Admin Login */}
        <Route
          path="/secret-admin-login"
          element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add"
          element={
            <ProtectedAdminRoute>
              <PageTransition>
                <AddDish />
              </PageTransition>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <ProtectedAdminRoute>
              <PageTransition>
                <ManageDishes />
              </PageTransition>
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/edit"
          element={
            <ProtectedAdminRoute>
              <PageTransition>
                <EditDish />
              </PageTransition>
            </ProtectedAdminRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};


// Main App Component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
