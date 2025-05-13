import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    {
      title: 'THE AVION VENUE',
      content: (
        <>
          <p className="mb-4">
            123 Restaurant Street
            <br />
            Sheffield
            <br />
            S1 4FP
          </p>
          <p>
            0114 123 4567
            <br />
            hello@themowbray.co.uk
          </p>
        </>
      ),
    },
    {
      title: 'OPENING HOURS',
      content: (
        <>
          <p className="mb-2">Mon-Thu: 12pm-10pm</p>
          <p className="mb-2">Fri-Sat: 12pm-11pm</p>
          <p>Sun: 12pm-8pm</p>
        </>
      ),
    },
    {
      title: 'NAVIGATION',
      content: (
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              Menus
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              Private Hire
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              Gallery
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-400 transition">
              Contact
            </a>
          </li>
        </ul>
      ),
    },
    {
      title: 'FOLLOW US',
      content: (
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <FaTwitter size={20} />
          </a>
        </div>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-4">{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} The Avion Venue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
