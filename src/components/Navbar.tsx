import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => (
  <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
    <div className="font-bold text-xl text-blue-900">جسر الشفاء</div>
    <div className="flex items-center gap-4">
      <span>مرحباً، {user.name}</span>
      <button onClick={onLogout} className="text-red-500 text-sm font-bold">تسجيل خروج</button>
    </div>
  </nav>
);
export default Navbar;
