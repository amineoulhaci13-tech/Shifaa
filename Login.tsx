import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 font-sans" dir="rtl">
      {/* خلفية جمالية خفيفة */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-[400px] animate-smooth-fade">
        {/* الشعار */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white shadow-soft rounded-3xl mb-4 border border-slate-50">
            <span className="text-4xl">🏥</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">
            جسر <span className="text-shifaa-primary">الشفاء</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">منصتكم الموثوقة للرعاية الصحية</p>
        </div>

        {/* بطاقة الدخول */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-soft border border-white">
          <h2 className="text-xl font-bold text-slate-800 mb-8 text-center">تسجيل الدخول</h2>

          <div className="space-y-4">
            {/* خيار المريض */}
            <button className="w-full group bg-white hover:bg-shifaa-primary border border-slate-100 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-blue-glow flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition-colors">
                  👤
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-700 group-hover:text-white transition-colors">دخول كمريض</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-blue-100 transition-colors">مواعيدك وتقاريرك الطبية</span>
                </div>
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors">←</span>
            </button>

            {/* خيار الطبيب */}
            <button className="w-full group bg-white hover:bg-shifaa-accent border border-slate-100 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 group-hover:bg-white/20 rounded-xl flex items-center justify-center text-2xl transition-colors">
                  🩺
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-700 group-hover:text-white transition-colors">دخول كطبيب</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-emerald-50 transition-colors">إدارة المرضى والجدول الزمني</span>
                </div>
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors">←</span>
            </button>
          </div>

          {/* الروابط السفلية */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs px-2">
              <span className="text-slate-400">ليس لديك حساب؟</span>
              <button className="font-bold text-shifaa-primary hover:underline">إنشاء حساب مريض</button>
            </div>
            <div className="flex justify-between items-center text-xs px-2">
              <span className="text-slate-400">طبيب وتريد الانضمام؟</span>
              <button className="font-bold text-shifaa-accent hover:underline">سجل كطبيب الآن</button>
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          Secure Medical Portal v2.0
        </p>
      </div>
    </div>
  );
};

export default Login;
      
