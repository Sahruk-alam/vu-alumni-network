import { useState } from "react";
import {CiSearch,CiImageOn,CiFileOn,
    CiPaperplane,
    CiImageOff,
    CiCirclePlus, 
} from "react-icons/ci";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);

  const users = [
    {
      name: "Nusrat Jahan",
      initials: "NJ",
      status: "Online now",
      preview: "Also prepare two React proje...",
      time: "09:21",
    },
    {
      name: "Tanvir Hasan",
      initials: "TH",
      status: "Online",
      preview: "Thank you bhaia! Trying to ...",
      time: "Yesterday",
    },
    {
      name: "Farhana Akter",
      initials: "FA",
      status: "Online",
      preview: "Are you joining the hackathon t...",
      time: "Mon",
    },
  ];

  const [messages, setMessages] = useState([
    {
      text: "Assalamu alaikum apu, I saw your internship post.",
      time: "09:12",
      sender: "me",
    },
    {
      text: "Walaikum assalam! Yes, are you applying?",
      time: "09:14",
      sender: "other",
    },
    {
      text: "Yes. Could you take a look at my portfolio?",
      time: "09:15",
      sender: "me",
    },
    {
      text: "Send the link, I'll review it tonight.",
      time: "09:20",
      sender: "other",
    },
    {
      text: "Also prepare two React projects to talk through.",
      time: "09:22",
      sender: "other",
    },
  ]);

  const currentUser = users[selectedUser];

  // File select
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only image and PDF files are allowed.");
      return;
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setAttachment({
      file,
      name: file.name,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    });
  };

  // Send message
  const handleSend = () => {
    if (!message.trim() && !attachment) return;

    const newMessage = {
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
      attachment: attachment,
    };

    setMessages([...messages, newMessage]);

    setMessage("");
    setAttachment(null);
  };

  return (
    <div className="h-[calc(100vh-100px)] p-3">
      <div className="mx-auto flex h-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* ================= LEFT SIDEBAR ================= */}
        <div className="w-[330px] shrink-0 border-r border-slate-200">

          {/* Header */}
          <div className="border-b border-slate-200 p-5">
            <h1 className="text-xl font-bold text-slate-950">
              Messages
            </h1>
          </div>

          {/* Users */}
          <div>
            {users.map((user, index) => (
              <button
                key={user.name}
                onClick={() => setSelectedUser(index)}
                className={`flex w-full items-center gap-3 border-b border-slate-200 p-4 text-left ${
                  selectedUser === index
                    ? "bg-blue-100"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-700">
                  {user.initials}

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                </div>

                {/* User info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-950">
                      {user.name}
                    </h2>

                    <span className="text-xs text-slate-500">
                      {user.time}
                    </span>
                  </div>

                  <p className="truncate text-sm text-slate-500">
                    {user.preview}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= CHAT ================= */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-slate-200 p-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-700">
              {currentUser.initials}
            </div>

            <div>
              <h2 className="font-semibold text-slate-950">
                {currentUser.name}
              </h2>

              <p className="text-xs text-slate-500">
                {currentUser.status}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-slate-50 p-5">

            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      msg.sender === "me"
                        ? "rounded-br-md bg-blue-600 text-white"
                        : "rounded-bl-md bg-white text-slate-900 shadow-sm"
                    }`}
                  >

                    {/* Text */}
                    {msg.text && (
                      <p className="text-sm leading-5">
                        {msg.text}
                      </p>
                    )}

                    {/* Attachment */}
                    {msg.attachment && (
                      <div className="mt-2">

                        {/* Image */}
                        {msg.attachment.type.startsWith("image/") && (
                          <img
                            src={msg.attachment.preview}
                            alt={msg.attachment.name}
                            className="max-h-64 max-w-full rounded-xl object-cover"
                          />
                        )}

                        {/* PDF */}
                        {msg.attachment.type === "application/pdf" && (
                          <div className="flex items-center gap-3 rounded-xl bg-white p-3 text-slate-900">
                            <CiFileOn
                              size={30}
                              className="text-red-500"
                            />

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {msg.attachment.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                PDF Document
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <p
                      className={`mt-1 text-[10px] ${
                        msg.sender === "me"
                          ? "text-blue-100"
                          : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= ATTACHMENT PREVIEW ================= */}
          {attachment && (
            <div className="border-t border-slate-200 bg-white px-4 pt-3">

              <div className="relative inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2">

                {/* Image Preview */}
                {attachment.type.startsWith("image/") && (
                  <img
                    src={attachment.preview}
                    alt={attachment.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                )}

                {/* PDF Preview */}
                {attachment.type === "application/pdf" && (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-red-50">
                    <CiFileOn
                      size={32}
                      className="text-red-500"
                    />
                  </div>
                )}

                <div className="max-w-[250px]">
                  <p className="truncate text-sm font-medium">
                    {attachment.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => setAttachment(null)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs text-white"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* ================= MESSAGE INPUT ================= */}
          <div className="border-t border-slate-200 bg-white p-3">

            <div className="flex items-center gap-2">

              {/* Attachment */}
              <label className="btn btn-circle btn-sm cursor-pointer border-none bg-white text-slate-500 shadow-none hover:bg-slate-100">
                {/* <CiPaperclip size={24} /> */}
                <CiCirclePlus className="bg-blue-500 rounded-2xl text-white p-0.5.5" size={24} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>

              {/* Message */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Write a message..."
                className="input input-bordered flex-1 rounded-xl" />

              {/* Send */}
              <button
                onClick={handleSend}
                className="btn btn-circle bg-blue-600 text-white hover:bg-blue-700">
                <CiPaperplane size={23} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Messages;