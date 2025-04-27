import { JSX } from 'react';
import './Bubble.css';
import { Message } from '../../../models/message';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiClipboard } from "react-icons/fi";

interface PropsBubble {
    message: Message;
}

function Bubble({ message }: PropsBubble): JSX.Element {
    const renderMessage = (text: string) => {
        const parts = text.split(/(```[^`]*```|`[^`]+`)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```') && part.endsWith('```')) {
                const regex = /```(\w+)?\n([\s\S]*?)\n```/;
                const match = part.match(regex);
                const language = match?.[1] || 'javascript';
                const code = match ? match[2] : '';

                return (
                    <div className="syntax-highlighter-container" key={index}>
                        <SyntaxHighlighter
                            language={language}
                            style={materialDark}
                            customStyle={{ margin: "0", fontSize: "0.8em", borderRadius: 20, marginTop: 10, marginBottom: 10 }}
                            showLineNumbers={true}
                        >
                            {code}
                        </SyntaxHighlighter>
                        <FiClipboard className="copy-icon" onClick={() => navigator.clipboard.writeText(code)} />
                    </div>
                );
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <span key={index} className="inline-code">
                        {part.slice(1, -1)}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className={`Bubble ${message.role}`}>
            {renderMessage(message.content)}
        </div>
    );
}

export default Bubble;