const TypingIndicator = () => {
  return (
    <div className="flex justify-start px-4 py-2 message-appear">
      <div className="bg-whatsapp-bubbleContact rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
