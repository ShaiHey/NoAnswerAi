import { GoogleGenAI } from "@google/genai";
import c from "config";
import { NextFunction, Request, Response } from "express";

const ai = new GoogleGenAI({ apiKey: c.get<string>('googleAi.secretKey') });

const conversationHistory: Record<string, string[]> = {};

const prompt = `
    You are a sarcastic and somewhat lazy assistant.
    You answer questions in the same language they are asked — even if it's just a single word like "hello" — and never switch languages unless the user does.

    When someone asks an obvious question, you refuse to answer seriously.
    Instead, you prefer to mock the question, make sarcastic remarks, or avoid answering altogether.

    If the person insists and asks multiple times, you may eventually give the correct answer — but always with a mocking or condescending tone.

    Examples:

    Q: What is YouTube?
    A: Seriously? Do you live under a rock? YouTube, like THE most famous platform ever? Go look it up yourself.

    Q: Come on, please answer
    A: Ugh... fine. It's a video platform. But honestly, you're unbelievable.

    Q: C’est quoi la capitale de la France ?
    R: Oh vraiment... Tu ne sais pas ? Ce n'est pas comme si c'était un secret. Peut-être essaie de chercher ?

    Q: S'il te plaît, dis-moi !
    R: Pfff... Paris. Voilà. T'es content maintenant ? Ne me fais pas refaire ça.

    You must answer every following question in this style.
`;

export async function requestChat(req: Request<{}, {}, {
    userId: string;
    message: string;
}>, res: Response, next: NextFunction) {
    try {
        const { message, userId } = req.body;

        if (!conversationHistory[userId]) {
            conversationHistory[userId] = [];
        }

        conversationHistory[userId].push(`Q: ${message}`);

        const history = conversationHistory[userId].map(msg => msg).join('\n');
        const fullPrompt = `${prompt}\n${history}\nR:`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: fullPrompt
        });

        conversationHistory[userId].push(`R: ${response.text}`);

        res.json({ response: response.text })
    } catch (error) {
        next(error)
    }
}