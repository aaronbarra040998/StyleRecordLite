const TRANSLATIONS = {
  es: {
    appName: 'StyleRecord Lite',
    login: 'Accede a StyleRecord',
    professional: 'Soy Profesional',
    client: 'Soy Cliente',
    search: 'Buscar cliente...',
    newClient: 'Nuevo Cliente',
    addService: 'Agregar Servicio',
    edit: 'Editar',
    delete: 'Eliminar',
    confirmDeleteClient: '¿Eliminar este cliente y todos sus servicios?',
    confirmDeleteService: '¿Eliminar este servicio?',
    saved: 'Guardado',
    invalidCode: 'Código incorrecto. Prueba con 1234',
    noClient: 'No se encontró un cliente con ese número.',
    noClients: 'No hay clientes registrados.',
    emptyHint: 'Agrega tu primer cliente con el botón "Nuevo Cliente".',
    noServices: 'Este cliente no tiene servicios registrados.',
    noHistory: 'No tienes servicios registrados aún.',
    linkExpired: 'Enlace expirado o inválido',
    linkExpiredMsg: 'Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.',
    sharedBanner: 'Vista temporal – Este enlace expirará',
    shareProfile: 'Compartir Perfil',
    copyLink: 'Copiar',
    copied: '¡Copiado!',
    offline: 'Sin conexión a internet. Algunas funciones pueden no estar disponibles.',
    clientCreated: 'Cliente creado correctamente',
    clientUpdated: 'Cliente actualizado',
    clientDeleted: 'Cliente eliminado',
    serviceAdded: 'Servicio agregado',
    serviceUpdated: 'Servicio actualizado',
    serviceDeleted: 'Servicio eliminado',
    phoneExists: 'El teléfono ya está registrado.',
    invalidPhone: 'El número no es válido.',
    manualSave: 'Guardar de todas formas',
    saveManually: 'Guardar manualmente',
    validateAndSave: 'Validar y Guardar',
    validating: 'Validando...',
    // Claves nuevas para UI
    before: 'Antes',
    after: 'Después',
    beforeImageAlt: 'Antes del servicio',
    afterImageAlt: 'Después del servicio',
    editService: 'Editar servicio',
    deleteService: 'Eliminar servicio',
    editClient: 'Editar',
    deleteClient: 'Eliminar',
    clientAriaLabel: 'Cliente',
    noServicesShort: 'Sin servicios',
    addServiceHint: 'Usa "Agregar Servicio" para añadir uno.',
    historyOf: 'Historial de',
    yes: 'Sí, eliminar',
    cancel: 'Cancelar',
    confirmTitle: 'Confirmar acción',
    serviceAriaLabel: 'Servicio'
  },
  en: {
    appName: 'StyleRecord Lite',
    login: 'Log in to StyleRecord',
    professional: 'I am a Professional',
    client: 'I am a Client',
    search: 'Search client...',
    newClient: 'New Client',
    addService: 'Add Service',
    edit: 'Edit',
    delete: 'Delete',
    confirmDeleteClient: 'Delete this client and all services?',
    confirmDeleteService: 'Delete this service?',
    saved: 'Saved',
    invalidCode: 'Incorrect code. Try 1234',
    noClient: 'No client found with that number.',
    noClients: 'No registered clients.',
    emptyHint: 'Add your first client using the "New Client" button.',
    noServices: 'This client has no registered services.',
    noHistory: 'You have no registered services yet.',
    linkExpired: 'Link expired or invalid',
    linkExpiredMsg: 'This link has expired (24 hours) or is incorrect. Ask your professional for a new link.',
    sharedBanner: 'Temporary view – This link will expire',
    shareProfile: 'Share Profile',
    copyLink: 'Copy',
    copied: 'Copied!',
    offline: 'No internet connection. Some features may not be available.',
    clientCreated: 'Client created successfully',
    clientUpdated: 'Client updated',
    clientDeleted: 'Client deleted',
    serviceAdded: 'Service added',
    serviceUpdated: 'Service updated',
    serviceDeleted: 'Service deleted',
    phoneExists: 'Phone number already registered.',
    invalidPhone: 'Invalid phone number.',
    manualSave: 'Save anyway',
    saveManually: 'Save manually',
    validateAndSave: 'Validate & Save',
    validating: 'Validating...',
    // English versions
    before: 'Before',
    after: 'After',
    beforeImageAlt: 'Before the service',
    afterImageAlt: 'After the service',
    editService: 'Edit service',
    deleteService: 'Delete service',
    editClient: 'Edit',
    deleteClient: 'Delete',
    clientAriaLabel: 'Client',
    noServicesShort: 'No services',
    addServiceHint: 'Use "Add Service" to add one.',
    historyOf: 'History of',
    yes: 'Yes, delete',
    cancel: 'Cancel',
    confirmTitle: 'Confirm action',
    serviceAriaLabel: 'Service'
  }
};

let currentLang = localStorage.getItem('sr-lang') || navigator.language.split('-')[0] || 'es';
if (!TRANSLATIONS[currentLang]) currentLang = 'es';

export function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.es[key] || key;
}

export function setLanguage(lang) {
  if (TRANSLATIONS[lang]) {
    currentLang = lang;
    localStorage.setItem('sr-lang', lang);
  }
}

export function getLanguage() {
  return currentLang;
}