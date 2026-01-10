import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  time: string;
}

const MessageBubble = ({ message, isUser, time }: MessageBubbleProps) => {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1 message-appear`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm relative ${
          isUser
            ? "bg-whatsapp-bubbleUser rounded-tr-sm"
            : "bg-whatsapp-bubbleContact rounded-tl-sm"
        }`}
      >
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {message}
        </p>
        <div className={`flex items-center gap-1 mt-1 ${isUser ? "justify-end" : "justify-end"}`}>
          <span className="text-[10px] text-whatsapp-time">{time}</span>
          {isUser && (
            <CheckCheck className="w-4 h-4 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
