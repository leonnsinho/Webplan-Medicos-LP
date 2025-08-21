import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SuccessPage from './pages/SuccessPage';
import AmilPage from './pages/AmilPage';
import SulamericaPage from './pages/SulamericaPage';
import SaoCamiloPage from './pages/SaoCamiloPage';
import AlicePage from './pages/AlicePage';
import PortoSeguroPage from './pages/PortoSeguroPage';
import BradescoPage from './pages/BradescoPage';
import UnimedPage from './pages/UnimedPage';
import MedSeniorPage from './pages/MedSeniorPage';
import SupabaseTestPage from './pages/SupabaseTestPage';
import { pageTransitions } from './utils/animations';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <HomePage />
          </motion.div>
        } />
        <Route path="/sobre" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <AboutPage />
          </motion.div>
        } />
        <Route path="/amil" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <AmilPage />
          </motion.div>
        } />
        <Route path="/sulamerica" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <SulamericaPage />
          </motion.div>
        } />
        <Route path="/sao-camilo" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <SaoCamiloPage />
          </motion.div>
        } />
        <Route path="/alice" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <AlicePage />
          </motion.div>
        } />
        <Route path="/porto-seguro" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <PortoSeguroPage />
          </motion.div>
        } />
        <Route path="/bradesco" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BradescoPage />
          </motion.div>
        } />
        <Route path="/unimed" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <UnimedPage />
          </motion.div>
        } />
        <Route path="/medsenior" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <MedSeniorPage />
          </motion.div>
        } />
        <Route path="/sucesso" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <SuccessPage />
          </motion.div>
        } />
        <Route path="/teste-supabase" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <SupabaseTestPage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;