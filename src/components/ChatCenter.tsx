import React from 'react';
import { User, Message } from '../types';

interface ChatProps {
  user: User;
  messages: Message[];
  contacts: User[];
  onSendMessage: (text: string, receiverId: string) => void;
}

const ChatCenter: React.FC<ChatProps> = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-xl cursor-pointer hover:scale-105 transition">
      💬 المحادثات (قيد التطوير)
    </div>
  );
};
export default ChatCenter;
