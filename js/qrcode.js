function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function parseQR(qrText) {
  // separa por saltos de línea, limpia espacios, y elimina vacíos
  const parts = qrText
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean);

  // Esperamos 5 líneas
  if (parts.length < 5) {
    throw new Error("QR incompleto: faltan líneas.");
  }

  return {
    cliente: parts[0],
    descripcion: parts[1],
    marca: parts[2],
    modelo: parts[3],
    serie: parts[4],
  };
}

function irAInformeConQR(qrText) {
  let data;
  try {
    data = parseQR(qrText);
  } catch (err) {
    alert(err.message);
    return;
  }

  sessionStorage.setItem("qr_equipo", JSON.stringify(data));
  window.location.href = "/vistas/informe.html";
}


domReady(function () {
    let result = [];

    // If found you qr code
    function onScanSuccess(decodeText, decodeResult) {
        result = + decodeText, decodeResult;
        //alert('resultado:', result);
        //alert("You Qr is : " + decodeText, decodeResult);
    }
    

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);

    irAInformeConQR(result);
});


