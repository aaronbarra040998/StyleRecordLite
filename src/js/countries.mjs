// Lista de países con código ISO, nombre, prefijo telefónico y bandera (emoji)
const countries = [
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "DO", name: "República Dominicana", dialCode: "+1", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "PA", name: "Panamá", dialCode: "+507", flag: "🇵🇦" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  // Puedes añadir más según necesidad
];

export default countries;

/**
 * Combina el prefijo y el número local, eliminando cualquier cero inicial extra.
 * @param {string} dialCode ej. "+51"
 * @param {string} localNumber número sin prefijo (ej. "987654321")
 * @returns {string} número internacional completo (ej. "+51987654321")
 */
export function composeFullNumber(dialCode, localNumber) {
  // Eliminar espacios y caracteres no numéricos del número local, excepto posible +
  const cleaned = localNumber.replace(/[^0-9]/g, '');
  // Si el número local empieza con 0, eliminarlo (típico en muchos países)
  const withoutLeadingZero = cleaned.replace(/^0+/, '');
  return dialCode + withoutLeadingZero;
}