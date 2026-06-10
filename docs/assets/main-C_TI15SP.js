var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t=document){return t.querySelector(e)}function r(e,t,n,r){t.innerHTML=e,r&&r(n)}async function i(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function a(){let e=await i(`partials/header.html`),t=await i(`partials/footer.html`),a=n(`#main-header`),o=n(`#main-footer`);r(e,a),r(t,o)}function o(e){let t=document.createElement(`div`);return t.appendChild(document.createTextNode(e)),t.innerHTML}function s(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var c=t({getRole:()=>u,isAuthenticated:()=>f,loginAsClient:()=>ne,loginAsProfessional:()=>te,logout:()=>d}),l=`sr-role`,ee=`1234`;function te(e){if(e===ee)try{return localStorage.setItem(l,`professional`),!0}catch(e){return console.error(`Error al guardar rol:`,e),!1}return!1}function ne(e){try{localStorage.setItem(l,`client`),localStorage.setItem(`sr-client-phone`,e)}catch(e){console.error(`Error al guardar rol de cliente:`,e)}}function u(){try{return localStorage.getItem(l)}catch(e){return console.error(`Error al leer rol:`,e),null}}function d(){try{localStorage.removeItem(l),localStorage.removeItem(`sr-client-phone`)}catch(e){console.error(`Error al cerrar sesión:`,e)}}function f(){return u()!==null}var p=`sr-temp-links`;function m(){try{let e=localStorage.getItem(p);return e?JSON.parse(e):[]}catch(e){return console.error(`Error al cargar enlaces temporales:`,e),[]}}function re(e){try{return localStorage.setItem(p,JSON.stringify(e)),!0}catch(e){return console.error(`Error al guardar enlaces temporales:`,e),!1}}function ie(e){let t=`tok_`+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2,9)),n=m();return n.push({token:t,clientId:e,expiresAt:Date.now()+1440*60*1e3}),re(n),t}function ae(){re(m().filter(e=>Date.now()<=e.expiresAt))}var oe=class{constructor(){this.routes={},window.addEventListener(`hashchange`,()=>this.resolve())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}resolve(){let[e]=(window.location.hash.slice(1)||`/`).split(`?`),t=this.routes[e]||this.routes[`*`];t&&t()}start(){window.location.hash?this.resolve():window.location.hash=`/home`}};function se(){return new oe}var h={es:{appName:`StyleRecord Lite`,login:`Accede a StyleRecord`,professional:`Soy Profesional`,client:`Soy Cliente`,search:`Buscar cliente...`,newClient:`Nuevo Cliente`,addService:`Agregar Servicio`,edit:`Editar`,delete:`Eliminar`,confirmDeleteClient:`¿Eliminar este cliente y todos sus servicios?`,confirmDeleteService:`¿Eliminar este servicio?`,saved:`Guardado`,invalidCode:`Código incorrecto. Prueba con 1234`,noClient:`No se encontró un cliente con ese número.`,noClients:`No hay clientes registrados.`,emptyHint:`Agrega tu primer cliente con el botón "Nuevo Cliente".`,noServices:`Este cliente no tiene servicios registrados.`,noHistory:`No tienes servicios registrados aún.`,linkExpired:`Enlace expirado o inválido`,linkExpiredMsg:`Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.`,sharedBanner:`Vista temporal – Este enlace expirará`,shareProfile:`Compartir Perfil`,copyLink:`Copiar`,copied:`¡Copiado!`,offline:`Sin conexión a internet. Algunas funciones pueden no estar disponibles.`,clientCreated:`Cliente creado correctamente`,clientUpdated:`Cliente actualizado`,clientDeleted:`Cliente eliminado`,serviceAdded:`Servicio agregado`,serviceUpdated:`Servicio actualizado`,serviceDeleted:`Servicio eliminado`,phoneExists:`El teléfono ya está registrado.`,invalidPhone:`El número no es válido.`,manualSave:`Guardar de todas formas`,saveManually:`Guardar manualmente`,validateAndSave:`Validar y Guardar`,validating:`Validando...`,before:`Antes`,after:`Después`,beforeImageAlt:`Antes del servicio`,afterImageAlt:`Después del servicio`,editService:`Editar servicio`,deleteService:`Eliminar servicio`,editClient:`Editar`,deleteClient:`Eliminar`,clientAriaLabel:`Cliente`,noServicesShort:`Sin servicios`,addServiceHint:`Usa "Agregar Servicio" para añadir uno.`,historyOf:`Historial de`,yes:`Sí, eliminar`,cancel:`Cancelar`,confirmTitle:`Confirmar acción`,serviceAriaLabel:`Servicio`},en:{appName:`StyleRecord Lite`,login:`Log in to StyleRecord`,professional:`I am a Professional`,client:`I am a Client`,search:`Search client...`,newClient:`New Client`,addService:`Add Service`,edit:`Edit`,delete:`Delete`,confirmDeleteClient:`Delete this client and all services?`,confirmDeleteService:`Delete this service?`,saved:`Saved`,invalidCode:`Incorrect code. Try 1234`,noClient:`No client found with that number.`,noClients:`No registered clients.`,emptyHint:`Add your first client using the "New Client" button.`,noServices:`This client has no registered services.`,noHistory:`You have no registered services yet.`,linkExpired:`Link expired or invalid`,linkExpiredMsg:`This link has expired (24 hours) or is incorrect. Ask your professional for a new link.`,sharedBanner:`Temporary view – This link will expire`,shareProfile:`Share Profile`,copyLink:`Copy`,copied:`Copied!`,offline:`No internet connection. Some features may not be available.`,clientCreated:`Client created successfully`,clientUpdated:`Client updated`,clientDeleted:`Client deleted`,serviceAdded:`Service added`,serviceUpdated:`Service updated`,serviceDeleted:`Service deleted`,phoneExists:`Phone number already registered.`,invalidPhone:`Invalid phone number.`,manualSave:`Save anyway`,saveManually:`Save manually`,validateAndSave:`Validate & Save`,validating:`Validating...`,before:`Before`,after:`After`,beforeImageAlt:`Before the service`,afterImageAlt:`After the service`,editService:`Edit service`,deleteService:`Delete service`,editClient:`Edit`,deleteClient:`Delete`,clientAriaLabel:`Client`,noServicesShort:`No services`,addServiceHint:`Use "Add Service" to add one.`,historyOf:`History of`,yes:`Yes, delete`,cancel:`Cancel`,confirmTitle:`Confirm action`,serviceAriaLabel:`Service`}},g=localStorage.getItem(`sr-lang`)||navigator.language.split(`-`)[0]||`es`;h[g]||(g=`es`);function _(e){return h[g]?.[e]||h.es[e]||e}function ce(e){e.innerHTML=`
    <section class="home-hero">
      <div class="home-hero-content">
        <h1 class="home-hero-title">${_(`appName`)}</h1>
        <p class="home-hero-subtitle">
          Organiza tus clientes, guarda el antes y después de cada servicio y haz crecer tu negocio de estética.
        </p>
        <button class="home-cta" id="btn-home-cta">
          Comenzar <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="home-hero-image">
        <img src="/images/hero.png" alt="StyleRecord Lite – Gestión de servicios" />
      </div>
    </section>

    <section class="home-value-props">
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-users"></i>
        </div>
        <h3>Gestión de Clientes</h3>
        <p>Registra y organiza a tus clientes de forma rápida y sencilla.</p>
      </div>
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-camera"></i>
        </div>
        <h3>Historial Visual</h3>
        <p>Guarda fotos del antes y después de cada servicio.</p>
      </div>
      <div class="home-prop">
        <div class="home-prop-icon">
          <i class="fas fa-calendar-check"></i>
        </div>
        <h3>Seguimiento Profesional</h3>
        <p>Revisa el historial completo de cada cliente en cualquier momento.</p>
      </div>
    </section>
  `,document.getElementById(`btn-home-cta`).addEventListener(`click`,()=>{window.location.hash=`/rol`})}function le(e){e.innerHTML=`
    <section class="role-selection">
      <h2 class="role-heading">${_(`login`)}</h2>
      <p class="role-subtitle">Elige cómo quieres acceder</p>
      <div class="role-cards">
        <div class="role-card" id="role-professional">
          <div class="role-icon">
            <i class="fas fa-cut"></i>
          </div>
          <h3 class="role-card-title">${_(`professional`)}</h3>
          <p class="role-card-desc">Gestiona tus clientes, guarda historiales visuales y haz crecer tu negocio.</p>
        </div>
        <div class="role-card" id="role-client">
          <div class="role-icon">
            <i class="fas fa-user"></i>
          </div>
          <h3 class="role-card-title">${_(`client`)}</h3>
          <p class="role-card-desc">Consulta el historial de tus servicios y comparte tu perfil con profesionales.</p>
        </div>
      </div>
    </section>
  `,document.getElementById(`role-professional`).addEventListener(`click`,()=>{window.location.hash=`/login?role=professional`}),document.getElementById(`role-client`).addEventListener(`click`,()=>{window.location.hash=`/login?role=client`})}var v=(e,t)=>t.some(t=>e instanceof t),ue,de;function fe(){return ue||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function pe(){return de||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var y=new WeakMap,b=new WeakMap,x=new WeakMap;function me(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(C(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return x.set(t,e),t}function he(e){if(y.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});y.set(e,t)}var S={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return y.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return C(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function ge(e){S=e(S)}function _e(e){return pe().includes(e)?function(...t){return e.apply(w(this),t),C(this.request)}:function(...t){return C(e.apply(w(this),t))}}function ve(e){return typeof e==`function`?_e(e):(e instanceof IDBTransaction&&he(e),v(e,fe())?new Proxy(e,S):e)}function C(e){if(e instanceof IDBRequest)return me(e);if(b.has(e))return b.get(e);let t=ve(e);return t!==e&&(b.set(e,t),x.set(t,e)),t}var w=e=>x.get(e);function ye(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=C(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(C(o.result),e.oldVersion,e.newVersion,C(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var be=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],xe=[`put`,`add`,`delete`,`clear`],T=new Map;function Se(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(T.get(t))return T.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=xe.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||be.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return T.set(t,a),a}ge(e=>({...e,get:(t,n,r)=>Se(t,n)||e.get(t,n,r),has:(t,n)=>!!Se(t,n)||e.has(t,n)}));var Ce=[`continue`,`continuePrimaryKey`,`advance`],we={},E=new WeakMap,D=new WeakMap,Te={get(e,t){if(!Ce.includes(t))return e[t];let n=we[t];return n||=we[t]=function(...e){E.set(this,D.get(this)[t](...e))},n}};async function*Ee(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,Te);for(D.set(n,t),x.set(n,w(t));t;)yield n,t=await(E.get(n)||t.continue()),E.delete(n)}function De(e,t){return t===Symbol.asyncIterator&&v(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&v(e,[IDBIndex,IDBObjectStore])}ge(e=>({...e,get(t,n,r){return De(t,n)?Ee:e.get(t,n,r)},has(t,n){return De(t,n)||e.has(t,n)}}));var Oe=`stylerecord-db`,ke=2,Ae;function O(){return Ae||=ye(Oe,ke,{upgrade(e,t,n,r){if(e.objectStoreNames.contains(`clients`)||e.createObjectStore(`clients`,{keyPath:`id`}),t<2&&(e.objectStoreNames.contains(`professionals`)||e.createObjectStore(`professionals`,{keyPath:`id`}),e.objectStoreNames.contains(`companies`)||e.createObjectStore(`companies`,{keyPath:`id`}).createIndex(`name`,`name`,{unique:!1}),!e.objectStoreNames.contains(`linkRequests`))){let t=e.createObjectStore(`linkRequests`,{keyPath:`id`});t.createIndex(`professionalId`,`professionalId`,{unique:!1}),t.createIndex(`companyId`,`companyId`,{unique:!1})}}}),Ae}async function je(){return(await O()).getAll(`clients`)}async function Me(e){let t=(await O()).transaction(`clients`,`readwrite`);await t.store.clear();for(let n of e)await t.store.put(n);await t.done}async function Ne(e){await(await O()).add(`clients`,e)}async function Pe(e){await(await O()).put(`professionals`,e)}async function Fe(e){await(await O()).put(`companies`,e)}async function Ie(e){let t=(await O()).transaction(`companies`,`readonly`).store.index(`name`),n=IDBKeyRange.bound(e,e+`￿`,!1,!1);return t.getAll(n)}async function Le(e){await(await O()).add(`linkRequests`,e)}async function k(){try{return await je()}catch(e){return console.error(`Error al cargar clientes:`,e),[]}}async function A(e){try{return await Me(e),!0}catch(e){return console.error(`Error al guardar clientes:`,e),!1}}async function j(e){return(await k()).find(t=>t.phone===e)}async function Re(e){return(await k()).find(t=>t.id===e)}async function ze(e){try{return await Ne(e),!0}catch(e){return console.error(`Error al agregar cliente:`,e),!1}}function Be(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.classList.add(`fade-out`),n.addEventListener(`transitionend`,()=>n.remove())},3e3)}function M(e){Be(e,`error`)}function N(e){Be(e,`success`)}function Ve(e){let t=window.location.hash,n=new URLSearchParams(t.split(`?`)[1]||``).get(`role`);if(!n||n!==`professional`&&n!==`client`){window.location.hash=`/rol`;return}let r=n===`professional`;e.innerHTML=`
    <section class="login-view active">
      <h2>${r?`Acceso Profesional`:`Acceso Cliente`}</h2>
      <div class="login-form-container">
        ${r?`
          <form id="login-form">
            <label>Código de acceso:</label>
            <input type="password" id="login-code" placeholder="Código" required autofocus />
            <button type="submit">Ingresar</button>
          </form>
          <p class="login-back">
            <a href="#/register">¿No tienes cuenta? Regístrate</a>
          </p>
        `:`
          <form id="login-form">
            <label>Tu número de teléfono:</label>
            <input type="tel" id="login-phone" placeholder="+541112345678" required autofocus />
            <button type="submit">Ver historial</button>
          </form>
        `}
        <p class="login-back">
          <a href="#/rol"><i class="fas fa-arrow-left"></i> Volver a selección de rol</a>
        </p>
      </div>
    </section>
  `,document.getElementById(`login-form`).addEventListener(`submit`,e=>{if(e.preventDefault(),r){let e=document.getElementById(`login-code`).value;te(e)?window.location.hash=`/professional`:M(_(`invalidCode`))}else{let e=document.getElementById(`login-phone`).value.trim();j(e)?(ne(e),window.location.hash=`/client`):M(_(`noClient`))}})}async function P(e){let t=(await k()).find(t=>t.id===e);return t?t.services:[]}async function He(e,t){let n=await k(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),await A(n),!0):!1}async function Ue(e,t,n){let r=await k(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},await A(r),!0)}async function We(e,t){let n=await k(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),await A(n),!0):!1}var Ge=class extends Error{constructor(e,t){super(e),this.name=`InvalidPhoneError`,this.details=t}},Ke=class extends Error{constructor(e){super(e),this.name=`ServiceError`}},qe=`c43204c2a5e320e5600d73ce305b6f0d`;async function Je(e){let t=`https://apilayer.net/api/validate?access_key=${qe}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw new Ge(`El número no es válido o no existe.`,n);return n}catch(e){throw e instanceof Ge||e instanceof Ke?e:new Ke(`No se pudo conectar con el servicio de validación. Intenta más tarde.`)}}function F(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function Ye(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10),n=Math.random().toString(36).substring(2,10);return{beforeImg:F(300,200,e),afterImg:F(300,200,t),afterLateralImg:F(300,200,n)}}function Xe(){return`
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
  `}function Ze(e,t,n){return`
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
      <div class="image-preview-grid">
        <div><small>Antes</small><img src="${o(e)}" id="preview-before" /></div>
        <div><small>Después frontal</small><img src="${o(t)}" id="preview-after-frontal" /></div>
        <div><small>Después lateral</small><img src="${o(n)}" id="preview-after-lateral" /></div>
      </div>
      <button type="button" id="btn-regenerate-images">Generar otras imágenes</button>
      <button type="submit">Guardar Servicio</button>
    </form>
  `}function Qe(e){return`
    <form id="edit-service-form">
      <label>Tipo:</label>
      <select id="edit-service-type" required>${[`corte`,`tinte`,`tratamiento`,`peinado`,`otros`].map(t=>`<option value="${t}" ${e.type===t?`selected`:``}>${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join(``)}</select>
      <div class="field-error" id="error-edit-service-type"></div>
      <label>Fecha:</label>
      <input type="date" id="edit-service-date" value="${o(e.date)}" required />
      <div class="field-error" id="error-edit-service-date"></div>
      <label>Notas:</label>
      <textarea id="edit-service-notes" rows="3">${o(e.notes)}</textarea>
      <button type="submit">Guardar Cambios</button>
    </form>
  `}function $e(e){return`
    <p>Envía este enlace a tu nuevo profesional. <strong>Válido por 24 horas.</strong></p>
    <div style="display:flex; gap:0.5rem; margin:1rem 0;">
      <input type="text" id="share-link" value="${o(e)}" readonly style="flex:1;" />
      <button id="btn-copy-link"><i class="fas fa-copy"></i> Copiar</button>
    </div>
    <small>El profesional podrá ver tu historial de servicios sin poder editarlo.</small>
  `}function I(e,t){return!e||!e.trim()?`${t} es obligatorio.`:null}function et(e){return/^\+?[1-9]\d{6,14}$/.test(e.trim())?null:`Formato de teléfono inválido. Ej: +541112345678`}function tt(e){let t=new Date(e),n=new Date;return n.setHours(0,0,0,0),t>n?`La fecha no puede ser futura.`:null}function nt(e,t){let n={},r=I(e,`Nombre`);r&&(n.name=r);let i=I(t,`Teléfono`)||et(t);return i&&(n.phone=i),n}function rt(e,t,n){let r={};e||(r.type=`Tipo de servicio es obligatorio.`);let i=I(t,`Fecha`)||tt(t);return i&&(r.date=i),r}function it(e){return e?null:`Selecciona un tipo de profesional.`}function at(e){return e?null:`Selecciona una modalidad.`}function ot(e){return!e||!e.trim()?`El nombre del local es obligatorio.`:null}function st(e){return!e||!e.trim()?`La dirección es obligatoria.`:null}function ct(e){return!e||!e.trim()?`El nombre de la empresa es obligatorio.`:null}var L=null;function lt(e){L=e}var R=null;function ut(){R||(R=document.createElement(`div`),R.className=`lightbox-overlay hidden`,R.innerHTML=`
    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
    <button class="lightbox-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-next" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>
  `,document.body.appendChild(R),R.querySelector(`.lightbox-close`).addEventListener(`click`,V),R.querySelector(`.lightbox-prev`).addEventListener(`click`,ft),R.querySelector(`.lightbox-next`).addEventListener(`click`,pt),R.addEventListener(`click`,e=>{e.target===R&&V()}),document.addEventListener(`keydown`,mt))}var z=[],B=0;function dt(e,t=0){ut(),z=e,B=t,H(),R.classList.remove(`hidden`),document.body.style.overflow=`hidden`,R.querySelector(`.lightbox-close`).focus()}function V(){R.classList.add(`hidden`),document.body.style.overflow=``,z=[],B=0}function H(){let e=R.querySelector(`.lightbox-img`);z.length>0&&B>=0&&B<z.length&&(e.src=z[B],e.alt=`Imagen ${B+1} de ${z.length}`)}function ft(){z.length!==0&&(B=(B-1+z.length)%z.length,H())}function pt(){z.length!==0&&(B=(B+1)%z.length,H())}function mt(e){R.classList.contains(`hidden`)||(e.key===`Escape`?V():e.key===`ArrowLeft`?ft():e.key===`ArrowRight`&&pt())}var U=null;function W(e,t=!1){let n=[];e.beforeImg&&n.push(e.beforeImg),e.afterImg&&n.push(e.afterImg),e.afterLateralImg&&n.push(e.afterLateralImg);let r=o(JSON.stringify(n)),i=e.afterLateralImg||``,a=i?`<div class="image-item" data-index="${n.indexOf(i)}"><small>Después lateral</small><img src="${o(i)}" alt="Después lateral" loading="lazy" /></div>`:`<div class="image-item"><small>Después lateral</small><div class="image-placeholder-small">Sin foto</div></div>`,s=n.indexOf(e.beforeImg),c=n.indexOf(e.afterImg);return n.indexOf(e.afterLateralImg),`
    <div class="card service-card fade-in" data-service-id="${o(e.id)}" role="article" aria-label="Servicio ${o(e.type)} del ${o(e.date)}">
      <div class="service-header">
        <strong>${o(e.type)}</strong>
        <span>${o(e.date)}</span>
      </div>
      <p>${o(e.notes)}</p>
      <div class="image-pair" data-images='${r}'>
        <div class="image-item" data-index="${s>=0?s:0}"><small>Antes</small><img src="${o(e.beforeImg)}" alt="Antes" loading="lazy" /></div>
        <div class="image-item" data-index="${c>=0?c:0}"><small>Después frontal</small><img src="${o(e.afterImg)}" alt="Después frontal" loading="lazy" /></div>
        ${a}
      </div>
      ${t?`
      <div class="service-actions">
        <button class="btn-edit-service" data-id="${o(e.id)}" aria-label="Editar servicio"><i class="fas fa-edit"></i> Editar</button>
        <button class="btn-delete-service" data-id="${o(e.id)}" aria-label="Eliminar servicio"><i class="fas fa-trash"></i> Eliminar</button>
      </div>`:``}
    </div>
  `}async function ht(e,t){let n=await j(e);if(!n||n.services.length===0){t.innerHTML=`
      <div class="empty-state">
        <i class="fas fa-history fa-3x"></i>
        <p>${_(`noHistory`)}</p>
      </div>`;return}t.innerHTML=[...n.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>W(e,!1)).join(``)}async function gt(e,t){let n=await Re(e);if(!n){t.innerHTML=`<p>Perfil no encontrado.</p>`;return}let r=[...await P(e)].sort((e,t)=>new Date(t.date)-new Date(e.date));t.innerHTML=`
    <div class="shared-banner" role="alert">
      <i class="fas fa-clock"></i> ${_(`sharedBanner`)}
    </div>
    <h2>${_(`historyOf`)} ${o(n.name)}</h2>
    ${r.length===0?`<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>${_(`noServices`)}</p></div>`:r.map(e=>W(e,!1)).join(``)}
  `}function G(e,t){let n=document.getElementById(`modal-overlay`),r=document.getElementById(`modal-body`),i=document.getElementById(`modal-close`);r.innerHTML=`<h3 id="modal-title">${o(e)}</h3>${t}`,n.classList.remove(`hidden`),n.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`,U=document.activeElement,i.focus(),_t(n)}function K(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,U&&=(U.focus(),null)}function _t(e){let t=e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`),n=t[0],r=t[t.length-1];function i(t){if(t.key===`Escape`){K(),e.removeEventListener(`keydown`,i);return}t.key===`Tab`&&(t.shiftKey?document.activeElement===n&&(t.preventDefault(),r.focus()):document.activeElement===r&&(t.preventDefault(),n.focus()))}e.addEventListener(`keydown`,i)}function vt(e){return new Promise(t=>{let n=`
      <p>${o(e)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">${_(`yes`)}</button>
        <button id="confirm-no" class="confirm-btn confirm-no">${_(`cancel`)}</button>
      </div>
    `;G(_(`confirmTitle`),n),document.getElementById(`confirm-yes`).addEventListener(`click`,()=>{K(),t(!0)}),document.getElementById(`confirm-no`).addEventListener(`click`,()=>{K(),t(!1)})})}function yt(){document.addEventListener(`click`,e=>{let t=e.target.closest(`.image-item img`);if(!t)return;let n=t.closest(`.image-item`);if(!n)return;let r=n.closest(`.image-pair, .service-images-grid`);if(!r)return;let i=r.getAttribute(`data-images`);if(i)try{let e=JSON.parse(i);if(e.length===0)return;dt(e,parseInt(n.getAttribute(`data-index`),10)||0)}catch{}})}function q(e,t=3){let n=``;for(let e=0;e<t;e++)n+=`
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton skeleton-date"></div>
          <div class="skeleton skeleton-badge"></div>
        </div>
        <div class="skeleton-images">
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-img"></div>
        </div>
        <div class="skeleton-notes">
          <div class="skeleton skeleton-notes-bar"></div>
          <div class="skeleton skeleton-notes-text"></div>
        </div>
        <div class="skeleton-actions">
          <div class="skeleton skeleton-btn"></div>
          <div class="skeleton skeleton-btn"></div>
        </div>
      </div>
    `;e.innerHTML=n}var J;async function bt(e){document.body.classList.add(`dashboard-mode`),e.innerHTML=`
    <div class="dashboard">
      <aside class="dashboard-sidebar" id="dashboard-sidebar">
        <button class="btn-new-client" id="btn-new-client">
          <i class="fas fa-plus"></i> Nuevo Cliente
        </button>
        <div class="recent-clients-title">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </aside>

      <section class="dashboard-main">
        <div class="dashboard-header">
          <div class="dashboard-logo">StyleRecord Lite</div>
          <div class="dashboard-search">
            <i class="fas fa-search"></i>
            <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
          </div>
          <div class="dashboard-actions">
            <div class="profile-menu-container">
              <button class="profile-menu-trigger" id="profile-menu-trigger" aria-label="Menú de perfil">
                <i class="fas fa-cog"></i>
              </button>
              <div class="profile-dropdown hidden" id="profile-dropdown">
                <div class="profile-info">
                  <span class="profile-name">Profesional</span>
                  <span class="profile-role">Administrador</span>
                </div>
                <a href="#/configuracion" class="profile-link" style="display:none;"><i class="fas fa-sliders-h"></i> Configuración</a>
                <button id="btn-logout-dash" class="profile-link"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
              </div>
            </div>
          </div>
        </div>
        <div id="main-content-area" class="main-content-area"></div>
      </section>
    </div>
  `;let t=document.getElementById(`profile-menu-trigger`),n=document.getElementById(`profile-dropdown`);t.addEventListener(`click`,e=>{e.stopPropagation(),n.classList.toggle(`hidden`)}),document.addEventListener(`click`,()=>{n.classList.contains(`hidden`)||n.classList.add(`hidden`)}),n.addEventListener(`click`,e=>e.stopPropagation()),document.getElementById(`btn-logout-dash`).addEventListener(`click`,()=>{document.body.classList.remove(`dashboard-mode`),d(),window.location.hash=`/home`,window.location.reload()});let r=await k(),i=document.getElementById(`sidebar-client-list`),a=document.getElementById(`main-content-area`);J=async(e=``)=>{let t=await k();xt(i,e?t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)):t)},xt(i,r),i.addEventListener(`click`,async e=>{let t=e.target.closest(`.sidebar-client-item`);if(!t)return;let n=t.dataset.id;lt(n),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`),await Y(n,a)}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>wt()),document.getElementById(`dashboard-search`).addEventListener(`input`,s(async e=>{await J(e.target.value)},300)),a.innerHTML=`
    <div class="empty-dashboard">
      <i class="fas fa-cut"></i>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `}function xt(e,t){if(t.length===0){e.innerHTML=`<p style="color:#999; text-align:center;">Sin clientes</p>`;return}e.innerHTML=t.map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2);return`
      <div class="sidebar-client-item" data-id="${o(e.id)}">
        <div class="client-initials">${t}</div>
        <div class="client-name-sidebar">
          <span>${o(e.name)}</span>
          <small class="client-phone-sidebar">${o(e.phone)}</small>
        </div>
      </div>
    `}).join(``)}async function Y(e,t){q(t,3);let n=await Re(e);if(!n){t.innerHTML=`<p>Cliente no encontrado.</p>`;return}let r=await P(e),i=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date)),a=i.length===0?`<div class="empty-state"><i class="fas fa-cut fa-3x"></i><p>${_(`noServices`)}</p></div>`:i.map(e=>St(e)).join(``),s=`toggle-${e}`;t.innerHTML=`
    <div class="history-header">
      <div class="history-service-count">${r.length} servicio(s) registrado(s)</div>
      <h2 class="history-title">Historial de Servicio</h2>
      <p class="history-client-name">Cliente: ${o(n.name)}</p>
      <p class="history-client-phone"><i class="fas fa-phone-alt"></i> ${o(n.phone)}</p>
      <a href="https://wa.me/${n.phone.replace(/\D/g,``)}" class="whatsapp-link" style="display:none;" target="_blank" rel="noopener noreferrer" aria-label="Enviar mensaje por WhatsApp">
        <i class="fab fa-whatsapp"></i> Contactar
      </a>
      <div class="history-divider"></div>
      <button class="toggle-services-btn" data-target="${s}" aria-expanded="true">
        <i class="fas fa-chevron-up"></i> <span>Ocultar servicios</span>
      </button>
    </div>
    <div id="${s}" class="services-container">
      ${a}
      <div class="add-service-card" id="add-service-area">
        <div class="add-service-card-content">
          <i class="fas fa-plus-circle fa-2x"></i>
          <span>Agregar nuevo servicio</span>
        </div>
      </div>
    </div>
  `;let c=t.querySelector(`.toggle-services-btn`),l=document.getElementById(s);c.addEventListener(`click`,()=>{l.classList.contains(`hidden`)?(l.classList.remove(`hidden`),c.innerHTML=`<i class="fas fa-chevron-up"></i> <span>Ocultar servicios</span>`,c.setAttribute(`aria-expanded`,`true`)):(l.classList.add(`hidden`),c.innerHTML=`<i class="fas fa-chevron-down"></i> <span>Mostrar servicios</span>`,c.setAttribute(`aria-expanded`,`false`))}),document.getElementById(`add-service-area`).addEventListener(`click`,()=>Tt()),t.querySelectorAll(`.btn-edit-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Et(e.dataset.id)})}),t.querySelectorAll(`.btn-delete-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Dt(e.dataset.id)})})}function St(e){let t=[];e.beforeImg&&t.push(e.beforeImg),e.afterImg&&t.push(e.afterImg),e.afterLateralImg&&t.push(e.afterLateralImg);let n=o(JSON.stringify(t)),r=t.indexOf(e.beforeImg),i=t.indexOf(e.afterImg),a=t.indexOf(e.afterLateralImg);return`
    <div class="service-card-dashboard" data-service-id="${o(e.id)}">
      <div class="service-card-header">
        <span class="service-date">${Ct(e.date)}</span>
        <span class="service-type-badge">${o(e.type)}</span>
      </div>
      <div class="service-images-grid" data-images='${n}'>
        <div class="image-card image-item" data-index="${r>=0?r:0}">
          <div class="image-label">ANTES</div>
          ${e.beforeImg?`<img src="${o(e.beforeImg)}" alt="Antes" loading="lazy" />`:`<div class="image-placeholder">Sin foto</div>`}
        </div>
        <div class="image-card image-item" data-index="${i>=0?i:0}">
          <div class="image-label">DESPUÉS FRONTAL</div>
          ${e.afterImg?`<img src="${o(e.afterImg)}" alt="Después frontal" loading="lazy" />`:`<div class="image-placeholder">Sin foto</div>`}
        </div>
        <div class="image-card image-item" data-index="${a>=0?a:0}">
          <div class="image-label">DESPUÉS LATERAL</div>
          ${e.afterLateralImg?`<img src="${o(e.afterLateralImg)}" alt="Después lateral" loading="lazy" />`:`<div class="image-placeholder">Sin foto</div>`}
        </div>
      </div>
      ${e.notes?`
      <div class="service-notes-dashboard">
        <div class="notes-bar"></div>
        <div class="notes-text">${o(e.notes)}</div>
      </div>`:``}
      <div class="service-actions-dashboard">
        <button class="btn-edit-service-dash" data-id="${o(e.id)}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-service-dash" data-id="${o(e.id)}">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `}function Ct(e){let t=[`Ene`,`Feb`,`Mar`,`Abr`,`May`,`Jun`,`Jul`,`Ago`,`Sep`,`Oct`,`Nov`,`Dic`],n=new Date(e);return`${n.getDate()} ${t[n.getMonth()]} ${n.getFullYear()}`}async function wt(){G(`Nuevo Cliente`,Xe()),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-phone`).value.trim(),r=nt(t,n);if(X(`client`,r),Object.keys(r).length>0)return;let i=document.getElementById(`validate-btn`),a=document.getElementById(`validation-area`);if((await k()).find(e=>e.phone===n)){a.innerHTML=`<div class="validation-error">El teléfono ya está registrado.</div>`;return}i.disabled=!0,i.innerHTML=`<span class="spinner"></span> Validando...`,a.innerHTML=``;try{let e=await Je(n);a.innerHTML=`
        <div class="validation-result">
          <i class="fas fa-check-circle"></i> Número válido<br>
          <strong>${o(e.number)}</strong><br>
          País: ${o(e.country_name)} (${o(e.country_code)})<br>
          Compañía: ${o(e.carrier)}
        </div>`,await ze({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),K(),await J(),N(`Cliente creado correctamente`)}catch(e){e.name===`InvalidPhoneError`?(a.innerHTML=`
          <div class="validation-error">El número no es válido.</div>
          <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
          <button type="button" id="force-save-btn">Guardar manualmente</button>`,document.getElementById(`force-save-btn`).addEventListener(`click`,async()=>{await ze({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!1,phoneDetails:null,services:[]}),K(),await J()})):a.innerHTML=`<div class="validation-error">${o(e.message)}</div>`}finally{i.disabled=!1,i.innerHTML=`Validar y Guardar`}})}async function Tt(){if(!L){M(`Selecciona un cliente primero.`);return}let e=Ye();G(`Agregar Servicio`,Ze(e.beforeImg,e.afterImg,e.afterLateralImg));let t=document.getElementById(`new-service-form`),n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=Ye();n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg,document.getElementById(`preview-before`).src=n,document.getElementById(`preview-after-frontal`).src=r,document.getElementById(`preview-after-lateral`).src=i}),t.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,a=document.getElementById(`service-date`).value,o=document.getElementById(`service-notes`).value.trim(),s=rt(t,a,o);X(`service`,s),!(Object.keys(s).length>0)&&(await He(L,{id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:L,date:a,type:t,notes:o,beforeImg:n,afterImg:r,afterLateralImg:i}),K(),await Y(L,document.getElementById(`main-content-area`)),N(`Servicio agregado`))})}async function Et(e){let t=(await P(L)).find(t=>t.id===e);t&&(G(`Editar Servicio`,Qe(t)),document.getElementById(`edit-service-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-service-type`).value,r=document.getElementById(`edit-service-date`).value,i=document.getElementById(`edit-service-notes`).value.trim(),a=rt(n,r,i);X(`edit-service`,a),!(Object.keys(a).length>0)&&(await Ue(L,e,{type:n,date:r,notes:i}),K(),await Y(L,document.getElementById(`main-content-area`)),N(`Servicio actualizado`))}))}async function Dt(e){await vt(`¿Eliminar este servicio?`)&&(await We(L,e),await Y(L,document.getElementById(`main-content-area`)),N(`Servicio eliminado`))}function X(e,t){[`name`,`phone`,`type`,`date`].forEach(n=>{let r=document.getElementById(`error-${e}-${n}`);r&&(r.textContent=t[n]||``)})}async function Ot(e){e.innerHTML=`
    <section id="client-view" class="view active">
      <h2><i class="fas fa-history"></i> ${_(`historyOf`)} mis servicios</h2>
      <div id="client-history" class="history-cards"></div>
      <button id="btn-share-profile" class="action-btn"><i class="fas fa-share-alt"></i> ${_(`shareProfile`)}</button>
    </section>
  `;let t=document.getElementById(`client-history`);q(t,2);let n=localStorage.getItem(`sr-client-phone`);n?await ht(n,t):M(_(`noClient`)),document.getElementById(`btn-share-profile`).addEventListener(`click`,async()=>{let e=await j(n);if(!e){M(`Error al obtener tu perfil.`);return}let t=ie(e.id),r=`${window.location.origin}${window.location.pathname}?token=${t}`;G(_(`shareProfile`),$e(r)),document.getElementById(`btn-copy-link`).addEventListener(`click`,()=>{let e=document.getElementById(`share-link`);e.select(),navigator.clipboard.writeText(e.value).then(()=>N(_(`copied`)))})})}async function kt(e,t){q(e,2);let n=validateShareToken(t);n?await gt(n,e):e.innerHTML=`
      <section class="view active">
        <div class="card" style="text-align:center; margin-top:2rem;">
          <i class="fas fa-link-slash" style="font-size:2rem; color:var(--danger);"></i>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
        </div>
      </section>`}var At=`modulepreload`,jt=function(e){return`/StyleRecordLite/`+e},Mt={},Nt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=jt(t,n),t in Mt)return;Mt[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:At,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Z=0,Q={type:``,modality:``,businessName:``,address:``,workFromHome:!1,companyId:``,companyName:``,requestLink:!1};function Pt(e){Z=0,Object.keys(Q).forEach(e=>Q[e]=Q[e]===!1?!1:``),Q.workFromHome=!1,Q.requestLink=!1,$(e)}function $(e){e.innerHTML=`
    <section class="register-view active">
      <div class="stepper">
        <div class="stepper-progress" style="width: ${(Z+1)/3*100}%"></div>
        <div class="stepper-steps">
          <div class="stepper-step ${Z>=0?`active`:``} ${Z>0?`completed`:``}">1</div>
          <div class="stepper-step ${Z>=1?`active`:``} ${Z>1?`completed`:``}">2</div>
          <div class="stepper-step ${Z>=2?`active`:``}">3</div>
        </div>
      </div>
      <div class="stepper-content">
        ${Ft(Z)}
      </div>
      <div class="stepper-actions">
        ${Z>0?`<button id="btn-prev" class="btn-prev">Anterior</button>`:``}
        <button id="btn-next" class="btn-next">${Z===2?`Finalizar`:`Siguiente`}</button>
      </div>
    </section>
  `,Z>0&&document.getElementById(`btn-prev`).addEventListener(`click`,()=>{Z--,$(e)}),document.getElementById(`btn-next`).addEventListener(`click`,()=>zt(e)),Z===1&&Ut()}function Ft(e){switch(e){case 0:return It();case 1:return Lt();case 2:return Rt();default:return``}}function It(){return`
    <h3>Información Profesional</h3>
    <form id="step1-form" class="stepper-form">
      <label>Tipo de profesional *</label>
      <select id="prof-type" required>
        <option value="">Selecciona...</option>
        <option value="barbero" ${Q.type===`barbero`?`selected`:``}>Barbero</option>
        <option value="estilista" ${Q.type===`estilista`?`selected`:``}>Estilista</option>
        <option value="lashista" ${Q.type===`lashista`?`selected`:``}>Lashista</option>
        <option value="colorista" ${Q.type===`colorista`?`selected`:``}>Colorista</option>
        <option value="otros" ${Q.type===`otros`?`selected`:``}>Otros</option>
      </select>
      <div class="field-error" id="error-type"></div>
      <label>Modalidad *</label>
      <div class="radio-group">
        <label class="radio-label">
          <input type="radio" name="modality" value="independent" ${Q.modality===`independent`?`checked`:``}> Independiente
        </label>
        <label class="radio-label">
          <input type="radio" name="modality" value="employed" ${Q.modality===`employed`?`checked`:``}> Empleado
        </label>
      </div>
      <div class="field-error" id="error-modality"></div>
    </form>
  `}function Lt(){return Q.modality===`independent`?`
      <h3>Profesional Independiente</h3>
      <form id="step2-form" class="stepper-form">
        <label>Nombre del local / Nombre profesional *</label>
        <input type="text" id="business-name" value="${o(Q.businessName)}" required />
        <div class="field-error" id="error-business-name"></div>
        <label>Dirección</label>
        <input type="text" id="address" value="${o(Q.address)}" />
        <div class="field-error" id="error-address"></div>
        <label class="checkbox-label">
          <input type="checkbox" id="work-from-home" ${Q.workFromHome?`checked`:``}> Trabajo a domicilio (sin local físico)
        </label>
      </form>
    `:`
      <h3>Profesional Empleado</h3>
      <form id="step2-form" class="stepper-form">
        <label>Buscar empresa existente</label>
        <div class="autocomplete-wrapper">
          <input type="text" id="company-search" placeholder="Nombre de la empresa..." autocomplete="off" />
          <ul id="company-suggestions" class="autocomplete-list hidden"></ul>
        </div>
        <p class="or-divider">o</p>
        <label>Registrar nueva empresa</label>
        <input type="text" id="new-company-name" value="${o(Q.companyName)}" placeholder="Nombre de la empresa" />
        <div class="field-error" id="error-company-name"></div>
        <input type="hidden" id="selected-company-id" value="${o(Q.companyId)}" />
        <p id="selected-company-display" class="selected-company"></p>
      </form>
    `}function Rt(){let e=`<h3>Resumen del registro</h3><ul class="summary-list">`;return e+=`<li><strong>Tipo:</strong> ${o(Q.type)}</li>`,e+=`<li><strong>Modalidad:</strong> ${Q.modality===`independent`?`Independiente`:`Empleado`}</li>`,Q.modality===`independent`?(e+=`<li><strong>Nombre:</strong> ${o(Q.businessName)}</li>`,Q.workFromHome?e+=`<li><strong>Trabajo a domicilio:</strong> Sí</li>`:e+=`<li><strong>Dirección:</strong> ${o(Q.address)}</li>`):(Q.companyId?e+=`<li><strong>Empresa:</strong> ${o(Q.companyName)} (ID: ${o(Q.companyId)})</li>`:e+=`<li><strong>Empresa nueva:</strong> ${o(Q.companyName)}</li>`,e+=`<li><strong>Solicitar vinculación:</strong> ${Q.requestLink?`Sí`:`No`}</li>`),e+=`</ul>`,e}async function zt(e){if(Z===0){if(!Bt())return;Z++,$(e)}else if(Z===1){if(!Vt())return;Z++,$(e)}else if(Z===2){await Ht(),N(`Registro completado correctamente.`);let{loginAsProfessional:e}=await Nt(async()=>{let{loginAsProfessional:e}=await Promise.resolve().then(()=>c);return{loginAsProfessional:e}},void 0);e(`1234`),window.location.hash=`/professional`}}function Bt(){let e=document.getElementById(`prof-type`).value,t=document.querySelector(`input[name="modality"]:checked`)?.value,n=it(e),r=at(t);return document.getElementById(`error-type`).textContent=n||``,document.getElementById(`error-modality`).textContent=r||``,n||r?!1:(Q.type=e,Q.modality=t,!0)}function Vt(){if(Q.modality===`independent`){let e=document.getElementById(`business-name`).value.trim(),t=document.getElementById(`address`).value.trim(),n=document.getElementById(`work-from-home`).checked,r=ot(e),i=null;return n||(i=st(t)),document.getElementById(`error-business-name`).textContent=r||``,document.getElementById(`error-address`).textContent=i||``,r||i?!1:(Q.businessName=e,Q.address=t,Q.workFromHome=n,!0)}else{let e=document.getElementById(`selected-company-id`).value,t=document.getElementById(`new-company-name`).value.trim();if(!e&&!t)return document.getElementById(`error-company-name`).textContent=`Debes seleccionar una empresa o ingresar un nombre nuevo.`,!1;if(t&&!e){let e=ct(t);if(e)return document.getElementById(`error-company-name`).textContent=e,!1;Q.companyName=t,Q.companyId=``}else if(e){Q.companyId=e;let t=document.getElementById(`selected-company-display`);Q.companyName=t?t.textContent.replace(`Empresa: `,``):``}return Q.requestLink=!0,!0}}async function Ht(){let e=`prof_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),t={id:e,type:Q.type,modality:Q.modality,createdAt:new Date().toISOString()};if(Q.modality===`independent`&&(t.businessName=Q.businessName,t.address=Q.workFromHome?`A domicilio`:Q.address,t.workFromHome=Q.workFromHome),await Pe(t),Q.modality===`employed`){let t=Q.companyId;t||(t=`comp_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),await Fe({id:t,name:Q.companyName,createdAt:new Date().toISOString()})),await Le({id:`link_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),professionalId:e,companyId:t,status:`pending`,requestedAt:new Date().toISOString()})}}function Ut(){if(Q.modality===`employed`){let e=document.getElementById(`company-search`),t=document.getElementById(`company-suggestions`),n=document.getElementById(`new-company-name`);e.addEventListener(`input`,async e=>{let n=e.target.value.trim();if(n.length<2){t.classList.add(`hidden`);return}let r=await Ie(n);t.innerHTML=r.length===0?`<li class="no-results">No se encontraron empresas</li>`:r.map(e=>`<li data-id="${o(e.id)}">${o(e.name)}</li>`).join(``),t.classList.remove(`hidden`)}),t.addEventListener(`click`,r=>{let i=r.target.closest(`li`);!i||!i.dataset.id||(document.getElementById(`selected-company-id`).value=i.dataset.id,document.getElementById(`selected-company-display`).textContent=`Empresa: ${i.textContent}`,e.value=i.textContent,t.classList.add(`hidden`),n.value=``,document.getElementById(`error-company-name`).textContent=``)}),n.addEventListener(`input`,()=>{document.getElementById(`selected-company-id`).value=``,document.getElementById(`selected-company-display`).textContent=``,e.value=``,t.innerHTML=``,t.classList.add(`hidden`)}),document.addEventListener(`click`,e=>{e.target.closest(`.autocomplete-wrapper`)||t.classList.add(`hidden`)})}}document.addEventListener(`DOMContentLoaded`,async()=>{await a(),ae(),yt();let e=document.createElement(`div`);e.id=`offline-banner`,e.className=`offline-banner hidden`,e.innerHTML=`<i class="fas fa-wifi-slash"></i> ${_(`offline`)}`,document.body.appendChild(e),window.addEventListener(`online`,()=>e.classList.add(`hidden`)),window.addEventListener(`offline`,()=>e.classList.remove(`hidden`));let t=document.getElementById(`modal-close`),n=document.getElementById(`modal-overlay`);t&&t.addEventListener(`click`,K),n&&n.addEventListener(`click`,e=>{e.target===e.currentTarget&&K()});let r=document.getElementById(`btn-logout`);r&&r.addEventListener(`click`,()=>{d(),window.location.hash=`/home`,window.location.reload()});let i=new URLSearchParams(window.location.search).get(`token`);if(i){document.body.classList.remove(`dashboard-mode`);let e=document.querySelector(`main`);e.innerHTML=``,await kt(e,i);return}let o=se(),s=document.querySelector(`main`);o.addRoute(`/home`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),ce(s)}),o.addRoute(`/rol`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),le(s)}),o.addRoute(`/login`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),Ve(s)}),o.addRoute(`/register`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),Pt(s)}),o.addRoute(`/professional`,async()=>{if(!f()||u()!==`professional`){o.navigate(`/login?role=professional`);return}await bt(s)}),o.addRoute(`/client`,async()=>{if(document.body.classList.remove(`dashboard-mode`),!f()||u()!==`client`){o.navigate(`/login?role=client`);return}r&&(r.style.display=`block`),await Ot(s)}),o.addRoute(`*`,()=>o.navigate(`/home`)),o.start()});