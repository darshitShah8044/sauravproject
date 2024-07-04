import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dakhni Gems</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/results" className="hover:text-gray-300">
                Results
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
