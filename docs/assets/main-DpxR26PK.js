(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t=document){return t.querySelector(e)}function t(e,t,n,r){t.innerHTML=e,r&&r(n)}async function n(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function r(){let r=await n(`partials/header.html`),i=await n(`partials/footer.html`),a=e(`#main-header`),o=e(`#main-footer`);t(r,a),t(i,o)}function i(e){let t=document.createElement(`div`);return t.appendChild(document.createTextNode(e)),t.innerHTML}function a(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var o=`sr-role`,s=`1234`;function ee(e){if(e===s)try{return localStorage.setItem(o,`professional`),!0}catch(e){return console.error(`Error al guardar rol:`,e),!1}return!1}function te(e){try{localStorage.setItem(o,`client`),localStorage.setItem(`sr-client-phone`,e)}catch(e){console.error(`Error al guardar rol de cliente:`,e)}}function c(){try{return localStorage.getItem(o)}catch(e){return console.error(`Error al leer rol:`,e),null}}function ne(){try{localStorage.removeItem(o),localStorage.removeItem(`sr-client-phone`)}catch(e){console.error(`Error al cerrar sesión:`,e)}}function l(){return c()!==null}var u=`sr-temp-links`;function d(){try{let e=localStorage.getItem(u);return e?JSON.parse(e):[]}catch(e){return console.error(`Error al cargar enlaces temporales:`,e),[]}}function f(e){try{return localStorage.setItem(u,JSON.stringify(e)),!0}catch(e){return console.error(`Error al guardar enlaces temporales:`,e),!1}}function re(e){let t=`tok_`+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2,9)),n=d();return n.push({token:t,clientId:e,expiresAt:Date.now()+1440*60*1e3}),f(n),t}function ie(e){let t=d(),n=t.find(t=>t.token===e);return n?Date.now()>n.expiresAt?(f(t.filter(t=>t.token!==e)),null):n.clientId:null}function ae(){f(d().filter(e=>Date.now()<=e.expiresAt))}var oe=class{constructor(){this.routes={},window.addEventListener(`hashchange`,()=>this.resolve())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}resolve(){let e=window.location.hash.slice(1)||`/`,t=this.routes[e]||this.routes[`*`];t&&t()}start(){window.location.hash?this.resolve():window.location.hash=`/login`}};function se(){return new oe}function p(e){window.location.hash=e}var m=(e,t)=>t.some(t=>e instanceof t),ce,le;function ue(){return ce||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function de(){return le||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var h=new WeakMap,g=new WeakMap,_=new WeakMap;function fe(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(b(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return _.set(t,e),t}function pe(e){if(h.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});h.set(e,t)}var v={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return h.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function y(e){v=e(v)}function me(e){return de().includes(e)?function(...t){return e.apply(x(this),t),b(this.request)}:function(...t){return b(e.apply(x(this),t))}}function he(e){return typeof e==`function`?me(e):(e instanceof IDBTransaction&&pe(e),m(e,ue())?new Proxy(e,v):e)}function b(e){if(e instanceof IDBRequest)return fe(e);if(g.has(e))return g.get(e);let t=he(e);return t!==e&&(g.set(e,t),_.set(t,e)),t}var x=e=>_.get(e);function ge(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=b(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(b(o.result),e.oldVersion,e.newVersion,b(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var _e=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],ve=[`put`,`add`,`delete`,`clear`],S=new Map;function C(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(S.get(t))return S.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=ve.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||_e.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return S.set(t,a),a}y(e=>({...e,get:(t,n,r)=>C(t,n)||e.get(t,n,r),has:(t,n)=>!!C(t,n)||e.has(t,n)}));var ye=[`continue`,`continuePrimaryKey`,`advance`],w={},T=new WeakMap,be=new WeakMap,xe={get(e,t){if(!ye.includes(t))return e[t];let n=w[t];return n||=w[t]=function(...e){T.set(this,be.get(this)[t](...e))},n}};async function*Se(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,xe);for(be.set(n,t),_.set(n,x(t));t;)yield n,t=await(T.get(n)||t.continue()),T.delete(n)}function E(e,t){return t===Symbol.asyncIterator&&m(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&m(e,[IDBIndex,IDBObjectStore])}y(e=>({...e,get(t,n,r){return E(t,n)?Se:e.get(t,n,r)},has(t,n){return E(t,n)||e.has(t,n)}}));var Ce=`stylerecord-db`,we=1,D;function O(){return D||=ge(Ce,we,{upgrade(e){e.objectStoreNames.contains(`clients`)||e.createObjectStore(`clients`,{keyPath:`id`})}}),D}async function Te(){return(await O()).getAll(`clients`)}async function Ee(e){let t=(await O()).transaction(`clients`,`readwrite`);await t.store.clear();for(let n of e)await t.store.put(n);await t.done}async function De(e){await(await O()).add(`clients`,e)}async function k(){try{return await Te()}catch(e){return console.error(`Error al cargar clientes:`,e),[]}}async function A(e){try{return await Ee(e),!0}catch(e){return console.error(`Error al guardar clientes:`,e),!1}}async function j(e){return(await k()).find(t=>t.phone===e)}async function M(e){return(await k()).find(t=>t.id===e)}async function N(e){try{return await De(e),!0}catch(e){return console.error(`Error al agregar cliente:`,e),!1}}function P(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.classList.add(`fade-out`),n.addEventListener(`transitionend`,()=>n.remove())},3e3)}function F(e){P(e,`error`)}function I(e){P(e,`success`)}function Oe(e){e.innerHTML=`
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
    `,document.getElementById(`prof-login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`prof-code`).value;ee(t)?p(`/professional`):F(`Código incorrecto. Prueba con 1234`)})}),document.getElementById(`btn-client-login`).addEventListener(`click`,()=>{let e=document.getElementById(`login-form-container`);e.classList.remove(`hidden`),e.innerHTML=`
      <form id="client-login-form">
        <label>Tu número de teléfono:</label>
        <input type="tel" id="client-phone" placeholder="+541112345678" required />
        <button type="submit">Ver historial</button>
      </form>
    `,document.getElementById(`client-login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`client-phone`).value.trim();j(t)?(te(t),p(`/client`)):F(`No se encontró un cliente con ese número.`)})})}async function L(e){let t=(await k()).find(t=>t.id===e);return t?t.services:[]}async function ke(e,t){let n=await k(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),await A(n),!0):!1}async function Ae(e,t,n){let r=await k(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},await A(r),!0)}async function je(e,t){let n=await k(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),await A(n),!0):!1}var R=class extends Error{constructor(e,t){super(e),this.name=`InvalidPhoneError`,this.details=t}},z=class extends Error{constructor(e){super(e),this.name=`ServiceError`}},Me=`c43204c2a5e320e5600d73ce305b6f0d`;async function Ne(e){let t=`https://apilayer.net/api/validate?access_key=${Me}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw new R(`El número no es válido o no existe.`,n);return n}catch(e){throw e instanceof R||e instanceof z?e:new z(`No se pudo conectar con el servicio de validación. Intenta más tarde.`)}}function B(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function V(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10);return{before:B(300,200,e),after:B(300,200,t)}}function Pe(){return`
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
  `}function Fe(e,t){return`
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
  `}function Ie(e){return`
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
  `}function Le(e){return`
    <p>Envía este enlace a tu nuevo profesional. <strong>Válido por 24 horas.</strong></p>
    <div style="display:flex; gap:0.5rem; margin:1rem 0;">
      <input type="text" id="share-link" value="${i(e)}" readonly style="flex:1;" />
      <button id="btn-copy-link"><i class="fas fa-copy"></i> Copiar</button>
    </div>
    <small>El profesional podrá ver tu historial de servicios sin poder editarlo.</small>
  `}function H(e,t){return!e||!e.trim()?`${t} es obligatorio.`:null}function Re(e){return/^\+?[1-9]\d{6,14}$/.test(e.trim())?null:`Formato de teléfono inválido. Ej: +541112345678`}function ze(e){let t=new Date(e),n=new Date;return n.setHours(0,0,0,0),t>n?`La fecha no puede ser futura.`:null}function Be(e,t){let n={},r=H(e,`Nombre`);r&&(n.name=r);let i=H(t,`Teléfono`)||Re(t);return i&&(n.phone=i),n}function U(e,t,n){let r={};e||(r.type=`Tipo de servicio es obligatorio.`);let i=H(t,`Fecha`)||ze(t);return i&&(r.date=i),r}var W=null;function Ve(e){W=e}var G={es:{appName:`StyleRecord Lite`,login:`Accede a StyleRecord`,professional:`Soy Profesional`,client:`Soy Cliente`,search:`Buscar cliente...`,newClient:`Nuevo Cliente`,addService:`Agregar Servicio`,edit:`Editar`,delete:`Eliminar`,confirmDeleteClient:`¿Eliminar este cliente y todos sus servicios?`,confirmDeleteService:`¿Eliminar este servicio?`,saved:`Guardado`,invalidCode:`Código incorrecto. Prueba con 1234`,noClient:`No se encontró un cliente con ese número.`,noClients:`No hay clientes registrados.`,emptyHint:`Agrega tu primer cliente con el botón "Nuevo Cliente".`,noServices:`Este cliente no tiene servicios registrados.`,noHistory:`No tienes servicios registrados aún.`,linkExpired:`Enlace expirado o inválido`,linkExpiredMsg:`Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.`,sharedBanner:`Vista temporal – Este enlace expirará`,shareProfile:`Compartir Perfil`,copyLink:`Copiar`,copied:`¡Copiado!`,offline:`Sin conexión a internet. Algunas funciones pueden no estar disponibles.`,clientCreated:`Cliente creado correctamente`,clientUpdated:`Cliente actualizado`,clientDeleted:`Cliente eliminado`,serviceAdded:`Servicio agregado`,serviceUpdated:`Servicio actualizado`,serviceDeleted:`Servicio eliminado`,phoneExists:`El teléfono ya está registrado.`,invalidPhone:`El número no es válido.`,manualSave:`Guardar de todas formas`,saveManually:`Guardar manualmente`,validateAndSave:`Validar y Guardar`,validating:`Validando...`,before:`Antes`,after:`Después`,beforeImageAlt:`Antes del servicio`,afterImageAlt:`Después del servicio`,editService:`Editar servicio`,deleteService:`Eliminar servicio`,editClient:`Editar`,deleteClient:`Eliminar`,clientAriaLabel:`Cliente`,noServicesShort:`Sin servicios`,addServiceHint:`Usa "Agregar Servicio" para añadir uno.`,historyOf:`Historial de`,yes:`Sí, eliminar`,cancel:`Cancelar`,confirmTitle:`Confirmar acción`,serviceAriaLabel:`Servicio`},en:{appName:`StyleRecord Lite`,login:`Log in to StyleRecord`,professional:`I am a Professional`,client:`I am a Client`,search:`Search client...`,newClient:`New Client`,addService:`Add Service`,edit:`Edit`,delete:`Delete`,confirmDeleteClient:`Delete this client and all services?`,confirmDeleteService:`Delete this service?`,saved:`Saved`,invalidCode:`Incorrect code. Try 1234`,noClient:`No client found with that number.`,noClients:`No registered clients.`,emptyHint:`Add your first client using the "New Client" button.`,noServices:`This client has no registered services.`,noHistory:`You have no registered services yet.`,linkExpired:`Link expired or invalid`,linkExpiredMsg:`This link has expired (24 hours) or is incorrect. Ask your professional for a new link.`,sharedBanner:`Temporary view – This link will expire`,shareProfile:`Share Profile`,copyLink:`Copy`,copied:`Copied!`,offline:`No internet connection. Some features may not be available.`,clientCreated:`Client created successfully`,clientUpdated:`Client updated`,clientDeleted:`Client deleted`,serviceAdded:`Service added`,serviceUpdated:`Service updated`,serviceDeleted:`Service deleted`,phoneExists:`Phone number already registered.`,invalidPhone:`Invalid phone number.`,manualSave:`Save anyway`,saveManually:`Save manually`,validateAndSave:`Validate & Save`,validating:`Validating...`,before:`Before`,after:`After`,beforeImageAlt:`Before the service`,afterImageAlt:`After the service`,editService:`Edit service`,deleteService:`Delete service`,editClient:`Edit`,deleteClient:`Delete`,clientAriaLabel:`Client`,noServicesShort:`No services`,addServiceHint:`Use "Add Service" to add one.`,historyOf:`History of`,yes:`Yes, delete`,cancel:`Cancel`,confirmTitle:`Confirm action`,serviceAriaLabel:`Service`}},K=localStorage.getItem(`sr-lang`)||navigator.language.split(`-`)[0]||`es`;G[K]||(K=`es`);function He(e){return G[K]?.[e]||G.es[e]||e}var q=null;function J(e,t=!1){return`
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
  `}async function Ue(e,t){let n=await j(e);if(!n||n.services.length===0){t.innerHTML=`
      <div class="empty-state">
        <i class="fas fa-history fa-3x"></i>
        <p>No tienes servicios registrados aún.</p>
      </div>`;return}t.innerHTML=[...n.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>J(e,!1)).join(``)}async function We(e,t){let n=await M(e);if(!n){t.innerHTML=`<p>Perfil no encontrado.</p>`;return}let r=[...await L(e)].sort((e,t)=>new Date(t.date)-new Date(e.date));t.innerHTML=`
    <div class="shared-banner" role="alert">
      <i class="fas fa-clock"></i> Vista temporal – Este enlace expirará
    </div>
    <h2>Historial de ${i(n.name)}</h2>
    ${r.length===0?`<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>Sin servicios registrados.</p></div>`:r.map(e=>J(e,!1)).join(``)}
  `}function Y(e,t){let n=document.getElementById(`modal-overlay`),r=document.getElementById(`modal-body`),a=document.getElementById(`modal-close`);r.innerHTML=`<h3 id="modal-title">${i(e)}</h3>${t}`,n.classList.remove(`hidden`),n.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`,q=document.activeElement,a.focus(),Ge(n)}function X(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,q&&=(q.focus(),null)}function Ge(e){let t=e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`),n=t[0],r=t[t.length-1];function i(t){if(t.key===`Escape`){X(),e.removeEventListener(`keydown`,i);return}t.key===`Tab`&&(t.shiftKey?document.activeElement===n&&(t.preventDefault(),r.focus()):document.activeElement===r&&(t.preventDefault(),n.focus()))}e.addEventListener(`keydown`,i)}function Ke(e){return new Promise(t=>{Y(`Confirmar acción`,`
      <p>${i(e)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">Sí, eliminar</button>
        <button id="confirm-no" class="confirm-btn confirm-no">Cancelar</button>
      </div>
    `),document.getElementById(`confirm-yes`).addEventListener(`click`,()=>{X(),t(!0)}),document.getElementById(`confirm-no`).addEventListener(`click`,()=>{X(),t(!1)})})}var Z;async function qe(e){document.body.classList.add(`dashboard-mode`),e.innerHTML=`
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
  `,document.getElementById(`btn-logout-dash`).addEventListener(`click`,()=>{document.body.classList.remove(`dashboard-mode`),ne(),window.location.hash=`/login`,window.location.reload()});let t=await k(),n=document.getElementById(`sidebar-client-list`),r=document.getElementById(`main-content-area`);Z=async(e=``)=>{let t=await k();Je(n,e?t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)):t)},Je(n,t),n.addEventListener(`click`,async e=>{let t=e.target.closest(`.sidebar-client-item`);if(!t)return;let n=t.dataset.id;Ve(n),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`),await Q(n,r)}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>Xe()),document.getElementById(`dashboard-search`).addEventListener(`input`,a(async e=>{await Z(e.target.value)},300)),r.innerHTML=`
    <div class="empty-dashboard">
      <i class="fas fa-cut"></i>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `}function Je(e,t){if(t.length===0){e.innerHTML=`<p style="color:#999; text-align:center;">Sin clientes</p>`;return}e.innerHTML=t.map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2);return`
      <div class="sidebar-client-item" data-id="${i(e.id)}">
        <div class="client-initials">${t}</div>
        <span class="client-name-sidebar">${i(e.name)}</span>
      </div>
    `}).join(``)}async function Q(e,t){let n=await M(e);if(!n){t.innerHTML=`<p>Cliente no encontrado.</p>`;return}let r=await L(e),a=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date)),o=`
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
          <span class="service-date">${Ye(e.date)}</span>
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
  `,t.innerHTML=o,document.getElementById(`add-service-area`).addEventListener(`click`,()=>Ze()),t.querySelectorAll(`.btn-edit-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Qe(e.dataset.id)})}),t.querySelectorAll(`.btn-delete-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),$e(e.dataset.id)})})}function Ye(e){let t=[`Ene`,`Feb`,`Mar`,`Abr`,`May`,`Jun`,`Jul`,`Ago`,`Sep`,`Oct`,`Nov`,`Dic`],n=new Date(e);return`${n.getDate()} ${t[n.getMonth()]} ${n.getFullYear()}`}async function Xe(){Y(`Nuevo Cliente`,Pe()),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-phone`).value.trim(),r=Be(t,n);if($(`client`,r),Object.keys(r).length>0)return;let a=document.getElementById(`validate-btn`),o=document.getElementById(`validation-area`);if((await k()).find(e=>e.phone===n)){o.innerHTML=`<div class="validation-error">El teléfono ya está registrado.</div>`;return}a.disabled=!0,a.innerHTML=`<span class="spinner"></span> Validando...`,o.innerHTML=``;try{let e=await Ne(n);o.innerHTML=`
        <div class="validation-result">
          <i class="fas fa-check-circle"></i> Número válido<br>
          <strong>${i(e.number)}</strong><br>
          País: ${i(e.country_name)} (${i(e.country_code)})<br>
          Compañía: ${i(e.carrier)}
        </div>`,await N({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),X(),await Z(),I(`Cliente creado correctamente`)}catch(e){e.name===`InvalidPhoneError`?(o.innerHTML=`
          <div class="validation-error">El número no es válido.</div>
          <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
          <button type="button" id="force-save-btn">Guardar manualmente</button>`,document.getElementById(`force-save-btn`).addEventListener(`click`,async()=>{await N({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!1,phoneDetails:null,services:[]}),X(),await Z()})):o.innerHTML=`<div class="validation-error">${i(e.message)}</div>`}finally{a.disabled=!1,a.innerHTML=`Validar y Guardar`}})}async function Ze(){if(!W){F(`Selecciona un cliente primero.`);return}let{before:e,after:t}=V();Y(`Agregar Servicio`,Fe(e,t));let n=document.getElementById(`new-service-form`),r=e,i=t;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=V();r=e.before,i=e.after,document.getElementById(`preview-before`).src=r,document.getElementById(`preview-after`).src=i}),n.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,n=document.getElementById(`service-date`).value,a=document.getElementById(`service-notes`).value.trim(),o=U(t,n,a);$(`service`,o),!(Object.keys(o).length>0)&&(await ke(W,{id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:W,date:n,type:t,notes:a,beforeImg:r,afterImg:i}),X(),await Q(W,document.getElementById(`main-content-area`)),I(`Servicio agregado`))})}async function Qe(e){let t=(await L(W)).find(t=>t.id===e);t&&(Y(`Editar Servicio`,Ie(t)),document.getElementById(`edit-service-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-service-type`).value,r=document.getElementById(`edit-service-date`).value,i=document.getElementById(`edit-service-notes`).value.trim(),a=U(n,r,i);$(`edit-service`,a),!(Object.keys(a).length>0)&&(await Ae(W,e,{type:n,date:r,notes:i}),X(),await Q(W,document.getElementById(`main-content-area`)),I(`Servicio actualizado`))}))}async function $e(e){await Ke(`¿Eliminar este servicio?`)&&(await je(W,e),await Q(W,document.getElementById(`main-content-area`)),I(`Servicio eliminado`))}function $(e,t){[`name`,`phone`,`type`,`date`].forEach(n=>{let r=document.getElementById(`error-${e}-${n}`);r&&(r.textContent=t[n]||``)})}async function et(e){e.innerHTML=`
    <section id="client-view" class="view active">
      <h2><i class="fas fa-history"></i> Mi Historial de Servicios</h2>
      <div id="client-history" class="history-cards"></div>
      <button id="btn-share-profile" class="action-btn"><i class="fas fa-share-alt"></i> Compartir Perfil</button>
    </section>
  `;let t=localStorage.getItem(`sr-client-phone`);t?await Ue(t,document.getElementById(`client-history`)):F(`Error al recuperar tu información.`),document.getElementById(`btn-share-profile`).addEventListener(`click`,async()=>{let e=await j(t);if(!e){F(`Error al obtener tu perfil.`);return}let n=re(e.id);Y(`Compartir Perfil`,Le(`${window.location.origin}${window.location.pathname}?token=${n}`)),document.getElementById(`btn-copy-link`).addEventListener(`click`,()=>{let e=document.getElementById(`share-link`);e.select(),navigator.clipboard.writeText(e.value).then(()=>I(`Enlace copiado al portapapeles.`))})})}async function tt(e,t){let n=ie(t);n?await We(n,e):e.innerHTML=`
      <section class="view active">
        <div class="card" style="text-align:center; margin-top:2rem;">
          <i class="fas fa-link-slash" style="font-size:2rem; color:var(--danger);"></i>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
        </div>
      </section>`}document.addEventListener(`DOMContentLoaded`,async()=>{await r(),ae();let e=document.createElement(`div`);e.id=`offline-banner`,e.className=`offline-banner hidden`,e.innerHTML=`<i class="fas fa-wifi-slash"></i> ${He(`offline`)}`,document.body.appendChild(e),window.addEventListener(`online`,()=>e.classList.add(`hidden`)),window.addEventListener(`offline`,()=>e.classList.remove(`hidden`));let t=document.getElementById(`modal-close`),n=document.getElementById(`modal-overlay`);t&&t.addEventListener(`click`,X),n&&n.addEventListener(`click`,e=>{e.target===e.currentTarget&&X()});let i=document.getElementById(`btn-logout`);i&&i.addEventListener(`click`,()=>{ne(),window.location.hash=`/login`,window.location.reload()});let a=new URLSearchParams(window.location.search).get(`token`);if(a){document.body.classList.remove(`dashboard-mode`);let e=document.querySelector(`main`);e.innerHTML=``,await tt(e,a);return}let o=se(),s=document.querySelector(`main`);if(o.addRoute(`/login`,()=>{document.body.classList.remove(`dashboard-mode`),i&&(i.style.display=`none`),Oe(s)}),o.addRoute(`/professional`,async()=>{if(!l()||c()!==`professional`){o.navigate(`/login`);return}await qe(s)}),o.addRoute(`/client`,async()=>{if(document.body.classList.remove(`dashboard-mode`),!l()||c()!==`client`){o.navigate(`/login`);return}i&&(i.style.display=`block`),await et(s)}),o.addRoute(`*`,()=>o.navigate(`/login`)),l()){let e=c();e===`professional`?o.navigate(`/professional`):e===`client`?o.navigate(`/client`):o.navigate(`/login`)}o.start()});