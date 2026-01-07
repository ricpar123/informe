



Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});

document.addEventListener("DOMContentLoaded", () => {
  const raw = sessionStorage.getItem("qr_equipo");
  if (!raw) return;

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    sessionStorage.removeItem("qr_equipo");
    return;
  }

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.value = value;
  };

  set("cliente", data.cliente);
  set("descripcion", data.descripcion);
  set("marca", data.marca);
  set("modelo", data.modelo);
  set("serie", data.serie);

  // usar una sola vez
  sessionStorage.removeItem("qr_equipo");
});
let usuarios = [];


async function fetchUsuarios(){
   
    const res = await fetch('https://servering-production.up.railway.app/usuarios/tabla', 
        {
            method: "GET",
            headers: {"auth": "auth"}
            });
    

   
    
    if(!res.ok){
        const msg = `error en fetchUsuarios:, ${res.status}`;
        throw new Error(msg);
    }

    
    
    res.json()
    .then(data => {
        console.log('data', data);
        usuarios = data.usuarios;
        console.log('lista:', usuarios);

    

        var select = document.getElementById("tecnico");
    
    

        usuarios.forEach((item, index)=>{
        var option = document.createElement("option");
        option.text = item.userid;
        select.add(option);
       

        });


    

    });

}


fetchUsuarios();
       



const wrapper1 = document.getElementById("signature1");
const canvas1 = wrapper1.querySelector("canvas");
    

const wrapper2 = document.getElementById("signature2");
const canvas2 = wrapper2.querySelector("canvas");

// 2) Crear SignaturePad
const SignaturePad = window.SignaturePad;

const signaturePad1 = new SignaturePad(canvas1);
const signaturePad2 = new SignaturePad(canvas2);

    function resizeCanvas(wrapper, canvas, signaturePad) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const rect = wrapper.getBoundingClientRect();
        canvas.width = Math.round(rect.width * ratio);
        canvas.height = Math.round(rect.height * ratio);

        const ctx = canvas.getContext("2d");
        // RESET TOTAL del trabsform antes de escalar
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);

        signaturePad.clear();
    }

window.addEventListener("load", () => {
    resizeCanvas(wrapper1, canvas1, signaturePad1);
    resizeCanvas(wrapper2, canvas2, signaturePad2);
});

    // 5) (Opcional) si el usuario rota el móvil o cambia tamaño
window.addEventListener("resize", () => {
  resizeCanvas(wrapper1, canvas1, signaturePad1);
  resizeCanvas(wrapper2, canvas2, signaturePad2);
});

// 6) Botones borrar (si usás onclick en HTML)
window.signatureClear1 = () => {
  signaturePad1.clear();
};

window.signatureClear2 = () => {
  signaturePad2.clear();
};

    






/*
var canvasC = document.getElementById("signature");

       function resizeCanvasC() {
           var ratio = Math.max(window.devicePixelRatio || 1, 1);
           canvasC.width = canvas.offsetWidth * ratio;
           canvasC.height = canvas.offsetHeight * ratio;
           canvasC.getContext("2d").scale(ratio, ratio);
       }
       window.onresize = resizeCanvasC;
       resizeCanvasC();

var canvasT = document.getElementById("signatureT");

    function resizeCanvasT() {
           var ratio = Math.max(window.devicePixelRatio || 1, 1);
           canvasT.width = canvasT.offsetWidth * ratio;
           canvasT.height = canvasT.offsetHeight * ratio;
           canvasT.getContext("2d").scale(ratio, ratio);
       }
       window.onresize = resizeCanvasT;
       resizeCanvasT();

       var signaturePadC = new SignaturePad(canvasC, {
        backgroundColor: 'rgb(250,250,250)'
       });

       var signaturePadT = new SignaturePad(canvasT, {
        backgroundColor: 'rgb(250,250,250)'
       });
*/


var formulario = document.getElementById("formulario");

var tecnico = [];

