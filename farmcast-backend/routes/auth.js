// ============================================
// ROUTE — auth.js
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/auth/me  (protected)
// ============================================

const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const crypto   = require('crypto');
const { Resend } = require('resend');

const User     = require('../models/User');
const authMW   = require('../middleware/auth');

const resend = new Resend(process.env.RESEND_API_KEY);

// ── REGISTER ──
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name, farmName } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: 'Please fill in all required fields.' });

    // Check if user already exists
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing)
      return res.status(400).json({ message: 'Username or email already taken.' });

    // Hash password
    const salt     = await bcrypt.genSalt(10);
    const hashed   = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username, email,
      password: hashed,
      name: name || username,
      farmName: farmName || 'My Farm',
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registered successfully! Welcome to FarmCast 🌾',
      token,
      user: { id: user._id, username: user.username, name: user.name, farmName: user.farmName, avatar: user.avatar }
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ── LOGIN ──
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: 'Please enter username and password.' });

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    if (!user)
      return res.status(400).json({ message: 'Invalid username or password.' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid username or password.' });

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: `Welcome back, ${user.name || user.username}! 🌾`,
      token,
      user: {
        id: user._id, username: user.username,
        name: user.name, farmName: user.farmName,
        farmSize: user.farmSize, role: user.role,
        avatar: user.avatar, city: user.city,
        email: user.email, phone: user.phone,
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ── GET CURRENT USER (protected) ──
router.get('/me', authMW, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// ── FORGOT PASSWORD ──
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const genericMessage =
      'If an account exists for this email, a password reset link has been sent.';

    if (!email) {
      return res.status(400).json({
        message: 'Please enter your email address.'
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    // Do not reveal whether an account exists
    if (!user) {
      return res.json({
        message: genericMessage
      });
    }

    // Generate secure raw token
    const rawToken =
      crypto.randomBytes(32).toString('hex');

    // Store only SHA-256 hash in MongoDB
    const hashedToken =
      crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

    user.resetPasswordToken = hashedToken;

    // Expires after 15 minutes
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // GitHub Pages password-reset URL
    const resetUrl =
      `https://kyross101.github.io/farmcast/reset-password.html?token=${encodeURIComponent(rawToken)}`;

    // Send email through Resend
    const { error } = await resend.emails.send({
      from: 'FarmCast <onboarding@resend.dev>',
      to: [user.email],

      subject: 'Reset your FarmCast password',

      html: `
        <!DOCTYPE html>
        <html>
        <body style="
          margin:0;
          padding:0;
          background:#0d1117;
          font-family:Arial,sans-serif;
        ">

          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#0d1117;
              padding:35px 15px;
            "
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width:520px;
                    background:#161b22;
                    border:1px solid #30363d;
                    border-radius:20px;
                    overflow:hidden;
                  "
                >

                  <tr>
                    <td
                      align="center"
                      style="
                        padding:32px 25px 15px;
                      "
                    >
                      <div style="
                        font-size:44px;
                        margin-bottom:8px;
                      ">
                        🌾
                      </div>

                      <div style="
                        color:#3fb950;
                        font-size:24px;
                        font-weight:700;
                      ">
                        FarmCast
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      padding:10px 30px 32px;
                      color:#c9d1d9;
                    ">

                      <h2 style="
                        margin:0 0 12px;
                        color:#ffffff;
                        text-align:center;
                        font-size:22px;
                      ">
                        Reset your password
                      </h2>

                      <p style="
                        margin:0 0 18px;
                        color:#8b949e;
                        text-align:center;
                        line-height:1.6;
                        font-size:14px;
                      ">
                        We received a request to reset the password
                        for your FarmCast account.
                      </p>

                      <div style="
                        text-align:center;
                        margin:28px 0;
                      ">

                        <a
                          href="${resetUrl}"
                          style="
                            display:inline-block;
                            padding:14px 26px;
                            background:#2ea043;
                            color:#ffffff;
                            text-decoration:none;
                            border-radius:10px;
                            font-weight:700;
                            font-size:14px;
                          "
                        >
                          Reset Password
                        </a>

                      </div>

                      <p style="
                        color:#8b949e;
                        font-size:13px;
                        line-height:1.6;
                      ">
                        This reset link expires in
                        <strong style="color:#c9d1d9;">
                          15 minutes
                        </strong>.
                      </p>

                      <p style="
                        color:#8b949e;
                        font-size:13px;
                        line-height:1.6;
                        margin-bottom:0;
                      ">
                        If you did not request a password reset,
                        you can safely ignore this email.
                      </p>

                    </td>
                  </tr>

                  <tr>
                    <td style="
                      border-top:1px solid #30363d;
                      padding:18px;
                      text-align:center;
                      color:#6e7681;
                      font-size:11px;
                    ">
                      FarmCast · Smart farming made simpler 🌱
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `
    });

    if (error) {
      console.error(
        'Resend email error:',
        error
      );

      // Delete token because the email was not sent
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      return res.status(500).json({
        message:
          'Unable to send password reset email right now.'
      });
    }

    res.json({
      message: genericMessage
    });

  } catch (err) {
    console.error(
      'Forgot password error:',
      err
    );

    res.status(500).json({
      message:
        'Server error while requesting password reset.'
    });
  }
});


// ── RESET PASSWORD ──
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: 'Reset token and new password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters.'
      });
    }

    // Hash incoming token so it matches database value
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'Reset link is invalid or has expired.'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Invalidate reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.json({
      message: 'Password changed successfully. You can now log in.'
    });

  } catch (err) {
    console.error('Reset password error:', err);

    res.status(500).json({
      message: 'Server error while resetting password.'
    });
  }
});

// ── UPDATE PROFILE (protected) ──
router.put('/profile', authMW, async (req, res) => {
  try {
    const { name, farmName, farmSize, role, phone, avatar, city, lat, lon } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, farmName, farmSize, role, phone, avatar, city, lat, lon },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated!', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
