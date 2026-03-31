# cyber-security# 🛡️ Cybersecurity Intern Task: User Management System

A complete demonstration of web application vulnerabilities (XSS, SQL Injection, Weak Password Storage) and their security fixes using modern Node.js practices.

---

## 📋 Task Overview

| Week | Focus Area |
|------|------------|
| Week 1 | Security Assessment & Vulnerability Testing |
| Week 2 | Implementing Security Measures |
| Week 3 | Advanced Security & Final Reporting |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- OWASP ZAP (for scanning)

### Installation
```bash
git clone https://github.com/assistantqwerty/cyber-security.git
cd cyber-security
npm install
🔴 Vulnerable Application (app.js)
Run: node app.js
Visit: http://localhost:3000

Vulnerabilities to Test:
Vulnerability	Test Input	Expected Result
XSS	<script>alert('XSS');</script>	Alert popup appears
SQL Injection	Username: admin' OR '1'='1
Password: anything	Login successful
Weak Password Storage	Signup → View All Users	Password visible in plain text
🟢 Secure Application (fixed-app.js)
Run: node fixed-app.js
Visit: http://localhost:3000/secure

Security Fixes Implemented:
Vulnerability	Fix Applied	Library
XSS	Input sanitization	validator.escape()
SQL Injection	Password hashing + bcrypt	bcrypt.compare()
Weak Password Storage	Password hashing	bcrypt.hash()
Missing Authentication	Token-based auth	jsonwebtoken
Insecure Headers	Security headers	helmet()
No Logging	Security logging	winston
🔍 OWASP ZAP Scan Results
Target: http://localhost:3000 | Scan Type: Automated Scan

Alert	Risk Level	Count
Cross Site Scripting (Reflected)	High	2
Cross Site Scripting (Persistent)	High	2
SQL Injection	High	1
Missing Anti-CSRF Tokens	Medium	1
CSP Header Not Set	Medium	1
Missing Anti-clickjacking Header	Medium	1
📊 Project Structure
text
cyber-security/
├── app.js              # Vulnerable application
├── fixed-app.js        # Secure application
├── package.json        # Dependencies
├── package-lock.json   # Locked dependencies
├── README.md           # Documentation
├── security.log        # Winston logs
└── zap-report.pdf      # OWASP ZAP scan report
📋 Task Completion Checklist
#	Requirement	Status
1	Setup web application	✅
2	XSS testing with <script>alert('XSS');</script>	✅
3	SQL Injection with admin' OR '1'='1	✅
4	Weak password storage identification	✅
5	OWASP ZAP automated scanning	✅
6	Input sanitization (validator)	✅
7	Password hashing (bcrypt)	✅
8	JWT authentication	✅
9	Helmet.js for security headers	✅
10	Winston logging	✅
11	Video explanation	✅
12	GitHub repository	✅
13	Report document	✅
🎥 Video Demonstration
Vulnerable App Testing — XSS attack, SQL injection bypass, plain text passwords

OWASP ZAP Scan — Automated vulnerability detection, alert analysis, report generation

Secure App Demonstration — XSS prevention, SQL injection failure, password hashing, JWT authentication, security logging

📚 Technologies Used
Backend: Node.js, Express.js

Security Libraries: validator, bcrypt, jsonwebtoken, helmet, winston

Testing Tools: OWASP ZAP, Browser DevTools

Version Control: Git, GitHub
