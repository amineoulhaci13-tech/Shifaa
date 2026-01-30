import { GoogleGenAI } from "@google/generative-ai";

// المفتاح الذي زودتني به
const apiKey = "Gen-lang-client-0806602277";

export const getSmartResponse = async (userMessage: string, role: string) => {
  // التحقق من وجود المفتاح
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    return "يرجى إعداد مفتاح API الخاص بـ Gemini أولاً.";
  }

  try {
    // إعداد المكتبة باستخدام المفتاح
    const genAI = new GoogleGenAI(apiKey);
    
    // تحديد التعليمات البرمجية بناءً على نوع المستخدم (طبيب أو مريض)
    const systemInstruction = role === 'DOCTOR' 
      ? "أنت مساعد طبي ذكي يساعد الطبيب في تلخيص أعراض المريض أو اقتراح بروتوكولات المتابعة. كن موجزاً ومهنياً باللغة العربية."
      : "أنت مساعد طبي ذكي يساعد المريض في فهم حالته بشكل مبسط وتوجيهه لأفضل الطرق للتواصل مع طبيبه. لا تعطي تشخيصات نهائية ولكن قدم نصائح عامة باللغة العربية.";

    // تهيئة النموذج (استخدام إصدار flash لأنه الأسرع والأخف)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction 
    });

    // إرسال الرسالة والحصول على الرد
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء معالجة طلبك الذكي. تأكد من صلاحية مفتاح الـ API.";
  }
};
