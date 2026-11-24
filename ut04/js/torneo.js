// ===== Validación a medida del formulario del torneo =====
// Regla: hay que tener al menos 16 años, calculados con la fecha de nacimiento.

const nacimiento = document.getElementById('nacimiento');
const EDAD_MINIMA = 16;

// Convierte una fecha a texto aaaa-mm-dd (el formato de input type="date")
function aTextoFecha(d) {
  const aaaa = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${aaaa}-${mm}-${dd}`;
}

// No se puede nacer en el futuro: la fecha máxima es hoy
nacimiento.max = aTextoFecha(new Date());

// Calcula los años cumplidos a día de hoy
function calcularEdad(a, m, d) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;
  // Si este año todavía no ha llegado su cumpleaños, tiene un año menos
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) {
    edad--;
  }
  return edad;
}

function comprobarEdad() {
  if (!nacimiento.value) {
    nacimiento.setCustomValidity('');
    return;
  }
  const [a, m, d] = nacimiento.value.split('-').map(Number);
  const edad = calcularEdad(a, m, d);
  nacimiento.setCustomValidity(
    edad < EDAD_MINIMA ? `Tienes que tener al menos ${EDAD_MINIMA} años (ahora tienes ${edad}).` : ''
  );
}
nacimiento.addEventListener('input', comprobarEdad);
