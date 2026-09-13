
(function () {
  const D = window.PB_DATA;
  const steps = ["project", "scene", "dialogue", "audio", "restrictions"];
  let currentStep = 0, previewMode = "selections";
  const $ = id => document.getElementById(id);

  const fields = [
    "projectName","platform","mode","theme","type","scene","duration","aspectRatio","character","location",
    "timeOfDay","weather","surroundings","action","actionPace","cameraPace","cameraMovement","lighting",
    "dialogueEnglish","dialogueLanguage","dialogueRomanized","musicEnabled","musicGenre","musicStyle","tempo",
    "voiceVolume","musicVolume","sfxVolume","audioPriority","audioDucking","dialogueNotes",
    "negativePrompt","negativeImportance","notes","futureNote"
  ];

  function fillSelect(id, values) {
    const el = $(id); el.innerHTML = "";
    values.forEach(v => { const o=document.createElement("option"); o.textContent=v; o.value=v; el.appendChild(o); });
  }

  function initOptions() {
    fillSelect("platform", D.options.platforms);
    fillSelect("theme", ["Select an option","No value",...Object.keys(D.themes)]);
    fillSelect("location", D.options.locations);
    fillSelect("timeOfDay", D.options.times);
    fillSelect("weather", D.options.weather);
    fillSelect("lighting", D.options.lighting);
    fillSelect("cameraMovement", D.options.camera);
    fillSelect("actionPace", D.options.pacing);
    fillSelect("cameraPace", D.options.pacing);
    fillSelect("duration", D.options.durations);
    fillSelect("aspectRatio", D.options.aspectRatios);
    fillSelect("dialogueLanguage", D.options.dialogueLanguages);
    fillSelect("musicGenre", D.options.genres);
    fillSelect("musicStyle", D.options.musicStyles);
    fillSelect("tempo", D.options.tempos);
    fillSelect("audioPriority", D.options.priorities);
    fillSelect("negativeImportance", D.options.importance);
    updateTypeOptions(); updateSceneOptions();
  }

  function updateTypeOptions() {
    const theme=$("theme").value, typeEl=$("type"); typeEl.innerHTML="";
    ["Select an option","No value"].forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;typeEl.appendChild(o);});
    if(D.themes[theme]) Object.keys(D.themes[theme].types).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;typeEl.appendChild(o);});
  }
  function updateSceneOptions() {
    const node=D.themes?.[$("theme").value]?.types?.[$("type").value], el=$("scene"); el.innerHTML="";
    ["Select an option","No value"].forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o);});
    if(node) node.scenes.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o);});
  }
  function currentDefaults(){ return D.themes?.[$("theme").value]?.types?.[$("type").value]?.defaults || {}; }

  function applyRecommendedDefaults(force=false){
    const d=currentDefaults();
    const map={
      location:["location","locationRecommended"], timeOfDay:["timeOfDay","timeRecommended"],
      weather:["weather","weatherRecommended"], lighting:["lighting","lightingRecommended"],
      cameraMovement:["cameraMovement","cameraRecommended"], actionPace:["actionPace","actionPaceRecommended"],
      cameraPace:["cameraPace","cameraPaceRecommended"], duration:["duration","durationRecommended"],
      aspectRatio:["aspectRatio","aspectRatioRecommended"], musicEnabled:["musicEnabled","musicEnabledRecommended"],
      musicGenre:["musicGenre","musicGenreRecommended"], musicStyle:["musicStyle","musicStyleRecommended"],
      tempo:["tempo","tempoRecommended"], audioPriority:["audioPriority","audioPriorityRecommended"]
    };
    Object.entries(map).forEach(([key,[fieldId,noteId]])=>{
      const rec=d[key], field=$(fieldId), note=$(noteId);
      if(!field||!note||!rec) return;
      note.textContent=`★ Recommended: ${rec}`;
      if(force || !field.dataset.manual){
        if([...field.options].some(o=>o.value===rec)) field.value=rec;
      }
    });
  }

  function projectFromForm(){
    const prev=PBStorage.loadDraft()||{};
    return {
      ...prev,
      version:"0.1",
      id:new URLSearchParams(location.search).get("id") || prev.id,
      projectName:$("projectName").value.trim(),
      platform:$("platform").value, mode:$("mode").value,
      createdDate:prev.createdDate || new Date().toISOString(),
      lastEdited:new Date().toISOString(),
      selections:{
        ...(prev.selections||{}),
        theme:$("theme").value,type:$("type").value,scene:$("scene").value,
        duration:$("duration").value,aspectRatio:$("aspectRatio").value,
        character:$("character").value.trim(),location:$("location").value,timeOfDay:$("timeOfDay").value,
        weather:$("weather").value,surroundings:$("surroundings").value.trim(),action:$("action").value.trim(),
        actionPace:$("actionPace").value,cameraPace:$("cameraPace").value,
        cameraMovement:$("cameraMovement").value,lighting:$("lighting").value,
        dialogueEnglish:$("dialogueEnglish").value.trim(),dialogueLanguage:$("dialogueLanguage").value,
        dialogueRomanized:$("dialogueRomanized").value.trim(),
        musicEnabled:$("musicEnabled").value,musicGenre:$("musicGenre").value,musicStyle:$("musicStyle").value,
        tempo:$("tempo").value,voiceVolume:$("voiceVolume").value,musicVolume:$("musicVolume").value,
        sfxVolume:$("sfxVolume").value,audioPriority:$("audioPriority").value,audioDucking:$("audioDucking").value,
        dialogueNotes:$("dialogueNotes").value.trim(),negativePrompt:$("negativePrompt").value.trim(),
        notes:$("notes").value.trim(),futureNote:$("futureNote").checked
      },
      importance:{...(prev.importance||{}),negativePrompt:$("negativeImportance").value}
    };
  }

  function saveDraft(){ PBStorage.saveDraft(projectFromForm()); renderPreview(); }
  function loadProject(project){
    if(!project) return;
    $("projectName").value=project.projectName||""; $("platform").value=project.platform||"Generic"; $("mode").value=project.mode||"Simple";
    const s=project.selections||{};
    $("theme").value=s.theme||"Select an option"; updateTypeOptions();
    $("type").value=s.type||"Select an option"; updateSceneOptions();
    $("scene").value=s.scene||"Select an option";
    const ids=["duration","aspectRatio","character","location","timeOfDay","weather","surroundings","action","actionPace","cameraPace",
      "cameraMovement","lighting","dialogueEnglish","dialogueLanguage","dialogueRomanized","musicEnabled","musicGenre","musicStyle","tempo",
      "voiceVolume","musicVolume","sfxVolume","audioPriority","audioDucking","dialogueNotes","negativePrompt","notes"];
    ids.forEach(id=>{if(s[id]!==undefined && $(id)) $(id).value=s[id];});
    $("futureNote").checked=!!s.futureNote; $("negativeImportance").value=project.importance?.negativePrompt||"Normal";
    updateVolumeLabels(); applyRecommendedDefaults(false); renderPreview();
  }

  function updateVolumeLabels(){
    $("voiceVolumeValue").textContent=$("voiceVolume").value+"%";
    $("musicVolumeValue").textContent=$("musicVolume").value+"%";
    $("sfxVolumeValue").textContent=$("sfxVolume").value+"%";
  }

  function escapeHtml(s){return String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[ch]));}

  function renderPreview(){
    const p=projectFromForm(), s=p.selections, c=$("previewContent");
    if(previewMode==="structured"){
      c.innerHTML=`<pre class="mb-0" style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(PBPromptGenerator.structured(p)||"No selections yet.")}</pre>`;
      return;
    }
    const entries=[
      ["Project",p.projectName],["Platform",p.platform],["Theme",s.theme],["Type",s.type],["Scene",s.scene],
      ["Duration",s.duration],["Aspect Ratio",s.aspectRatio],["Character / Subject",s.character],["Location",s.location],
      ["Time of Day",s.timeOfDay],["Weather",s.weather],["Surroundings",s.surroundings],["Action",s.action],
      ["Action Pace",s.actionPace],["Camera Pace",s.cameraPace],["Camera Movement",s.cameraMovement],["Lighting",s.lighting],
      ["Dialogue (English)",s.dialogueEnglish],["Spoken Language",s.dialogueLanguage],["Romanized Dialogue",s.dialogueRomanized],
      ["Background Music",s.musicEnabled],["Music Genre",s.musicGenre],["Music Style",s.musicStyle],["Tempo",s.tempo],
      ["Voice Volume",s.voiceVolume+"%"],["Music Volume",s.musicVolume+"%"],["SFX Volume",s.sfxVolume+"%"],
      ["Audio Priority",s.audioPriority],["Negative Prompt",s.negativePrompt],["Additional Notes",s.notes]
    ];
    c.innerHTML=entries.filter(([_,v])=>v&&v!=="Select an option"&&v!=="No value")
      .map(([l,v])=>`<div class="preview-entry"><strong>${escapeHtml(l)}:</strong><div>${escapeHtml(v)}</div></div>`).join("")
      || `<div class="text-secondary">Start selecting options to build the preview.</div>`;
  }

  function showStep(index){
    currentStep=Math.max(0,Math.min(steps.length-1,index));
    document.querySelectorAll(".step-section").forEach(el=>el.classList.add("d-none"));
    document.querySelector(`[data-step-section="${steps[currentStep]}"]`).classList.remove("d-none");
    document.querySelectorAll(".step-pill").forEach(el=>el.classList.toggle("active",el.dataset.step===steps[currentStep]));
    $("backBtn").disabled=currentStep===0;
    $("nextBtn").textContent=currentStep===steps.length-1?"Review →":"Next →";
  }

  function validateCurrent(){
    if(steps[currentStep]!=="project") return true;
    if(!$("projectName").value.trim()){alert("Please enter a Project Name.");return false;}
    if(["Select an option","No value"].includes($("theme").value)){alert("Please select a Theme.");return false;}
    if(["Select an option","No value"].includes($("type").value)){alert("Please select a Type.");return false;}
    return true;
  }

  function resetCurrentSection(){
    if(!confirm("Reset only the current section?")) return;
    const section=document.querySelector(`[data-step-section="${steps[currentStep]}"]`);
    section.querySelectorAll("input,textarea,select").forEach(el=>{
      if(el.type==="checkbox") el.checked=false;
      else if(el.type==="range"){
        if(el.id==="voiceVolume") el.value=85;
        if(el.id==="musicVolume") el.value=35;
        if(el.id==="sfxVolume") el.value=65;
      } else if(el.tagName==="SELECT"){el.selectedIndex=0;delete el.dataset.manual;}
      else el.value="";
    });
    if(steps[currentStep]==="project") initOptions();
    updateVolumeLabels(); applyRecommendedDefaults(false); saveDraft();
  }

  initOptions();
  const queryId=new URLSearchParams(location.search).get("id");
  loadProject(queryId?PBStorage.getProject(queryId):PBStorage.loadDraft());

  $("theme").addEventListener("change",()=>{updateTypeOptions();updateSceneOptions();document.querySelectorAll("select").forEach(el=>delete el.dataset.manual);applyRecommendedDefaults(true);saveDraft();});
  $("type").addEventListener("change",()=>{updateSceneOptions();document.querySelectorAll("select").forEach(el=>delete el.dataset.manual);applyRecommendedDefaults(true);saveDraft();});

  fields.forEach(id=>{
    const el=$(id); if(!el) return;
    const ev=(el.type==="range"||el.tagName==="TEXTAREA"||el.type==="text")?"input":"change";
    el.addEventListener(ev,()=>{ if(el.tagName==="SELECT") el.dataset.manual="1"; updateVolumeLabels(); saveDraft(); });
  });

  document.querySelectorAll(".step-pill").forEach(el=>el.addEventListener("click",()=>showStep(steps.indexOf(el.dataset.step))));
  $("backBtn").addEventListener("click",e=>{e.preventDefault();showStep(currentStep-1);});
  $("nextBtn").addEventListener("click",e=>{e.preventDefault();if(!validateCurrent())return;saveDraft(); if(currentStep===steps.length-1)location.href="review.html";else showStep(currentStep+1);});
  $("saveDraftBtn").addEventListener("click",e=>{e.preventDefault();saveDraft();alert("Draft saved in this browser.");});
  $("resetSectionBtn").addEventListener("click",e=>{e.preventDefault();resetCurrentSection();});
  document.querySelectorAll("[data-preview-mode]").forEach(btn=>btn.addEventListener("click",()=>{previewMode=btn.dataset.previewMode;document.querySelectorAll("[data-preview-mode]").forEach(b=>b.classList.toggle("active",b===btn));renderPreview();}));

  const shell=$("builderShell"), handle=$("resizeHandle"); let dragging=false;
  handle.addEventListener("mousedown",()=>dragging=true); document.addEventListener("mouseup",()=>dragging=false);
  document.addEventListener("mousemove",e=>{if(!dragging||window.innerWidth<992)return;const r=shell.getBoundingClientRect();let left=e.clientX-r.left;left=Math.max(360,Math.min(r.width-360,left));shell.style.gridTemplateColumns=`${left}px 6px 1fr`;});

  showStep(0); applyRecommendedDefaults(false); renderPreview();
})();
