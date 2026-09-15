window.PBSiteServices = {
  backendBase() {
    const configured = (window.PB_CONFIG?.backendUrl || "").trim();
    return configured.replace(/\/$/, "");
  },
  isConfigured() { return Boolean(this.backendBase()); },
  endpoint(name) {
    const path = window.PB_CONFIG?.endpoints?.[name];
    if (!path) throw new Error("Unknown site service endpoint.");
    const base = this.backendBase();
    if (!base) throw new Error("Online submission is not available yet. The site owner still needs to configure the secure service URL.");
    return base + path;
  },
  async sendJSON(name, payload) {
    const response = await fetch(this.endpoint(name), {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The request could not be completed.");
    return data;
  },
  async sendForm(name, formData) {
    const response = await fetch(this.endpoint(name), {method:"POST", body:formData});
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The request could not be completed.");
    return data;
  },  
  async get(name, params = {}) {
    const url = new URL(this.endpoint(name));

  // Add optional query parameters to the request.
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

    const response = await fetch(url.toString());

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "The request could not be completed.");
    }

    return data;
  }

};
