import { Navigate, Route, Routes } from 'react-router-dom';
import { BackgroundProvider } from './components/BackgroundSwitcher';
import { SiteNav } from './components/layout/SiteNav';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CreditsPage } from './pages/CreditsPage';
const App = () => (
  <BackgroundProvider>
    <SiteNav />
    <main className="relative z-10">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/projects/:slug" element={<Navigate to="/articles/:slug" replace />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>
  </BackgroundProvider>
);
export default App;
