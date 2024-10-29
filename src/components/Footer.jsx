import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-50 py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Made by Ranjan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
