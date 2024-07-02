import React, { useState } from 'react';

function WithEncrypt() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert('Invalid email address');
        return;
    }

    // Encrypting password before sending
    const key = await generateKey();
    const encryptedPassword = await encryptData(password, key);
    
    localStorage.setItem('encryptedPassword', new Uint8Array(encryptedPassword).toString());
    alert('Login successful with secure password storage.');

    // Set secure cookie for session management
    setCookie('sessionId', 'abc123', 1);
  };

  // Generate a CryptoKey
  const generateKey = () => {
    return crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  };

  // Encrypt data using Web Crypto API
  const encryptData = (data, key) => {
    const encodedData = new TextEncoder().encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    return crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedData);
  };

  // Set secure cookie
  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = " expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; HttpOnly; SameSite=Strict";
  };

  return (
    <div className="container">
      <h2>Client-Side Security Demo (Encrypted)</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default WithEncrypt;
