// Client helper: send a public-form submission to the hardened API route.
// All public forms go through here so validation/rate-limiting/honeypot are
// enforced server-side, never in the browser.
export async function submitLead(payload) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Submission failed. Please try again or call us directly.';
    if (res.status === 429) message = 'Please wait a moment before submitting again.';
    try {
      const data = await res.json();
      if (Array.isArray(data?.details) && data.details.length) {
        message = `Please check your details: ${data.details.join(', ')}.`;
      }
    } catch {
      /* ignore parse errors, keep default message */
    }
    throw new Error(message);
  }
  return res.json();
}

// Visually-hidden honeypot input props. Bots fill it; humans never see it.
export const honeypotInputProps = {
  type: 'text',
  name: 'company',
  tabIndex: -1,
  autoComplete: 'off',
  'aria-hidden': true,
  style: {
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
    opacity: 0,
    pointerEvents: 'none',
  },
};
