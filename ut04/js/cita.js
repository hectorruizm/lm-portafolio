// ===== Validación a medida del formulario de cita · BiciRuta =====
// Se carga con defer: cuando se ejecuta, el HTML ya está cargado.

const fecha = document.getElementById('fecha');
const quieroCuenta = document.getElementById('quiero-cuenta');
const grupoCuenta = document.getElementById('grupo-cuenta');
const clave = document.getElementById('clave');
const clave2 = document.getElementById('clave2');
const averia = document.getElementById('averia');
const contador = document.getElementById('contador');

// Convierte una fecha a texto aaaa-mm-dd (el formato que usa input type="date")
function aTextoFecha(d) {
  const aaaa = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${aaaa}-${mm}-${dd}`;
}

// Regla 1 · Fecha mínima: mañana. Así no se puede pedir cita para hoy ni para días pasados.
const manana = new Date();
manana.setDate(manana.getDate() + 1);
fecha.min = aTextoFecha(manana);

// Regla 2 · Domingos cerrados
function comprobarDomingo() {
  if (!fecha.value) {
    fecha.setCustomValidity('');
    return;
  }
  // Separo año, mes y día para crear la fecha en hora local (no en UTC)
  const [a, m, d] = fecha.value.split('-').map(Number);
  const esDomingo = new Date(a, m - 1, d).getDay() === 0;
  fecha.setCustomValidity(esDomingo ? 'El taller cierra los domingos.' : '');
}
fecha.addEventListener('input', comprobarDomingo);

// Regla 3 · Cuenta opcional: el fieldset empieza con disabled (en el HTML)
// y se habilita al marcar la casilla. Si está deshabilitado, sus campos ni se validan ni se envían.
quieroCuenta.addEventListener('change', () => {
  grupoCuenta.disabled = !quieroCuenta.checked;
  if (quieroCuenta.checked) {
    clave.focus();
  }
});

// Regla 4 · Las dos contraseñas deben coincidir
// (el mínimo de 8 caracteres con letras y números lo controla el pattern del HTML)
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden.' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);

// Contador de caracteres de la avería
function actualizarContador() {
  contador.textContent = `${averia.value.length} / 500 caracteres`;
}
averia.addEventListener('input', actualizarContador);
actualizarContador();
