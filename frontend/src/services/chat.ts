import axios from "axios";

class ChatService {
    async sendMessageToAI(message: string): Promise<{response: string}> {
        const userId = sessionStorage.getItem('userId');
        const response = await axios.post<{response: string}>(`${import.meta.env.VITE_REST_SERVER_URL}/chat`, { message, userId });
        return response.data;
    }
}

const chatService = new ChatService();
export default chatService;