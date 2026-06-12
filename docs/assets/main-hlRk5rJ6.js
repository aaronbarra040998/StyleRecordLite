var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t=document){return t.querySelector(e)}function r(e,t,n,r){t.innerHTML=e,r&&r(n)}async function i(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function a(){let e=await i(`partials/header.html`),t=await i(`partials/footer.html`),a=n(`#main-header`),o=n(`#main-footer`);r(e,a),r(t,o)}function o(e){let t=document.createElement(`div`);return t.appendChild(document.createTextNode(e)),t.innerHTML}function s(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var c=`/StyleRecordLite/`,l=t({getRole:()=>p,isAuthenticated:()=>h,loginAsClient:()=>f,loginAsProfessional:()=>d,logout:()=>m}),u=`sr-role`,ee=`1234`;function d(e){if(e===ee)try{return localStorage.setItem(u,`professional`),!0}catch(e){return console.error(`Error al guardar rol:`,e),!1}return!1}function f(e){try{localStorage.setItem(u,`client`),localStorage.setItem(`sr-client-phone`,e)}catch(e){console.error(`Error al guardar rol de cliente:`,e)}}function p(){try{return localStorage.getItem(u)}catch(e){return console.error(`Error al leer rol:`,e),null}}function m(){try{localStorage.removeItem(u),localStorage.removeItem(`sr-client-phone`)}catch(e){console.error(`Error al cerrar sesión:`,e)}}function h(){return p()!==null}var te=`sr-temp-links`;function g(){try{let e=localStorage.getItem(te);return e?JSON.parse(e):[]}catch(e){return console.error(`Error al cargar enlaces temporales:`,e),[]}}function _(e){try{return localStorage.setItem(te,JSON.stringify(e)),!0}catch(e){return console.error(`Error al guardar enlaces temporales:`,e),!1}}function ne(e){let t=`tok_`+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2,9)),n=g();return n.push({token:t,clientId:e,expiresAt:Date.now()+1440*60*1e3}),_(n),t}function re(e){let t=g(),n=t.find(t=>t.token===e);return n?Date.now()>n.expiresAt?(_(t.filter(t=>t.token!==e)),null):n.clientId:null}function ie(){_(g().filter(e=>Date.now()<=e.expiresAt))}var ae=class{constructor(){this.routes={},window.addEventListener(`hashchange`,()=>this.resolve())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}resolve(){let[e]=(window.location.hash.slice(1)||`/`).split(`?`),t=this.routes[e]||this.routes[`*`];t&&t()}start(){window.location.hash?this.resolve():window.location.hash=`/home`}};function oe(){return new ae}var v={es:{appName:`StyleRecord Lite`,login:`Accede a StyleRecord`,professional:`Soy Profesional`,client:`Soy Cliente`,search:`Buscar cliente...`,newClient:`Nuevo Cliente`,addService:`Agregar Servicio`,edit:`Editar`,delete:`Eliminar`,confirmDeleteClient:`¿Eliminar este cliente y todos sus servicios?`,confirmDeleteService:`¿Eliminar este servicio?`,saved:`Guardado`,invalidCode:`Código incorrecto. Prueba con 1234`,noClient:`No se encontró un cliente con ese número.`,noClients:`No hay clientes registrados.`,emptyHint:`Agrega tu primer cliente con el botón "Nuevo Cliente".`,noServices:`Este cliente no tiene servicios registrados.`,noHistory:`No tienes servicios registrados aún.`,linkExpired:`Enlace expirado o inválido`,linkExpiredMsg:`Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.`,sharedBanner:`Vista temporal – Este enlace expirará`,shareProfile:`Compartir Perfil`,copyLink:`Copiar`,copied:`¡Copiado!`,offline:`Sin conexión a internet. Algunas funciones pueden no estar disponibles.`,clientCreated:`Cliente creado correctamente`,clientUpdated:`Cliente actualizado`,clientDeleted:`Cliente eliminado`,serviceAdded:`Servicio agregado`,serviceUpdated:`Servicio actualizado`,serviceDeleted:`Servicio eliminado`,phoneExists:`El teléfono ya está registrado.`,invalidPhone:`El número no es válido.`,manualSave:`Guardar de todas formas`,saveManually:`Guardar manualmente`,validateAndSave:`Validar y Guardar`,validating:`Validando...`,before:`Antes`,after:`Después`,beforeImageAlt:`Antes del servicio`,afterImageAlt:`Después del servicio`,editService:`Editar servicio`,deleteService:`Eliminar servicio`,editClient:`Editar`,deleteClient:`Eliminar`,clientAriaLabel:`Cliente`,noServicesShort:`Sin servicios`,addServiceHint:`Usa "Agregar Servicio" para añadir uno.`,historyOf:`Historial de`,yes:`Sí, eliminar`,cancel:`Cancelar`,confirmTitle:`Confirmar acción`,serviceAriaLabel:`Servicio`},en:{appName:`StyleRecord Lite`,login:`Log in to StyleRecord`,professional:`I am a Professional`,client:`I am a Client`,search:`Search client...`,newClient:`New Client`,addService:`Add Service`,edit:`Edit`,delete:`Delete`,confirmDeleteClient:`Delete this client and all services?`,confirmDeleteService:`Delete this service?`,saved:`Saved`,invalidCode:`Incorrect code. Try 1234`,noClient:`No client found with that number.`,noClients:`No registered clients.`,emptyHint:`Add your first client using the "New Client" button.`,noServices:`This client has no registered services.`,noHistory:`You have no registered services yet.`,linkExpired:`Link expired or invalid`,linkExpiredMsg:`This link has expired (24 hours) or is incorrect. Ask your professional for a new link.`,sharedBanner:`Temporary view – This link will expire`,shareProfile:`Share Profile`,copyLink:`Copy`,copied:`Copied!`,offline:`No internet connection. Some features may not be available.`,clientCreated:`Client created successfully`,clientUpdated:`Client updated`,clientDeleted:`Client deleted`,serviceAdded:`Service added`,serviceUpdated:`Service updated`,serviceDeleted:`Service deleted`,phoneExists:`Phone number already registered.`,invalidPhone:`Invalid phone number.`,manualSave:`Save anyway`,saveManually:`Save manually`,validateAndSave:`Validate & Save`,validating:`Validating...`,before:`Before`,after:`After`,beforeImageAlt:`Before the service`,afterImageAlt:`After the service`,editService:`Edit service`,deleteService:`Delete service`,editClient:`Edit`,deleteClient:`Delete`,clientAriaLabel:`Client`,noServicesShort:`No services`,addServiceHint:`Use "Add Service" to add one.`,historyOf:`History of`,yes:`Yes, delete`,cancel:`Cancel`,confirmTitle:`Confirm action`,serviceAriaLabel:`Service`}},y=localStorage.getItem(`sr-lang`)||navigator.language.split(`-`)[0]||`es`;v[y]||(y=`es`);function b(e){return v[y]?.[e]||v.es[e]||e}function se(e){e.innerHTML=`
    <!-- Hero Section -->
    <section class="hero-section hero-gradient">
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-badge">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Gestión Profesional de Belleza</span>
          </div>
          <h1 class="hero-title">
            <span>StyleRecord</span> Lite
          </h1>
          <p class="hero-subtitle">
            Organiza tus clientes, guarda el antes y después de cada servicio y haz crecer tu negocio de estética con nuestra plataforma intuitiva y profesional.
          </p>
          <div class="hero-actions">
            <button class="btn-primary-hero" id="btn-home-cta">
              Comenzar
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button class="btn-outline-hero" id="btn-ver-demo">Ver Demo</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-image-wrapper">
            <img src="${c}images/imgHome.png" alt="Profesional en clínica de estética usando tablet" />
          </div>
          <div class="hero-floating-badge">
            <div class="icon-circle">
              <span class="material-symbols-outlined">verified</span>
            </div>
            <div>
              <div class="font-bold">Confianza Total</div>
              <div class="text-sm text-on-surface-variant">Control visual 100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Props -->
    <section class="value-props-section">
      <div class="section-title">
        <h2>Eleva tu Estándar de Servicio</h2>
        <p>Herramientas diseñadas para especialistas del sector estético.</p>
      </div>
      <div class="props-grid">
        <div class="prop-card">
          <div class="prop-icon primary">
            <span class="material-symbols-outlined" style="font-size:32px;">group</span>
          </div>
          <h3>Gestión de Clientes</h3>
          <p>Base de datos completa con perfiles detallados y recordatorios automáticos.</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon secondary">
            <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
          </div>
          <h3>Historial Visual</h3>
          <p>Captura y compara el progreso de tus tratamientos con registros de antes y después.</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon tertiary">
            <span class="material-symbols-outlined" style="font-size:32px;">analytics</span>
          </div>
          <h3>Seguimiento Profesional</h3>
          <p>Analiza el crecimiento de tu negocio en un tablero inteligente.</p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section">
      <div class="stats-container">
        <div>
          <div class="stat-number">500+</div>
          <div class="stat-label">Salones</div>
        </div>
        <div>
          <div class="stat-number">15k</div>
          <div class="stat-label">Clientes</div>
        </div>
        <div>
          <div class="stat-number">1M</div>
          <div class="stat-label">Fotos</div>
        </div>
        <div>
          <div class="stat-number">98%</div>
          <div class="stat-label">Satisfacción</div>
        </div>
      </div>
    </section>
  `,document.getElementById(`btn-home-cta`).addEventListener(`click`,()=>{window.location.hash=`/rol`}),document.getElementById(`btn-ver-demo`).addEventListener(`click`,()=>{window.location.hash=`/login?role=professional`})}function ce(e){e.innerHTML=`
    <section class="role-selection">
      <h1 class="role-heading">Accede a StyleRecord</h1>
      <p class="role-subtitle">Elige cómo quieres acceder</p>
      <div class="role-cards">
        <!-- Profesional -->
        <div class="role-card" id="role-professional" tabindex="0" role="button" aria-label="Soy Profesional">
          <div class="role-icon professional">
            <span class="material-symbols-outlined" style="font-size:36px;">content_cut</span>
          </div>
          <h2 class="role-card-title professional">${b(`professional`)}</h2>
          <p class="role-card-desc">Gestiona tus clientes, guarda historiales visuales y optimiza tu agenda.</p>
        </div>
        <!-- Cliente -->
        <div class="role-card" id="role-client" tabindex="0" role="button" aria-label="Soy Cliente">
          <div class="role-icon client">
            <span class="material-symbols-outlined" style="font-size:36px;">group</span>
          </div>
          <h2 class="role-card-title client">${b(`client`)}</h2>
          <p class="role-card-desc">Consulta el historial de tus servicios, reserva citas y comparte tu perfil.</p>
        </div>
      </div>
      <div class="role-register-link">
        ¿No tienes cuenta? <a href="#/register">Regístrate ahora</a>
      </div>
      <div class="role-security-badge">
        <span class="material-symbols-outlined" style="font-size:18px;">lock</span>
        <span>Acceso seguro con cifrado SSL</span>
      </div>
    </section>
  `,document.getElementById(`role-professional`).addEventListener(`click`,()=>{window.location.hash=`/login?role=professional`}),document.getElementById(`role-client`).addEventListener(`click`,()=>{window.location.hash=`/login?role=client`}),document.querySelectorAll(`.role-card`).forEach(e=>{e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.click())})})}var x=(e,t)=>t.some(t=>e instanceof t),le,ue;function de(){return le||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function fe(){return ue||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var pe=new WeakMap,S=new WeakMap,C=new WeakMap;function me(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(T(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return C.set(t,e),t}function he(e){if(pe.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});pe.set(e,t)}var w={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return pe.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return T(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function ge(e){w=e(w)}function _e(e){return fe().includes(e)?function(...t){return e.apply(E(this),t),T(this.request)}:function(...t){return T(e.apply(E(this),t))}}function ve(e){return typeof e==`function`?_e(e):(e instanceof IDBTransaction&&he(e),x(e,de())?new Proxy(e,w):e)}function T(e){if(e instanceof IDBRequest)return me(e);if(S.has(e))return S.get(e);let t=ve(e);return t!==e&&(S.set(e,t),C.set(t,e)),t}var E=e=>C.get(e);function ye(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=T(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(T(o.result),e.oldVersion,e.newVersion,T(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var be=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],xe=[`put`,`add`,`delete`,`clear`],D=new Map;function Se(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(D.get(t))return D.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=xe.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||be.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return D.set(t,a),a}ge(e=>({...e,get:(t,n,r)=>Se(t,n)||e.get(t,n,r),has:(t,n)=>!!Se(t,n)||e.has(t,n)}));var Ce=[`continue`,`continuePrimaryKey`,`advance`],we={},O=new WeakMap,Te=new WeakMap,Ee={get(e,t){if(!Ce.includes(t))return e[t];let n=we[t];return n||=we[t]=function(...e){O.set(this,Te.get(this)[t](...e))},n}};async function*De(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,Ee);for(Te.set(n,t),C.set(n,E(t));t;)yield n,t=await(O.get(n)||t.continue()),O.delete(n)}function Oe(e,t){return t===Symbol.asyncIterator&&x(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&x(e,[IDBIndex,IDBObjectStore])}ge(e=>({...e,get(t,n,r){return Oe(t,n)?De:e.get(t,n,r)},has(t,n){return Oe(t,n)||e.has(t,n)}}));var ke=`stylerecord-db`,Ae=2,je;function k(){return je||=ye(ke,Ae,{upgrade(e,t,n,r){if(e.objectStoreNames.contains(`clients`)||e.createObjectStore(`clients`,{keyPath:`id`}),t<2&&(e.objectStoreNames.contains(`professionals`)||e.createObjectStore(`professionals`,{keyPath:`id`}),e.objectStoreNames.contains(`companies`)||e.createObjectStore(`companies`,{keyPath:`id`}).createIndex(`name`,`name`,{unique:!1}),!e.objectStoreNames.contains(`linkRequests`))){let t=e.createObjectStore(`linkRequests`,{keyPath:`id`});t.createIndex(`professionalId`,`professionalId`,{unique:!1}),t.createIndex(`companyId`,`companyId`,{unique:!1})}}}),je}async function Me(){return(await k()).getAll(`clients`)}async function Ne(e){let t=(await k()).transaction(`clients`,`readwrite`);await t.store.clear();for(let n of e)await t.store.put(n);await t.done}async function Pe(e){await(await k()).add(`clients`,e)}async function Fe(e,t){let n=await k(),r=await n.get(`clients`,e);return r?(Object.assign(r,t),await n.put(`clients`,r),!0):!1}async function Ie(e){await(await k()).put(`professionals`,e)}async function Le(e){await(await k()).put(`companies`,e)}async function Re(e){let t=(await k()).transaction(`companies`,`readonly`).store.index(`name`),n=IDBKeyRange.bound(e,e+`￿`,!1,!1);return t.getAll(n)}async function ze(e){await(await k()).add(`linkRequests`,e)}async function A(){try{return await Me()}catch(e){return console.error(`Error al cargar clientes:`,e),[]}}async function j(e){try{return await Ne(e),!0}catch(e){return console.error(`Error al guardar clientes:`,e),!1}}async function Be(e){return(await A()).find(t=>t.phone===e)}async function Ve(e){return(await A()).find(t=>t.id===e)}async function He(e){try{return await Pe(e),!0}catch(e){return console.error(`Error al agregar cliente:`,e),!1}}async function Ue(e,t){try{let n=await Fe(e,t);return n||console.warn(`Cliente con id ${e} no encontrado para actualizar.`),n}catch(e){return console.error(`Error al actualizar cliente:`,e),!1}}function M(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.classList.add(`fade-out`),n.addEventListener(`transitionend`,()=>n.remove())},3e3)}function N(e){M(e,`error`)}function P(e){M(e,`success`)}var We=[{code:`AR`,name:`Argentina`,dialCode:`+54`,flag:`🇦🇷`},{code:`BO`,name:`Bolivia`,dialCode:`+591`,flag:`🇧🇴`},{code:`BR`,name:`Brasil`,dialCode:`+55`,flag:`🇧🇷`},{code:`CL`,name:`Chile`,dialCode:`+56`,flag:`🇨🇱`},{code:`CO`,name:`Colombia`,dialCode:`+57`,flag:`🇨🇴`},{code:`CR`,name:`Costa Rica`,dialCode:`+506`,flag:`🇨🇷`},{code:`CU`,name:`Cuba`,dialCode:`+53`,flag:`🇨🇺`},{code:`DO`,name:`República Dominicana`,dialCode:`+1`,flag:`🇩🇴`},{code:`EC`,name:`Ecuador`,dialCode:`+593`,flag:`🇪🇨`},{code:`ES`,name:`España`,dialCode:`+34`,flag:`🇪🇸`},{code:`GT`,name:`Guatemala`,dialCode:`+502`,flag:`🇬🇹`},{code:`HN`,name:`Honduras`,dialCode:`+504`,flag:`🇭🇳`},{code:`MX`,name:`México`,dialCode:`+52`,flag:`🇲🇽`},{code:`NI`,name:`Nicaragua`,dialCode:`+505`,flag:`🇳🇮`},{code:`PA`,name:`Panamá`,dialCode:`+507`,flag:`🇵🇦`},{code:`PY`,name:`Paraguay`,dialCode:`+595`,flag:`🇵🇾`},{code:`PE`,name:`Perú`,dialCode:`+51`,flag:`🇵🇪`},{code:`US`,name:`Estados Unidos`,dialCode:`+1`,flag:`🇺🇸`},{code:`UY`,name:`Uruguay`,dialCode:`+598`,flag:`🇺🇾`},{code:`VE`,name:`Venezuela`,dialCode:`+58`,flag:`🇻🇪`}];function Ge(e,t){return e+t.replace(/[^0-9]/g,``).replace(/^0+/,``)}function F(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function Ke(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10),n=Math.random().toString(36).substring(2,10);return{beforeImg:F(300,200,e),afterImg:F(300,200,t),afterLateralImg:F(300,200,n)}}function qe(e){let t=window.location.hash,n=new URLSearchParams(t.split(`?`)[1]||``).get(`role`);if(!n||n!==`professional`&&n!==`client`){window.location.hash=`/rol`;return}n===`professional`?Je(e):Ye(e)}function Je(e){e.innerHTML=`
    <section class="login-view active">
      <div class="login-card">
        <div class="login-icon-circle">
          <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
        </div>
        <h1 class="login-title">Acceso Profesional</h1>
        <p class="login-subtitle">Ingresa tus credenciales para gestionar tu salón.</p>
        <form id="login-form">
          <div class="login-form-group">
            <label for="prof-code">Código de Profesional</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined">lock</span>
              <input type="password" id="prof-code" placeholder="Código" required autofocus />
            </div>
          </div>
          <button type="submit" class="btn-login-submit">
            <span>Ingresar</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        <div class="login-links">
          <a href="#/register">¿No tienes cuenta? <strong style="color: var(--color-primary);">Regístrate</strong></a>
          <a href="#/rol">
            <span class="material-symbols-outlined" style="font-size:18px;">keyboard_backspace</span>
            Volver a selección de rol
          </a>
        </div>
      </div>
      <p class="login-support">¿Problemas con tu código? Contacta a soporte técnico.</p>
    </section>
  `,document.getElementById(`login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`prof-code`).value;d(t)?window.location.hash=`/professional`:N(b(`invalidCode`))})}function Ye(e){e.innerHTML=`
    <section class="login-view active" style="max-width:100%; padding:0;">
      <div class="login-client-container">
        <!-- Columna visual (escritorio) -->
        <div class="login-client-visual">
          <div class="visual-grid">
            <div class="visual-img-wrapper">
              <img src="${F(600,400,`salon`)}" alt="Salón moderno" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
            <div class="visual-img-wrapper">
              <img src="${F(600,600,`productos`)}" alt="Productos de belleza" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
          </div>
          <div class="visual-text-card">
            <h2>Tu historial de belleza, en un solo lugar.</h2>
            <p>Accede a tus citas pasadas, tratamientos realizados y recomendaciones personalizadas.</p>
            <span class="material-symbols-outlined watermark">content_cut</span>
          </div>
        </div>

        <!-- Columna del formulario -->
        <div class="login-client-form-col">
          <div class="login-card">
            <div class="login-icon-circle">
              <span class="material-symbols-outlined" style="font-size:32px;">group</span>
            </div>
            <h1 class="login-title">Acceso Cliente</h1>
            <p class="login-subtitle">Ingresa tu número de teléfono para continuar.</p>
            <form id="login-form">
              <div class="login-form-group">
                <label for="country-select">País</label>
                <div class="select-wrapper">
                  <select id="country-select" required>
                    ${We.map(e=>`<option value="${e.dialCode}" ${e.code===`PE`?`selected`:``}>${e.flag} ${e.name} (${e.dialCode})</option>`).join(``)}
                  </select>
                  <span class="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <div class="login-form-group">
                <label for="login-phone">Número de Teléfono</label>
                <div class="input-with-icon">
                  <span class="material-symbols-outlined">smartphone</span>
                  <input type="tel" id="login-phone" placeholder="987 654 321" required autofocus />
                </div>
              </div>
              <button type="submit" class="btn-login-submit luxury-gradient">
                <span>Ver historial</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <div class="login-links">
              <a href="#/rol">
                <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
                Volver a selección de rol
              </a>
              <p style="font-size:0.875rem; color:var(--color-on-surface-variant);">
                ¿Eres un profesional? <a href="#/login?role=professional" style="color:var(--color-tertiary); font-weight:bold;">Acceso Business</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`country-select`).value,n=Ge(t,document.getElementById(`login-phone`).value.trim());await Be(n)?(f(n),window.location.hash=`/client`):N(b(`noClient`))})}async function I(e){let t=(await A()).find(t=>t.id===e);return t?t.services:[]}async function Xe(e,t){let n=await A(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),await j(n),!0):!1}async function Ze(e,t,n){let r=await A(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},await j(r),!0)}async function Qe(e,t){let n=await A(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),await j(n),!0):!1}var $e=class extends Error{constructor(e,t){super(e),this.name=`InvalidPhoneError`,this.details=t}},et=class extends Error{constructor(e){super(e),this.name=`ServiceError`}},tt=`c43204c2a5e320e5600d73ce305b6f0d`;async function nt(e){let t=`https://apilayer.net/api/validate?access_key=${tt}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw new $e(`El número no es válido o no existe.`,n);return n}catch(e){throw e instanceof $e||e instanceof et?e:new et(`No se pudo conectar con el servicio de validación. Intenta más tarde.`)}}function rt(e){return`
    <form id="edit-client-form">
      <label>Nombre:</label>
      <input type="text" id="edit-client-name" value="${o(e.name)}" required />
      <div class="field-error" id="error-edit-client-name"></div>
      <label>Teléfono:</label>
      <input type="tel" id="edit-client-phone" value="${o(e.phone)}" required />
      <div class="field-error" id="error-edit-client-phone"></div>
      <button type="submit">Guardar Cambios</button>
    </form>
  `}function it(e,t,n){return`
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
  `}function at(e){return`
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
  `}function L(e,t){return!e||!e.trim()?`${t} es obligatorio.`:null}function ot(e){return/^\+?[1-9]\d{6,14}$/.test(e.trim())?null:`Formato de teléfono inválido. Ej: +541112345678`}function st(e){let t=new Date(e),n=new Date;return n.setHours(0,0,0,0),t>n?`La fecha no puede ser futura.`:null}function ct(e,t){let n={},r=L(e,`Nombre`);r&&(n.name=r);let i=L(t,`Teléfono`)||ot(t);return i&&(n.phone=i),n}function lt(e,t,n){let r={};e||(r.type=`Tipo de servicio es obligatorio.`);let i=L(t,`Fecha`)||st(t);return i&&(r.date=i),r}function ut(e){return e?null:`Selecciona un tipo de profesional.`}function dt(e){return e?null:`Selecciona una modalidad.`}function ft(e){return!e||!e.trim()?`El nombre del local es obligatorio.`:null}function pt(e){return!e||!e.trim()?`La dirección es obligatoria.`:null}function mt(e){return!e||!e.trim()?`El nombre de la empresa es obligatorio.`:null}var R=null;function ht(e){R=e}var z=null;function gt(){z||(z=document.createElement(`div`),z.className=`lightbox-overlay hidden`,z.innerHTML=`
    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
    <button class="lightbox-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-next" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>
  `,document.body.appendChild(z),z.querySelector(`.lightbox-close`).addEventListener(`click`,H),z.querySelector(`.lightbox-prev`).addEventListener(`click`,vt),z.querySelector(`.lightbox-next`).addEventListener(`click`,yt),z.addEventListener(`click`,e=>{e.target===z&&H()}),document.addEventListener(`keydown`,bt))}var B=[],V=0;function _t(e,t=0){gt(),B=e,V=t,U(),z.classList.remove(`hidden`),document.body.style.overflow=`hidden`,z.querySelector(`.lightbox-close`).focus()}function H(){z.classList.add(`hidden`),document.body.style.overflow=``,B=[],V=0}function U(){let e=z.querySelector(`.lightbox-img`);B.length>0&&V>=0&&V<B.length&&(e.src=B[V],e.alt=`Imagen ${V+1} de ${B.length}`)}function vt(){B.length!==0&&(V=(V-1+B.length)%B.length,U())}function yt(){B.length!==0&&(V=(V+1)%B.length,U())}function bt(e){z.classList.contains(`hidden`)||(e.key===`Escape`?H():e.key===`ArrowLeft`?vt():e.key===`ArrowRight`&&yt())}var W=null;function G(e,t){let n=document.getElementById(`modal-overlay`),r=document.getElementById(`modal-body`),i=document.getElementById(`modal-close`);r.innerHTML=`<h3 id="modal-title">${o(e)}</h3>${t}`,n.classList.remove(`hidden`),n.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`,W=document.activeElement,i.focus(),xt(n)}function K(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,W&&=(W.focus(),null)}function xt(e){let t=e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`),n=t[0],r=t[t.length-1];function i(t){if(t.key===`Escape`){K(),e.removeEventListener(`keydown`,i);return}t.key===`Tab`&&(t.shiftKey?document.activeElement===n&&(t.preventDefault(),r.focus()):document.activeElement===r&&(t.preventDefault(),n.focus()))}e.addEventListener(`keydown`,i)}function St(e){return new Promise(t=>{let n=`
      <p>${o(e)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">${b(`yes`)}</button>
        <button id="confirm-no" class="confirm-btn confirm-no">${b(`cancel`)}</button>
      </div>
    `;G(b(`confirmTitle`),n),document.getElementById(`confirm-yes`).addEventListener(`click`,()=>{K(),t(!0)}),document.getElementById(`confirm-no`).addEventListener(`click`,()=>{K(),t(!1)})})}function Ct(){document.addEventListener(`click`,e=>{let t=e.target.closest(`.image-item img`);if(!t)return;let n=t.closest(`.image-item`);if(!n)return;let r=n.closest(`.image-pair, .service-images-grid`);if(!r)return;let i=r.getAttribute(`data-images`);if(i)try{let e=JSON.parse(i);if(e.length===0)return;_t(e,parseInt(n.getAttribute(`data-index`),10)||0)}catch{}})}var q,J=`all`;async function wt(e){document.body.classList.add(`dashboard-mode`),e.innerHTML=`
    <!-- Sidebar -->
    <aside class="dashboard-sidebar" id="dashboard-sidebar">
      <div class="sidebar-brand">
        <h1 class="sidebar-logo">StyleRecord Lite</h1>
        <p class="sidebar-subtitle">Gestión de Belleza</p>
      </div>

      <button class="btn-new-client" id="btn-new-client">
        <span class="material-symbols-outlined">person_add</span>
        Nuevo Cliente
      </button>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Dashboard</div>
        <a class="sidebar-nav-item active" href="#" data-filter="all" id="nav-clientes">
          <span class="material-symbols-outlined">group</span>
          <span>Clientes</span>
        </a>
        <a class="sidebar-nav-item" href="#" data-filter="withServices" id="nav-servicios">
          <span class="material-symbols-outlined">content_cut</span>
          <span>Servicios</span>
        </a>

        <div class="sidebar-section-label">Clientes Recientes</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
          <span class="sidebar-user-name">Staff #04</span>
        </div>
        <button class="sidebar-logout" id="btn-logout-dash" title="Cerrar sesión">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="dashboard-search">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="dashboard-search" placeholder="Buscar cliente..." />
        </div>
        <div class="dashboard-header-actions">
          <button class="header-icon-btn" id="btn-notifications" aria-label="Notificaciones">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="header-icon-btn" id="btn-settings" aria-label="Configuración">
            <span class="material-symbols-outlined">settings</span>
          </button>
          <div class="header-avatar" id="header-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div id="main-content-area" class="main-content-area"></div>
    </div>

    <!-- FAB -->
    <button class="fab" id="fab-add-service" title="Agregar servicio" style="display:none;">
      <span class="material-symbols-outlined">add</span>
    </button>
  `,document.getElementById(`btn-logout-dash`).addEventListener(`click`,()=>{document.body.classList.remove(`dashboard-mode`),m(),window.location.hash=`/home`,window.location.reload()});let t=document.getElementById(`nav-clientes`),n=document.getElementById(`nav-servicios`);function r(e){t.classList.toggle(`active`,e===`all`),n.classList.toggle(`active`,e===`withServices`)}t.addEventListener(`click`,e=>{e.preventDefault(),J=`all`,r(`all`),q(document.getElementById(`dashboard-search`).value)}),n.addEventListener(`click`,e=>{e.preventDefault(),J=`withServices`,r(`withServices`),q(document.getElementById(`dashboard-search`).value)}),document.getElementById(`btn-settings`).addEventListener(`click`,()=>{M(`Configuración próximamente`,`info`)}),document.getElementById(`btn-notifications`).addEventListener(`click`,()=>{M(`No hay notificaciones nuevas`,`info`)});let i=await A(),a=document.getElementById(`sidebar-client-list`),o=document.getElementById(`main-content-area`);q=async(e=``)=>{let t=await A(),n=e?t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)):t;J===`withServices`&&(n=n.filter(e=>e.services&&e.services.length>0)),Tt(a,n)},Tt(a,i),a.addEventListener(`click`,async e=>{let t=e.target.closest(`.sidebar-client-item`);if(!t)return;let n=t.dataset.id;ht(n),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`),await Y(n,o)}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>Ot()),document.getElementById(`dashboard-search`).addEventListener(`input`,s(async e=>{await q(e.target.value)},300)),document.getElementById(`fab-add-service`).addEventListener(`click`,()=>{R&&At()}),o.innerHTML=`
    <div class="empty-dashboard">
      <span class="material-symbols-outlined">content_cut</span>
      <h3>Selecciona un cliente para ver su historial</h3>
      <p>O crea uno nuevo con el botón "+ Nuevo Cliente"</p>
    </div>
  `}function Tt(e,t){if(t.length===0){e.innerHTML=`<p class="sidebar-empty">Sin clientes</p>`;return}e.innerHTML=t.map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2),n=e.services?.length?e.services.reduce((e,t)=>new Date(t.date)>new Date(e.date)?t:e):null,r=n?Dt(n.date):`Sin servicios`;return`
      <button class="sidebar-client-item" data-id="${o(e.id)}">
        <div class="client-avatar-circle">${t}</div>
        <div class="client-item-info">
          <p class="client-item-name">${o(e.name)}</p>
          <p class="client-item-time">${r}</p>
        </div>
      </button>
    `}).join(``)}async function Y(e,t){let n=await Ve(e);if(!n){t.innerHTML=`<p>Cliente no encontrado.</p>`;return}let r=await I(e),i=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date));t.innerHTML=`
    <!-- Client Header -->
    <div class="client-detail-header">
      <div class="client-detail-avatar">${n.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2)}</div>
      <div class="client-detail-info">
        <div class="client-detail-name-row">
          <h2 class="client-detail-name">${o(n.name)}</h2>
          ${n.services.length>10?`<span class="badge-vip">VIP</span>`:``}
        </div>
        <div class="client-detail-meta">
          <span class="meta-item">
            <span class="material-symbols-outlined">call</span>
            ${o(n.phone)}
          </span>
          <span class="meta-item">
            <span class="material-symbols-outlined">history</span>
            ${r.length} servicios realizados
          </span>
        </div>
      </div>
      <div class="client-detail-actions">
        <button class="btn-toggle-services" id="btn-toggle-services">
          <span class="material-symbols-outlined">visibility_off</span>
          <span>Ocultar servicios</span>
        </button>
        <button class="btn-edit-profile" id="btn-edit-profile">
          <span class="material-symbols-outlined">edit</span>
          Editar Perfil
        </button>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-grid" id="services-grid">
      ${i.length===0?`
        <div class="empty-services">
          <span class="material-symbols-outlined">content_cut</span>
          <p>No hay servicios registrados</p>
        </div>
      `:i.map(e=>Et(e)).join(``)}
      
      <button class="add-service-card-dash" id="add-service-area">
        <div class="add-service-icon">
          <span class="material-symbols-outlined">add</span>
        </div>
        <div class="add-service-text">
          <h3>Agregar nuevo servicio</h3>
          <p>Registra un nuevo procedimiento para este cliente</p>
        </div>
      </button>
    </div>

    <footer class="dashboard-footer">
      <p>© 2026 StyleRecord Lite - Gestión Profesional de Belleza</p>
    </footer>
  `,document.getElementById(`fab-add-service`).style.display=`flex`;let a=document.getElementById(`btn-toggle-services`),s=document.getElementById(`services-grid`),c=!0;a.addEventListener(`click`,()=>{c=!c,s.style.display=c?``:`none`,a.querySelector(`span:last-child`).textContent=c?`Ocultar servicios`:`Mostrar servicios`,a.querySelector(`.material-symbols-outlined`).textContent=c?`visibility_off`:`visibility`}),document.getElementById(`btn-edit-profile`).addEventListener(`click`,()=>kt(n)),document.getElementById(`add-service-area`).addEventListener(`click`,()=>At()),t.querySelectorAll(`.btn-edit-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),jt(e.dataset.id)})}),t.querySelectorAll(`.btn-delete-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Mt(e.dataset.id)})})}function Et(e){let t=[];e.beforeImg&&t.push(e.beforeImg),e.afterImg&&t.push(e.afterImg),e.afterLateralImg&&t.push(e.afterLateralImg);let n=o(JSON.stringify(t)),r=t.indexOf(e.beforeImg),i=t.indexOf(e.afterImg),a=t.indexOf(e.afterLateralImg),s=new Date(e.date),c=s.getDate(),l=s.toLocaleString(`es-ES`,{month:`short`}),u=s.getFullYear();return`
    <div class="service-card-dashboard" data-service-id="${o(e.id)}">
      <div class="service-card-header">
        <div class="service-date-badge">
          <span class="service-day">${c}</span>
          <span class="service-month-year">${l} ${u}</span>
        </div>
        <div class="service-info">
          <span class="service-type-pill">${o(e.type)}</span>
          <p class="service-stylist">Realizado por: Staff</p>
        </div>
        <div class="service-card-actions">
          <button class="btn-icon-service btn-edit-service-dash" data-id="${o(e.id)}" title="Editar">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-icon-service btn-delete-service-dash" data-id="${o(e.id)}" title="Eliminar">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="service-card-body">
        <div class="service-images-grid" data-images='${n}'>
          <div class="image-card image-item" data-index="${r>=0?r:0}">
            ${e.beforeImg?`<img src="${o(e.beforeImg)}" alt="Antes" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">ANTES</span>
          </div>
          <div class="image-card image-item" data-index="${i>=0?i:0}">
            ${e.afterImg?`<img src="${o(e.afterImg)}" alt="Después frontal" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">DESPUÉS FRONTAL</span>
          </div>
          <div class="image-card image-item" data-index="${a>=0?a:0}">
            ${e.afterLateralImg?`<img src="${o(e.afterLateralImg)}" alt="Después lateral" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">DESPUÉS LATERAL</span>
          </div>
        </div>
        ${e.notes?`
        <div class="service-notes">
          <h4 class="service-notes-title">Notas del Servicio</h4>
          <p>${o(e.notes)}</p>
        </div>`:``}
      </div>
    </div>
  `}function Dt(e){let t=new Date,n=new Date(e),r=t-n,i=Math.floor(r/6e4);if(i<60)return`Hace ${i} minutos`;let a=Math.floor(i/60);if(a<24)return`Hace ${a} horas`;let o=Math.floor(a/24);return o===1?`Ayer`:o<7?`Hace ${o} días`:n.toLocaleDateString(`es-ES`)}async function Ot(){G(`Nuevo Cliente`,`
    <form id="new-client-form">
      <label>Nombre completo:</label>
      <input type="text" id="client-name" placeholder="María García" required />
      <div class="field-error" id="error-client-name"></div>
      <label>País:</label>
      <select id="client-country" required style="width:100%; margin-bottom:0.8rem;">
        ${We.map(e=>`<option value="${e.dialCode}" ${e.code===`PE`?`selected`:``}>${e.flag} ${e.name} (${e.dialCode})</option>`).join(``)}
      </select>
      <label>Número de teléfono (sin prefijo):</label>
      <input type="tel" id="client-phone" placeholder="987654321" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validar y Guardar</button>
    </form>
  `),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-country`).value,r=Ge(n,document.getElementById(`client-phone`).value.trim()),i=ct(t,r);if(X(`client`,i),Object.keys(i).length>0)return;let a=document.getElementById(`validate-btn`),s=document.getElementById(`validation-area`);if((await A()).find(e=>e.phone===r)){s.innerHTML=`<div class="validation-error">El teléfono ya está registrado.</div>`;return}a.disabled=!0,a.innerHTML=`<span class="spinner"></span> Validando...`,s.innerHTML=``;try{let e=await nt(r);s.innerHTML=`
        <div class="validation-result">
          <span class="material-symbols-outlined" style="color:green;">check_circle</span> Número válido<br>
          <strong>${o(e.number)}</strong><br>
          País: ${o(e.country_name)} (${o(e.country_code)})<br>
          Compañía: ${o(e.carrier)}
        </div>`,await He({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:r,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),K(),await q(),P(`Cliente creado correctamente`)}catch(e){e.name===`InvalidPhoneError`?(s.innerHTML=`
          <div class="validation-error">El número no es válido.</div>
          <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
          <button type="button" id="force-save-btn">Guardar manualmente</button>`,document.getElementById(`force-save-btn`).addEventListener(`click`,async()=>{await He({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:r,phoneValid:!1,phoneDetails:null,services:[]}),K(),await q()})):s.innerHTML=`<div class="validation-error">${o(e.message)}</div>`}finally{a.disabled=!1,a.innerHTML=`Validar y Guardar`}})}async function kt(e){G(`Editar Cliente`,rt(e)),document.getElementById(`edit-client-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-client-name`).value.trim(),r=document.getElementById(`edit-client-phone`).value.trim(),i=ct(n,r);if(X(`edit-client`,i),Object.keys(i).length>0)return;await Ue(e.id,{name:n,phone:r}),K(),await q();let a=document.getElementById(`main-content-area`);R===e.id&&await Y(e.id,a),P(`Cliente actualizado`)})}async function At(){if(!R){N(`Selecciona un cliente primero.`);return}let e=Ke();G(`Agregar Servicio`,it(e.beforeImg,e.afterImg,e.afterLateralImg));let t=document.getElementById(`new-service-form`),n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=Ke();n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg,document.getElementById(`preview-before`).src=n,document.getElementById(`preview-after-frontal`).src=r,document.getElementById(`preview-after-lateral`).src=i}),t.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,a=document.getElementById(`service-date`).value,o=document.getElementById(`service-notes`).value.trim(),s=lt(t,a,o);X(`service`,s),!(Object.keys(s).length>0)&&(await Xe(R,{id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:R,date:a,type:t,notes:o,beforeImg:n,afterImg:r,afterLateralImg:i}),K(),await Y(R,document.getElementById(`main-content-area`)),P(`Servicio agregado`))})}async function jt(e){let t=(await I(R)).find(t=>t.id===e);t&&(G(`Editar Servicio`,at(t)),document.getElementById(`edit-service-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-service-type`).value,r=document.getElementById(`edit-service-date`).value,i=document.getElementById(`edit-service-notes`).value.trim(),a=lt(n,r,i);X(`edit-service`,a),!(Object.keys(a).length>0)&&(await Ze(R,e,{type:n,date:r,notes:i}),K(),await Y(R,document.getElementById(`main-content-area`)),P(`Servicio actualizado`))}))}async function Mt(e){await St(`¿Eliminar este servicio?`)&&(await Qe(R,e),await Y(R,document.getElementById(`main-content-area`)),P(`Servicio eliminado`))}function X(e,t){[`name`,`phone`,`type`,`date`].forEach(n=>{let r=document.getElementById(`error-${e}-${n}`);r&&(r.textContent=t[n]||``)})}async function Nt(e){let t=localStorage.getItem(`sr-client-phone`);if(!t){e.innerHTML=`<p class="login-support">No se encontró sesión de cliente.</p>`;return}let n=await Be(t);if(!n){e.innerHTML=`<p class="login-support">Perfil de cliente no encontrado.</p>`;return}let r=await I(n.id),i=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date)),a=r.length,s=r.length>0?new Date(i[i.length-1].date).getFullYear():new Date().getFullYear(),c=ne(n.id),l=`${window.location.origin}${window.location.pathname}?token=${c}`;e.innerHTML=`
    <section class="client-panel">
      <!-- Header del panel -->
      <div class="client-panel-header">
        <div>
          <h1 class="client-panel-title">Historial de mis servicios</h1>
          <p class="client-panel-subtitle">Bienvenida de nuevo, un registro detallado de tu evolución estética.</p>
        </div>
        <button class="btn-logout-client" id="btn-client-logout">
          <span class="material-symbols-outlined">logout</span>
          Salir
        </button>
      </div>

      <!-- Layout de 2 columnas -->
      <div class="client-layout">
        <!-- Columna principal: lista de servicios -->
        <div class="client-services-col">
          <div class="timeline-line"></div>
          ${i.length===0?`
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No tienes servicios registrados aún</h3>
              <p>Tu historial aparecerá aquí cuando tu profesional registre servicios.</p>
            </div>
          `:i.map(e=>Pt(e)).join(``)}
        </div>

        <!-- Columna lateral: perfil + acciones -->
        <div class="client-sidebar-col">
          <!-- Perfil del cliente -->
          <div class="client-profile-card">
            <div class="client-profile-avatar">
              ${Ft(n.name)}
            </div>
            <div class="client-profile-info">
              <h2 class="client-profile-name">${o(n.name)}</h2>
              <span class="client-profile-badge">Clienta Elite</span>
            </div>
            <hr class="profile-divider" />
            <div class="client-stats">
              <div class="stat-item">
                <span class="stat-label">Miembro desde</span>
                <span class="stat-value">${s}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Servicios</span>
                <span class="stat-value">${a}</span>
              </div>
            </div>
          </div>

          <!-- Próxima cita (placeholder) -->
          <div class="next-appointment-card">
            <div class="appointment-header">
              <span class="material-symbols-outlined">calendar_today</span>
              <h4>Próxima Cita</h4>
            </div>
            <p class="appointment-date">No programada</p>
            <p class="appointment-service">Solicita una cita con tu profesional</p>
            <button class="btn-appointment" disabled>Reprogramar</button>
          </div>

          <!-- Compartir perfil -->
          <div class="share-profile-card">
            <div class="share-header">
              <span class="material-symbols-outlined">ios_share</span>
              <h4>Compartir Evolución</h4>
            </div>
            <p>¿Quieres mostrar tu evolución a tu estilista o amigas? Comparte tu perfil de forma segura.</p>
            <button class="btn-share-profile" id="btn-share-profile">
              <span class="material-symbols-outlined">share</span>
              Compartir Perfil
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox-overlay hidden" id="lightbox-overlay">
      <button class="lightbox-close-btn" id="lightbox-close">
        <span class="material-symbols-outlined">close</span>
      </button>
      <img class="lightbox-image" id="lightbox-image" src="" alt="Vista ampliada" />
    </div>
  `,document.getElementById(`btn-client-logout`).addEventListener(`click`,()=>{m(),window.location.hash=`/home`}),document.getElementById(`btn-share-profile`).addEventListener(`click`,()=>{navigator.clipboard.writeText(l).then(()=>{M(`¡Enlace de perfil copiado al portapapeles!`,`success`)}).catch(()=>{M(`No se pudo copiar el enlace`,`error`)})});let u=document.getElementById(`lightbox-overlay`),ee=document.getElementById(`lightbox-image`),d=document.getElementById(`lightbox-close`);e.querySelectorAll(`.service-image-clickable`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.querySelector(`img`)?.src;t&&(ee.src=t,u.classList.remove(`hidden`),document.body.style.overflow=`hidden`)})}),d.addEventListener(`click`,f),u.addEventListener(`click`,e=>{e.target===u&&f()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!u.classList.contains(`hidden`)&&f()});function f(){u.classList.add(`hidden`),document.body.style.overflow=``}}function Pt(e){let t=new Date(e.date).toLocaleDateString(`es-ES`,{day:`numeric`,month:`long`,year:`numeric`}),n=[];e.beforeImg&&n.push({src:e.beforeImg,label:`ANTES`}),e.afterImg&&n.push({src:e.afterImg,label:`DESPUÉS`}),e.afterLateralImg&&n.push({src:e.afterLateralImg,label:`LATERAL`});let r=n.length>0?`
      <div class="service-images-client">
        ${n.map(e=>`
          <div class="service-image-clickable">
            <img src="${o(e.src)}" alt="${e.label}" loading="lazy" />
            <span class="image-badge">${e.label}</span>
          </div>
        `).join(``)}
      </div>`:``,i=e.notes?`
      <div class="service-notes-client">
        <span class="material-symbols-outlined">format_quote</span>
        <div>
          <p class="notes-title">Notas del profesional</p>
          <p class="notes-text">"${o(e.notes)}"</p>
        </div>
      </div>`:``;return`
    <div class="client-service-card">
      <div class="service-card-top">
        <div class="service-date-row">
          <div class="date-icon-circle">
            <span class="material-symbols-outlined">calendar_today</span>
          </div>
          <span class="service-date-text">${t}</span>
        </div>
        <span class="service-status-badge">Finalizado</span>
      </div>
      <h3 class="service-type-title">${o(e.type)}</h3>
      ${r}
      ${i}
    </div>
  `}function Ft(e){return e.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2)}async function It(e,t){let n=re(t);if(!n){e.innerHTML=`
      <section class="shared-error">
        <div class="shared-error-card">
          <span class="material-symbols-outlined">link_off</span>
          <h2>Enlace expirado o inválido</h2>
          <p>Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.</p>
          <a href="/" class="btn-primary-hero">Volver al inicio</a>
        </div>
      </section>`;return}let r=await Ve(n);if(!r){e.innerHTML=`<p>Perfil no encontrado.</p>`;return}let i=await I(n),a=[...i].sort((e,t)=>new Date(t.date)-new Date(e.date)),s=i.length,c=a.length>0?a[0]:null;e.innerHTML=`
    <!-- Banner de expiración -->
    <div class="expiration-banner">
      <span class="material-symbols-outlined">schedule</span>
      <span class="expiration-text">Vista temporal – Este enlace expirará</span>
      <span class="expiration-countdown" id="expiration-countdown">--:--:--</span>
    </div>

    <section class="shared-panel">
      <!-- Cabecera del perfil -->
      <div class="shared-header">
        <div class="shared-header-info">
          <h1 class="shared-title">Historial de <span class="text-primary">${o(r.name)}</span></h1>
          <p class="shared-subtitle">
            Registro detallado de tratamientos estéticos y evolución de servicios realizados en nuestro salón.
          </p>
        </div>
        <button class="btn-outline-shared" id="btn-download-pdf" disabled>
          <span class="material-symbols-outlined">download</span>
          Descargar PDF
        </button>
      </div>

      <!-- Layout principal -->
      <div class="shared-layout">
        <!-- Barra lateral: resumen -->
        <aside class="shared-sidebar">
          <div class="summary-card">
            <h3 class="summary-title">Resumen de Cliente</h3>
            <div class="summary-row">
              <span>Última Visita</span>
              <span class="font-semibold">${c?Rt(c.date):`—`}</span>
            </div>
            <div class="summary-row">
              <span>Servicios Totales</span>
              <span class="font-semibold">${s} sesiones</span>
            </div>
            <div class="summary-row">
              <span>Preferencia</span>
              <span class="font-semibold text-tertiary">Tintes Orgánicos</span>
            </div>
          </div>
          <div class="decorative-image-card">
            <img src="https://picsum.photos/seed/salon/600/400" alt="Salón profesional" loading="lazy" />
            <div class="decorative-overlay">
              <p class="font-headline-md">Tu Estilo, Tu Registro</p>
              <p class="font-body-sm">Acceso seguro a tu historial de belleza.</p>
            </div>
          </div>
        </aside>

        <!-- Lista de servicios -->
        <div class="shared-services-list">
          ${a.length===0?`
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No hay servicios registrados</h3>
            </div>
          `:a.map(e=>Lt(e)).join(``)}
        </div>
      </div>
    </section>
  `,zt(),document.querySelectorAll(`.shared-service-card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>e.classList.add(`elevated`)),e.addEventListener(`mouseleave`,()=>e.classList.remove(`elevated`))})}function Lt(e){let t=new Date(e.date);return`
    <div class="shared-service-card">
      <div class="service-date-block">
        <span class="service-day-number">${t.getDate()}</span>
        <span class="service-month-label">${t.toLocaleString(`es-ES`,{month:`short`})} ${t.getFullYear()}</span>
      </div>
      <div class="service-content">
        <div class="service-header-row">
          <h4 class="service-name">${o(e.type)}</h4>
          <span class="service-status">Completado</span>
        </div>
        <p class="service-description">${o(e.notes||`Sin notas adicionales.`)}</p>
        ${e.beforeImg||e.afterImg?`
        <div class="service-tags">
          ${e.beforeImg?`<span class="service-tag"><span class="material-symbols-outlined">photo_camera</span> Antes</span>`:``}
          ${e.afterImg?`<span class="service-tag"><span class="material-symbols-outlined">checkroom</span> Después</span>`:``}
        </div>`:``}
      </div>
    </div>
  `}function Rt(e){return new Date(e).toLocaleDateString(`es-ES`,{day:`numeric`,month:`short`,year:`numeric`})}function zt(){let e=document.getElementById(`expiration-countdown`);if(!e)return;function t(){let t=new Date,n=new Date(t);n.setHours(23,59,59,999);let r=n-t;if(r<=0){e.textContent=`Expirado`;return}e.textContent=`${Math.floor(r/36e5).toString().padStart(2,`0`)}:${Math.floor(r%36e5/6e4).toString().padStart(2,`0`)}:${Math.floor(r%6e4/1e3).toString().padStart(2,`0`)}`}t(),setInterval(t,1e3)}var Bt=`modulepreload`,Vt=function(e){return`/StyleRecordLite/`+e},Ht={},Ut=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=Vt(t,n),t in Ht)return;Ht[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:Bt,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Z=0,Q={type:``,modality:``,businessName:``,address:``,workFromHome:!1,companyId:``,companyName:``,requestLink:!1};function Wt(e){Z=0,Object.keys(Q).forEach(e=>{Q[e]=Q[e]===!1?!1:``}),Q.workFromHome=!1,Q.requestLink=!1,$(e)}function $(e){let t=(Z+1)/3*100;F(800,200,`salon`),e.innerHTML=`
    <section class="register-view-container fade-in">
      <!-- Stepper -->
      <div class="stepper">
        <div class="stepper-track">
          <div class="stepper-progress" style="width: ${t}%"></div>
        </div>
        <div class="stepper-steps">
          <div class="stepper-step ${Z>=0?`active`:``} ${Z>0?`completed`:``}">
            <div class="step-circle">1</div>
            <span class="step-label ${Z>=0?`active`:``}">Perfil</span>
          </div>
          <div class="stepper-line ${Z>=1?`active`:``}"></div>
          <div class="stepper-step ${Z>=1?`active`:``} ${Z>1?`completed`:``}">
            <div class="step-circle">2</div>
            <span class="step-label ${Z>=1?`active`:``}">Portafolio</span>
          </div>
          <div class="stepper-line ${Z>=2?`active`:``}"></div>
          <div class="stepper-step ${Z>=2?`active`:``}">
            <div class="step-circle">3</div>
            <span class="step-label ${Z>=2?`active`:``}">Verificación</span>
          </div>
        </div>
      </div>

      <!-- Card del formulario -->
      <div class="register-card">
        <div class="register-card-header">
          <h1 class="register-card-title">${Gt(Z)}</h1>
          <p class="register-card-subtitle">${Kt(Z)}</p>
        </div>

        <div class="register-card-body">
          ${qt(Z)}
        </div>
      </div>

      <!-- Badges de confianza -->
      <div class="register-trust">
        <div class="trust-item">
          <span class="material-symbols-outlined">lock</span>
          <span>Datos encriptados</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <span class="material-symbols-outlined">verified</span>
          <span>Plataforma Certificada</span>
        </div>
      </div>
    </section>
  `;let n=document.getElementById(`btn-cancel`);if(n&&n.addEventListener(`click`,()=>{window.location.hash=`/rol`}),Z>0){let t=document.getElementById(`btn-prev`);t&&t.addEventListener(`click`,()=>{Z--,$(e)})}let r=document.getElementById(`btn-next`);r&&r.addEventListener(`click`,()=>Zt(e)),Z===0&&tn(),Z===1&&nn()}function Gt(e){switch(e){case 0:return`Información Profesional`;case 1:return`Detalles del Negocio`;case 2:return`Resumen del Registro`;default:return``}}function Kt(e){switch(e){case 0:return`Completa los detalles de tu especialidad para comenzar a gestionar tu agenda con StyleRecord Lite.`;case 1:return Q.modality===`independent`?`Configura los datos de tu actividad independiente.`:`Vincula tu perfil con la empresa donde trabajas.`;case 2:return`Revisa que toda la información sea correcta antes de finalizar.`;default:return``}}function qt(e){switch(e){case 0:return Jt();case 1:return Yt();case 2:return Xt();default:return``}}function Jt(){return`
    <form id="step0-form" class="register-form">
      <div class="form-group">
        <label class="form-label" for="prof-type">Tipo de profesional</label>
        <div class="select-wrapper-register">
          <select id="prof-type" class="form-select" required>
            <option value="" disabled ${Q.type?``:`selected`}>Selecciona tu especialidad</option>
            <option value="barbero" ${Q.type===`barbero`?`selected`:``}>Barbero</option>
            <option value="estilista" ${Q.type===`estilista`?`selected`:``}>Estilista</option>
            <option value="lashista" ${Q.type===`lashista`?`selected`:``}>Lashista</option>
            <option value="colorista" ${Q.type===`colorista`?`selected`:``}>Colorista</option>
            <option value="otros" ${Q.type===`otros`?`selected`:``}>Otros</option>
          </select>
          <span class="material-symbols-outlined select-icon">expand_more</span>
        </div>
        <div class="field-error" id="error-type"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Modalidad de trabajo</label>
        <div class="radio-cards">
          <label class="radio-card ${Q.modality===`independent`?`selected`:``}">
            <input type="radio" name="modality" value="independent" ${Q.modality===`independent`?`checked`:``} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">person_pin</span>
            <span class="radio-title">Independiente</span>
            <span class="radio-desc">Trabajas por cuenta propia o a domicilio.</span>
          </label>
          <label class="radio-card ${Q.modality===`employed`?`selected`:``}">
            <input type="radio" name="modality" value="employed" ${Q.modality===`employed`?`checked`:``} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">store</span>
            <span class="radio-title">Empleado</span>
            <span class="radio-desc">Formas parte del equipo de un salón o clínica.</span>
          </label>
        </div>
        <div class="field-error" id="error-modality"></div>
      </div>

      <div class="register-decoration">
        <img src="${F(800,200,`salon-deco`)}" alt="Salón profesional" loading="lazy" />
        <div class="decoration-overlay"></div>
      </div>

      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancelar</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Siguiente</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </form>
  `}function Yt(){return Q.modality===`independent`?`
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label" for="business-name">Nombre del local / Profesional</label>
          <input type="text" id="business-name" class="form-input" value="${o(Q.businessName)}" placeholder="Ej. Estudio Belleza" required />
          <div class="field-error" id="error-business-name"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="address">Dirección</label>
          <input type="text" id="address" class="form-input" value="${o(Q.address)}" placeholder="Dirección del local" />
          <div class="field-error" id="error-address"></div>
        </div>
        <label class="checkbox-label">
          <input type="checkbox" id="work-from-home" ${Q.workFromHome?`checked`:``} />
          <span class="checkmark"></span>
          Trabajo a domicilio (sin local físico)
        </label>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancelar</button>
          <button type="button" id="btn-prev" class="btn-outline">Anterior</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Siguiente</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `:`
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label">Buscar empresa existente</label>
          <div class="autocomplete-wrapper">
            <input type="text" id="company-search" class="form-input" placeholder="Nombre de la empresa..." autocomplete="off" />
            <ul id="company-suggestions" class="autocomplete-list hidden"></ul>
          </div>
        </div>
        <div class="or-divider"><span>o</span></div>
        <div class="form-group">
          <label class="form-label" for="new-company-name">Registrar nueva empresa</label>
          <input type="text" id="new-company-name" class="form-input" value="${o(Q.companyName)}" placeholder="Nombre de la empresa" />
          <div class="field-error" id="error-company-name"></div>
          <input type="hidden" id="selected-company-id" value="${o(Q.companyId)}" />
          <p id="selected-company-display" class="selected-company"></p>
        </div>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancelar</button>
          <button type="button" id="btn-prev" class="btn-outline">Anterior</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Siguiente</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `}function Xt(){let e=`<ul class="summary-list">`;return e+=`<li><strong>Tipo:</strong> ${o(Q.type)}</li>`,e+=`<li><strong>Modalidad:</strong> ${Q.modality===`independent`?`Independiente`:`Empleado`}</li>`,Q.modality===`independent`?(e+=`<li><strong>Nombre:</strong> ${o(Q.businessName)}</li>`,Q.workFromHome?e+=`<li><strong>Trabajo a domicilio:</strong> Sí</li>`:e+=`<li><strong>Dirección:</strong> ${o(Q.address)}</li>`):(Q.companyId?e+=`<li><strong>Empresa:</strong> ${o(Q.companyName)} (ID: ${o(Q.companyId)})</li>`:e+=`<li><strong>Empresa nueva:</strong> ${o(Q.companyName)}</li>`,e+=`<li><strong>Solicitar vinculación:</strong> ${Q.requestLink?`Sí`:`No`}</li>`),e+=`</ul>`,`
    <div class="register-form">
      <div class="summary-box">
        ${e}
      </div>
      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancelar</button>
        <button type="button" id="btn-prev" class="btn-outline">Anterior</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Finalizar</span>
          <span class="material-symbols-outlined">check</span>
        </button>
      </div>
    </div>
  `}async function Zt(e){if(Z===0){if(!Qt())return;Z++,$(e)}else if(Z===1){if(!$t())return;Z++,$(e)}else if(Z===2){await en(),P(`Registro completado correctamente.`);let{loginAsProfessional:e}=await Ut(async()=>{let{loginAsProfessional:e}=await Promise.resolve().then(()=>l);return{loginAsProfessional:e}},void 0);e(`1234`),window.location.hash=`/professional`}}function Qt(){let e=document.getElementById(`prof-type`)?.value,t=document.querySelector(`input[name="modality"]:checked`)?.value,n=ut(e),r=dt(t);return document.getElementById(`error-type`).textContent=n||``,document.getElementById(`error-modality`).textContent=r||``,n||r?!1:(Q.type=e,Q.modality=t,!0)}function $t(){if(Q.modality===`independent`){let e=document.getElementById(`business-name`)?.value.trim(),t=document.getElementById(`address`)?.value.trim(),n=document.getElementById(`work-from-home`)?.checked||!1,r=ft(e),i=null;return n||(i=pt(t)),document.getElementById(`error-business-name`).textContent=r||``,document.getElementById(`error-address`).textContent=i||``,r||i?!1:(Q.businessName=e,Q.address=t,Q.workFromHome=n,!0)}else{let e=document.getElementById(`selected-company-id`)?.value,t=document.getElementById(`new-company-name`)?.value.trim();if(!e&&!t)return document.getElementById(`error-company-name`).textContent=`Debes seleccionar una empresa o ingresar un nombre nuevo.`,!1;if(t&&!e){let e=mt(t);if(e)return document.getElementById(`error-company-name`).textContent=e,!1;Q.companyName=t,Q.companyId=``}else if(e){Q.companyId=e;let t=document.getElementById(`selected-company-display`);Q.companyName=t?t.textContent.replace(`Empresa: `,``):``}return Q.requestLink=!0,!0}}async function en(){let e=`prof_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),t={id:e,type:Q.type,modality:Q.modality,createdAt:new Date().toISOString()};if(Q.modality===`independent`&&(t.businessName=Q.businessName,t.address=Q.workFromHome?`A domicilio`:Q.address,t.workFromHome=Q.workFromHome),await Ie(t),Q.modality===`employed`){let t=Q.companyId;t||(t=`comp_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),await Le({id:t,name:Q.companyName,createdAt:new Date().toISOString()})),await ze({id:`link_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),professionalId:e,companyId:t,status:`pending`,requestedAt:new Date().toISOString()})}}function tn(){document.querySelectorAll(`input[name="modality"]`).forEach(e=>{e.addEventListener(`change`,function(){document.querySelectorAll(`.radio-card`).forEach(e=>e.classList.remove(`selected`)),this.closest(`.radio-card`).classList.add(`selected`)})})}function nn(){if(Q.modality===`employed`){let e=document.getElementById(`company-search`),t=document.getElementById(`company-suggestions`),n=document.getElementById(`new-company-name`);e?.addEventListener(`input`,async e=>{let n=e.target.value.trim();if(n.length<2){t.classList.add(`hidden`);return}let r=await Re(n);t.innerHTML=r.length===0?`<li class="no-results">No se encontraron empresas</li>`:r.map(e=>`<li data-id="${o(e.id)}">${o(e.name)}</li>`).join(``),t.classList.remove(`hidden`)}),t?.addEventListener(`click`,r=>{let i=r.target.closest(`li`);!i||!i.dataset.id||(document.getElementById(`selected-company-id`).value=i.dataset.id,document.getElementById(`selected-company-display`).textContent=`Empresa: ${i.textContent}`,e.value=i.textContent,t.classList.add(`hidden`),n.value=``,document.getElementById(`error-company-name`).textContent=``)}),n?.addEventListener(`input`,()=>{document.getElementById(`selected-company-id`).value=``,document.getElementById(`selected-company-display`).textContent=``,e.value=``,t.innerHTML=``,t.classList.add(`hidden`)}),document.addEventListener(`click`,e=>{e.target.closest(`.autocomplete-wrapper`)||t?.classList.add(`hidden`)})}}document.addEventListener(`DOMContentLoaded`,async()=>{await a(),ie(),Ct();let e=document.createElement(`div`);e.id=`offline-banner`,e.className=`offline-banner hidden`,e.innerHTML=`<i class="fas fa-wifi-slash"></i> ${b(`offline`)}`,document.body.appendChild(e),window.addEventListener(`online`,()=>e.classList.add(`hidden`)),window.addEventListener(`offline`,()=>e.classList.remove(`hidden`));let t=document.getElementById(`modal-close`),n=document.getElementById(`modal-overlay`);t&&t.addEventListener(`click`,K),n&&n.addEventListener(`click`,e=>{e.target===e.currentTarget&&K()});let r=document.getElementById(`btn-logout`);r&&r.addEventListener(`click`,()=>{m(),window.location.hash=`/home`,window.location.reload()});let i=new URLSearchParams(window.location.search).get(`token`);if(i){document.body.classList.remove(`dashboard-mode`);let e=document.querySelector(`main`);e.innerHTML=``,await It(e,i),window.addEventListener(`hashchange`,()=>{window.location.href=window.location.origin+window.location.pathname+window.location.hash});return}let o=oe(),s=document.querySelector(`main`);o.addRoute(`/home`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),se(s)}),o.addRoute(`/rol`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),ce(s)}),o.addRoute(`/login`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),qe(s)}),o.addRoute(`/register`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),Wt(s)}),o.addRoute(`/professional`,async()=>{if(!h()||p()!==`professional`){o.navigate(`/login?role=professional`);return}await wt(s)}),o.addRoute(`/client`,async()=>{if(document.body.classList.remove(`dashboard-mode`),!h()||p()!==`client`){o.navigate(`/login?role=client`);return}r&&(r.style.display=`block`),await Nt(s)}),o.addRoute(`*`,()=>o.navigate(`/home`)),o.start()});