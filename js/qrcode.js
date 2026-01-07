

function parseQR(textoQR) {
  const partes = textoQR
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  if (partes.length < 5) {
    throw new Error("QR inválido: deben ser 5 líneas");
  }

  return {
    cliente: partes[0],
    descripcion: partes[1],
    marca: partes[2],
    modelo: partes[3],
    serie: partes[4],
  };
}

function onScanSuccess(decodedText) {
  console.log("QR leído:", decodedText);

  let data;
  try {
    data = parseQR(decodedText);
  } catch (err) {
    alert(err.message);
    return;
  }

  sessionStorage.setItem("qr_equipo", JSON.stringify(data));

  // Detener escaneo y redirigir
  html5QrCode.stop().then(() => {
    window.location.href = "/vistas/informe.html";
  });
}

// --------- Inicialización ----------
const html5QrCode = new Html5Qrcode("reader");

Html5Qrcode.getCameras().then(cameras => {
  if (!cameras || cameras.length === 0) {
    alert("No se encontraron cámaras");
    return;
  }

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    onScanSuccess
  );
}).catch(err => {
  console.error(err);
  alert("Error accediendo a la cámara");
});

