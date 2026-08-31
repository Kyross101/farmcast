// ============================================
// FARMCAST — reset-password.js
// ============================================

const BACKEND_URL =
  'https://beverage-replication-variables-flat.trycloudflare.com/api';

const resetForm =
  document.getElementById('resetPasswordForm');

const newPassword =
  document.getElementById('newPassword');

const confirmPassword =
  document.getElementById('confirmPassword');

const resetButton =
  document.getElementById('resetButton');

const resetMessage =
  document.getElementById('resetMessage');


// ============================================
// GET RESET TOKEN
// ============================================

// Temporary testing flow:
// token came from forgot-password request
let resetToken =
  sessionStorage.getItem('fc_reset_token');

// Later, when email reset links are enabled,
// token can come from:
// reset-password.html?token=xxxx

const urlParams =
  new URLSearchParams(window.location.search);

const urlToken =
  urlParams.get('token');

if (urlToken) {
  resetToken = urlToken;
}


// ============================================
// MESSAGE
// ============================================

function showMessage(message, type = 'error') {

  resetMessage.textContent = message;

  resetMessage.className =
    `reset-message ${type}`;
}


// ============================================
// PASSWORD VISIBILITY
// ============================================

document
  .querySelectorAll('.password-toggle')
  .forEach(button => {

    button.addEventListener('click', () => {

      const targetId =
        button.dataset.target;

      const input =
        document.getElementById(targetId);

      const icon =
        button.querySelector('i');

      if (input.type === 'password') {

        input.type = 'text';

        icon.className =
          'bx bx-hide';

        button.setAttribute(
          'aria-label',
          'Hide password'
        );

      } else {

        input.type = 'password';

        icon.className =
          'bx bx-show';

        button.setAttribute(
          'aria-label',
          'Show password'
        );

      }

    });

  });


// ============================================
// CHECK TOKEN
// ============================================

if (!resetToken) {

  showMessage(
    'No password reset request was found. Please request a new reset link.',
    'error'
  );

  resetButton.disabled = true;
}


// ============================================
// RESET PASSWORD
// ============================================

resetForm.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();

    const password =
      newPassword.value.trim();

    const confirm =
      confirmPassword.value.trim();


    // ── Validation ──

    if (!resetToken) {

      showMessage(
        'Your reset link is missing or invalid.',
        'error'
      );

      return;
    }


    if (!password || !confirm) {

      showMessage(
        'Please fill in both password fields.',
        'error'
      );

      return;
    }


    if (password.length < 6) {

      showMessage(
        'Password must be at least 6 characters.',
        'error'
      );

      return;
    }


    if (password !== confirm) {

      showMessage(
        'Passwords do not match.',
        'error'
      );

      return;
    }


    // ── Loading ──

    const originalText =
      resetButton.textContent;

    resetButton.disabled = true;
    resetButton.textContent =
      'Resetting...';


    try {

      const response = await fetch(
        `${BACKEND_URL}/auth/reset-password`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            token: resetToken,
            password
          })
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        showMessage(
          data.message ||
          'Unable to reset password.',
          'error'
        );

        resetButton.disabled = false;
        resetButton.textContent =
          originalText;

        return;
      }


      // ======================================
      // SUCCESS
      // ======================================

      sessionStorage.removeItem(
        'fc_reset_token'
      );

      resetToken = null;

      newPassword.value = '';
      confirmPassword.value = '';

      showMessage(
        'Password changed successfully! Redirecting to login...',
        'success'
      );

      resetButton.textContent =
        'Password Changed ✓';


      // Redirect to login
      setTimeout(() => {

        window.location.href =
          'login.html';

      }, 2000);


    } catch (error) {

      console.error(
        'Reset password error:',
        error
      );

      showMessage(
        'Cannot connect to the FarmCast server.',
        'error'
      );

      resetButton.disabled = false;
      resetButton.textContent =
        originalText;

    }

  }
);