import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole, user: any) => void;
  onRegisterClick: () => void;
  onDoctorRegisterClick: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onRegisterClick, onDoctorRegisterClick }) => {
  // محاكاة تسجيل دخول بسيط للتجربة
  const handleSimulatedLogin = (role: UserRole) => {
    onLogin(role, { 
      id: role === 'DOCTOR' ? 'doc_1' : 'pat_1', 
      name: role === 'DOCTOR' ? 'د. أحمد' : 'مريض تجريبي', 
      role, 
      avatar: 'https://ui-avatars.com/api/?name=User' 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 flex-col gap-4">
      <h1 className="text-3xl font-bold text-blue-900">جسر الشفاء</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4 w-96">
        <h2 className="text-xl font-bold text-center">تسجيل الدخول</h2>
        <button onClick={() => handleSimulatedLogin('PATIENT')} className="bg-blue-600 text-white p-3 rounded-xl">دخول كمريض (تجريبي)</button>
        <button onClick={() => handleSimulatedLogin('DOCTOR')} className="bg-green-600 text-white p-3 rounded-xl">دخول كطبيب (تجريبي)</button>
        <hr />
        <button onClick={onRegisterClick} className="text-blue-600 text-sm">تسجيل حساب مريض جديد</button>
        <button onClick={onDoctorRegisterClick} className="text-green-600 text-sm">تسجيل حساب طبيب جديد</button>
      </div>
    </div>
  );
};
export default Auth;
