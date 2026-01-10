interface ReplyButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const ReplyButton = ({ text, onClick, disabled }: ReplyButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-whatsapp-replyBtn text-primary-foreground py-3 px-4 rounded-full font-medium text-sm shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed message-appear"
    >
      {text}
    </button>
  );
};

export default ReplyButton;
