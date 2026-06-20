// ── Token Helpers ──────────────────────────────────────────
export function getToken() {
  return sessionStorage.getItem("kc_access_token");
}

export function isLoggedIn() {
  const token  = sessionStorage.getItem("kc_access_token");
  const expiry = sessionStorage.getItem("kc_token_expiry");
  return token && expiry && Date.now() < Number(expiry);
}

export function saveSession(data) {
  sessionStorage.setItem("kc_access_token",  data.access_token);
  sessionStorage.setItem("kc_refresh_token", data.refresh_token || "");
  sessionStorage.setItem("kc_token_expiry",  String(Date.now() + data.expires_in * 1000));
}

export function clearSession() {
  sessionStorage.removeItem("kc_access_token");
  sessionStorage.removeItem("kc_refresh_token");
  sessionStorage.removeItem("kc_token_expiry");
}