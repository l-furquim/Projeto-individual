function formatarDataParaSQL(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Adiciona 1, pois os meses começam em 0
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
};

module.exports = {
  formatarDataParaSQL
};