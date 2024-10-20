window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 500) {
    document.body.classList.add('troca-fundo');
  }else{
    document.body.classList.remove("troca-fundo");
  }
});
