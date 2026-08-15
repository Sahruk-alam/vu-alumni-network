import { useState } from "react";
import {
  PiUserPlus,
  PiCheckCircle,
  PiBriefcase,
  PiChatCircle,
  PiFileText,
  PiSparkle,
  PiCalendar,
  PiBell,
  PiTrash,
} from "react-icons/pi";

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "connection",
      title: "New connection request",
      message: "Farhana Akter sent you a connection request.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "job",
      title: "New internship opportunity",
      message:
        "Frontend Developer Intern at Brain Station 23 matches your skills.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "message",
      title: "New message",
      message: "Nusrat Jahan sent you a message.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "accepted",
      title: "Connection accepted",
      message: "Tanvir Hasan accepted your connection request.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "document",
      title: "New document shared",
      message: "Nusrat Jahan shared a PDF with you.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 6,
      type: "ai",
      title: "AI recommendation",
      message:
        "3 new jobs match your React and JavaScript skills.",
      time: "2 days ago",
      read: true,
    },
    {
      id: 7,
      type: "deadline",
      title: "Application deadline",
      message:
        "Frontend Developer Intern application closes tomorrow.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  // Unread count
  const unreadCount = alerts.filter(
    (alert) => !alert.read
  ).length;

  // Mark single alert as read
  const markAsRead = (id) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, read: true }
          : alert
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setAlerts(
      alerts.map((alert) => ({
        ...alert,
        read: true,
      }))
    );
  };

  // Delete alert
  const deleteAlert = (id) => {
    setAlerts(
      alerts.filter((alert) => alert.id !== id)
    );
  };

  // Clear all
  const clearAll = () => {
    setAlerts([]);
  };

  // Filter
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "unread") {
      return !alert.read;
    }

    return true;
  });

  // Icon
  const getIcon = (type) => {
    switch (type) {
      case "connection":
        return <PiUserPlus size={22} />;

      case "accepted":
        return <PiCheckCircle size={22} />;

      case "job":
        return <PiBriefcase size={22} />;

      case "message":
        return <PiChatCircle size={22} />;

      case "document":
        return <PiFileText size={22} />;

      case "ai":
        return <PiSparkle size={22} />;

      case "deadline":
        return <PiCalendar size={22} />;

      default:
        return <PiBell size={22} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-950">
              Alerts
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Stay updated with your university network.
            </p>
          </div>

          {/* Unread count */}
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
              {unreadCount} unread
            </span>
          )}
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

          {/* Filters */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1">

            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm ${
                filter === "all"
                  ? "bg-white font-medium shadow-sm"
                  : "text-slate-500"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`rounded-lg px-4 py-2 text-sm ${
                filter === "unread"
                  ? "bg-white font-medium shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Unread
            </button>

          </div>

          {/* Actions */}
          <div className="flex gap-2">

            <button
              onClick={markAllAsRead}
              className="btn btn-sm rounded-xl border border-slate-200 bg-white font-normal"
            >
              Mark all as read
            </button>

            <button
              onClick={clearAll}
              className="btn btn-sm rounded-xl border border-slate-200 bg-white font-normal text-red-500"
            >
              <PiTrash size={17} />
              Clear all
            </button>

          </div>
        </div>

        {/* ================= ALERT LIST ================= */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center">

              <PiBell
                size={42}
                className="mx-auto text-slate-300"
              />

              <h2 className="mt-3 font-semibold text-slate-900">
                No alerts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                You're all caught up!
              </p>

            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => markAsRead(alert.id)}
                className={`flex cursor-pointer items-start gap-4 border-b border-slate-200 p-4 transition hover:bg-slate-50 ${
                  !alert.read ? "bg-blue-50/50" : "bg-white"
                }`}
              >

                {/* Icon */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    !alert.read
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {getIcon(alert.type)}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h2
                        className={`text-sm ${
                          !alert.read
                            ? "font-semibold text-slate-950"
                            : "font-medium text-slate-700"
                        }`}
                      >
                        {alert.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {alert.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {alert.time}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {!alert.read && (
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600"></span>
                    )}

                  </div>

                </div>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteAlert(alert.id);
                  }}
                  className="text-slate-300 hover:text-red-500"
                >
                  <PiTrash size={18} />
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
};

export default Alerts;