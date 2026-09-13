// Conceptual Node/serverless route examples for Prompt Builder Beta Version.
// Adapt to Vercel, Netlify, Cloudflare Workers, Azure Functions, or your chosen host.
// Do NOT commit secrets. Configure them in the host's Environment Variables / Secrets area.

const OWNER_SUPPORT_EMAIL = process.env.OWNER_SUPPORT_EMAIL;      // Example: paulborbon@yahoo.com
const REFERRAL_EMAIL = process.env.REFERRAL_EMAIL;                // Example: borbon_pj@hotmail.com
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;

function clean(value, max=5000){ return String(value ?? '').replace(/[<>]/g,'').trim().slice(0,max); }
function json(status, body){ return new Response(JSON.stringify(body), {status, headers:{'Content-Type':'application/json'}}); }

export async function handleReferral(body){
  // Send server-side email to REFERRAL_EMAIL with subject "Maven Website Builder Inquiry".
  return {ok:true};
}
export async function handleSupport(formData){
  // Validate up to 5 screenshots, allowed image types, max 5 MB each.
  // Send server-side email to OWNER_SUPPORT_EMAIL with subject "Tech Support".
  return {ok:true};
}
export async function handleSiteReference(formData){
  // Send server-side email to OWNER_SUPPORT_EMAIL with subject "For site reference".
  // Keep commission information private unless the owner decides otherwise.
  return {ok:true};
}
export async function handleFeedback(body){
  // Store as status = "pending". Publish only after an authenticated owner approval action.
  return {ok:true, status:'pending'};
}
