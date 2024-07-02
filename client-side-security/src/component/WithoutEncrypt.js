import React, { useState } from 'react';


function WithoutEncrypt() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert('Invalid email address');
        return;
    }

    // Store password directly without encryption
    localStorage.setItem('password', password);
    alert('Login successful with password stored without encryption.');

    // Set secure cookie for session management
    setCookie('sessionId', 'abc123', 1);
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
      <h2>Client-Side Security (WithoutEncrypted)</h2>
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

export default WithoutEncrypt;
