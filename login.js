// ============================================
// FARMCAST — login.js
// Connected to backend API
// ============================================

const BACKEND_URL = 'https://farmcast-r0hs.onrender.com/api';

const container   = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn    = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click',    () => container.classList.remove('active'));

// ── TOAST ──
function showtoast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    background   : type === 'success' ? '#3fb950' : type === 'warn' ? '#e3a008' : '#f85149',
    color        : '#fff',
    padding      : '12px 20px',
    marginTop    : '10px',
    borderRadius : '8px',
    boxShadow    : '0 4px 12px rgba(0,0,0,0.3)',
    fontFamily   : 'Poppins, sans-serif',
    fontSize     : '0.9rem',
    fontWeight   : '600',
    opacity      : '0',
    transform    : 'translateX(40px)',
    transition   : 'all 0.4s ease',
    minWidth     : '220px',
    borderLeft   : `4px solid ${type==='success'?'#2ea043':type==='warn'?'#b07800':'#a52525'}`,
  });
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateX(0)';
  });
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateX(40px)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ── LOADING STATE ──
function setLoading(btn, loading) {
  btn.disabled    = loading;
  btn.textContent = loading ? 'Loading…' : btn.dataset.label;
}

// ── LOGIN ──
const loginForm = document.querySelector('.login form');
const loginSubmitBtn = loginForm.querySelector('button[type="submit"]');
loginSubmitBtn.dataset.label = 'Login';

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = loginForm.querySelector('input[placeholder="Username"]').value.trim();
  const password = loginForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!username || !password) {
    showtoast('Please fill in all fields.', 'error'); return;
  }

  setLoading(loginSubmitBtn, true);

  try {
    const res  = await fetch(`${BACKEND_URL}/auth/login`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (!res.ok) {
      showtoast(data.message || 'Invalid username or password.', 'error');
      setLoading(loginSubmitBtn, false);
      return;
    }

    // Save token and user info
    localStorage.setItem('fc_token', data.token);
    localStorage.setItem('fc_authUser', JSON.stringify(data.user));

    showtoast(`Welcome back, ${data.user.name || data.user.username}! 🌾`, 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);

  } catch (err) {
    showtoast('Cannot connect to server. Is the backend running?', 'error');
    setLoading(loginSubmitBtn, false);
  }
});

// ── REGISTER ──
const registerForm    = document.querySelector('.register form');
const registerSubmitBtn = registerForm.querySelector('button[type="submit"]');
registerSubmitBtn.dataset.label = 'Register';

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = registerForm.querySelector('input[placeholder="Username"]').value.trim();
  const email    = registerForm.querySelector('input[placeholder="Email"]').value.trim();
  const password = registerForm.querySelector('input[placeholder="Password"]').value.trim();

  if (!username || !email || !password) {
    showtoast('Please fill in all fields.', 'error'); return;
  }
  if (password.length < 6) {
    showtoast('Password must be at least 6 characters.', 'error'); return;
  }

  setLoading(registerSubmitBtn, true);

  try {
    const res  = await fetch(`${BACKEND_URL}/auth/register`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ username, email, password, name: username })
    });
    const data = await res.json();

    if (!res.ok) {
      showtoast(data.message || 'Registration failed.', 'error');
      setLoading(registerSubmitBtn, false);
      return;
    }

    // Save token and user info
    localStorage.setItem('fc_token', data.token);
    localStorage.setItem('fc_authUser', JSON.stringify(data.user));

    showtoast(`Registered successfully! Welcome, ${data.user.username}! 🌱`, 'success');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);

  } catch (err) {
    showtoast('Cannot connect to server. Is the backend running?', 'error');
    setLoading(registerSubmitBtn, false);
  }
});
