import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const menuLinks = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Admin Login", href: "admin"},
    { name: "Seller Login", href: "seller"}
  ];

  return (
    <footer className=" bg-darkbg text-white py-4 px-8">
      <div className="flex justify-between items-center">
        <p className="text-sm">© 2023 Herbal Store. All rights reserved.</p>

        <ul className="flex items-center space-x-4 text-sm">
          {menuLinks.map((link) => (
            <li key={link.name}>
              <Link to={`/${link.href}`} className="text-white hover:text-primarylight">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
