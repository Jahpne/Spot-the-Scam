/* ==========================================================================
   scan.js  |  SPOT THE SCAM  |  External DB & Lightning Scanner
   ========================================================================== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  let cachedDB = null;

  async function loadDatabase() {
    if (cachedDB) return cachedDB;
    try {
      const res = await fetch('https://scam-db-five.vercel.app/scam-db.json');
      cachedDB = await res.json();
      return cachedDB;
    } catch (e) {
      console.warn('Network offline or DB unreachable, using local fallback rules.', e);
      return { scenarios: [] };
    }
  }

  async function performScan(text) {
    const status = $('#scan-status');
    const results = $('#scan-results');
    results.hidden = false;
    status.textContent = 'Checking against 1,543+ database entries...';

    const cleanText = text.toLowerCase().trim();

    // 1. Check external database first
    const db = await loadDatabase();
    const match = db.scenarios && db.scenarios.find(s => cleanText.includes(s.text.toLowerCase().slice(0, 25)));

    if (match) {
      const isScam = match.label === 'scam';
      results.innerHTML = `
        <div class="card-lite" style="border-left: 6px solid var(--${isScam ? 'scam' : 'real'}); margin-top: 10px;">
          <h3>Database Match: <span class="${isScam ? 'scam' : 'real'}">${match.label.toUpperCase()}</span></h3>
          <p class="dim">Category: <b>${match.category || 'General'}</b></p>
          <p><b>Why:</b> ${match.reason}</p>
        </div>
      `;
      status.textContent = 'Match found in Scam Database!';
      return;
    }

    // 2. Fall back to local rule engine if not explicitly found in DB
    status.textContent = 'Running rule engine check...';
    const ruleRes = Checker.analyzeRules(text);
    const isScamRule = ruleRes.verdict === 'scam';

    results.innerHTML = `
      <div class="card-lite" style="border-left: 6px solid var(--${isScamRule ? 'scam' : 'real'}); margin-top: 10px;">
        <h3>Verdict: <span class="${isScamRule ? 'scam' : 'real'}">${ruleRes.verdict.toUpperCase()}</span></h3>
        <p class="dim">Analyzed via local heuristic engine.</p>
        <p><b>Confidence:</b> ${ruleRes.confidence}</p>
      </div>
    `;
    status.textContent = 'Analysis complete!';
  }

  function setupUI() {
    const btnScanTab = $('#btn-scan-tab');
    if (!btnScanTab) return;

    btnScanTab.addEventListener('click', () => {
      $$('.screen').forEach(s => s.classList.remove('active'));
      $('#scan-screen').classList.add('active');
    });

    const btnRunScan = $('#btn-run-scan');
    if (btnRunScan) {
      btnRunScan.addEventListener('click', () => {
        const text = $('#scan-text-input').value.trim();
        if (!text) {
          alert('Please enter message text to analyze.');
          return;
        }
        performScan(text);
      });
    }

    // Preload database in the background when the app starts
    loadDatabase();
  }

  window.addEventListener('DOMContentLoaded', setupUI);
})();
      
