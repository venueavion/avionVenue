import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Slideshow from './components/Slideshow/Slideshow';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import GalleryPage from './components/GalleryPage/GalleryPage.jsx';
import AvionPage from './components/AvionPage/AvionPage.jsx';

// Create additional page components you want to route to
import ContactForm from './components/ContactForm/ContactForm.jsx';
import MapSection from './components/MapSection/MapSection.jsx';
import WeddingPage from './components/Pages/WeddingPage.jsx';
import PartiesPage from './components/Pages/PartiesPage.jsx';
import TrainingPage from './components/Pages/TrainingPage.jsx';
import PrivateHire from './components/Pages/PrivateHire.jsx';
import WorshipPage from './components/Pages/WorshipPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const mapLocation = { lat: 51.505, lng: -0.09 }; // Example: London. Replace with your desired coordinates.

function App() {
  const title = 'Welcome to The Avion Venue';
  const description =
    'The Avion Venue Welcome Content. Our menu changes regularly to reflect the best produce available. ';

  const data = [title, description];
  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans text-gray-900">
        <Header />
        <main>
          <Routes>
            {/* Home Page - shows all components */}
            <Route
              path="/"
              element={
                <>
                  <Slideshow />
                  <WelcomePage title={title} description={description} />
                  <GalleryPage />
                  <AvionPage />
                  <MapSection center={mapLocation} pin={mapLocation} />
                </>
              }
            />

            {/* Individual Pages */}
            <Route path="/weddings" element={<WeddingPage />} />
            <Route path="/parties" element={<PartiesPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/private-hire" element={<PrivateHire />} />
            <Route path="/worship" element={<WorshipPage />} />
          </Routes>
        </main>
        <ContactForm id="contact-section" />
      </div>
    </Router>
  );
}

export default App;
