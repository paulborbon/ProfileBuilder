
(function(){
  const body=document.body;
  const themeToggle=document.getElementById('themeToggle');
  const mobileMenu=document.getElementById('mobileMenu');
  const sidebar=document.getElementById('sidebar');
  const saved=localStorage.getItem('pb_portfolio_theme')||'dark';
  if(saved==='light') body.classList.add('light');
  themeToggle?.addEventListener('click',()=>{
    body.classList.toggle('light');
    localStorage.setItem('pb_portfolio_theme', body.classList.contains('light')?'light':'dark');
  });
  mobileMenu?.addEventListener('click',()=>sidebar?.classList.toggle('open'));
  document.addEventListener('click',e=>{
    if(innerWidth>780||!sidebar?.classList.contains('open')) return;
    if(sidebar.contains(e.target)||e.target===mobileMenu) return;
    sidebar.classList.remove('open');
  });
  document.querySelectorAll('.nav-btn').forEach(a=>a.addEventListener('click',()=>{
    if(innerWidth<=780) sidebar?.classList.remove('open');
  }));
})();
