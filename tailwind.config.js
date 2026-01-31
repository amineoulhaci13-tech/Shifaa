/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      colors: {
        // ألوان مخصصة لهوية "جسر الشفاء"
        shifaa: {
          primary: '#2563eb',   // أزرق طبي
          secondary: '#0ea5e9', // أزرق فاتح للظلال
          accent: '#10b981',    // أخضر للنجاح/الأطباء
          dark: '#1e293b',      // كحلي غامق للنصوص
        }
      },
      boxShadow: {
        // ظلال ناعمة تجعل البطاقات تبدو كأنها تطفو
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        'blue-glow': '0 10px 15px -3px rgba(37, 99, 235, 0.2)',
      },
      animation: {
        'smooth-fade': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
