function formatarDataParaSQL(data) {
  const dataISO = data.toISOString(); 

  const dataSql = dataISO.slice(0, 19).replace('T', ' ');

  return dataSql;
};

module.exports = {
  formatarDataParaSQL
};