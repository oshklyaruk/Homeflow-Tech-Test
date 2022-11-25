import React from 'react';
import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-8xl">
        Posh Properties
      </h1>

      {children}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header;
