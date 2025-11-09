import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CookieBanner from './components/CookieBanner';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SuccessPage from './pages/SuccessPage';
import AmilPage from './pages/AmilPage';
import SulamericaPage from './pages/SulamericaPage';
import AlicePage from './pages/AlicePage';
import PortoSeguroPage from './pages/PortoSeguroPage';
import MedSeniorPage from './pages/MedSeniorPage';
import EnfermeirosPage from './pages/EnfermeirosPage';
import ProfissoesPage from './pages/ProfissoesPage';
import SupabaseTestPage from './pages/SupabaseTestPage';
import PoliticasPrivacidade from './pages/PoliticasPrivacidade';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { BlogCategoryPage } from './pages/BlogCategoryPage';
import { BlogTestPage } from './pages/BlogTestPage';
import { BlogDebugPage } from './pages/BlogDebugPage';
import { BlogQuickTestPage } from './pages/BlogQuickTestPage';
import { BlogIndexPageTemp } from './pages/BlogIndexPageTemp';
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
        <Route path="/planos-de-saude-para-enfermeiros" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <EnfermeirosPage />
          </motion.div>
        } />
        <Route path="/profissoes" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <ProfissoesPage />
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
        <Route path="/politicas-privacidade" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <PoliticasPrivacidade />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogIndexPage />
          </motion.div>
        } />
        <Route path="/blog/:slug" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogPostPage />
          </motion.div>
        } />
        <Route path="/blog/categoria/:category" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogCategoryPage />
          </motion.div>
        } />
        <Route path="/blog/teste" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogTestPage />
          </motion.div>
        } />
        <Route path="/blog/debug" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogDebugPage />
          </motion.div>
        } />
        <Route path="/blog/quick-test" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogQuickTestPage />
          </motion.div>
        } />
        <Route path="/blog/temp" element={
          <motion.div
            initial={pageTransitions.initial}
            animate={pageTransitions.animate}
            exit={pageTransitions.exit}
            transition={pageTransitions.transition}
          >
            <BlogIndexPageTemp />
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
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;