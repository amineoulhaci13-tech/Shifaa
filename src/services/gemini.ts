import * as GoogleGenerativeAI from "@google/generative-ai";

// استخراج الكلاس بشكل آمن لتجنب أخطاء TypeScript
const { GoogleGenAI } = GoogleGenerativeAI;

// تأكد من وضع مفتاح API الخاص بك هنا
const apiKey = "YOUR_GEMINI_API_KEY_HERE";

const getAI = () => new GoogleGenAI(apiKey);

export const getSmartResponse = async (userMessage: string, role: string) => {
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    return "يرجى إعداد مفتاح API الخاص بـ Gemini أولاً.";
  }

  const genAI = getAI();
  const systemInstruction = role === 'DOCTOR' 
    ? "أنت مساعد طبي ذكي يساعد الطبيب في تلخيص أعراض المريض أو اقتراح بروتوكولات المتابعة. كن موجزاً ومهنياً."
    : "أنت مساعد طبي ذكي يساعد المريض في فهم حالته بشكل مبسط وتوجيهه لأفضل الطرق للتواصل مع طبيبه. لا تعطي تشخيصات نهائية ولكن قدم نصائح عامة.";

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction 
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء معالجة طلبك الذكي.";
  }
};
