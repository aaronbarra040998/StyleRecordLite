(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t=document){return t.querySelector(e)}function t(e,t,n,r){t.innerHTML=e,r&&r(n)}async function n(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function r(){let r=await n(`partials/header.html`),i=await n(`partials/footer.html`),a=e(`#main-header`),o=e(`#main-footer`);t(r,a),t(i,o)}function i(e){let t=document.createElement(`div`);return t.appendChild(document.createTextNode(e)),t.innerHTML}function a(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var o=`sr-role`,s=`1234`;function ee(e){if(e===s)try{return localStorage.setItem(o,`professional`),!0}catch(e){return console.error(`Error al guardar rol:`,e),!1}return!1}function te(e){try{localStorage.setItem(o,`client`),localStorage.setItem(`sr-client-phone`,e)}catch(e){console.error(`Error al guardar rol de cliente:`,e)}}function c(){try{return localStorage.getItem(o)}catch(e){return console.error(`Error al leer rol:`,e),null}}function l(){try{localStorage.removeItem(o),localStorage.removeItem(`sr-client-phone`)}catch(e){console.error(`Error al cerrar sesión:`,e)}}function u(){return c()!==null}var d=`sr-temp-links`;function f(){try{let e=localStorage.getItem(d);return e?JSON.parse(e):[]}catch(e){return console.error(`Error al cargar enlaces temporales:`,e),[]}}function p(e){try{return localStorage.setItem(d,JSON.stringify(e)),!0}catch(e){return console.error(`Error al guardar enlaces temporales:`,e),!1}}function ne(e){let t=`tok_`+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2,9)),n=f();return n.push({token:t,clientId:e,expiresAt:Date.now()+1440*60*1e3}),p(n),t}function re(e){let t=f(),n=t.find(t=>t.token===e);return n?Date.now()>n.expiresAt?(p(t.filter(t=>t.token!==e)),null):n.clientId:null}function ie(){p(f().filter(e=>Date.now()<=e.expiresAt))}var ae=class{constructor(){this.routes={},window.addEventListener(`hashchange`,()=>this.resolve())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}resolve(){let e=window.location.hash.slice(1)||`/`,t=this.routes[e]||this.routes[`*`];t&&t()}start(){window.location.hash?this.resolve():window.location.hash=`/login`}};function oe(){return new ae}function m(e){window.location.hash=e}var h=(e,t)=>t.some(t=>e instanceof t),se,ce;function le(){return se||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function ue(){return ce||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var g=new WeakMap,_=new WeakMap,v=new WeakMap;function de(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(b(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return v.set(t,e),t}function fe(e){if(g.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});g.set(e,t)}var y={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return g.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function pe(e){y=e(y)}function me(e){return ue().includes(e)?function(...t){return e.apply(x(this),t),b(this.request)}:function(...t){return b(e.apply(x(this),t))}}function he(e){return typeof e==`function`?me(e):(e instanceof IDBTransaction&&fe(e),h(e,le())?new Proxy(e,y):e)}function b(e){if(e instanceof IDBRequest)return de(e);if(_.has(e))return _.get(e);let t=he(e);return t!==e&&(_.set(e,t),v.set(t,e)),t}var x=e=>v.get(e);function ge(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=b(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(b(o.result),e.oldVersion,e.newVersion,b(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var _e=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],ve=[`put`,`add`,`delete`,`clear`],S=new Map;function C(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(S.get(t))return S.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=ve.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||_e.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return S.set(t,a),a}pe(e=>({...e,get:(t,n,r)=>C(t,n)||e.get(t,n,r),has:(t,n)=>!!C(t,n)||e.has(t,n)}));var ye=[`continue`,`continuePrimaryKey`,`advance`],w={},T=new WeakMap,E=new WeakMap,be={get(e,t){if(!ye.includes(t))return e[t];let n=w[t];return n||=w[t]=function(...e){T.set(this,E.get(this)[t](...e))},n}};async function*xe(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,be);for(E.set(n,t),v.set(n,x(t));t;)yield n,t=await(T.get(n)||t.continue()),T.delete(n)}function D(e,t){return t===Symbol.asyncIterator&&h(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&h(e,[IDBIndex,IDBObjectStore])}pe(e=>({...e,get(t,n,r){return D(t,n)?xe:e.get(t,n,r)},has(t,n){return D(t,n)||e.has(t,n)}}));var Se=`stylerecord-db`,Ce=1,O;function k(){return O||=ge(Se,Ce,{upgrade(e){e.objectStoreNames.contains(`clients`)||e.createObjectStore(`clients`,{keyPath:`id`})}}),O}async function we(){return(await k()).getAll(`clients`)}async function Te(e){let t=(await k()).transaction(`clients`,`readwrite`);await t.store.clear();for(let n of e)await t.store.put(n);await t.done}async function Ee(e){try{await(await k()).add(`clients`,e)}catch(e){throw console.error(`Error al agregar cliente:`,e),e}}async function A(){try{return await we()}catch(e){return console.error(`Error al cargar clientes:`,e),[]}}async function j(e){try{return await Te(e),!0}catch(e){return console.error(`Error al guardar clientes:`,e),!1}}async function M(e){return(await A()).find(t=>t.phone===e)}async function N(e){return(await A()).find(t=>t.id===e)}async function P(e){try{return await Ee(e),!0}catch(e){return console.error(`Error al agregar cliente:`,e),!1}}function F(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.classList.add(`fade-out`),n.addEventListener(`transitionend`,()=>n.remove())},3e3)}function I(e){F(e,`error`)}function L(e){F(e,`success`)}function De(e){e.innerHTML=`
    <section id="login-section" class="view active">
      <h2>Accede a StyleRecord</h2>
      <div class="login-options">
        <button id="btn-professional-login" class="login-btn"><i class="fas fa-cut"></i> Soy Profesional</button>
        <button id="btn-client-login" class="login-btn"><i class="fas fa-user"></i> Soy Cliente</button>
      </div>
      <div id="login-form-container" class="hidden"></div>
    </section>
  `,document.getElementById(`btn-professional-login`).addEventListener(`click`,()=>{let e=document.getElementById(`login-form-container`);e.classList.remove(`hidden`),e.innerHTML=`
      <form id="prof-login-form">
        <label>Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `,document.getElementById(`prof-login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`prof-code`).value;ee(t)?m(`/professional`):I(`Código incorrecto. Prueba con 1234`)})}),document.getElementById(`btn-client-login`).addEventListener(`click`,()=>{let e=document.getElementById(`login-form-container`);e.classList.remove(`hidden`),e.innerHTML=`
      <form id="client-login-form">
        <label>Tu número de teléfono:</label>
        <input type="tel" id="client-phone" placeholder="+541112345678" required />
        <button type="submit">Ver historial</button>
      </form>
    `,document.getElementById(`client-login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`client-phone`).value.trim();M(t)?(te(t),m(`/client`)):I(`No se encontró un cliente con ese número.`)})})}async function R(e){let t=(await A()).find(t=>t.id===e);return t?t.services:[]}async function Oe(e,t){let n=await A(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),await j(n),!0):!1}async function ke(e,t,n){let r=await A(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},await j(r),!0)}async function Ae(e,t){let n=await A(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),await j(n),!0):!1}var z=class extends Error{constructor(e,t){super(e),this.name=`InvalidPhoneError`,this.details=t}},B=class extends Error{constructor(e){super(e),this.name=`ServiceError`}},je=`c43204c2a5e320e5600d73ce305b6f0d`;async function Me(e){let t=`https://apilayer.net/api/validate?access_key=${je}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw new z(`El número no es válido o no existe.`,n);return n}catch(e){throw e instanceof z||e instanceof B?e:new B(`No se pudo conectar con el servicio de validación. Intenta más tarde.`)}}function V(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function H(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10);return{before:V(300,200,e),after:V(300,200,t)}}function Ne(){return`
    <form id="new-client-form">
      <label>Nombre completo:</label>
      <input type="text" id="client-name" placeholder="María García" required />
      <div class="field-error" id="error-client-name"></div>
      <label>Teléfono (con código de país):</label>
      <input type="tel" id="client-phone" placeholder="+5491112345678" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validar y Guardar</button>
    </form>
  `}function Pe(e,t){return`
    <form id="new-service-form">
      <label>Tipo de servicio:</label>
      <select id="service-type" required>
        <option value="">Selecciona...</option>
        <option value="corte">Corte</option>
        <option value="tinte">Tinte</option>
        <option value="tratamiento">Tratamiento</option>
        <option value="peinado">Peinado</option>
        <option value="otros">Otros</option>
      </select>
      <div class="field-error" id="error-service-type"></div>
      <label>Fecha:</label>
      <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
      <div class="field-error" id="error-service-date"></div>
      <label>Notas:</label>
      <textarea id="service-notes" rows="3"></textarea>
      <div class="image-preview">
        <div><small>Antes</small><img src="${i(e)}" id="preview-before" /></div>
        <div><small>Después</small><img src="${i(t)}" id="preview-after" /></div>
      </div>
      <button type="button" id="btn-regenerate-images">Generar otras imágenes</button>
      <button type="submit">Guardar Servicio</button>
    </form>
  `}function Fe(e){return`
    <form id="edit-service-form">
      <label>Tipo:</label>
      <select id="edit-service-type" required>${[`corte`,`tinte`,`tratamiento`,`peinado`,`otros`].map(t=>`<option value="${t}" ${e.type===t?`selected`:``}>${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join(``)}</select>
      <div class="field-error" id="error-edit-service-type"></div>
      <label>Fecha:</label>
      <input type="date" id="edit-service-date" value="${i(e.date)}" required />
      <div class="field-error" id="error-edit-service-date"></div>
      <label>Notas:</label>
      <textarea id="edit-service-notes" rows="3">${i(e.notes)}</textarea>
      <button type="submit">Guardar Cambios</button>
    </form>
  `}function Ie(e){return`
    <p>Envía este enlace a tu nuevo profesional. <strong>Válido por 24 horas.</strong></p>
    <div style="display:flex; gap:0.5rem; margin:1rem 0;">
      <input type="text" id="share-link" value="${i(e)}" readonly style="flex:1;" />
      <button id="btn-copy-link"><i class="fas fa-copy"></i> Copiar</button>
    </div>
    <small>El profesional podrá ver tu historial de servicios sin poder editarlo.</small>
  `}function U(e,t){return!e||!e.trim()?`${t} es obligatorio.`:null}function Le(e){return/^\+?[1-9]\d{6,14}$/.test(e.trim())?null:`Formato de teléfono inválido. Ej: +541112345678`}function Re(e){let t=new Date(e),n=new Date;return n.setHours(0,0,0,0),t>n?`La fecha no puede ser futura.`:null}function ze(e,t){let n={},r=U(e,`Nombre`);r&&(n.name=r);let i=U(t,`Teléfono`)||Le(t);return i&&(n.phone=i),n}function Be(e,t,n){let r={};e||(r.type=`Tipo de servicio es obligatorio.`);let i=U(t,`Fecha`)||Re(t);return i&&(r.date=i),r}var W=null;function Ve(e){W=e}var G={es:{appName:`StyleRecord Lite`,login:`Accede a StyleRecord`,professional:`Soy Profesional`,client:`Soy Cliente`,search:`Buscar cliente...`,newClient:`Nuevo Cliente`,addService:`Agregar Servicio`,edit:`Editar`,delete:`Eliminar`,confirmDeleteClient:`¿Eliminar este cliente y todos sus servicios?`,confirmDeleteService:`¿Eliminar este servicio?`,saved:`Guardado`,invalidCode:`Código incorrecto. Prueba con 1234`,noClient:`No se encontró un cliente con ese número.`,noClients:`No hay clientes registrados.`,emptyHint:`Agrega tu primer cliente con el botón "Nuevo Cliente".`,noServices:`Este cliente no tiene servicios registrados.`,noHistory:`No tienes servicios registrados aún.`,linkExpired:`Enlace expirado o inválido`,linkExpiredMsg:`Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.`,sharedBanner:`Vista temporal – Este enlace expirará`,shareProfile:`Compartir Perfil`,copyLink:`Copiar`,copied:`¡Copiado!`,offline:`Sin conexión a internet. Algunas funciones pueden no estar disponibles.`,clientCreated:`Cliente creado correctamente`,clientUpdated:`Cliente actualizado`,clientDeleted:`Cliente eliminado`,serviceAdded:`Servicio agregado`,serviceUpdated:`Servicio actualizado`,serviceDeleted:`Servicio eliminado`,phoneExists:`El teléfono ya está registrado.`,invalidPhone:`El número no es válido.`,manualSave:`Guardar de todas formas`,saveManually:`Guardar manualmente`,validateAndSave:`Validar y Guardar`,validating:`Validando...`,before:`Antes`,after:`Después`,beforeImageAlt:`Antes del servicio`,afterImageAlt:`Después del servicio`,editService:`Editar servicio`,deleteService:`Eliminar servicio`,editClient:`Editar`,deleteClient:`Eliminar`,clientAriaLabel:`Cliente`,noServicesShort:`Sin servicios`,addServiceHint:`Usa "Agregar Servicio" para añadir uno.`,historyOf:`Historial de`,yes:`Sí, eliminar`,cancel:`Cancelar`,confirmTitle:`Confirmar acción`,serviceAriaLabel:`Servicio`},en:{appName:`StyleRecord Lite`,login:`Log in to StyleRecord`,professional:`I am a Professional`,client:`I am a Client`,search:`Search client...`,newClient:`New Client`,addService:`Add Service`,edit:`Edit`,delete:`Delete`,confirmDeleteClient:`Delete this client and all services?`,confirmDeleteService:`Delete this service?`,saved:`Saved`,invalidCode:`Incorrect code. Try 1234`,noClient:`No client found with that number.`,noClients:`No registered clients.`,emptyHint:`Add your first client using the "New Client" button.`,noServices:`This client has no registered services.`,noHistory:`You have no registered services yet.`,linkExpired:`Link expired or invalid`,linkExpiredMsg:`This link has expired (24 hours) or is incorrect. Ask your professional for a new link.`,sharedBanner:`Temporary view – This link will expire`,shareProfile:`Share Profile`,copyLink:`Copy`,copied:`Copied!`,offline:`No internet connection. Some features may not be available.`,clientCreated:`Client created successfully`,clientUpdated:`Client updated`,clientDeleted:`Client deleted`,serviceAdded:`Service added`,serviceUpdated:`Service updated`,serviceDeleted:`Service deleted`,phoneExists:`Phone number already registered.`,invalidPhone:`Invalid phone number.`,manualSave:`Save anyway`,saveManually:`Save manually`,validateAndSave:`Validate & Save`,validating:`Validating...`,before:`Before`,after:`After`,beforeImageAlt:`Before the service`,afterImageAlt:`After the service`,editService:`Edit service`,deleteService:`Delete service`,editClient:`Edit`,deleteClient:`Delete`,clientAriaLabel:`Client`,noServicesShort:`No services`,addServiceHint:`Use "Add Service" to add one.`,historyOf:`History of`,yes:`Yes, delete`,cancel:`Cancel`,confirmTitle:`Confirm action`,serviceAriaLabel:`Service`}},K=localStorage.getItem(`sr-lang`)||navigator.language.split(`-`)[0]||`es`;G[K]||(K=`es`);function He(e){return G[K]?.[e]||G.es[e]||e}var q=null;function Ue(e,t=!1){return`
    <div class="card service-card fade-in" data-service-id="${i(e.id)}" role="article" aria-label="Servicio ${i(e.type)} del ${i(e.date)}">
      <div class="service-header">
        <strong>${i(e.type)}</strong>
        <span>${i(e.date)}</span>
      </div>
      <p>${i(e.notes)}</p>
      <div class="image-pair">
        <div><small>Antes</small><img src="${i(e.beforeImg)}" alt="Antes" loading="lazy" /></div>
        <div><small>Después</small><img src="${i(e.afterImg)}" alt="Después" loading="lazy" /></div>
      </div>
      ${t?`
      <div class="service-actions">
        <button class="btn-edit-service" data-id="${i(e.id)}" aria-label="Editar servicio"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn-delete-service" data-id="${i(e.id)}" aria-label="Eliminar servicio"><i class="fas fa-trash"></i> Eliminar</button>
      </div>`:``}
    </div>
  `}async function We(e,t){let n=await M(e);if(!n||n.services.length===0){t.innerHTML=`
      <div class="empty-state">
        <i class="fas fa-history fa-3x"></i>
        <p>No tienes servicios registrados aún.</p>
      </div>`;return}t.innerHTML=[...n.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>Ue(e,!1)).join(``)}async function Ge(e,t){let n=await N(e);if(!n){t.innerHTML=`<p>Perfil no encontrado.</p>`;return}let r=[...await R(e)].sort((e,t)=>new Date(t.date)-new Date(e.date));t.innerHTML=`
    <div class="shared-banner" role="alert">
      <i class="fas fa-clock"></i> Vista temporal – Este enlace expirará
    </div>
    <h2>Historial de ${i(n.name)}</h2>
    ${r.length===0?`<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>Sin servicios registrados.</p></div>`:r.map(e=>Ue(e,!1)).join(``)}
  `}function J(e,t){let n=document.getElementById(`modal-overlay`),r=document.getElementById(`modal-body`),a=document.getElementById(`modal-close`);r.innerHTML=`<h3 id="modal-title">${i(e)}</h3>${t}`,n.classList.remove(`hidden`),n.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`,q=document.activeElement,a.focus(),Ke(n)}function Y(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,q&&=(q.focus(),null)}function Ke(e){let t=e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`),n=t[0],r=t[t.length-1];function i(t){if(t.key===`Escape`){Y(),e.removeEventListener(`keydown`,i);return}t.key===`Tab`&&(t.shiftKey?document.activeElement===n&&(t.preventDefault(),r.focus()):document.activeElement===r&&(t.preventDefault(),n.focus()))}e.addEventListener(`keydown`,i)}function qe(e){return new Promise(t=>{J(`Confirmar acción`,`
      <p>${i(e)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">Sí, eliminar</button>
        <button id="confirm-no" class="confirm-btn confirm-no">Cancelar</button>
      </div>
    `),document.getElementById(`confirm-yes`).addEventListener(`click`,()=>{Y(),t(!0)}),document.getElementById(`confirm-no`).addEventListener(`click`,()=>{Y(),t(!1)})})}var X;async function Je(e){document.body.classList.add(`dashboard-mode`),e.innerHTML=`
    <div class="dashboard">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar" id="dashboard-sidebar">
        <button class="btn-new-client" id="btn-new-client">
          <i class="fas fa-plus"></i> Nuevo Cliente
        </button>
        <div class="recent-clients-title">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </aside>

      <!-- Contenido principal -->
      <section class="dashboard-main">
        <div class="dashboard-header">
          <div class="dashboard-logo">StyleRecord Lite</div>
          <div class="dashboard-search">
            <i class="fas fa-search"></i>
            <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
          </div>
          <div class="dashboard-actions">
            <i class="fas fa-cog"></i>
            <button id="btn-logout-dash"><i class="fas fa-sign-out-alt"></i></button>
          </div>
        </div>
        <div id="main-content-area" class="main-content-area"></div>
      </section>
    </div>
  `,document.getElementById(`btn-logout-dash`).addEventListener(`click`,()=>{document.body.classList.remove(`dashboard-mode`),l(),window.location.hash=`/login`,window.location.reload()});let t=await A(),n=document.getElementById(`sidebar-client-list`),r=document.getElementById(`main-content-area`);X=async(e=``)=>{let t=await A();Ye(n,e?t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)):t)},Ye(n,t),n.addEventListener(`click`,async e=>{let t=e.target.closest(`.sidebar-client-item`);if(!t)return;let n=t.dataset.id;Ve(n),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`),await Z(n,r)}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>Ze()),document.getElementById(`dashboard-search`).addEventListener(`input`,a(async e=>{await X(e.target.value)},300)),r.innerHTML=`
    <div class="empty-dashboard">
      <i class="fas fa-cut"></i>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `}function Ye(e,t){if(t.length===0){e.innerHTML=`<p style="color:#999; text-align:center;">Sin clientes</p>`;return}e.innerHTML=t.map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2);return`
      <div class="sidebar-client-item" data-id="${i(e.id)}">
        <div class="client-initials">${t}</div>
        <span class="client-name-sidebar">${i(e.name)}</span>
      </div>
    `}).join(``)}async function Z(e,t){let n=await N(e);if(!n){t.innerHTML=`<p>Cliente no encontrado.</p>`;return}let r=await R(e),a=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date)),o=`
    <div class="history-header">
      <div class="history-service-count">${r.length} servicio(s) registrado(s)</div>
      <h2 class="history-title">Historial de Servicio</h2>
      <p class="history-client-name">Cliente: ${i(n.name)}</p>
      <div class="history-divider"></div>
    </div>
    <div class="service-cards-container">
  `;a.forEach(e=>{o+=`
      <div class="service-card-dashboard" data-service-id="${i(e.id)}">
        <div class="service-card-header">
          <span class="service-date">${Xe(e.date)}</span>
          <span class="service-type-badge">${i(e.type)}</span>
        </div>
        <div class="service-images">
          <div class="image-card">
            <div class="image-label">ANTES</div>
            ${e.beforeImg?`<img src="${i(e.beforeImg)}" alt="Antes" />`:`<div class="image-placeholder">Sin foto</div>`}
          </div>
          <div class="image-card">
            <div class="image-label">DESPUÉS</div>
            ${e.afterImg?`<img src="${i(e.afterImg)}" alt="Después" />`:`<div class="image-placeholder">Sin foto</div>`}
          </div>
        </div>
        ${e.notes?`
        <div class="service-notes-dashboard">
          <div class="notes-bar"></div>
          <div class="notes-text">${i(e.notes)}</div>
        </div>`:``}
        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <button class="btn-edit-service-dash" data-id="${i(e.id)}" style="background: none; border: 1px solid #ddd; border-radius: 6px; padding: 4px 12px; cursor:pointer;"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-delete-service-dash" data-id="${i(e.id)}" style="background: none; border: 1px solid #E53935; color: #E53935; border-radius: 6px; padding: 4px 12px; cursor:pointer;"><i class="fas fa-trash"></i> Eliminar</button>
        </div>
      </div>
    `}),o+=`
    <div class="add-service-area" id="add-service-area">
      <span class="add-service-icon">➕</span>
      <span class="add-service-text">Agregar servicio</span>
    </div>
    </div>
  `,t.innerHTML=o,document.getElementById(`add-service-area`).addEventListener(`click`,()=>Qe()),t.querySelectorAll(`.btn-edit-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),$e(e.dataset.id)})}),t.querySelectorAll(`.btn-delete-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),et(e.dataset.id)})})}function Xe(e){let t=[`Ene`,`Feb`,`Mar`,`Abr`,`May`,`Jun`,`Jul`,`Ago`,`Sep`,`Oct`,`Nov`,`Dic`],n=new Date(e);return`${n.getDate()} ${t[n.getMonth()]} ${n.getFullYear()}`}async function Ze(){J(`Nuevo Cliente`,Ne()),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-phone`).value.trim(),r=ze(t,n);if(Q(`client`,r),Object.keys(r).length>0)return;let a=document.getElementById(`validate-btn`),o=document.getElementById(`validation-area`);if((await A()).find(e=>e.phone===n)){o.innerHTML=`<div class="validation-error">El teléfono ya está registrado.</div>`;return}a.disabled=!0,a.innerHTML=`<span class="spinner"></span> Validando...`,o.innerHTML=``;try{let e=await Me(n);o.innerHTML=`
        <div class="validation-result">
          <i class="fas fa-check-circle"></i> Número válido<br>
          <strong>${i(e.number)}</strong><br>
          País: ${i(e.country_name)} (${i(e.country_code)})<br>
          Compañía: ${i(e.carrier)}
        </div>`,await P({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),Y(),await X(),L(`Cliente creado correctamente`)}catch(e){e.name===`InvalidPhoneError`?(o.innerHTML=`
          <div class="validation-error">El número no es válido.</div>
          <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
          <button type="button" id="force-save-btn">Guardar manualmente</button>`,document.getElementById(`force-save-btn`).addEventListener(`click`,async()=>{await P({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!1,phoneDetails:null,services:[]}),Y(),await X()})):o.innerHTML=`<div class="validation-error">${i(e.message)}</div>`}finally{a.disabled=!1,a.innerHTML=`Validar y Guardar`}})}async function Qe(){if(!W){I(`Selecciona un cliente primero.`);return}let{before:e,after:t}=H();J(`Agregar Servicio`,Pe(e,t));let n=document.getElementById(`new-service-form`),r=e,i=t;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=H();r=e.before,i=e.after,document.getElementById(`preview-before`).src=r,document.getElementById(`preview-after`).src=i}),n.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,n=document.getElementById(`service-date`).value,a=document.getElementById(`service-notes`).value.trim(),o=Be(t,n,a);Q(`service`,o),!(Object.keys(o).length>0)&&(await Oe(W,{id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:W,date:n,type:t,notes:a,beforeImg:r,afterImg:i}),Y(),await Z(W,document.getElementById(`main-content-area`)),L(`Servicio agregado`))})}async function $e(e){let t=(await R(W)).find(t=>t.id===e);t&&(J(`Editar Servicio`,Fe(t)),document.getElementById(`edit-service-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-service-type`).value,r=document.getElementById(`edit-service-date`).value,i=document.getElementById(`edit-service-notes`).value.trim(),a=Be(n,r,i);Q(`edit-service`,a),!(Object.keys(a).length>0)&&(await ke(W,e,{type:n,date:r,notes:i}),Y(),await Z(W,document.getElementById(`main-content-area`)),L(`Servicio actualizado`))}))}async function et(e){await qe(`¿Eliminar este servicio?`)&&(await Ae(W,e),await Z(W,document.getElementById(`main-content-area`)),L(`Servicio eliminado`))}function Q(e,t){[`name`,`phone`,`type`,`date`].forEach(n=>{let r=document.getElementById(`error-${e}-${n}`);r&&(r.textContent=t[n]||``)})}async function tt(e){e.innerHTML=`
    <section id="client-view" class="view active">
      <h2><i class="fas fa-history"></i> Mi Historial de Servicios</h2>
      <div id="client-history" class="history-cards"></div>
      <button id="btn-share-profile" class="action-btn"><i class="fas fa-share-alt"></i> Compartir Perfil</button>
    </section>
  `;let t=localStorage.getItem(`sr-client-phone`);t?await We(t,document.getElementById(`client-history`)):I(`Error al recuperar tu información.`),document.getElementById(`btn-share-profile`).addEventListener(`click`,async()=>{let e=await M(t);if(!e){I(`Error al obtener tu perfil.`);return}let n=ne(e.id);J(`Compartir Perfil`,Ie(`${window.location.origin}${window.location.pathname}?token=${n}`)),document.getElementById(`btn-copy-link`).addEventListener(`click`,()=>{let e=document.getElementById(`share-link`);e.select(),navigator.clipboard.writeText(e.value).then(()=>L(`Enlace copiado al portapapeles.`))})})}async function nt(e,t){let n=re(t);n?await Ge(n,e):e.innerHTML=`
      <section class="view active">
        <div class="card" style="text-align:center; margin-top:2rem;">
          <i class="fas fa-link-slash" style="font-size:2rem; color:var(--danger);"></i>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
        </div>
      </section>`}var rt=`modulepreload`,it=function(e){return`/StyleRecordLite/`+e},$={},at=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=it(t,n),t in $)return;$[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:rt,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};document.addEventListener(`DOMContentLoaded`,async()=>{await r(),ie(),`serviceWorker`in navigator&&at(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[]).then(({Workbox:e})=>{let t=new e(`/StyleRecordLite/sw.js`);t.addEventListener(`waiting`,()=>{confirm(`Nueva versión disponible. ¿Actualizar ahora?`)&&t.messageSkipWaiting()}),t.addEventListener(`controlling`,()=>{window.location.reload()}),t.register()}).catch(e=>console.error(`Workbox no se pudo cargar:`,e));let e=document.createElement(`div`);e.id=`offline-banner`,e.className=`offline-banner hidden`,e.innerHTML=`<i class="fas fa-wifi-slash"></i> ${He(`offline`)}`,document.body.appendChild(e),window.addEventListener(`online`,()=>e.classList.add(`hidden`)),window.addEventListener(`offline`,()=>e.classList.remove(`hidden`));let t=document.getElementById(`modal-close`),n=document.getElementById(`modal-overlay`);t&&t.addEventListener(`click`,Y),n&&n.addEventListener(`click`,e=>{e.target===e.currentTarget&&Y()});let i=document.getElementById(`btn-logout`);i&&i.addEventListener(`click`,()=>{l(),m(`/login`),window.location.reload()});let a=new URLSearchParams(window.location.search).get(`token`);if(a){document.body.classList.remove(`dashboard-mode`);let e=document.querySelector(`main`);e.innerHTML=``,await nt(e,a);return}let o=oe(),s=document.querySelector(`main`);if(o.addRoute(`/login`,()=>{document.body.classList.remove(`dashboard-mode`),i&&(i.style.display=`none`),De(s)}),o.addRoute(`/professional`,async()=>{if(!u()||c()!==`professional`){o.navigate(`/login`);return}await Je(s)}),o.addRoute(`/client`,async()=>{if(document.body.classList.remove(`dashboard-mode`),!u()||c()!==`client`){o.navigate(`/login`);return}i&&(i.style.display=`block`),await tt(s)}),o.addRoute(`*`,()=>o.navigate(`/login`)),u()){let e=c();e===`professional`?o.navigate(`/professional`):e===`client`?o.navigate(`/client`):o.navigate(`/login`)}o.start()});