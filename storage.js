
window.PBStorage = {
  key: "promptBuilder_beta_current",

  saveDraft(project) {
    localStorage.setItem(this.key, JSON.stringify(project));
  },

  loadDraft() {
    try { return JSON.parse(localStorage.getItem(this.key)) || null; }
    catch { return null; }
  },

  clearDraft() { localStorage.removeItem(this.key); },

  addSavedProject(project) {
    const items = this.getSavedProjects();
    const id = project.id || ("pb-" + Date.now());
    const copy = { ...project, id, lastEdited: new Date().toISOString() };
    const idx = items.findIndex(p => p.id === id);
    if (idx >= 0) items[idx] = copy;
    else items.unshift(copy);
    localStorage.setItem("promptBuilder_beta_projects", JSON.stringify(items));
    return copy;
  },

  getSavedProjects() {
    try { return JSON.parse(localStorage.getItem("promptBuilder_beta_projects")) || []; }
    catch { return []; }
  },

  getProject(id) {
    return this.getSavedProjects().find(p => p.id === id) || null;
  },

  deleteProject(id) {
    const items = this.getSavedProjects().filter(p => p.id !== id);
    localStorage.setItem("promptBuilder_beta_projects", JSON.stringify(items));
  },

  async exportJSON(project) {
    const safeName = (project.projectName || "prompt-builder-project").replace(/[^\w-]+/g, "-");
    return PBFile.saveText(JSON.stringify(project, null, 2), safeName + ".json", "application/json");
  }
};
