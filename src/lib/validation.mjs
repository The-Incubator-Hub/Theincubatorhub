/**
 * Validates that an email address is well-formed.
 */
export function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validates password strength.
 * Requires: min 8 chars, uppercase, lowercase, number, special character.
 */
export function validatePassword(password) {
  if (!password || typeof password !== "string") return false;
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  return true;
}

/**
 * Returns a descriptive message for why a password fails validation.
 */
export function getPasswordStrengthMessage(password) {
  if (!password || password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must contain at least one special character.";
  return null;
}

/**
 * Validates a name string (non-empty, reasonable length).
 */
export function validateName(name) {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Sanitizes a string by trimming whitespace.
 */
export function sanitizeString(str) {
  if (!str || typeof str !== "string") return "";
  return str.trim();
}

/**
 * Validates a URL (must start with http/https).
 */
export function validateUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Validates a phone number (basic — allows common formats).
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  return /^\d{7,15}$/.test(cleaned);
}
