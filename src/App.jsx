import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import { LangProvider } from '@/lib/LangContext';
import Layout from '@/components/psity/Layout';
import EnvironmentPage from '@/pages/EnvironmentPage';
import LivePage from '@/pages/LivePage';
import StudyPage from '@/pages/StudyPage';
import WorkPage from '@/pages/WorkPage';
import CataloguePage from '@/pages/CataloguePage';
import CommunityPage from '@/pages/CommunityPage';
import ContactPage from '@/pages/ContactPage';
import MissionPage from '@/pages/MissionPage';
import NewsPage from '@/pages/NewsPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import ExpertsPage from '@/pages/ExpertsPage';
import FAQPage from '@/pages/FAQPage';
import GalleryPage from '@/pages/GalleryPage';
import EventsPage from '@/pages/EventsPage';
import EventDetailPage from '@/pages/EventDetailPage';
import { captureUtms } from '@/lib/utm';
import { useEffect } from 'react';

function UtmCapture() {
  useEffect(() => {
    captureUtms();
  }, []);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LangProvider>
          <Router>
            <ScrollToTop />
            <UtmCapture />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/infrastructure" element={<EnvironmentPage />} />
                <Route path="/live" element={<LivePage />} />
                <Route path="/study" element={<StudyPage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="/catalogue" element={<CataloguePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/experts" element={<ExpertsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </LangProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
