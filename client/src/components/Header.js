import { NavLink } from 'react-router-dom';

const Header = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/userinfo', label: 'User Info' },
    { to: '/wishlist', label: 'Wishlist' },
  ];

  return (
    <header className="bg-gradient-to-r from-pink-500 to-yellow-400 shadow-md p-4">
      <nav className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Travel Wishlist 🌍</h1>
        <ul className="flex gap-4">
          {navLinks.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-semibold border-b-2 border-white pb-1'
                    : 'text-white hover:text-gray-100 transition'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
