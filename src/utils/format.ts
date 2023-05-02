export function formatarData(data: string) {
  //const dt = data.split('T');

  if (data.length == 10) {
    const d = data[0].split('-');
    return d[2] + '/' + d[1] + '/' + d[0];
  } else {
    const dt = data.split('T');
    const d = dt[0].split('-');
    return d[2] + '/' + d[1] + '/' + d[0];
  }
}

export function formatarDataIso(data: string) {
  data = formatarData(data);
  const d = data.split('/');
  return d[2] + '-' + d[1] + '-' + d[0];
}

/*
function formatarPeso(peso) {
  let pesoFormat = peso.toString();
  pesoFormat = pesoFormat.replace('.', '#');
  if (pesoFormat.search('#') < 0) {
    pesoFormat = pesoFormat + ',0';
  } else {
    pesoFormat = pesoFormat.replace('#', ',');
  }

  return pesoFormat;
}

function formatarValor(valor) {
  let valorFormat = valor.toString();
  valorFormat = valorFormat.replace('.', '#');
  if (valorFormat.search('#') < 0) {
    valorFormat = valorFormat + ',00';
  } else {
    if (valorFormat.split('#')[1].length === 1) {
      valorFormat = valorFormat + '0';
    }

    valorFormat = valorFormat.replace('#', ',');
  }

  return valorFormat;
}
*/
