import React from 'react';
const RegisterPatient = ({ onBack, onSuccess }: any) => (
  <div className="p-10 text-center">
    <h2 className="text-2xl mb-4">تسجيل مريض جديد</h2>
    <button onClick={() => onSuccess({ id: Date.now(), full_name: 'مريض جديد' })} className="bg-blue-600 text-white px-4 py-2 rounded">تأكيد التسجيل (محاكاة)</button>
    <button onClick={onBack} className="block mt-4 mx-auto text-slate-500">عودة</button>
  </div>
);
export default RegisterPatient;
