
window.PBFile = {
  async saveText(text, suggestedName, mimeType = "text/plain") {
    // Chromium browsers on localhost/HTTPS can show a real Save As location picker.
    if ("showSaveFilePicker" in window) {
      try {
        const ext = suggestedName.includes(".") ? "." + suggestedName.split(".").pop() : ".txt";
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{
            description: mimeType.includes("json") ? "JSON File" : "Text File",
            accept: { [mimeType]: [ext] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(text);
        await writable.close();
        return { ok: true, method: "picker" };
      } catch (err) {
        if (err && err.name === "AbortError") return { ok: false, cancelled: true };
      }
    }

    // Fallback for browsers/file:// pages that do not support the File System Access API.
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = suggestedName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    return { ok: true, method: "download" };
  },

  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    }
  }
};
