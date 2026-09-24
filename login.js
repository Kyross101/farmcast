// ============================================
// FARMCAST — login.js
// Connected to backend API
// ============================================

const BACKEND_URL = window.FARMCAST_CONFIG.API_URL;

const container   = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn    = document.querySelector('.login-btn');

const mobileRegisterBtn =
  document.getElementById(
    'mobileRegisterBtn'
  );

const mobileLoginBtn =
  document.getElementById(
    'mobileLoginBtn'
  );

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click',    () => container.classList.remove('active'));

if (mobileRegisterBtn) {
  mobileRegisterBtn.addEventListener(
    'click',
    () => {
      container.classList.add(
        'active'
      );
    }
  );
}

if (mobileLoginBtn) {
  mobileLoginBtn.addEventListener(
    'click',
    () => {
      container.classList.remove(
        'active'
      );
    }
  );
}

// ── TOAST ──
function showtoast(
  message,
  type = 'success'
) {

  let toastContainer =
    document.getElementById(
      'toast-container'
    );

  if (!toastContainer) {

    toastContainer =
      document.createElement(
        'div'
      );

    toastContainer.id =
      'toast-container';

    document.body.appendChild(
      toastContainer
    );
  }


  const toast =
    document.createElement(
      'div'
    );

  toast.className =
    `fc-toast fc-toast-${type}`;


  const icon =
    document.createElement(
      'i'
    );

  icon.className =
    type === 'success'
      ? 'bx bx-check-circle'
      : type === 'warn'
        ? 'bx bx-error'
        : 'bx bx-error-circle';


  const text =
    document.createElement(
      'span'
    );

  text.className =
    'fc-toast-message';

  text.textContent =
    message;


  toast.appendChild(icon);
  toast.appendChild(text);

  toastContainer.appendChild(
    toast
  );


  requestAnimationFrame(
    () => {
      toast.classList.add(
        'show'
      );
    }
  );


  setTimeout(
    () => {

      toast.classList.remove(
        'show'
      );

      setTimeout(
        () => toast.remove(),
        300
      );

    },
    3000
  );
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

    showtoast(
      `Welcome back, ${
        data.user.name ||
        data.user.username
      }!`,
      'success'
    );

    setTimeout(() => window.location.href = 'index.html', 1200);

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

    showtoast(
      `Registered successfully! Welcome, ${data.user.username}!`,
      'success'
    );
    setTimeout(() => window.location.href = 'index.html', 1200);

  } catch (err) {
    showtoast('Cannot connect to server. Is the backend running?', 'error');
    setLoading(registerSubmitBtn, false);
  }
});

// ============================================
// FORGOT PASSWORD
// ============================================

const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotModal        = document.getElementById('forgotModal');
const forgotClose        = document.getElementById('forgotClose');
const forgotBack         = document.getElementById('forgotBack');
const forgotSubmit       = document.getElementById('forgotSubmit');
const forgotEmail        = document.getElementById('forgotEmail');

function openForgotModal() {
  forgotModal.classList.add('show');

  setTimeout(() => {
    forgotEmail.focus();
  }, 150);
}

function closeForgotModal() {
  forgotModal.classList.remove('show');
  forgotEmail.value = '';
}

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  openForgotModal();
});

forgotClose.addEventListener('click', closeForgotModal);
forgotBack.addEventListener('click', closeForgotModal);

// Close when clicking outside modal card
forgotModal.addEventListener('click', (e) => {
  if (e.target === forgotModal) {
    closeForgotModal();
  }
});

// Close using Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && forgotModal.classList.contains('show')) {
    closeForgotModal();
  }
});

forgotSubmit.addEventListener('click', async () => {

  const email = forgotEmail.value.trim();

  if (!email) {
    showtoast('Please enter your email address.', 'error');
    return;
  }

  if (!forgotEmail.checkValidity()) {
    showtoast('Please enter a valid email address.', 'error');
    return;
  }

  const originalText = forgotSubmit.textContent;

  forgotSubmit.disabled = true;
  forgotSubmit.textContent = 'Sending...';

  try {

    const res = await fetch(
      `${BACKEND_URL}/auth/forgot-password`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      showtoast(
        data.message || 'Unable to process password reset.',
        'error'
      );

      return;
    }

    showtoast(
      'Password reset request created successfully.',
      'success'
    );

    showtoast(
  'If an account exists, a reset link has been sent to your email.',
  'success'
);

closeForgotModal();

  } catch (err) {

    console.error(err);

    showtoast(
      'Cannot connect to the FarmCast server.',
      'error'
    );

  } finally {

    forgotSubmit.disabled = false;
    forgotSubmit.textContent = originalText;

  }

});

// Press Enter inside email field
forgotEmail.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    forgotSubmit.click();
  }
});