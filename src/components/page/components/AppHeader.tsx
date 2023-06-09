import React from 'react';

import logo from '/src/assets/icons/logo.png'

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
  <div className="flex items-center justify-center w-screen h-32 bg-zinc-800 text-center text-yellow-400 text-7xl font-bold">
    <img className="absolute left-5 top-6 w-48" src={logo}/>
    {title}
  </div>
  )
}

export default AppHeader;
