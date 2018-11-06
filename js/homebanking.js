//Declaración de variables
var nombreUsuario="German Cardenas M";
var saldoDeCuenta=3500;
var limiteExtraccion=1000;
var cuentaAmiga1 = 1234567;
var cuentaAmiga2 = 7654321;
var codigoDeSeguridad = 1234;

//Ejecucion de la funcion de login para autorizar ingreso
iniciarSesion();

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    limiteExtraccion = parseInt(prompt("Ingresa el valor maximo que permitiras retirar: "));
    if(EsEntradaUnNumero(limiteExtraccion)){
        actualizarLimiteEnPantalla();
        alert(" Has modificado el limite de extraccion\n El nuevo limite es: " + limiteExtraccion);
    }
}

function extraerDinero() {
    var valorRetirado = parseInt(prompt("Ingresa el valor que deseas retirar:"));
        if(EsEntradaUnNumero(valorRetirado)){
            if(estaDentroDelLimite(valorRetirado) && haySaldoDisponible(valorRetirado) && sonBilletesDeCien(valorRetirado)){
                var saldoAnterior = saldoDeCuenta;
                reducirSaldo(valorRetirado);
                alert(" Has retirado: "+ valorRetirado  + 
                " \n Saldo anterior: " + saldoAnterior + 
                "\n Saldo actual: " + saldoDeCuenta);
                actualizarSaldoEnPantalla();
            } else if(!haySaldoDisponible(valorRetirado)){
                alert(" No hay saldo suficiente para retirar esa suma de dinero \n Tu saldo es: " + saldoDeCuenta);
            } else if(!estaDentroDelLimite(valorRetirado)){
                alert(" La cantidad de dinero que deseas retirar es superior al limite establecido");
            } else if(!sonBilletesDeCien(valorRetirado)){
                alert("Solo se pueden retirar billetes de 100");
            }
        } 
}

//Verifica que se tenga saldo disponible suficiente en la cuenta para el retiro
function haySaldoDisponible(valorRetirado){
    return (valorRetirado<=saldoDeCuenta);
}

//valida si el valor solicitado esta dentro del limite establecido
function estaDentroDelLimite(valorRetirado){
    return (valorRetirado<=limiteExtraccion);
}

//Valida que el retiro se pueda entregar con billetes de 100 
function sonBilletesDeCien(valorRetirado){
    return (valorRetirado%100==0);
}

function depositarDinero() {
   var valorDepositado = parseInt(prompt("Ingresa el deposito que deseas realizar:"));
   if(EsEntradaUnNumero(valorDepositado)){
        var saldoAnterior = saldoDeCuenta;
            incrementarSaldo(valorDepositado);
            alert(" Has depositado: "+ valorDepositado  + 
                    " \n Saldo anterior: " + saldoAnterior + 
                    "\n Saldo actual: " + saldoDeCuenta);
 
            actualizarSaldoEnPantalla();
   }
}

//funcion encargada de ejecutar el incremento de saldo de cuenta cuando se realiza deposito
function incrementarSaldo(deposito){
    saldoDeCuenta+=deposito;
}

//funcion encargada de ejecutar el decremento de saldo de cuenta cuando se realizan transacciones
function reducirSaldo(deposito){
    saldoDeCuenta-=deposito;
}

function pagarServicio() {
    var agua=350;
    var luz=210;
    var internet=570;
    var telefono=425;
    var servicioAPagar = prompt("Ingresa el numero que corresponde con el servicio que deseas pagar:\n1-agua\n2-Luz\n3-Internet\n4-Telefono"
    );
    switch(servicioAPagar){
        case "1":
            ejecutarPago(agua, "Agua");
            break;
        case "2":
            ejecutarPago(luz, "Luz");
            break;
        case "3":
            ejecutarPago(internet, "Internet");
            break;
        case "4":
            ejecutarPago(telefono, "Telefono");
            break
        default:
            alert("No existe el servicio seleccionado");

    }
}

//si el procedimeinto de pago de servicios es correcto se ejecuta el pago
function ejecutarPago(valorServicio, servicio){
        if(haySaldoDisponible(valorServicio)){
            reducirSaldo(valorServicio);
            notificarPago(valorServicio, servicio);
        }else{
            notificarSinSaldo();
        }
    
}

// si se ejecuto pago de servicio correctamente , se notifica al cleinte del exito de la transaccion
function notificarPago(valorServicio, servicio){
    //Se calcula saldo que se tenia antes de realizar el pago
    var saldoAnterior = saldoDeCuenta+valorServicio;
    //Se notifica al cleinte del exito de la transaccion
    alert(" Has pagado el servicio de " + servicio  + 
     " \n Saldo anterior: " + saldoAnterior + 
     " \n Dinero descontado: " + valorServicio + 
     "\n Saldo actual: " + saldoDeCuenta);
    actualizarSaldoEnPantalla();
}

//notifica al cleinte que la cuenta no tiene saldo para pagar el servicio
function notificarSinSaldo(){
    alert("No hay suficiente saldo para pagar este servicio");
}

function transferirDinero() {

    var valorTransferir = parseInt(prompt("Ingrese el monto que desea transferir: "));
        if(EsEntradaUnNumero(valorTransferir)){
            if(haySaldoDisponible(valorTransferir)){
                var cuentaDestino= parseInt(prompt("Ingrese el numero de cuenta a la que desea trasferir: "));
                if(validarCuentas(cuentaDestino)){
                    ejecutarTransferencia(valorTransferir, cuentaDestino);
                }
            }else{
                alert("El monto seleccionado supera el saldo de su cuenta.");
            }
        }
}

//valida que la cuenta de destino de la transferencia sea una de las cuentas amigas
function validarCuentas(cuenta){
    if(cuenta == cuentaAmiga1 || cuenta == cuentaAmiga2){
        return true;
    } else {
        alert("Esta cuenta no esta registrada como cuenta amiga.")
        return false;
    }
}

 function ejecutarTransferencia(valorTransferir, cuentaDestino){
    reducirSaldo(valorTransferir);
    notificarTransferencia(valorTransferir, cuentaDestino);
 }

function notificarTransferencia(valorTransferir, cuentaDestino){
    actualizarSaldoEnPantalla();
    alert("Se han transferido: $" + valorTransferir + "\nCuenta Destino: " + cuentaDestino);
}

function iniciarSesion() {
    if(solicitarClave() == codigoDeSeguridad){
        alert("Bienvenido/a " + nombreUsuario + " Ya puedes comenzar a realizar operaciones");
    } else {
        retenerSaldo();
    }
}

function solicitarClave(){
    var clave=parseInt(prompt("Ingresa tu clave:"));
    if(EsEntradaUnNumero(clave)){
        return clave; 
    } else {
        return 0;
    }   
       
}

function retenerSaldo(){
    saldoDeCuenta = 0;
    actualizarSaldoEnPantalla();
    alert("Código Incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.");
}

//valida que el valor de entrada del Prompt sea numerico
function EsEntradaUnNumero(entrada) {
        if(isNaN(entrada)){
            alert("El valor ingresado no es valido");
            return false;
        } else {
            return true;
        }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    console.log(nombreUsuario);
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoDeCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

