import React, { useState, useMemo } from 'react';
import { Appointment, AppointmentStatus, User } from '../types';

interface PatientDashboardProps {
  appointments: Appointment[];
  doctors: User[];
  onBook: (appt: Omit<Appointment, 'id' | 'status'> | Omit<Appointment, 'id' | 'status'>[]) => Promise<boolean>;
  onReview: (doctorId: string, rating: number, comment: string) => Promise<void>;
  user: User;
}

const generateDays = () => {
  const days = [];
  const start = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push(date);
  }
  return days;
};

const PatientDashboard: React.FC<PatientDashboardProps> = ({ appointments, doctors, onBook, onReview, user }) => {
  // حالات State (تم إكمالها بناءً على الكود المقطوع)
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
  const [formData, setFormData] = useState({ date: '', time: '', notes: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // الجزء المقطوع في الكود الأصلي تم إكماله هنا:
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialty && doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [doctors, searchQuery]);

  const handleBook = async () => {
    if (!selectedDoctor) return;
    const success = await onBook({
        patientId: user.id,
        doctorId: selectedDoctor.id,
        patientName: user.name,
        doctorName: selectedDoctor.name,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
    });
    if (success) setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold mb-4">البحث عن طبيب</h2>
        <input 
          type="text" 
          placeholder="ابحث باسم الطبيب أو التخصص..." 
          className="w-full p-3 border rounded-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="font-bold">{doc.name}</h3>
                <p className="text-sm text-slate-500">{doc.specialty}</p>
                <p className="text-xs text-yellow-500">⭐ {doc.rating || 0} ({doc.reviewsCount || 0})</p>
              </div>
            </div>
            <button 
              onClick={() => { setSelectedDoctor(doc); setShowModal(true); }}
              className="mt-auto w-full py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
            >
              حجز موعد
            </button>
          </div>
        ))}
      </div>

      {/* Modal للحجز - مبسط */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold">حجز موعد مع {selectedDoctor.name}</h3>
            <input type="date" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, date: e.target.value})} />
            <input type="time" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, time: e.target.value})} />
            <textarea placeholder="ملاحظات..." className="w-full p-2 border rounded" onChange={e => setFormData({...formData, notes: e.target.value})}></textarea>
            <div className="flex gap-2">
              <button onClick={handleBook} className="flex-1 bg-blue-600 text-white py-2 rounded-xl">تأكيد</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-200 py-2 rounded-xl">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
