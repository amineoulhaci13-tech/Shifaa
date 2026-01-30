import { GoogleGenAI } from "@google/generative-ai";

// ملاحظة: تأكد من وضع مفتاح API الحقيقي الخاص بك هنا
const getAI = () => new GoogleGenAI("YOUR_GEMINI_API_KEY_HERE");

export const getSmartResponse = async (userMessage: string, role: string) => {
  const genAI = getAI();
  const systemInstruction = role === 'DOCTOR' 
    ? "أنت مساعد طبي ذكي يساعد الطبيب في تلخيص أعراض المريض أو اقتراح بروتوكولات المتابعة. كن موجزاً ومهنياً."
    : "أنت مساعد طبي ذكي يساعد المريض في فهم حالته بشكل مبسط وتوجيهه لأفضل الطرق للتواصل مع طبيبه. لا تعطي تشخيصات نهائية ولكن قدم نصائح عامة.";

  try {
    // استخدام موديل مستقر ومدعوم
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
