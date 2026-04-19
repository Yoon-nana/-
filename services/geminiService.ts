import { GoogleGenAI } from "@google/genai";
import { ClassificationType } from "../types";

const getSystemInstruction = () => `
당신은 7살 아이에게 "비지도 학습(Unsupervised Learning)"을 설명해주는 친절하고 열정적인 선생님입니다.
아이가 방금 정답을 알려주지 않은 상태에서 이모지를 분류하는 게임을 했습니다.
설명은 아주 짧게(최대 2-3문장), 재미있고 격려하는 말투로 해주세요.
이모지를 적절히 사용하세요.
`;

export const getAIExplanation = async (classificationType: ClassificationType): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key not found, returning fallback text.");
      return "와우! 스스로 규칙을 찾아냈군요! 똑똑한 컴퓨터도 이렇게 학습한답니다!";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let prompt = "";
    
    switch (classificationType) {
        case ClassificationType.BY_CATEGORY:
            prompt = "아이가 음식, 동물, 사물로 종류별 분류를 성공했습니다. 이것이 AI의 군집화(Clustering)와 어떻게 비슷한지 설명해주세요.";
            break;
        case ClassificationType.BY_COLOR:
            prompt = "아이가 빨강, 초록, 파랑 색깔별로 분류를 성공했습니다. 이것이 AI의 군집화와 어떻게 비슷한지 설명해주세요.";
            break;
        case ClassificationType.BY_ENVIRONMENT:
            prompt = "아이가 하늘, 땅, 바다 등 다니는 장소별로 분류를 성공했습니다. 이것이 AI의 군집화와 어떻게 비슷한지 설명해주세요.";
            break;
        case ClassificationType.BY_WHEELS:
            prompt = "아이가 바퀴 개수(없음, 2개, 여러개)로 분류를 성공했습니다. 특징(Feature)을 찾아 분류한 것을 칭찬해주세요.";
            break;
        case ClassificationType.BY_SHAPE:
            prompt = "아이가 동그라미, 네모, 하트 등 모양별로 분류를 성공했습니다. 시각적 특징(Visual Feature)을 잘 파악했다고 칭찬해주세요.";
            break;
        case ClassificationType.MIXED:
            prompt = "아이가 여러가지가 섞이게 분류했습니다. '색깔'이나 '종류'처럼 더 명확한 규칙을 찾아보라고 격려해주세요.";
            break;
        default:
            return "정말 잘했어요!";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });

    return response.text || "컴퓨터처럼 스스로 학습하고 있네요!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "완벽하게 묶었네요! 기계들도 친구처럼 숨겨진 패턴을 찾아서 공부해요!";
  }
};