let descripcion = '';
let marca = '';
let modelo = '';
let serie = '';
let motivo = '';
let tipoTrabajo = '';
let presupuesto = '';
let servicio = '';
let obs = '';
let recibido = '';
let ci = '';
let fecha = '';
let firma = '';
let firmaT = '';




    function validar(e) {
        e.preventDefault();
        const radioB = document.querySelectorAll('input[name= "trabajo"]');
        const radioB2 = document.querySelectorAll('input[name= "presu"]');
        
        

        for( const radiobutton of radioB) {
            if(radiobutton.checked){
                tipoTrabajo = radiobutton.value;
            }
        }

        for( const radiobu2 of radioB2){
            if(radiobu2.checked){
                presupuesto = radiobu2.value;
            }
        }
        
        var tec = document.getElementById("tecnico").value;
        //console.log('Tecnico/s:', tec);
        motivo = document.getElementById("motivo").value;
       
        
        servicio = document.getElementById("destrabajo").value;
        firma = document.getElementById("firma");
        firmaT = document.getElementById("firmaT");
        fecha = document.getElementById("fecha").value;
        equipo = document.getElementById("equipo").value;
        obs = document.getElementById("obs").value;
        recibido = document.getElementById("recibido").value;
        ci = document.getElementById("ci").value;
        


        
        if(tec == 0 || cliente == 0 || motivo == 0 ||  
             fechaInicio == 0 || fechaFin == 0 || servicio == 0  
            || fecha == 0 || equipo == 0 || signaturePad1.isEmpty() || 
            tipoTrabajo == 0 || presupuesto == 0 || signaturePad2.isEmpty()  ){
            e.preventDefault();
            alert('Error, los campos marcados con * deben ser completados');
            return;

        }else {
            e.preventDefault();
            //var selected = [];
            for( var option of document.getElementById('tecnico').options){
                if(option.selected){
                    tecnico.push(option.value);
                }
            }
            
            }
      
        
            console.log('tecnico/s: ', tecnico);
     descripcion = document.getElementById("descripcion").value;
     marca = document.getElementById("marca").value; 
     modelo = document.getElementById("modelo").value;
     serie = document.getElementById("serie").value;
     



     let base64 = signaturePad1.toDataURL('image/png').split(';base64,')[1];
     firma = base64;
 
     let base64T = signaturePad2.toDataURL('image/png').split(';base64,')[1];
     firmaT = base64T;
    //console.log(base64);


   
    
    console.log('cliente seleccionado:', cliente);
    console.log('Motivo de la visita.', motivo);
    

    let _body = {tecnico, cliente, descripcion, marca, modelo, serie, 
                motivo, tipoTrabajo, presupuesto, fechaInicio, horaInicio, 
                fechaFin, horaFin, servicio, obs, recibido, firma, firmaT, 
                fecha };

    console.log('datos a enviar: ', _body);
    //enviar el formulario al service worker
   
    var form = { 'formData' : _body };
    navigator.serviceWorker.controller.postMessage(form);
    console.log('datos enviados al sw ');

    navigator.serviceWorker.addEventListener('message', e =>{
        if(e.data.form == 'recibido'){
            console.log('sw recibio los datos');
        }
    })
    
  

    fetch('http://localhost:8080/informes', {
        method: "POST",
        body : JSON.stringify(_body),
        headers: {"Content-Type": "application/json"}
    })
    .then( response => response.json())
    .then((data)=> {
        if(data.ok == false){
            alert('error en guardar datos')
        }else{
            alert('informe guardado en bd');
            alert('onLine...se envia al instante');
            alert('offLine...se envia apenas se tenga conexion');
        }

    })
    .catch((error)=>{
        console.log('Error', error);
    });
       
    }

    function signatureClear1() {
        console.log('clear signature1');
        signaturePad1.clear();
      }

      function signatureClear2() {
        console.log('clear signature2');
        signaturePad2.clear();
      }

    formulario.addEventListener('submit', validar);

// Detectar cambios de conexión
/*

function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        console.log('online');
        alert('Online')


    } else{
        // No tenemos conexión
       alert('Offline')
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();

*/
