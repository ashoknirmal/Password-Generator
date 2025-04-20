import React, { useState, useEffect } from "react";
import { FaClipboard, FaRedo, FaMoon, FaSun } from "react-icons/fa";
import "./App.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generatePassword = () => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let allowedChars = "";

    if (includeUppercase) allowedChars += upperCaseChars;
    if (includeLowercase) allowedChars += lowerCaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (allowedChars.length === 0) return;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += allowedChars.charAt(
        Math.floor(Math.random() * allowedChars.length)
      );
    }
    setPassword(newPassword);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength === 1) return "Weak";
    if (strength === 2) return "Medium";
    if (strength >= 3) return "Strong";
    return "Too Short";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  useEffect(() => {
    if (autoGenerate) generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);
  

  return (
    <div className={`main-container ${darkMode ? "dark" : ""}`}>
      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-5 right-5 p-2 rounded-lg shadow-md transition-all duration-300">
        {darkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-800 text-2xl" />}
      </button>
      
      <h2 className="text-3xl font-bold mb-4">Password Generator</h2>
      
      <div className="card">
        <div className="flex items-center justify-between bg-gray-700 p-2 rounded mb-4 relative">
          <input type="text" value={password} readOnly className="w-full bg-transparent text-xl px-2 focus:outline-none" />
          <button onClick={copyToClipboard} className="text-yellow-500 relative">
            <FaClipboard size={20} />
            {copySuccess && <span className="absolute -top-6 text-xs text-green-400">Copied!</span>}
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <label>Password Length: {length}</label>
          <input type="range" min="6" max="24" value={length} onChange={(e) => setLength(e.target.value)} className="cursor-pointer" />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
            <span>Include Lowercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
            <span>Include Symbols</span>
          </label>
        </div>

        <label className="flex items-center space-x-2 mt-3">
          <input type="checkbox" checked={autoGenerate} onChange={() => setAutoGenerate(!autoGenerate)} />
          <span>Auto Regenerate</span>
        </label>

        <button onClick={generatePassword} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white flex items-center justify-center space-x-2 transition-all duration-300">
          <FaRedo />
          <span>Generate Password</span>
        </button>

        <div className="text-sm font-semibold mt-3">
          Strength: <span className={`text-${getPasswordStrength(password) === "Strong" ? "green" : getPasswordStrength(password) === "Medium" ? "yellow" : "red"}-500`}>{getPasswordStrength(password)}</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
