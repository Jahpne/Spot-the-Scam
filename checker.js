/* ==========================================================================
   checker.js  |  Lightning-Fast Rule & Hybrid Engine
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Checker = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function analyzeRules(text) {
    text = String(text || '').toLowerCase();
    const hasPin = /(pin|otp|bvn|password|card number|cvv)/i.test(text);
    const hasFee = /(fee|charge|payment|send money first)/i.test(text);
    const hasSuspiciousLink = /(bit\.ly|tinyurl|\.top|\.xyz|\.click)/i.test(text);

    let verdict = 'real';
    if (hasPin || hasFee || hasSuspiciousLink) {
      verdict = 'scam';
    }
    return { verdict, confidence: 'high', text };
  }

  function classifyMessages(text) {
    return [
      { role: 'system', content: 'Decide if message is SCAM or REAL. Answer with one word.' },
      { role: 'user', content: text }
    ];
  }

  function parseVerdict(reply) {
    const m = /\b(scam|real)\b/i.exec(String(reply || ''));
    return m ? m[1].toLowerCase() : 'unsure';
  }

  return { analyzeRules, classifyMessages, parseVerdict };
});
