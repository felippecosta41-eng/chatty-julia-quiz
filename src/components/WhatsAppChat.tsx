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
  contactMessages: { text: string; delay: number }[];
  replyOptions: string[];
}

const chatFlow: ChatStep[] = [
  {
    contactMessages: [
      {
        text: `Olá, tudo bem?

Meu nome é Julia Martins, tenho 42 anos e, principalmente depois que tive meus dois filhos, passei mais de 16 anos presa em um ciclo que talvez você conheça muito bem…`,
        delay: 2000,
      },
      {
        text: `Eu começava uma dieta cheia de esperança, até emagrecia um pouco… Mas bastava passar um tempo e todo o peso voltava. Às vezes voltava até mais do que antes.`,
        delay: 1000,
      },
    ],
    replyOptions: ["Sim, Conheço bem isso 😔", "Já tentei de tudo e nada funciona"],
  },
  {
    contactMessages: [
      {
        text: `Já tentei de tudo: dieta da moda, cortar tudo o que eu gostava, passar fome, academia… E sempre chegava à mesma conclusão dolorosa: "O problema deve ser comigo."`,
        delay: 2000,
      },
      {
        text: `Até que, exatamente 3 meses atrás, algo mudou completamente. Uma médica dos Estados Unidos, especialista em emagrecimento feminino, revelou uma receita simples que já vinha sendo usado por mulheres como nós há anos, sem passar fome e sem dietas restritivas. Esse método está ajudando mulheres como nós a emagrecer de forma consistente e, principalmente, manter o peso.`,
        delay: 2000,
      },
      {
        text: `Vou te fazer algumas perguntas para calcular e te enviar a quantidade ideal dos ingredientes, de acordo com você.`,
        delay: 2000,
      },
    ],
    replyOptions: ["Pode me enviar, por favor. Estou precisando muito."],
  },
  {
    contactMessages: [
      {
        text: `Qual sua idade?`,
        delay: 1000,
      },
    ],
    replyOptions: ["18 a 25 anos", "26 a 35 anos", "36 a 45 anos", "46 anos ou mais"],
  },
  {
    contactMessages: [
      {
        text: `Qual seu peso atual?`,
        delay: 1000,
      },
    ],
    replyOptions: ["50 a 65kg", "66 a 80kg", "81 a 95kg", "Acima de 96kg"],
  },
  {
    contactMessages: [
      {
        text: `Quantos kg você quer perder?`,
        delay: 1000,
      },
    ],
    replyOptions: ["5 a 10kg", "11 a 20kg", "21 a 30kg", "Mais de 30kg"],
  },
  {
    contactMessages: [
      {
        text: `Você já teve filhos?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Sim", "Não"],
  },
  {
    contactMessages: [
      {
        text: `Você está na menopausa ou pós-menopausa?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Sim", "Não", "Não Sei"],
  },
  {
    contactMessages: [
      {
        text: `Com que frequência você faz exercícios?`,
        delay: 1000,
      },
    ],
    replyOptions: [
      "Nunca ou raramente",
      "1 a 2 vezes por semana",
      "3 a 4 vezes por semana",
      "5 vezes ou mais por semana",
    ],
  },
  {
    contactMessages: [
      {
        text: `Como você descreveria seu metabolismo?`,
        delay: 1000,
      },
    ],
    replyOptions: [
      "Rápido - Perco peso facilmente",
      "Normal - Nem lento nem rápido",
      "Lento - Tenho dificuldade de perder peso",
      "Não sei",
    ],
  },
  {
    contactMessages: [
      {
        text: `Onde você acumula mais gordura?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Barriga", "Coxas e Quadril", "Braços", "Em todas as áreas"],
  },
  {
    contactMessages: [
      {
        text: `Você sente fome emocional ou compulsão alimentar?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Sim, Frequentemente", "Às vezes", "Raramente", "Nunca"],
  },
  {
    contactMessages: [
      {
        text: `Você tem problemas de saúde relacionados ao seu peso?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Diabetes ou Pré-Diabetes", "Pressão Alta", "Colesterol Alto", "Nenhum Problema"],
  },
  {
    contactMessages: [
      {
        text: `Você já tentou perder peso antes?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Nunca tentei", "Sim, 1 ou 2 vezes", "Sim, 3 ou 5 vezes", "Sim, muitas vezes"],
  },
  {
    contactMessages: [
      {
        text: `Qual seu principal objetivo?`,
        delay: 1000,
      },
    ],
    replyOptions: [
      "Melhorar minha saúde",
      "Melhorar minha aparência",
      "Aumentar minha autoestima",
      "Todos acima",
    ],
  },
  {
    contactMessages: [
      {
        text: `Qual seu maior desafio ao tentar emagrecer?`,
        delay: 1000,
      },
    ],
    replyOptions: ["Falta de tempo", "Falta de motivação", "Ansiedade e compulsão", "Não vejo resultados"],
  },
  {
    contactMessages: [],
    replyOptions: ["Quero ver meu Resultado"],
  },
  {
    contactMessages: [
      {
        text: `Antes de enviar seu Resultado

Vou te fazer essa garantia porque sei o quanto é frustrante tentar e não ver resultado.
Por isso, se você seguir tudo direitinho e não perder pelo menos 9kg na primeira semana, eu te envio R$100 no seu PIX, pelo o WhatsApp`,
        delay: 1000,
      },
    ],
    replyOptions: ["Quero ver meu resultado, com a garantia de R$100 no PIX se eu não emagrecer."],
  },
  {
    contactMessages: [
      {
        text: `🎉Parabéns!

Seu perfil foi analisado com sucesso! Baseado nas suas respostas, preparamos um plano personalizado do Truque da Gelatina especialmente para você.

Você está a um clique de descobrir como perder peso de forma natural, sem dietas restritivas e sem efeito sanfona. E com a garantia de perder pelo menos 9kg em uma semana!`,
        delay: 2000,
      },
      {
        text: `Você vai receber:
✅ A receita do Truque da Gelatina
✅ Vídeo com o passo a passo
✅ Horários corretos para consumir

Efeitos no corpo:

Menos fome

Queima de gordura localizada

Metabolismo mais acelerado

Corpo menos inchado

Efeito semelhante ao Mounjaro, de forma natural

Garanta sua receita: https://pay.cakto.com.br/ywzy9kp_719317`,
        delay: 2000,
      },
    ],
    replyOptions: [],
  },
];

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showReplyOptions, setShowReplyOptions] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<{ text: string; delay: number }[]>([]);
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

      const currentMessage = pendingMessages[0];
      const typingDuration = Math.min(currentMessage.delay, 2000);

      const timer = setTimeout(() => {
        setIsTyping(false);
        const [nextMessage, ...remainingMessages] = pendingMessages;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: nextMessage.text,
            isUser: false,
            time: getCurrentTime(),
          },
        ]);

        if (remainingMessages.length > 0) {
          setTimeout(() => {
            setPendingMessages(remainingMessages);
          }, remainingMessages[0].delay - typingDuration);
        } else {
          setPendingMessages([]);
          setShowReplyOptions(true);
        }
      }, typingDuration);

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
      const nextMessages = chatFlow[nextStep].contactMessages;
      if (nextMessages.length > 0) {
        setTimeout(() => {
          setPendingMessages(nextMessages);
        }, 500);
      } else {
        // If no messages, show reply options immediately
        setTimeout(() => {
          setShowReplyOptions(true);
        }, 500);
      }
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
      {showReplyOptions && currentStep < chatFlow.length && chatFlow[currentStep].replyOptions.length > 0 && (
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
      {currentStep >= chatFlow.length - 1 && !isTyping && !showReplyOptions && messages.length > 0 && (
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
