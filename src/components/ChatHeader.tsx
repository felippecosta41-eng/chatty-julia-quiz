import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="bg-whatsapp-header text-primary-foreground px-3 py-2 flex items-center gap-3 shadow-md">
      <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <div className="relative">
        <img
          src="/attached_assets/6bfec094-f64b-45df-b023-c0467ab5d47d_1768960131776.jpg"
          alt="Dra Marcela"
          className="w-10 h-10 rounded-full object-cover border-2 border-whatsapp-online"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp-online rounded-full border-2 border-whatsapp-header" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h1 className="font-semibold text-base truncate">Dra Marcela</h1>
        <p className="text-xs text-primary-foreground/80">online</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Video className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Phone className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
