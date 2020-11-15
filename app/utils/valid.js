const validar = (data) => {
    let camposVacios = false;
    const keys = Object.keys(data)
    keys.forEach(key => { if (String(data[key]).trim() === '' || !data[key]) return camposVacios = true; });
    return camposVacios;
}

module.exports = { validar }