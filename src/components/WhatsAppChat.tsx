import { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ReplyButton from "./ReplyButton";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
}

interface ChatStep {
  contactMessages: string[];
  replyOptions: string[];
}

const chatFlow: ChatStep[] = [
  {
    contactMessages: [
      `Olá, tudo bem?
Meu nome é Julia Martins, tenho 45 anos e por quase 20 anos vivi presa no mesmo ciclo que talvez você conheça bem…

Eu começava uma dieta cheia de esperança, até emagrecia um pouco…
Mas bastava passar um tempo e todo o peso voltava.
Às vezes voltava até mais do que antes.`,
    ],
    replyOptions: ["Sim, conheço bem isso 😔", "Me conta mais..."],
  },
  {
    contactMessages: [
      `Já tentei de tudo: dieta da moda, cortar tudo o que eu gostava, passar fome, academia…
E sempre chegava à mesma conclusão dolorosa:
"O problema deve ser comigo."

Até que, exatamente 3 meses atrás, algo mudou completamente.`,
      `Uma médica dos Estados Unidos, especialista em emagrecimento feminino, revelou um truque simples que já vinha sendo usado por mulheres como nós há anos, sem passar fome e sem dietas restritivas.

Esse método está ajudando mulheres como nós a emagrecer de forma consistente e, principalmente, manter o peso.`,
    ],
    replyOptions: ["Quero saber mais!", "Como funciona?"],
  },
  {
    contactMessages: [
      `Antes de te contar tudo, preciso saber uma coisa...

Você já tentou alguma dieta antes e não conseguiu manter os resultados?`,
    ],
    replyOptions: ["Sim, várias vezes 😞", "Nunca consegui emagrecer"],
  },
  {
    contactMessages: [
      `Eu imaginei... 💔

Isso acontece porque a maioria das dietas ataca o problema errado.

Elas focam em restringir comida, quando o verdadeiro problema está no seu metabolismo.

Quer que eu te explique como reverter isso?`,
    ],
    replyOptions: ["Sim, quero entender!", "Me explica tudo!"],
  },
];

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showReplyOptions, setShowReplyOptions] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Start the conversation
  useEffect(() => {
    if (currentStep === 0 && messages.length === 0) {
      const initialMessages = chatFlow[0].contactMessages;
      setPendingMessages(initialMessages);
    }
  }, []);

  // Process pending messages one by one
  useEffect(() => {
    if (pendingMessages.length > 0) {
      setIsTyping(true);
      setShowReplyOptions(false);

      const timer = setTimeout(() => {
        setIsTyping(false);
        const [nextMessage, ...remainingMessages] = pendingMessages;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: nextMessage,
            isUser: false,
            time: getCurrentTime(),
          },
        ]);

        if (remainingMessages.length > 0) {
          setPendingMessages(remainingMessages);
        } else {
          setPendingMessages([]);
          setShowReplyOptions(true);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pendingMessages]);

  const handleReply = (replyText: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: replyText,
        isUser: true,
        time: getCurrentTime(),
      },
    ]);

    setShowReplyOptions(false);

    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < chatFlow.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        setPendingMessages(chatFlow[nextStep].contactMessages);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      <ChatHeader />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto chat-pattern">
        {/* Date indicator */}
        <div className="flex justify-center py-3">
          <span className="bg-card/90 text-muted-foreground text-xs px-3 py-1 rounded-lg shadow-sm">
            Hoje
          </span>
        </div>

        {/* Messages */}
        <div className="pb-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              time={message.time}
            />
          ))}

          {isTyping && <TypingIndicator />}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Reply options */}
      {showReplyOptions && currentStep < chatFlow.length && (
        <div className="bg-card border-t border-border p-4 space-y-2">
          {chatFlow[currentStep].replyOptions.map((option, index) => (
            <ReplyButton
              key={index}
              text={option}
              onClick={() => handleReply(option)}
              disabled={isTyping}
            />
          ))}
        </div>
      )}

      {/* Conversation ended */}
      {currentStep >= chatFlow.length && !isTyping && (
        <div className="bg-card border-t border-border p-4 text-center">
          <p className="text-muted-foreground text-sm">
            ✨ Obrigada por participar!
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;
