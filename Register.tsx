import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '', // خاص بالطبيب
    phone: ''
  });

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const table = role === 'doctor' ? 'doctors' : 'patients';
    
    // إعداد البيانات المراد إدخالها
    const insertData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ...(role === 'doctor' && { specialty: formData.specialty }), // إضافة التخصص فقط إذا كان طبيباً
      created_at: new Date()
    };

    try {
      const { error } = await supabase.from(table).insert([insertData]);

      if (error) throw error;

      alert('تم التسجيل بنجاح في جسر الشفاء!');
      navigate('/login');
    } catch (error: any) {
      alert('حدث خطأ أثناء التسجيل: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans" dir="rtl">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-soft p-8 border border-slate-50 animate-smooth-fade">
        
        <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">إنشاء حساب جديد</h2>

        {/* اختيار نوع الحساب */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setRole('patient')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'patient' ? 'bg-shifaa-primary text-white shadow-md' : 'text-slate-500'}`}
          >
            مريض
          </button>
          <button 
            onClick={() => setRole('doctor')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'doctor' ? 'bg-shifaa-accent text-white shadow-md' : 'text-slate-500'}`}
          >
            طبيب
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-shifaa-primary outline-none transition-all"
              placeholder="أدخل اسمك الثلاثي"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-shifaa-primary outline-none transition-all"
              placeholder="example@mail.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {role === 'doctor' && (
            <div className="animate-in fade-in duration-500">
              <label className="block text-sm font-bold text-slate-700 mb-2">التخصص الطبي</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-shifaa-accent outline-none appearance-none bg-white"
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              >
                <option value="">اختر التخصص...</option>
                <option value="باطنية">باطنية</option>
                <option value="قلب">قلب</option>
                <option value="أطفال">أطفال</option>
                <option value="أعصاب">أعصاب</option>
              </select>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 mt-4 ${
              role === 'doctor' ? 'bg-shifaa-accent hover:bg-emerald-600' : 'bg-shifaa-primary hover:bg-blue-700'
            }`}
          >
            {loading ? 'جاري الحفظ...' : 'تأكيد التسجيل'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
            
