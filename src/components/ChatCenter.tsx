import React, { useState } from 'react';
import { User, Message } from '../types';

interface ChatProps {
  user: User;
  messages: Message[];
  contacts: User[];
  onSendMessage: (text: string, receiverId: string) => void;
}

const ChatCenter: React.FC<ChatProps> = ({ user, messages, contacts, onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [inputText, setInputText] = useState('');

  // تصفية الرسائل بين المستخدم الحالي والجهة المختارة
  const activeMessages = messages.filter(m => 
    (m.senderId === user.id && m.receiverId === selectedContact?.id) ||
    (m.senderId === selectedContact?.id && m.receiverId === user.id)
  );

  const handleSend = () => {
    if (inputText.trim() && selectedContact) {
      onSendMessage(inputText, selectedContact.id);
      setInputText('');
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center gap-2"
      >
        <span className="text-xl">💬</span>
        <span className="font-bold">المحادثات</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          {selectedContact && (
            <button onClick={() => setSelectedContact(null)} className="hover:bg-blue-700 p-1 rounded">➡️</button>
          )}
          <h3 className="font-bold">{selectedContact ? selectedContact.name : 'صندوق الوارد'}</h3>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        {!selectedContact ? (
          /* قائمة الجهات (الأطباء أو المرضى) */
          <div className="space-y-2">
            {contacts.length > 0 ? contacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="flex items-center gap-3 p-3 bg-white rounded-xl cursor-pointer hover:bg-blue-50 transition-colors border border-slate-100"
              >
                <img src={contact.avatar} alt="" className="w-10 h-10 rounded-full bg-slate-200" />
                <div>
                  <p className="font-bold text-sm text-slate-800">{contact.name}</p>
                  <p className="text-xs text-slate-500">{contact.specialty || 'مريض'}</p>
                </div>
              </div>
            )) : (
              <p className="text-center text-slate-400 mt-10">لا يوجد جهات اتصال حالياً</p>
            )}
          </div>
        ) : (
          /* واجهة الرسائل */
          <div className="space-y-3">
            {activeMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.senderId === user.id 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {activeMessages.length === 0 && (
              <p className="text-center text-xs text-slate-400 mt-10">ابدأ المحادثة الآن...</p>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      {selectedContact && (
        <div className="p-4 bg-white border-t flex gap-2">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
          >
            ✈️
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatCenter;
                
