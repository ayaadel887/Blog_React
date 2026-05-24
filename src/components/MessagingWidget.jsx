import React, { useState } from "react";

export default function MessagingWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock messaging list with names matching comments and feeds from screenshot
  const mockChats = [
    {
      id: 1,
      name: "Yara Nasser",
      headline: "Software Testing Student @ ITI",
      message: "Thrilled to share my CTFL-PT ISTQB certificate!",
      initials: "YN",
      avatarBg: "#2563eb",
      active: true,
    },
    {
      id: 2,
      name: "Rania Atef",
      headline: "Software Engineer @ Premast",
      message: "congratulations ya yaraaaaaa 🥳❤️",
      initials: "RA",
      avatarBg: "#057642",
      active: true,
    },
    {
      id: 3,
      name: "Amr Khattab",
      headline: "Exsys Solution Senior Partner",
      message: "Good job on completing the testing phase.",
      initials: "AK",
      avatarBg: "#c37d16",
      active: false,
    },
  ];

  return (
    <div
      className="messaging-widget-panel"
      style={{
        height: isOpen ? "430px" : "44px",
        overflow: "hidden",
        borderBottom: "none",
      }}
    >
      {/* Header (clickable to toggle) */}
      <div
        className="messaging-widget-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <div className="d-flex align-items-center">
          <span className="messaging-widget-status"></span>
          <span>Messaging</span>
        </div>
        <div className="d-flex align-items-center gap-3 text-muted">
          <i className="fa fa-pencil-square-o"></i>
          <i className={`fa fa-chevron-${isOpen ? "down" : "up"}`}></i>
        </div>
      </div>

      {/* Messaging Body */}
      {isOpen && (
        <div className="messaging-widget-body">
          {/* Search Box */}
          <div className="position-relative mb-2">
            <input
              type="text"
              placeholder="Search messages"
              className="form-control-premium py-1 ps-4"
              style={{ fontSize: "12px", width: "100%", height: "30px", borderRadius: "6px" }}
            />
            <i
              className="fa fa-search text-muted position-absolute"
              style={{ left: "10px", top: "50%", transform: "translateY(-50%)", fontSize: "11px" }}
            ></i>
          </div>

          {/* Chats list */}
          <div className="d-flex flex-column">
            {mockChats.map((chat) => (
              <div key={chat.id} className="chat-item">
                <div
                  className="chat-item-avatar"
                  style={{
                    backgroundColor: chat.avatarBg,
                    position: "relative",
                  }}
                >
                  {chat.initials}
                  {chat.active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#057642",
                        borderRadius: "50%",
                        border: "1.5px solid white",
                      }}
                    ></span>
                  )}
                </div>
                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="chat-item-name text-truncate" style={{ maxWidth: "150px" }}>{chat.name}</h6>
                    <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>May 22</span>
                  </div>
                  <p className="chat-item-message">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
