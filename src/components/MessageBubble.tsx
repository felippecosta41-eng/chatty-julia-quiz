import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  time: string;
  isCtaButton?: boolean;
  ctaLink?: string;
  image?: string;
}

const MessageBubble = ({ message, isUser, time, isCtaButton, ctaLink, image }: MessageBubbleProps) => {
  if (isCtaButton && ctaLink) {
    return (
      <div className="flex justify-start px-4 py-1 message-appear">
        <a
          href={ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-whatsapp-header hover:bg-whatsapp-header/90 text-white font-bold py-4 px-8 rounded-xl text-center shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] max-w-[75%]"
          data-testid="link-cta"
        >
          {message}
        </a>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} px-4 py-1 message-appear`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-3 py-2 shadow-sm relative ${
          isUser
            ? "bg-whatsapp-bubbleUser rounded-tr-sm"
            : "bg-whatsapp-bubbleContact rounded-tl-sm"
        }`}
      >
        {image && (
          <div className="mb-2 rounded overflow-hidden">
            <img src={image} alt="Mensagem" className="w-full h-auto" data-testid="img-message" />
          </div>
        )}
        {message && (
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed" data-testid="text-message">
            {message}
          </p>
        )}
        <div className={`flex items-center gap-1 mt-1 ${isUser ? "justify-end" : "justify-end"}`}>
          <span className="text-[10px] text-whatsapp-time" data-testid="text-time">{time}</span>
          {isUser && (
            <CheckCheck className="w-4 h-4 text-blue-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
