import { JSX, useEffect, useRef, useState } from 'react';
import './Window.css';
import { Message } from '../../../models/message';
import { v4 } from 'uuid';
import chatService from '../../../services/chat';
import Bubble from '../bubble/Bubble';
import New from '../new/New';

function Window(): JSX.Element {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    async function handleSend(text: string) {
        const newUserMessage: Message = {
            id: v4(),
            role: "user",
            content: text
        }

        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);

        try {
            const aiResponse = await chatService.sendMessageToAI(text);
            const newAiResponse: Message = {
                id: v4(),
                role: "ai",
                content: aiResponse.response
            }

            setMessages(prev => [...prev, newAiResponse]);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='Window'>
            {messages.map(m => <Bubble key={m.id} message={m} />)}
            {isLoading && <p>AI is thinking...</p>}
            <New onSend={handleSend} />
            <div ref={messagesEndRef} />
        </div>
    )
}


export default Window;