import React, { useState, useMemo } from 'react';
import { Appointment, User } from '../types';

interface PatientDashboardProps {
  appointments: Appointment[];
  doctors: User[];
  onBook: (appt: any) => Promise<boolean>;
  onReview: (doctorId: string, rating: number, comment: string) => Promise<void>;
  user: User;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ appointments, doctors, onBook, user }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
  const [formData, setFormData] = useState({ date: '', time: '', notes: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // تصفية الأطباء بناءً على البحث
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialty && doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [doctors, searchQuery]);

  // تنفيذ عملية الحجز
  const handleBook = async () => {
    if (!selectedDoctor || !formData.date || !formData.time) {
      alert("يرجى اختيار التاريخ والوقت");
      return;
    }
    
    const success = await onBook({
        patientId: user.id,
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
    });
    
    if (success) {
      setShowModal(false);
      setFormData({ date: '', time: '', notes: '' });
    }
  };

  return (
    <div className="space-y-8">
      {/* قسم البحث */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-4 text-slate-800">البحث عن طبيب</h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="ابحث باسم الطبيب أو التخصص (مثلاً: قلب، عظام)..." 
            className="w-full p-4 pr-12 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-slate-400">🔍</span>
        </div>
      </div>

      {/* عرض المواعيد الحالية للمريض */}
      {appointments.length > 0 && (
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            مواعيدي القادمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map(appt => {
              // توحيد حالة الحروف لعرض الملصق بشكل صحيح
              const status = (appt.status || 'pending').toLowerCase();
              return (
                <div key={appt.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800">د. {appt.doctorName}</h4>
                    <p className="text-sm text-slate-500">{appt.date} | {appt.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    status === 'accepted' || status === 'confirmed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-amber-100 text-amber-600'
                  }`}>
                    {status === 'accepted' || status === 'confirmed' ? 'تم القبول' : 'قيد الانتظار'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* قائمة الأطباء المتاحين */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
          الأطباء المتاحون
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doc => (
            <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full object-cover bg-slate-100" />
                <div>
                  <h3 className="font-bold text-slate-800">{doc.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{doc.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-xs font-bold text-slate-600">{doc.rating || 'جديد'}</span>
                    <span className="text-xs text-slate-400">({doc.reviewsCount || 0} تقييم)</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedDoctor(doc); setShowModal(true); }}
                className="mt-auto w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white transition-colors"
              >
                حجز موعد الآن
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* نافذة الحجز المنبثقة (Modal) */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-800">تأكيد الحجز</h3>
              <p className="text-slate-500">مع د. {selectedDoctor.name}</p>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">تاريخ الموعد</label>
              <input 
                type="date" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={e => setFormData({...formData, date: e.target.value})} 
              />
              
              <label className="block text-sm font-medium text-slate-700">الوقت</label>
              <input 
                type="time" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={e => setFormData({...formData, time: e.target.value})} 
              />
              
              <label className="block text-sm font-medium text-slate-700">ملاحظات إضافية (اختياري)</label>
              <textarea 
                placeholder="اكتب هنا إذا كنت تعاني من أعراض محددة..." 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none" 
                onChange={e => setFormData({...formData, notes: e.target.value})}
              ></textarea>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleBook} 
                className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
              >
                تأكيد الحجز
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
                
