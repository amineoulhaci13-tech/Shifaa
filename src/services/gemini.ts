import { GoogleGenAI } from "@google/genai";

// هام: يجب استبدال النص أدناه بمفتاح API الحقيقي الخاص بك
const getAI = () => new GoogleGenAI({ apiKey: "YOUR_GEMINI_API_KEY_HERE" });

export const getSmartResponse = async (userMessage: string, role: string) => {
  const ai = getAI();
  const systemInstruction = role === 'DOCTOR' 
    ? "أنت مساعد طبي ذكي يساعد الطبيب في تلخيص أعراض المريض أو اقتراح بروتوكولات المتابعة. كن موجزاً ومهنياً."
    : "أنت مساعد طبي ذكي يساعد المريض في فهم حالته بشكل مبسط وتوجيهه لأفضل الطرق للتواصل مع طبيبه. لا تعطي تشخيصات نهائية ولكن قدم نصائح عامة.";

  try {
    // تأكد من أن الموديل مدعوم في حسابك، قد تحتاج لتغييره إلى 'gemini-pro'
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', 
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء معالجة طلبك الذكي.";
  }
};
