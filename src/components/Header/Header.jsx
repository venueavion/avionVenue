import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY <= 100) {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Close mobile menu if open
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 'block: start' can help ensure the top of section is visible
    }
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Give the browser a moment to render before trying to scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay can sometimes help
    }
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 py-6 bg-transparent transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors duration-300 font-serif"
            onClick={() => {
              setIsMenuOpen(false);
              if (location.pathname === '/')
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            AVION VENUE
          </Link>
        </div>

        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          <Link
            to="/weddings"
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Weddings
          </Link>
          <Link
            to="/parties"
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Parties
          </Link>
          <Link
            to="/training"
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Training
          </Link>
          <Link
            to="/private-hire"
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Private Hire
          </Link>
          <Link
            to="/worship"
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Worship
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Link
            to="/#contact-section" // This targets the ID
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToSection('contact-section'); // This ID must match the one passed to ContactForm
              }
              // If on a different page, Link handles navigation, useEffect handles scroll
            }}
            className="text-white font-bold uppercase tracking-wider hover:text-amber-400 transition-colors duration-300 text-md"
          >
            Contact
          </Link>
        </div>
        <button
          className="md:hidden focus:outline-none text-white hover:text-amber-400 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 py-4 px-4">
          <Link
            to="/weddings"
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Weddings
          </Link>
          <Link
            to="/parties"
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Parties
          </Link>
          <Link
            to="/training"
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Training
          </Link>
          <Link
            to="/private-hire"
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Private Hire
          </Link>
          <Link
            to="/worship"
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Worship
          </Link>
          <Link
            to="/#contact-section" // This targets the ID
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToSection('contact-section'); // This ID must match
              } else {
                setIsMenuOpen(false); // Close menu before navigating
              }
            }}
            className="block py-3 text-white font-medium uppercase hover:text-amber-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
