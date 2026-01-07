var formulario = document.getElementById("formulario");

let nombreUsuario = '';
let claveUsuario = '';
let rolUsuario = '';

function validar(e) {
        var nombre = document.getElementById("nombre"),
            clave = document.getElementById("clave");
            
        
    if(nombre.value == 0 || clave.value == 0){
            e.preventDefault();
            alert("Error, los campos deben ser completados");
    } else {
            e.preventDefault();
           console.log('nombre, clave del formulario', nombre.value, clave.value);
           nombreUsuario = nombre.value;
           claveUsuario = (clave.value).toString();

         

            let _body = {userid: nombreUsuario, clave: claveUsuario};
           console.log('body ', _body);

           fetch('https://servering-production.up.railway.app/usuarios/log', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('Clave o nombre incorrectos - consulte al administrador');
                    return;
            
                }else {
                    console.log('fetch exitoso');
                    //rolUsuario = data.usuario.rol;
                    console.log('usuario: ', data.usuario);
                    rolUsuario = data.usuario.rol;
                    console.log('Rol: ', rolUsuario);

                    


                    if(rolUsuario == 'admin'){
                        window.open('/vistas/menu.html');
                    }else{
                        window.open('/vistas/cambioPantalla.html');
                    }
                }
                
                   

                
            })
            .catch(function(error) {
                console.log('Failed', error);
            });



        }

           

           

           
                
            

                    
                       
            
            
            
            
}

       



        
    


formulario.addEventListener("submit", validar);
