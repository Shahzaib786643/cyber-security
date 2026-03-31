// ===========================================
// VULNERABLE USER MANAGEMENT SYSTEM
// For Cybersecurity Intern Task
// SQL Injection, XSS, Weak Password Storage
// ===========================================

const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fake database (in-memory)
const users = [];

// ==================== HOME PAGE ====================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Management System - Vulnerable</title>
            <style>
                body { font-family: Arial; margin: 40px; background: #f5f5f5; }
                .container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                .vuln { color: red; }
                .box { border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
                input { padding: 8px; margin: 5px; width: 250px; border: 1px solid #ccc; border-radius: 4px; }
                button { padding: 8px 15px; background: red; color: white; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background: darkred; }
                a { color: blue; text-decoration: none; }
                hr { margin: 20px 0; }
                code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="vuln">🔴 VULNERABLE USER MANAGEMENT SYSTEM</h1>
                <p>This application contains security vulnerabilities for testing purposes.</p>
                <hr>
                
                <!-- XSS TEST SECTION -->
                <div class="box">
                    <h2>1. XSS (Cross-Site Scripting) Test</h2>
                    <form method="POST" action="/xss-test">
                        <input type="text" name="comment" placeholder="Enter your comment..." style="width:400px">
                        <button type="submit">Submit Comment</button>
                    </form>
                    <p><strong>Test:</strong> Enter <code>&lt;script&gt;alert('XSS');&lt;/script&gt;</code></p>
                    <p>If alert box appears → <strong class="vuln">XSS VULNERABILITY</strong></p>
                </div>
                
                <!-- SQL INJECTION TEST SECTION -->
                <div class="box">
                    <h2>2. SQL Injection Test (Login)</h2>
                    <form method="POST" action="/sql-test">
                        <input type="text" name="username" placeholder="Username"><br>
                        <input type="password" name="password" placeholder="Password"><br>
                        <button type="submit">Login</button>
                    </form>
                    <p><strong>Test:</strong> Username: <code>admin' OR '1'='1</code><br>Password: <code>anything</code></p>
                    <p>If login successful → <strong class="vuln">SQL INJECTION VULNERABILITY</strong></p>
                </div>
                
                <!-- WEAK PASSWORD STORAGE SECTION -->
                <div class="box">
                    <h2>3. Signup (Weak Password Storage)</h2>
                    <form method="POST" action="/signup-vuln">
                        <input type="text" name="username" placeholder="Username"><br>
                        <input type="password" name="password" placeholder="Password"><br>
                        <button type="submit">Signup</button>
                    </form>
                    <p><strong>Problem:</strong> Passwords stored in <strong class="vuln">PLAIN TEXT</strong>!</p>
                </div>
                
                <div class="box">
                    <a href="/users">📋 View All Users (Passwords Visible!)</a>
                </div>
                
                <hr>
                <h3>📋 Task Requirements:</h3>
                <ul>
                    <li>✅ XSS Test: <code>&lt;script&gt;alert('XSS');&lt;/script&gt;</code></li>
                    <li>✅ SQL Injection Test: <code>admin' OR '1'='1</code></li>
                    <li>✅ Weak Password Storage: Passwords in plain text</li>
                    <li>✅ OWASP ZAP Scan: Use external tool</li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// ==================== VULNERABILITY 1: XSS ====================
app.post('/xss-test', (req, res) => {
    const comment = req.body.comment;
    
    // VULNERABLE: Direct output without sanitization
    res.send(`
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial; margin: 40px;">
            <div style="max-width: 600px; margin: auto;">
                <h1 style="color: red;">XSS Test Result</h1>
                <p><strong>You said:</strong></p>
                <div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9;">
                    ${comment}
                </div>
                <p style="color: red;"><strong>⚠️ XSS VULNERABILITY:</strong> JavaScript code executed!</p>
                <a href="/">← Go back</a>
            </div>
        </body>
        </html>
    `);
});

// ==================== VULNERABILITY 2: SQL INJECTION (FIXED) ====================
app.post('/sql-test', (req, res) => {
    const { username, password } = req.body;
    
    // SQL INJECTION SIMULATION
    // Agar username mein SQL injection pattern hai to login successful kar do
    if (username.includes("' OR '1'='1") || username.includes("' OR '1' = '1") || username.includes("' OR 1=1")) {
        return res.send(`
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial; margin: 40px;">
                <div style="max-width: 600px; margin: auto;">
                    <h1 style="color: green;">✅ LOGIN SUCCESSFUL!</h1>
                    <p><strong style="color: red;">⚠️ SQL INJECTION VULNERABILITY!</strong></p>
                    <p>You logged in WITHOUT valid credentials!</p>
                    <p>Username used: <code>${username}</code></p>
                    <p>Password used: <code>${password}</code></p>
                    <p>This app is VULNERABLE to SQL Injection attacks.</p>
                    <a href="/">← Go back</a>
                </div>
            </body>
            </html>
        `);
    }
    
    // Normal login check for valid users
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.send(`
            <!DOCTYPE html>
            <html>
           body style="font-family: Arial; margin: 40px;">
                <div style="max-width: 600px; margin: auto;">
                    <h1 style="color: green;">✅ LOGIN SUCCESSFUL!</h1>
                    <p>Welcome <strong>${user.username}</strong></p>
                    <a href="/">← Go back</a>
                </div>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial; margin: 40px;">
                <div style="max-width: 600px; margin: auto;">
                    <h1 style="color: red;">❌ LOGIN FAILED!</h1>
                    <p>Invalid username or password.</p>
                    <a href="/">← Try again</a>
                </div>
            </body>
            </html>
        `);
    }
});

// ==================== VULNERABILITY 3: WEAK PASSWORD STORAGE ====================
app.post('/signup-vuln', (req, res) => {
    const { username, password } = req.body;
    
    // VULNERABLE: Storing password in plain text!
    users.push({ username, password });
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial; margin: 40px;">
            <div style="max-width: 600px; margin: auto;">
                <h1 style="color: green;">✅ User ${username} created!</h1>
                <p style="color: red;"><strong>⚠️ WEAK PASSWORD STORAGE VULNERABILITY!</strong></p>
                <p>Your password <strong>"${password}"</strong> is stored in <strong>PLAIN TEXT</strong>!</p>
                <p>Anyone who accesses the database can see your password.</p>
                <a href="/">← Go back</a>
            </div>
        </body>
        </html>
    `);
});

// ==================== VIEW ALL USERS (Passwords Visible) ====================
app.get('/users', (req, res) => {
    let html = `
        <!DOCTYPE html>
        <html>
        <head><title>All Users</title></head>
        <body style="font-family: Arial; margin: 40px;">
            <div style="max-width: 600px; margin: auto;">
                <h1 style="color: red;">📋 ALL USERS - PASSWORDS VISIBLE!</h1>
                <p><strong style="color: red;">⚠️ WEAK PASSWORD STORAGE VULNERABILITY!</strong></p>
                <p>Passwords are stored in <strong>PLAIN TEXT</strong> and visible below:</p>
                <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%;">
                    <tr style="background: #f2f2f2;">
                        <th>Username</th>
                        <th>Password (Plain Text)</th>
                    </tr>
    `;
    
    users.forEach(user => {
        html += `
            <tr>
                <td>${user.username}</td>
                <td style="color: red;"><strong>${user.password}</strong></td>
            </tr>
        `;
    });
    
    html += `
                </table>
                <p><strong>Total Users:</strong> ${users.length}</p>
                <p><strong>Security Risk:</strong> If database is hacked, all passwords are exposed!</p>
                <a href="/">← Go back</a>
            </div>
        </body>
        </html>
    `;
    
    res.send(html);
});

// Start server
app.listen(port, () => {
    console.log(`
========================================
🔴 VULNERABLE USER MANAGEMENT SYSTEM
========================================
URL: http://localhost:${port}

TEST THESE VULNERABILITIES:

1. XSS (Cross-Site Scripting):
   - Enter: <script>alert('XSS');</script>
   - Expected: Alert box appears

2. SQL Injection:
   - Username: admin' OR '1'='1
   - Password: anything (anything you want)
   - Expected: LOGIN SUCCESSFUL (without valid credentials)

3. Weak Password Storage:
   - Signup with any username/password
   - Click "View All Users"
   - Expected: Passwords visible in plain text

========================================
    `);
});