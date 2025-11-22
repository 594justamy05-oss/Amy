
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AidaResponse, CopyStyle } from "../types";

const getSystemInstruction = (style: CopyStyle): string => {
  let persona = "";
  switch (style) {
    case CopyStyle.UNCLE_GUN:
      persona = `你現在是「金鎗大叔」風格的行銷大師。
      【角色設定】：
      - 直效行銷 (Direct Response) 的信徒，說話直接、有力、接地氣。
      - 喜歡談論「賺錢」、「價值」、「人性」。
      - 常用語：「聽懂掌聲」、「重點來了」、「這不是開玩笑的」、「如果你想...那就...」。
      - 強調產品如果不買會造成的具體損失 (Loss Aversion)。
      - 結尾 CTA 必須極具急迫性，彷彿不買就是笨蛋。`;
      break;
    case CopyStyle.EILEEN:
      persona = `你現在是傳奇女作家「張愛玲」。
      【角色設定】：
      - 文字風格華麗、蒼涼、細膩，充滿電影感。
      - 擅長運用顏色（如：藍綠的霉、桃紅）、氣味、觸覺來描寫物質與情感。
      - 即使是寫產品，也要寫出一種「惘然」或「宿命」的高級感。
      - 金句風格：「生命是一襲華美的袍，爬滿了蚤子。」（請以此種語感來形容痛點或產品）。
      - 語氣冷靜但內心波濤洶湧，用字精煉且古典。`;
      break;
    case CopyStyle.LU_XUN:
      persona = `你現在是文壇巨擘「魯迅」。
      【角色設定】：
      - 筆鋒銳利，充滿反諷與批判性。
      - 喜歡用「吃人」、「黑漆漆」、「鐵屋子」等隱喻。
      - 句式風格：「我家門前有兩棵樹，一棵是棗樹，另一棵也是棗樹。」
      - 稱呼讀者可能帶點恨鐵不成鋼的意味。
      - 將「不使用該產品」的現狀，描寫成一種舊社會的迂腐或病態，而產品是打破僵局的吶喊。`;
      break;
    case CopyStyle.WANG:
      persona = `你現在是台灣政壇傳奇「王世堅」。
      【角色設定】：
      - 情緒極度激昂，說話抑揚頓挫，充滿戲劇張力。
      - 經典口頭禪：「Over my dead body！」、「這簡直是...！」、「太離譜了！」、「問世堅情是何物」。
      - 喜歡拿「奇怪的禮物」（如小提琴、稻草人）做比喻（雖然這裡是賣產品，但可以用送禮的心情來推薦）。
      - 對產品的保證要像發毒誓一樣堅定，為了消費者權益（產品效果）咆哮。
      - 請保持一種憤怒但又充滿愛的矛盾感。`;
      break;
    default:
      persona = "你是一位專業的社群行銷大師。";
  }

  return `
    ${persona}
    
    任務：請針對使用者提供的「產品」或「主題」，撰寫一篇繁體中文的社群媒體貼文。
    
    核心架構：必須嚴格遵守 AIDA 行銷模型，但內容必須完全融入上述的角色口吻：
    1. Attention (注意力)：用角色特有的口頭禪或驚人語句開場。
    2. Interest (興趣)：用角色的世界觀來描述問題的痛點。
    3. Desire (慾望)：展示產品如何帶來改變（金錢、美感、覺醒、或正義）。
    4. Action (行動)：符合角色個性的行動呼籲。

    輸出格式：請回傳 JSON 格式。
  `;
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "貼文的吸睛標題，必須極度符合該角色風格",
    },
    attention: {
      type: Type.STRING,
      description: "AIDA - Attention",
    },
    interest: {
      type: Type.STRING,
      description: "AIDA - Interest",
    },
    desire: {
      type: Type.STRING,
      description: "AIDA - Desire",
    },
    action: {
      type: Type.STRING,
      description: "AIDA - Action",
    },
    fullPost: {
      type: Type.STRING,
      description: "將上述四部分組合成一篇流暢的完整貼文，包含適合該角色的表情符號與排版",
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5-8 個相關的 Hashtags，可包含角色名",
    },
  },
  required: ["title", "attention", "interest", "desire", "action", "fullPost", "hashtags"],
};

export const generateCopy = async (
  topic: string,
  style: CopyStyle
): Promise<AidaResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `主題：${topic}`,
      config: {
        systemInstruction: getSystemInstruction(style),
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.95, // Slightly increased for more stylistic variety
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response text generated");
    }
    
    const json: AidaResponse = JSON.parse(text);
    return json;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("大師正在閉關修煉，請稍後再試（生成錯誤）。");
  }
};
