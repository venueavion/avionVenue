import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Slideshow from './components/Slideshow/Slideshow';
// ... other imports ...
import AdminPage from './Admin/pages/AdminPage.jsx';

const mapLocation = { lat: 51.505, lng: -0.09 };

function App() {
  const title = 'Welcome to The Avion Venue';
  const description = 'The Avion Venue Welcome Content...';

  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans text-gray-900">
        <Routes>
          {/* Admin Route (no header/footer) */}
          <Route path="/admin/*" element={<AdminPage />} />

          {/* Public Routes (with header/footer) */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main>
                  <Routes>
                    {/* Home Page */}
                    <Route
                      path="/"
                      element={
                        <>
                          <Slideshow />
                          <WelcomePage
                            title={title}
                            description={description}
                          />
                          <GalleryPage />
                          <AvionPage />
                          <MapSection center={mapLocation} pin={mapLocation} />
                        </>
                      }
                    />

                    {/* Other Public Pages */}
                    <Route path="/weddings" element={<WeddingPage />} />
                    <Route path="/parties" element={<PartiesPage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/private-hire" element={<PrivateHire />} />
                    <Route path="/worship" element={<WorshipPage />} />
                  </Routes>
                </main>
                <ContactForm id="contact-section" />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
