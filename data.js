(function (global) {
  'use strict';
  const SCENARIOS = [
    { id: 's01', type: 'sms', verdict: 'scam', body: 'Your account will be blocked. Update BVN at kora-bvn-update.co/verify', why: 'Fake link & urgency.' },
    { id: 'r01', type: 'sms', verdict: 'real', body: 'Debit Alert: Acct 2***4567 Amt: NGN 5,000. Bal: NGN 42,310. Call card support.', why: 'Genuine alert format.' }
  ];
  global.SpotData = { SCENARIOS };
})(window);
