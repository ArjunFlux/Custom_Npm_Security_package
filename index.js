#!/usr/bin/env node
// shebang tells OS to run with Node.js
console.log("Welcome to secure-scan, scanning your dependencies. Please wait...\n");
const fs = require("fs");
const recommendations = {
  express: [
    { package: "helmet", reason: "Protects against common HTTP header attacks", command: "npm i helmet" },
    { package: "express-rate-limit", reason: "Mitigates brute-force attacks", command: "npm i express-rate-limit" },
    { package: "rate-limiter-flexible", reason: "Advanced rate limiting with Redis/MongoDB support", command: "npm i rate-limiter-flexible" },
    { package: "csurf", reason: "Helps prevent CSRF attacks", command: "npm i csurf" },
    { package: "express-validator", reason: "Middleware for validating request data", command: "npm i express-validator" },
    { package: "xss-clean", reason: "Sanitizes user input against XSS", command: "npm i xss-clean" }
  ],
  mongoose: [
    { package: "sanitize-html", reason: "Helps prevent NoSQL injection", command: "npm i sanitize-html" },
    { package: "mongoose-sanitize", reason: "Database protection against NoSQL injection", command: "npm i mongoose-sanitize" }
  ],
  sql: [
    { package: "sqlstring", reason: "Safely escape SQL queries", command: "npm i sqlstring" }
  ],
  validation: [
    { package: "express-rate-limit", reason: "Mitigates brute-force attacks", command: "npm i express-rate-limit" },
    { package: "express-validator", reason: "Middleware for validating request data", command: "npm i express-validator" },
    { package: "zod", reason: "Schema-based validator, rejects malformed input", command: "npm i zod" }
  ],
  auth: [
    { package: "bcrypt", reason: "Hashes user passwords securely", command: "npm i bcrypt" },
    { package: "jsonwebtoken", reason: "Stateless token-based authentication, supports RBAC", command: "npm i jsonwebtoken" },
    { package: "passport", reason: "Plug-and-play authentication framework (session-based)", command: "npm i passport" }
  ],
  security_utils: [
    { package: "cors", reason: "Configure CORS securely", command: "npm i cors" },
    { package: "dotenv", reason: "Store and access sensitive info securely", command: "npm i dotenv" }
  ]
};

function getDependencies() {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  return Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
}

console.log("Suggesting packages which are important to add to avoid future security attacks:\n");

function suggestSecurity(deps) {
  Object.keys(recommendations).forEach(category => {
    const missing = recommendations[category].filter(pkg => !deps.includes(pkg.package));
    if (missing.length > 0) {
      console.log(`For ${category}, install these to secure:\n`);
      missing.forEach(pkg =>
        console.log(`\t- ${pkg.package}: ${pkg.reason} , \n\t Command: ${pkg.command}`)
      );
      console.log(""); 
    }
  });
}

const deps = getDependencies();
suggestSecurity(deps);
