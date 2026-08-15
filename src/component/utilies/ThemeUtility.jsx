import Swal from "sweetalert2";

const getThemeOptions = () => {
  const root = document.documentElement;
  const isDarkMode =
    root.classList.contains("dark") ||
    root.getAttribute("data-theme") === "dark";

  return {
    background: isDarkMode ? "#0f172a" : "#ffffff",
    color: isDarkMode ? "#f8fafc" : "#0f172a",
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#ef4444",
  };
};

export const fireThemedAlert = (options) => {
  return Swal.fire({
    ...getThemeOptions(),
    ...options,
  });
};
