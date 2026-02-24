// ===============================
// AUTH CHECK FOR ALL PAGES
// ===============================
async function checkAuth() {
  const { data } = await supabase.auth.getUser();

  // If not logged in → send to login page
  if (!data.user) {
    if (!window.location.pathname.endsWith("index.html")) {
      window.location.href = "index.html";
    }
    return;
  }

  // If logged in → show header + sidebar
  const header = document.getElementById("header");
  const sidebar = document.getElementById("sidebar");
  const headerUser = document.getElementById("headerUser");

  if (header) header.style.display = "flex";
  if (sidebar) sidebar.style.display = "block";
  if (headerUser) headerUser.textContent = data.user.email;
}

// ===============================
// LOGOUT HANDLER
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await supabase.auth.signOut();
      window.location.href = "index.html";
    };
  }
});

// ===============================
// LOGIN PAGE LOGIC (index.html)
// ===============================
async function initLoginPage() {
  const loginCard = document.getElementById("loginCard");
  if (!loginCard) return; // Not on login page

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    // Already logged in → show dashboard
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("dashboardCard").style.display = "block";

    document.getElementById("header").style.display = "flex";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("headerUser").textContent = data.user.email;
  }

  // LOGIN BUTTON
  document.getElementById("loginBtn").onclick = async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("authMsg");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      msg.textContent = error.message;
    } else {
      location.reload();
    }
  };
}

// Run login logic if on index.html
initLoginPage();

// Run auth check on all pages
checkAuth();
