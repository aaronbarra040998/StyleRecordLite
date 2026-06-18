var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t=document){return t.querySelector(e)}function r(e,t,n,r){t.innerHTML=e,r&&r(n)}async function i(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function a(){let e=await i(`partials/header.html`),t=await i(`partials/footer.html`),a=n(`#main-header`),o=n(`#main-footer`);r(e,a),r(t,o)}function o(e){let t=document.createElement(`div`);return t.appendChild(document.createTextNode(e)),t.innerHTML}function s(e,t=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var c=`/StyleRecordLite/`,l=t({getRole:()=>m,isAuthenticated:()=>g,loginAsClient:()=>p,loginAsProfessional:()=>f,logout:()=>h}),u=`sr-role`,d=`1234`;function f(e){if(e===d)try{return localStorage.setItem(u,`professional`),!0}catch(e){return console.error(`Error saving role:`,e),!1}return!1}function p(e){try{localStorage.setItem(u,`client`),localStorage.setItem(`sr-client-phone`,e)}catch(e){console.error(`Error saving client role:`,e)}}function m(){try{return localStorage.getItem(u)}catch(e){return console.error(`Error reading role:`,e),null}}function h(){try{localStorage.removeItem(u),localStorage.removeItem(`sr-client-phone`)}catch(e){console.error(`Error logging out:`,e)}}function g(){return m()!==null}var ee=`sr-temp-links`;function te(){try{let e=localStorage.getItem(ee);return e?JSON.parse(e):[]}catch(e){return console.error(`Error loading temporary links:`,e),[]}}function ne(e){try{return localStorage.setItem(ee,JSON.stringify(e)),!0}catch(e){return console.error(`Error saving temporary links:`,e),!1}}function re(e){let t=`tok_`+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).substr(2,9)),n=te();return n.push({token:t,clientId:e,expiresAt:Date.now()+1440*60*1e3}),ne(n),t}function ie(e){let t=te(),n=t.find(t=>t.token===e);return n?Date.now()>n.expiresAt?(ne(t.filter(t=>t.token!==e)),null):n.clientId:null}function ae(){ne(te().filter(e=>Date.now()<=e.expiresAt))}var oe=class{constructor(){this.routes={},window.addEventListener(`hashchange`,()=>this.resolve())}addRoute(e,t){this.routes[e]=t}navigate(e){window.location.hash=e}resolve(){let[e]=(window.location.hash.slice(1)||`/`).split(`?`),t=this.routes[e]||this.routes[`*`];t&&t()}start(){window.location.hash?this.resolve():window.location.hash=`/home`}};function se(){return new oe}var _={es:{appName:`StyleRecord Lite`,login:`Accede a StyleRecord`,professional:`Soy Profesional`,client:`Soy Cliente`,search:`Buscar cliente...`,newClient:`Nuevo Cliente`,addService:`Agregar Servicio`,edit:`Editar`,delete:`Eliminar`,confirmDeleteClient:`¿Eliminar este cliente y todos sus servicios?`,confirmDeleteService:`¿Eliminar este servicio?`,saved:`Guardado`,invalidCode:`Código incorrecto. Prueba con 1234`,noClient:`No se encontró un cliente con ese número.`,noClients:`No hay clientes registrados.`,emptyHint:`Agrega tu primer cliente con el botón "Nuevo Cliente".`,noServices:`Este cliente no tiene servicios registrados.`,noHistory:`No tienes servicios registrados aún.`,linkExpired:`Enlace expirado o inválido`,linkExpiredMsg:`Este enlace ha caducado (24 horas) o no es correcto. Pide a tu profesional un nuevo enlace.`,sharedBanner:`Vista temporal – Este enlace expirará`,shareProfile:`Compartir Perfil`,copyLink:`Copiar`,copied:`¡Copiado!`,offline:`Sin conexión a internet. Algunas funciones pueden no estar disponibles.`,clientCreated:`Cliente creado correctamente`,clientUpdated:`Cliente actualizado`,clientDeleted:`Cliente eliminado`,serviceAdded:`Servicio agregado`,serviceUpdated:`Servicio actualizado`,serviceDeleted:`Servicio eliminado`,phoneExists:`El teléfono ya está registrado.`,invalidPhone:`El número no es válido.`,manualSave:`Guardar de todas formas`,saveManually:`Guardar manualmente`,validateAndSave:`Validar y Guardar`,validating:`Validando...`,before:`Antes`,after:`Después`,beforeImageAlt:`Antes del servicio`,afterImageAlt:`Después del servicio`,editService:`Editar servicio`,deleteService:`Eliminar servicio`,editClient:`Editar`,deleteClient:`Eliminar`,clientAriaLabel:`Cliente`,noServicesShort:`Sin servicios`,addServiceHint:`Usa "Agregar Servicio" para añadir uno.`,historyOf:`Historial de`,yes:`Sí, eliminar`,cancel:`Cancelar`,confirmTitle:`Confirmar acción`,serviceAriaLabel:`Servicio`},en:{appName:`StyleRecord Lite`,login:`Log in to StyleRecord`,professional:`I am a Professional`,client:`I am a Client`,search:`Search client...`,newClient:`New Client`,addService:`Add Service`,edit:`Edit`,delete:`Delete`,confirmDeleteClient:`Delete this client and all services?`,confirmDeleteService:`Delete this service?`,saved:`Saved`,invalidCode:`Incorrect code. Try 1234`,noClient:`No client found with that number.`,noClients:`No registered clients.`,emptyHint:`Add your first client using the "New Client" button.`,noServices:`This client has no registered services.`,noHistory:`You have no registered services yet.`,linkExpired:`Link expired or invalid`,linkExpiredMsg:`This link has expired (24 hours) or is incorrect. Ask your professional for a new link.`,sharedBanner:`Temporary view – This link will expire`,shareProfile:`Share Profile`,copyLink:`Copy`,copied:`Copied!`,offline:`No internet connection. Some features may not be available.`,clientCreated:`Client created successfully`,clientUpdated:`Client updated`,clientDeleted:`Client deleted`,serviceAdded:`Service added`,serviceUpdated:`Service updated`,serviceDeleted:`Service deleted`,phoneExists:`Phone number already registered.`,invalidPhone:`Invalid phone number.`,manualSave:`Save anyway`,saveManually:`Save manually`,validateAndSave:`Validate & Save`,validating:`Validating...`,before:`Before`,after:`After`,beforeImageAlt:`Before the service`,afterImageAlt:`After the service`,editService:`Edit service`,deleteService:`Delete service`,editClient:`Edit`,deleteClient:`Delete`,clientAriaLabel:`Client`,noServicesShort:`No services`,addServiceHint:`Use "Add Service" to add one.`,historyOf:`History of`,yes:`Yes, delete`,cancel:`Cancel`,confirmTitle:`Confirm action`,serviceAriaLabel:`Service`}},v=localStorage.getItem(`sr-lang`)||navigator.language.split(`-`)[0]||`es`;_[v]||(v=`es`);function y(e){return _[v]?.[e]||_.es[e]||e}function ce(e){e.innerHTML=`
    <!-- Hero Section -->
    <section class="hero-section hero-gradient">
      <div class="hero-container">
        <div class="hero-left">
          <div class="hero-badge animate-bounce-slow">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Professional Beauty Management</span>
          </div>
          <h1 class="hero-title">
            Organize your success with <span>StyleRecord</span>
          </h1>
          <p class="hero-subtitle">
            The ultimate platform for aestheticians looking to raise their standards, organize their clientele, and boost their professional growth.
          </p>
          <div class="hero-actions">
            <button class="btn-primary-hero" id="btn-home-cta">
              Get Started
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
            <button class="btn-outline-hero" id="btn-ver-demo">See Demo</button>
          </div>
        </div>
        <div class="hero-right">
          <div class="hero-image-wrapper">
            <img src="${c}images/imgHome.png" alt="Professional in aesthetic clinic using tablet" />
          </div>
          <div class="hero-floating-badge">
            <div class="icon-circle">
              <span class="material-symbols-outlined">verified</span>
            </div>
            <div>
              <div class="font-bold">Total Confidence</div>
              <div class="text-sm text-on-surface-variant">100% Visual Control</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Decorative background elements -->
      <div class="hero-deco hero-deco-right"></div>
      <div class="hero-deco hero-deco-left"></div>
    </section>

    <!-- Value Props Section -->
    <section class="value-props-section">
      <div class="section-title">
        <h2>Raise Your Service Standard</h2>
        <div class="section-title-divider"></div>
        <p>Tools designed for beauty industry specialists.</p>
      </div>
      <div class="props-grid">
        <div class="prop-card glass-card">
          <div class="prop-icon primary">
            <span class="material-symbols-outlined">group</span>
          </div>
          <h3>Client Management</h3>
          <p>Full control of profiles, preferences, and allergies in one secure, accessible place.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon secondary">
            <span class="material-symbols-outlined">photo_library</span>
          </div>
          <h3>Visual History</h3>
          <p>Document treatment evolution with photo galleries for each client.</p>
        </div>
        <div class="prop-card glass-card">
          <div class="prop-icon tertiary">
            <span class="material-symbols-outlined">trending_up</span>
          </div>
          <h3>Professional Tracking</h3>
          <p>Service analytics and automatic reminders to keep your clients engaged.</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">Salons</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">15k</div>
          <div class="stat-label">Clients</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">98%</div>
          <div class="stat-label">Satisfaction</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Support</div>
        </div>
      </div>
    </section>

    <!-- New section: Featured service (visible only on mobile as a card) -->
    <section class="featured-service-section">
      <h2 class="featured-service-title">Your Services, Professionalized</h2>
      <div class="featured-service-card">
        <div class="featured-service-image">
          <img src="https://picsum.photos/seed/spa/800/400" alt="Professional facial treatment" loading="lazy" />
          <div class="featured-service-price">$85.00</div>
        </div>
        <div class="featured-service-content">
          <div class="featured-service-header">
            <h3>Premium Facial Treatment</h3>
            <span class="material-symbols-outlined featured-service-star">star</span>
          </div>
          <p>Deep cleansing with ultrasound technology and intensive hydration.</p>
          <button class="btn-featured-service">
            See Service Details
          </button>
        </div>
      </div>
    </section>
  `,document.getElementById(`btn-home-cta`).addEventListener(`click`,()=>{window.location.hash=`/rol`}),document.getElementById(`btn-ver-demo`).addEventListener(`click`,()=>{window.location.hash=`/login?role=professional`}),le()}function le(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`in-view`)})},{threshold:.1});document.querySelectorAll(`.glass-card, .featured-service-card`).forEach(t=>{t.classList.add(`reveal-on-scroll`),e.observe(t)})}function ue(e){e.innerHTML=`
    <section class="role-selection">
      <!-- Header with animation -->
      <div class="role-header">
        <div class="role-brand">
          <span class="material-symbols-outlined">spa</span>
          <h1>StyleRecord</h1>
        </div>
        <h2 class="role-heading">${y(`login`)}</h2>
        <p class="role-subtitle">Choose how you want to access</p>
      </div>

      <!-- Role cards -->
      <div class="role-cards">
        <!-- Professional -->
        <button class="role-card" id="role-professional" aria-label="${y(`professional`)}">
          <div class="role-icon professional">
            <span class="material-symbols-outlined" style="font-size:36px;">content_cut</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title professional">${y(`professional`)}</h2>
            <p class="role-card-desc">Manage your clients, save visual histories and optimize your schedule.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>

        <!-- Client -->
        <button class="role-card" id="role-client" aria-label="${y(`client`)}">
          <div class="role-icon client">
            <span class="material-symbols-outlined" style="font-size:36px;">group</span>
          </div>
          <div class="role-info">
            <h2 class="role-card-title client">${y(`client`)}</h2>
            <p class="role-card-desc">View your service history, book appointments and share your profile.</p>
          </div>
          <span class="material-symbols-outlined role-chevron">chevron_right</span>
        </button>
      </div>

      <!-- Registration link -->
      <a class="role-register-link" href="#/register">
        Don't have an account? Sign up now
      </a>

      <!-- Security badge -->
      <div class="role-security-badge">
        <span class="material-symbols-outlined">lock</span>
        <span>Secure access with SSL encryption</span>
      </div>

      <!-- Decorative image (mobile only) -->
      <div class="role-decorative-image">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
             alt="Beauty salon environment" 
             loading="lazy" />
      </div>
    </section>
  `,document.getElementById(`role-professional`).addEventListener(`click`,()=>{window.location.hash=`/login?role=professional`}),document.getElementById(`role-client`).addEventListener(`click`,()=>{window.location.hash=`/login?role=client`}),document.querySelectorAll(`.role-card`).forEach(e=>{e.addEventListener(`keydown`,t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),e.click())})})}var b=(e,t)=>t.some(t=>e instanceof t),de,fe;function pe(){return de||=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]}function me(){return fe||=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey]}var x=new WeakMap,S=new WeakMap,C=new WeakMap;function he(e){let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`success`,i),e.removeEventListener(`error`,a)},i=()=>{t(T(e.result)),r()},a=()=>{n(e.error),r()};e.addEventListener(`success`,i),e.addEventListener(`error`,a)});return C.set(t,e),t}function ge(e){if(x.has(e))return;let t=new Promise((t,n)=>{let r=()=>{e.removeEventListener(`complete`,i),e.removeEventListener(`error`,a),e.removeEventListener(`abort`,a)},i=()=>{t(),r()},a=()=>{n(e.error||new DOMException(`AbortError`,`AbortError`)),r()};e.addEventListener(`complete`,i),e.addEventListener(`error`,a),e.addEventListener(`abort`,a)});x.set(e,t)}var w={get(e,t,n){if(e instanceof IDBTransaction){if(t===`done`)return x.get(e);if(t===`store`)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return T(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t===`done`||t===`store`)?!0:t in e}};function _e(e){w=e(w)}function ve(e){return me().includes(e)?function(...t){return e.apply(E(this),t),T(this.request)}:function(...t){return T(e.apply(E(this),t))}}function ye(e){return typeof e==`function`?ve(e):(e instanceof IDBTransaction&&ge(e),b(e,pe())?new Proxy(e,w):e)}function T(e){if(e instanceof IDBRequest)return he(e);if(S.has(e))return S.get(e);let t=ye(e);return t!==e&&(S.set(e,t),C.set(t,e)),t}var E=e=>C.get(e);function be(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){let o=indexedDB.open(e,t),s=T(o);return r&&o.addEventListener(`upgradeneeded`,e=>{r(T(o.result),e.oldVersion,e.newVersion,T(o.transaction),e)}),n&&o.addEventListener(`blocked`,e=>n(e.oldVersion,e.newVersion,e)),s.then(e=>{a&&e.addEventListener(`close`,()=>a()),i&&e.addEventListener(`versionchange`,e=>i(e.oldVersion,e.newVersion,e))}).catch(()=>{}),s}var xe=[`get`,`getKey`,`getAll`,`getAllKeys`,`count`],Se=[`put`,`add`,`delete`,`clear`],Ce=new Map;function we(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==`string`))return;if(Ce.get(t))return Ce.get(t);let n=t.replace(/FromIndex$/,``),r=t!==n,i=Se.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||xe.includes(n)))return;let a=async function(e,...t){let a=this.transaction(e,i?`readwrite`:`readonly`),o=a.store;return r&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&a.done]))[0]};return Ce.set(t,a),a}_e(e=>({...e,get:(t,n,r)=>we(t,n)||e.get(t,n,r),has:(t,n)=>!!we(t,n)||e.has(t,n)}));var Te=[`continue`,`continuePrimaryKey`,`advance`],Ee={},De=new WeakMap,Oe=new WeakMap,ke={get(e,t){if(!Te.includes(t))return e[t];let n=Ee[t];return n||=Ee[t]=function(...e){De.set(this,Oe.get(this)[t](...e))},n}};async function*Ae(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;let n=new Proxy(t,ke);for(Oe.set(n,t),C.set(n,E(t));t;)yield n,t=await(De.get(n)||t.continue()),De.delete(n)}function je(e,t){return t===Symbol.asyncIterator&&b(e,[IDBIndex,IDBObjectStore,IDBCursor])||t===`iterate`&&b(e,[IDBIndex,IDBObjectStore])}_e(e=>({...e,get(t,n,r){return je(t,n)?Ae:e.get(t,n,r)},has(t,n){return je(t,n)||e.has(t,n)}}));var Me=`stylerecord-db`,Ne=2,Pe;function D(){return Pe||=be(Me,Ne,{upgrade(e,t,n,r){if(e.objectStoreNames.contains(`clients`)||e.createObjectStore(`clients`,{keyPath:`id`}),t<2&&(e.objectStoreNames.contains(`professionals`)||e.createObjectStore(`professionals`,{keyPath:`id`}),e.objectStoreNames.contains(`companies`)||e.createObjectStore(`companies`,{keyPath:`id`}).createIndex(`name`,`name`,{unique:!1}),!e.objectStoreNames.contains(`linkRequests`))){let t=e.createObjectStore(`linkRequests`,{keyPath:`id`});t.createIndex(`professionalId`,`professionalId`,{unique:!1}),t.createIndex(`companyId`,`companyId`,{unique:!1})}}}),Pe}async function Fe(){return(await D()).getAll(`clients`)}async function Ie(e){let t=(await D()).transaction(`clients`,`readwrite`);await t.store.clear();for(let n of e)await t.store.put(n);await t.done}async function Le(e){await(await D()).add(`clients`,e)}async function Re(e,t){let n=await D(),r=await n.get(`clients`,e);return r?(Object.assign(r,t),await n.put(`clients`,r),!0):!1}async function ze(e){await(await D()).put(`professionals`,e)}async function Be(e){await(await D()).put(`companies`,e)}async function Ve(e){let t=(await D()).transaction(`companies`,`readonly`).store.index(`name`),n=IDBKeyRange.bound(e,e+`￿`,!1,!1);return t.getAll(n)}async function He(e){await(await D()).add(`linkRequests`,e)}async function O(){try{return await Fe()}catch(e){return console.error(`Error loading clients:`,e),[]}}async function k(e){try{return await Ie(e),!0}catch(e){return console.error(`Error saving clients:`,e),!1}}async function Ue(e){return(await O()).find(t=>t.phone===e)}async function We(e){return(await O()).find(t=>t.id===e)}async function Ge(e){try{return await Le(e),!0}catch(e){return console.error(`Error adding client:`,e),!1}}async function Ke(e,t){try{let n=await Re(e,t);return n||console.warn(`Client with id ${e} not found for update.`),n}catch(e){return console.error(`Error updating client:`,e),!1}}function A(e,t=`info`){let n=document.createElement(`div`);n.className=`toast toast-${t}`,n.textContent=e,document.body.appendChild(n),setTimeout(()=>{n.classList.add(`fade-out`),n.addEventListener(`transitionend`,()=>n.remove())},3e3)}function j(e){A(e,`error`)}function M(e){A(e,`success`)}var qe=[{code:`AR`,name:`Argentina`,dialCode:`+54`,flag:`🇦🇷`},{code:`BO`,name:`Bolivia`,dialCode:`+591`,flag:`🇧🇴`},{code:`BR`,name:`Brazil`,dialCode:`+55`,flag:`🇧🇷`},{code:`CL`,name:`Chile`,dialCode:`+56`,flag:`🇨🇱`},{code:`CO`,name:`Colombia`,dialCode:`+57`,flag:`🇨🇴`},{code:`CR`,name:`Costa Rica`,dialCode:`+506`,flag:`🇨🇷`},{code:`CU`,name:`Cuba`,dialCode:`+53`,flag:`🇨🇺`},{code:`DO`,name:`Dominican Republic`,dialCode:`+1`,flag:`🇩🇴`},{code:`EC`,name:`Ecuador`,dialCode:`+593`,flag:`🇪🇨`},{code:`ES`,name:`Spain`,dialCode:`+34`,flag:`🇪🇸`},{code:`GT`,name:`Guatemala`,dialCode:`+502`,flag:`🇬🇹`},{code:`HN`,name:`Honduras`,dialCode:`+504`,flag:`🇭🇳`},{code:`MX`,name:`Mexico`,dialCode:`+52`,flag:`🇲🇽`},{code:`NI`,name:`Nicaragua`,dialCode:`+505`,flag:`🇳🇮`},{code:`PA`,name:`Panama`,dialCode:`+507`,flag:`🇵🇦`},{code:`PY`,name:`Paraguay`,dialCode:`+595`,flag:`🇵🇾`},{code:`PE`,name:`Peru`,dialCode:`+51`,flag:`🇵🇪`},{code:`US`,name:`United States`,dialCode:`+1`,flag:`🇺🇸`},{code:`UY`,name:`Uruguay`,dialCode:`+598`,flag:`🇺🇾`},{code:`VE`,name:`Venezuela`,dialCode:`+58`,flag:`🇻🇪`}];function Je(e,t){return e+t.replace(/[^0-9]/g,``).replace(/^0+/,``)}function N(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function Ye(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10),n=Math.random().toString(36).substring(2,10);return{beforeImg:N(300,200,e),afterImg:N(300,200,t),afterLateralImg:N(300,200,n)}}function Xe(e){let t=window.location.hash,n=new URLSearchParams(t.split(`?`)[1]||``).get(`role`);if(!n||n!==`professional`&&n!==`client`){window.location.hash=`/rol`;return}n===`professional`?Ze(e):Qe(e)}function Ze(e){e.innerHTML=`
    <section class="login-view active">
      <!-- Decorative backgrounds (visible only on mobile) -->
      <div class="login-decorations" aria-hidden="true">
        <div class="login-deco-circle login-deco-circle--primary"></div>
        <div class="login-deco-circle login-deco-circle--secondary"></div>
        <div class="login-deco-pattern"></div>
      </div>

      <div class="login-card" id="professional-login-card">
        <div class="login-icon-circle">
          <span class="material-symbols-outlined" style="font-size:32px;">content_cut</span>
        </div>
        <h1 class="login-title">Professional Access</h1>
        <p class="login-subtitle">Enter your credentials to manage your salon.</p>
        <form id="login-form">
          <div class="login-form-group">
            <label for="prof-code">Professional Code</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined">lock</span>
              <input type="password" id="prof-code" placeholder="Code" required autofocus />
            </div>
          </div>
          <button type="submit" class="btn-login-submit">
            <span>Sign in</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>
        <div class="login-links">
          <a href="#/register">Don't have an account? <strong style="color: var(--color-primary);">Sign up</strong></a>
          <a href="#/rol">
            <span class="material-symbols-outlined" style="font-size:18px;">keyboard_backspace</span>
            Back to role selection
          </a>
        </div>
      </div>
      <p class="login-support">Problems with your code? Contact technical support.</p>
    </section>
  `;let t=document.getElementById(`professional-login-card`);t&&window.matchMedia(`(hover: hover)`).matches&&document.addEventListener(`mousemove`,e=>{let{clientX:n,clientY:r}=e,i=(n/window.innerWidth-.5)*10,a=(r/window.innerHeight-.5)*10;t.style.transform=`translate(${i}px, ${a}px)`}),document.getElementById(`login-form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`prof-code`).value;f(t)?window.location.hash=`/professional`:j(y(`invalidCode`))})}function Qe(e){e.innerHTML=`
    <section class="login-view active" style="max-width:100%; padding:0;">
      <div class="login-client-container">
        <!-- Visual column (desktop) -->
        <div class="login-client-visual">
          <div class="visual-grid">
            <div class="visual-img-wrapper">
              <img src="${N(600,400,`salon`)}" alt="Modern salon" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
            <div class="visual-img-wrapper">
              <img src="${N(600,600,`productos`)}" alt="Beauty products" loading="lazy" />
              <div class="visual-overlay"></div>
            </div>
          </div>
          <div class="visual-text-card">
            <h2>Your beauty history, all in one place.</h2>
            <p>Access your past appointments, treatments, and personalized recommendations.</p>
            <span class="material-symbols-outlined watermark">content_cut</span>
          </div>
        </div>

        <!-- Form column -->
        <div class="login-client-form-col">
          <div class="login-card">
            <div class="login-icon-circle">
              <span class="material-symbols-outlined" style="font-size:32px;">group</span>
            </div>
            <h1 class="login-title">Client Access</h1>
            <p class="login-subtitle">Enter your phone number to continue.</p>
            <form id="login-form">
              <div class="login-form-group">
                <label for="country-select">Country</label>
                <div class="select-wrapper">
                  <select id="country-select" required>
                    ${qe.map(e=>`<option value="${e.dialCode}" ${e.code===`PE`?`selected`:``}>${e.flag} ${e.name} (${e.dialCode})</option>`).join(``)}
                  </select>
                  <span class="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <div class="login-form-group">
                <label for="login-phone">Phone Number</label>
                <div class="input-with-icon">
                  <span class="material-symbols-outlined">smartphone</span>
                  <input type="tel" id="login-phone" placeholder="987 654 321" required autofocus />
                </div>
              </div>
              <button type="submit" class="btn-login-submit luxury-gradient">
                <span>See history</span>
                <span class="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
            <div class="login-links">
              <a href="#/rol">
                <span class="material-symbols-outlined" style="font-size:18px;">arrow_back</span>
                Back to role selection
              </a>
              <p style="font-size:0.875rem; color:var(--color-on-surface-variant);">
                Are you a professional? <a href="#/login?role=professional" style="color:var(--color-tertiary); font-weight:bold;">Business Access</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,document.getElementById(`login-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`country-select`).value,n=Je(t,document.getElementById(`login-phone`).value.trim());await Ue(n)?(p(n),window.location.hash=`/client`):j(y(`noClient`))})}async function P(e){let t=(await O()).find(t=>t.id===e);return t?t.services:[]}async function $e(e,t){let n=await O(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),await k(n),!0):!1}async function et(e,t,n){let r=await O(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},await k(r),!0)}async function tt(e,t){let n=await O(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),await k(n),!0):!1}var nt=class extends Error{constructor(e,t){super(e),this.name=`InvalidPhoneError`,this.details=t}},rt=class extends Error{constructor(e){super(e),this.name=`ServiceError`}},it=`c43204c2a5e320e5600d73ce305b6f0d`;async function at(e){let t=`https://apilayer.net/api/validate?access_key=${it}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Network error: ${e.status}`);let n=await e.json();if(!n.valid)throw new nt(`The number is not valid or does not exist.`,n);return n}catch(e){throw e instanceof nt||e instanceof rt?e:new rt(`Could not connect to the validation service. Try again later.`)}}function ot(e){return`
    <form id="edit-client-form">
      <label>Name:</label>
      <input type="text" id="edit-client-name" value="${o(e.name)}" required />
      <div class="field-error" id="error-edit-client-name"></div>
      <label>Phone:</label>
      <input type="tel" id="edit-client-phone" value="${o(e.phone)}" required />
      <div class="field-error" id="error-edit-client-phone"></div>
      <button type="submit">Save Changes</button>
    </form>
  `}function st(e,t,n){return`
    <form id="new-service-form">
      <label>Service type:</label>
      <select id="service-type" required>
        <option value="">Select...</option>
        <option value="corte">Cut</option>
        <option value="tinte">Color</option>
        <option value="tratamiento">Treatment</option>
        <option value="peinado">Styling</option>
        <option value="otros">Other</option>
      </select>
      <div class="field-error" id="error-service-type"></div>
      <label>Date:</label>
      <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
      <div class="field-error" id="error-service-date"></div>
      <label>Notes:</label>
      <textarea id="service-notes" rows="3"></textarea>
      <div class="image-preview-grid">
        <div><small>Before</small><img src="${o(e)}" id="preview-before" /></div>
        <div><small>After front</small><img src="${o(t)}" id="preview-after-frontal" /></div>
        <div><small>After side</small><img src="${o(n)}" id="preview-after-lateral" /></div>
      </div>
      <button type="button" id="btn-regenerate-images">Generate other images</button>
      <button type="submit">Save Service</button>
    </form>
  `}function ct(e){let t={corte:`Cut`,tinte:`Color`,tratamiento:`Treatment`,peinado:`Styling`,otros:`Other`};return`
    <form id="edit-service-form">
      <label>Type:</label>
      <select id="edit-service-type" required>${[`corte`,`tinte`,`tratamiento`,`peinado`,`otros`].map(n=>`<option value="${n}" ${e.type===n?`selected`:``}>${t[n]}</option>`).join(``)}</select>
      <div class="field-error" id="error-edit-service-type"></div>
      <label>Date:</label>
      <input type="date" id="edit-service-date" value="${o(e.date)}" required />
      <div class="field-error" id="error-edit-service-date"></div>
      <label>Notes:</label>
      <textarea id="edit-service-notes" rows="3">${o(e.notes)}</textarea>
      <button type="submit">Save Changes</button>
    </form>
  `}function F(e,t){return!e||!e.trim()?`${t} is required.`:null}function lt(e){return/^\+?[1-9]\d{6,14}$/.test(e.trim())?null:`Invalid phone format. e.g. +541112345678`}function ut(e){let t=new Date(e),n=new Date;return n.setHours(0,0,0,0),t>n?`Date cannot be in the future.`:null}function dt(e,t){let n={},r=F(e,`Name`);r&&(n.name=r);let i=F(t,`Phone`)||lt(t);return i&&(n.phone=i),n}function ft(e,t,n){let r={};e||(r.type=`Service type is required.`);let i=F(t,`Date`)||ut(t);return i&&(r.date=i),r}function pt(e){return e?null:`Select a professional type.`}function mt(e){return e?null:`Select a modality.`}function ht(e){return!e||!e.trim()?`Business name is required.`:null}function gt(e){return!e||!e.trim()?`Address is required.`:null}function _t(e){return!e||!e.trim()?`Company name is required.`:null}var I=null;function L(e){I=e}var R=null;function vt(){R||(R=document.createElement(`div`),R.className=`lightbox-overlay hidden`,R.innerHTML=`
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
    <img class="lightbox-img" src="" alt="" />
    <button class="lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
  `,document.body.appendChild(R),R.querySelector(`.lightbox-close`).addEventListener(`click`,V),R.querySelector(`.lightbox-prev`).addEventListener(`click`,bt),R.querySelector(`.lightbox-next`).addEventListener(`click`,xt),R.addEventListener(`click`,e=>{e.target===R&&V()}),document.addEventListener(`keydown`,St))}var z=[],B=0;function yt(e,t=0){vt(),z=e,B=t,H(),R.classList.remove(`hidden`),document.body.style.overflow=`hidden`,R.querySelector(`.lightbox-close`).focus()}function V(){R.classList.add(`hidden`),document.body.style.overflow=``,z=[],B=0}function H(){let e=R.querySelector(`.lightbox-img`);z.length>0&&B>=0&&B<z.length&&(e.src=z[B],e.alt=`Image ${B+1} of ${z.length}`)}function bt(){z.length!==0&&(B=(B-1+z.length)%z.length,H())}function xt(){z.length!==0&&(B=(B+1)%z.length,H())}function St(e){R.classList.contains(`hidden`)||(e.key===`Escape`?V():e.key===`ArrowLeft`?bt():e.key===`ArrowRight`&&xt())}var U=null;function W(e,t){let n=document.getElementById(`modal-overlay`),r=document.getElementById(`modal-body`),i=document.getElementById(`modal-close`);r.innerHTML=`<h3 id="modal-title">${o(e)}</h3>${t}`,n.classList.remove(`hidden`),n.setAttribute(`aria-hidden`,`false`),document.body.style.overflow=`hidden`,U=document.activeElement,i.focus(),Ct(n)}function G(){let e=document.getElementById(`modal-overlay`);e.classList.add(`hidden`),e.setAttribute(`aria-hidden`,`true`),document.body.style.overflow=``,U&&=(U.focus(),null)}function Ct(e){let t=e.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`),n=t[0],r=t[t.length-1];function i(t){if(t.key===`Escape`){G(),e.removeEventListener(`keydown`,i);return}t.key===`Tab`&&(t.shiftKey?document.activeElement===n&&(t.preventDefault(),r.focus()):document.activeElement===r&&(t.preventDefault(),n.focus()))}e.addEventListener(`keydown`,i)}function wt(e){return new Promise(t=>{let n=`
      <p>${o(e)}</p>
      <div class="confirm-actions">
        <button id="confirm-yes" class="confirm-btn confirm-yes">${y(`yes`)}</button>
        <button id="confirm-no" class="confirm-btn confirm-no">${y(`cancel`)}</button>
      </div>
    `;W(y(`confirmTitle`),n),document.getElementById(`confirm-yes`).addEventListener(`click`,()=>{G(),t(!0)}),document.getElementById(`confirm-no`).addEventListener(`click`,()=>{G(),t(!1)})})}function Tt(){document.addEventListener(`click`,e=>{let t=e.target.closest(`.image-item img`);if(!t)return;let n=t.closest(`.image-item`);if(!n)return;let r=n.closest(`.image-pair, .service-images-grid`);if(!r)return;let i=r.getAttribute(`data-images`);if(i)try{let e=JSON.parse(i);if(e.length===0)return;yt(e,parseInt(n.getAttribute(`data-index`),10)||0)}catch{}})}var K,q=`all`,J;async function Et(e){document.body.classList.add(`dashboard-mode`),e.innerHTML=`
    <!-- Drawer overlay (mobile) -->
    <div class="drawer-overlay" id="drawer-overlay"></div>

    <!-- Sidebar -->
    <aside class="dashboard-sidebar" id="dashboard-sidebar">
      <div class="sidebar-brand">
        <h1 class="sidebar-logo">StyleRecord Lite</h1>
        <p class="sidebar-subtitle">Beauty Management</p>
      </div>

      <button class="btn-new-client" id="btn-new-client">
        <span class="material-symbols-outlined">person_add</span>
        New Client
      </button>

      <nav class="sidebar-nav">
        <div class="sidebar-section-label">Dashboard</div>
        <a class="sidebar-nav-item active" href="#" data-filter="all" id="nav-clientes">
          <span class="material-symbols-outlined">group</span>
          <span>Clients</span>
        </a>
        <a class="sidebar-nav-item" href="#" data-filter="withServices" id="nav-servicios">
          <span class="material-symbols-outlined">content_cut</span>
          <span>Services</span>
        </a>

        <div class="sidebar-section-label">Recent Clients</div>
        <div class="sidebar-client-list" id="sidebar-client-list"></div>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">
            <span class="material-symbols-outlined">person</span>
          </div>
          <span class="sidebar-user-name">Staff #04</span>
        </div>
        <button class="sidebar-logout" id="btn-logout-dash" title="Log out">
          <span class="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="dashboard-main">
      <!-- Header -->
      <header class="dashboard-header">
        <button class="btn-hamburger" id="btn-hamburger" aria-label="Menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <!-- 🔹 Desktop: home button -->
        <button class="btn-home-desktop" id="btn-home-desktop" title="Back to home" aria-label="Home">
          <span class="material-symbols-outlined">dashboard</span>
        </button>
        <div class="dashboard-search">
          <span class="material-symbols-outlined">search</span>
          <input type="text" id="dashboard-search" placeholder="Search client..." autocomplete="off" />
          <!-- 🔹 Suggestions dropdown -->
          <ul id="search-dropdown" class="search-dropdown hidden"></ul>
        </div>
        <div class="dashboard-header-actions">
          <button class="header-icon-btn" id="btn-notifications" aria-label="Notifications">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="header-icon-btn" id="btn-settings" aria-label="Settings">
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

    <!-- 🔹 NEW (mobile): Floating button to go back to home -->
    <button class="fab-home-mobile" id="fab-home-mobile" title="Back to home" aria-label="Home">
      <span class="material-symbols-outlined">home</span>
    </button>

    <!-- FAB (always visible on mobile, contextual action) -->
    <button class="fab" id="fab-add-service" title="New client or service">
      <span class="material-symbols-outlined">add</span>
    </button>

    <!-- Bottom Navigation (mobile only) -->
    <nav class="bottom-nav" id="bottom-nav">
      <button class="bottom-nav-btn active" data-nav="dashboard">
        <span class="material-symbols-outlined">dashboard</span>
        <span>Home</span>
      </button>
      <button class="bottom-nav-btn" data-nav="clients">
        <span class="material-symbols-outlined">group</span>
        <span>Clients</span>
      </button>
      <button class="bottom-nav-btn" data-nav="services">
        <span class="material-symbols-outlined">content_cut</span>
        <span>Services</span>
      </button>
      <button class="bottom-nav-btn" data-nav="config">
        <span class="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </button>
    </nav>
  `;let t=document.getElementById(`dashboard-sidebar`),n=document.getElementById(`drawer-overlay`),r=document.getElementById(`btn-hamburger`);function i(){t.classList.add(`open`),n.classList.add(`open`)}function a(){t.classList.remove(`open`),n.classList.remove(`open`)}r.addEventListener(`click`,i),n.addEventListener(`click`,a),document.getElementById(`btn-logout-dash`).addEventListener(`click`,()=>{document.body.classList.remove(`dashboard-mode`),h(),window.location.hash=`/home`,window.location.reload()});let o=document.getElementById(`nav-clientes`),c=document.getElementById(`nav-servicios`);function l(e){o.classList.toggle(`active`,e===`all`),c.classList.toggle(`active`,e===`withServices`)}o.addEventListener(`click`,e=>{e.preventDefault(),q=`all`,l(`all`),K(document.getElementById(`dashboard-search`).value)}),c.addEventListener(`click`,e=>{e.preventDefault(),q=`withServices`,l(`withServices`),K(document.getElementById(`dashboard-search`).value)}),document.getElementById(`btn-settings`).addEventListener(`click`,()=>{A(`Settings coming soon`,`info`)}),document.getElementById(`btn-notifications`).addEventListener(`click`,()=>{A(`No new notifications`,`info`)});let u=await O(),d=document.getElementById(`sidebar-client-list`),f=document.getElementById(`main-content-area`),p=document.getElementById(`dashboard-search`),m=document.getElementById(`search-dropdown`);J=async()=>{L(null),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),await Ot(f,await O())},K=async(e=``)=>{let t=await O(),n=e?t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())||t.phone.includes(e)):t;q===`withServices`&&(n=n.filter(e=>e.services&&e.services.length>0)),kt(d,n),Dt(n,e)},kt(d,u),d.addEventListener(`click`,async e=>{let t=e.target.closest(`.sidebar-client-item`);if(!t)return;let n=t.dataset.id;L(n),document.querySelectorAll(`.sidebar-client-item`).forEach(e=>e.classList.remove(`selected`)),t.classList.add(`selected`),await Y(n,f),a(),m.classList.add(`hidden`),p.value=``}),document.getElementById(`btn-home-desktop`).addEventListener(`click`,()=>{J(),p.value=``,m.classList.add(`hidden`)}),document.getElementById(`fab-home-mobile`).addEventListener(`click`,()=>{J(),p.value=``,m.classList.add(`hidden`),a()}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>{a(),Mt()}),p.addEventListener(`input`,s(async e=>{let t=e.target.value;await K(t)},300)),document.addEventListener(`click`,e=>{e.target.closest(`.dashboard-search`)||m.classList.add(`hidden`)}),p.addEventListener(`focus`,()=>{p.value.trim()&&m.classList.remove(`hidden`)}),document.getElementById(`fab-add-service`).addEventListener(`click`,()=>{I?Pt():Mt()}),document.querySelectorAll(`.bottom-nav-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.bottom-nav-btn`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=e.dataset.nav;t===`dashboard`?J():t===`clients`?(q=`all`,l(`all`),K(p.value),i()):t===`services`?(q=`withServices`,l(`withServices`),K(p.value),i()):t===`config`&&A(`Settings coming soon`,`info`)})}),Ot(f,u)}function Dt(e,t){let n=document.getElementById(`search-dropdown`);if(n){if(!t||e.length===0){n.classList.add(`hidden`);return}n.innerHTML=e.slice(0,6).map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2),n=e.services?.length?e.services.reduce((e,t)=>new Date(t.date)>new Date(e.date)?t:e):null,r=n?`${jt(n.date)} · ${o(n.type)}`:`No services`;return`
      <li class="search-dropdown-item" data-client-id="${o(e.id)}">
        <div class="client-avatar-circle">${t}</div>
        <div class="client-item-info">
          <p class="client-item-name">${o(e.name)}</p>
          <p class="client-item-time">${r}</p>
        </div>
      </li>
    `}).join(``),n.classList.remove(`hidden`),n.querySelectorAll(`.search-dropdown-item`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.dataset.clientId;L(t),await Y(t,document.getElementById(`main-content-area`)),n.classList.add(`hidden`),document.getElementById(`dashboard-search`).value=``,document.getElementById(`dashboard-sidebar`).classList.remove(`open`),document.getElementById(`drawer-overlay`).classList.remove(`open`)})})}}function Ot(e,t){e.innerHTML=`
    <div class="empty-dashboard">
      <span class="material-symbols-outlined">content_cut</span>
      <h3>Start your day</h3>
      <p>Select a client to view their history and manage their services today.</p>
    </div>
    ${t.length>0?`
      <section class="recent-clients-section">
        <h3 class="recent-clients-title">Recent Clients</h3>
        <div class="recent-clients-list">
          ${t.slice(0,5).map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2),n=e.services?.length?e.services.reduce((e,t)=>new Date(t.date)>new Date(e.date)?t:e):null,r=n?`${jt(n.date)} · ${o(n.type)}`:`No services`;return`
              <button class="recent-client-card" data-client-id="${o(e.id)}">
                <div class="recent-client-info">
                  <div class="recent-client-avatar">${t}</div>
                  <div>
                    <div class="recent-client-name">${o(e.name)}</div>
                    <div class="recent-client-meta">${r}</div>
                  </div>
                </div>
                <span class="material-symbols-outlined recent-client-chevron">chevron_right</span>
              </button>
            `}).join(``)}
        </div>
      </section>`:``}
  `,e.querySelectorAll(`.recent-client-card`).forEach(t=>{t.addEventListener(`click`,async()=>{let n=t.dataset.clientId;L(n),await Y(n,e)})})}function kt(e,t){if(t.length===0){e.innerHTML=`<p class="sidebar-empty">No clients</p>`;return}e.innerHTML=t.map(e=>{let t=e.name.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2),n=e.services?.length?e.services.reduce((e,t)=>new Date(t.date)>new Date(e.date)?t:e):null,r=n?jt(n.date):`No services`;return`
      <button class="sidebar-client-item" data-id="${o(e.id)}">
        <div class="client-avatar-circle">${t}</div>
        <div class="client-item-info">
          <p class="client-item-name">${o(e.name)}</p>
          <p class="client-item-time">${r}</p>
        </div>
      </button>
    `}).join(``)}async function Y(e,t){let n=await We(e);if(!n){t.innerHTML=`<p>Client not found.</p>`;return}let r=await P(e),i=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date));t.innerHTML=`
    <!-- Client Header -->
    <div class="client-detail-header">
      <!-- 🔹 Button to go back to home (also on mobile) -->
      <button class="btn-back-dashboard" id="btn-back-dashboard" title="Back to home">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
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
            ${r.length} services completed
          </span>
        </div>
      </div>
      <div class="client-detail-actions">
        <button class="btn-toggle-services" id="btn-toggle-services">
          <span class="material-symbols-outlined">visibility_off</span>
          <span>Hide services</span>
        </button>
        <button class="btn-edit-profile" id="btn-edit-profile">
          <span class="material-symbols-outlined">edit</span>
          Edit Profile
        </button>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="services-grid" id="services-grid">
      ${i.length===0?`
        <div class="empty-services">
          <span class="material-symbols-outlined">content_cut</span>
          <p>No services registered</p>
        </div>
      `:i.map(e=>At(e)).join(``)}
      
      <button class="add-service-card-dash" id="add-service-area">
        <div class="add-service-icon">
          <span class="material-symbols-outlined">add</span>
        </div>
        <div class="add-service-text">
          <h3>Add new service</h3>
          <p>Register a new procedure for this client</p>
        </div>
      </button>
    </div>

    <footer class="dashboard-footer">
      <p>© 2026 StyleRecord Lite - Professional Beauty Management</p>
    </footer>
  `,document.getElementById(`btn-back-dashboard`).addEventListener(`click`,()=>{J&&J()});let a=document.getElementById(`btn-toggle-services`),s=document.getElementById(`services-grid`),c=!0;a.addEventListener(`click`,()=>{c=!c,s.style.display=c?``:`none`,a.querySelector(`span:last-child`).textContent=c?`Hide services`:`Show services`,a.querySelector(`.material-symbols-outlined`).textContent=c?`visibility_off`:`visibility`}),document.getElementById(`btn-edit-profile`).addEventListener(`click`,()=>Nt(n)),document.getElementById(`add-service-area`).addEventListener(`click`,()=>Pt()),t.querySelectorAll(`.btn-edit-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),Ft(e.dataset.id)})}),t.querySelectorAll(`.btn-delete-service-dash`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation(),It(e.dataset.id)})})}function At(e){let t=[];e.beforeImg&&t.push(e.beforeImg),e.afterImg&&t.push(e.afterImg),e.afterLateralImg&&t.push(e.afterLateralImg);let n=o(JSON.stringify(t)),r=t.indexOf(e.beforeImg),i=t.indexOf(e.afterImg),a=t.indexOf(e.afterLateralImg),s=new Date(e.date),c=s.getDate(),l=s.toLocaleString(`en-US`,{month:`short`}),u=s.getFullYear();return`
    <div class="service-card-dashboard" data-service-id="${o(e.id)}">
      <div class="service-card-header">
        <div class="service-date-badge">
          <span class="service-day">${c}</span>
          <span class="service-month-year">${l} ${u}</span>
        </div>
        <div class="service-info">
          <span class="service-type-pill">${o(e.type)}</span>
          <p class="service-stylist">Performed by: Staff</p>
        </div>
        <div class="service-card-actions">
          <button class="btn-icon-service btn-edit-service-dash" data-id="${o(e.id)}" title="Edit">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button class="btn-icon-service btn-delete-service-dash" data-id="${o(e.id)}" title="Delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="service-card-body">
        <div class="service-images-grid" data-images='${n}'>
          <div class="image-card image-item" data-index="${r>=0?r:0}">
            ${e.beforeImg?`<img src="${o(e.beforeImg)}" alt="Before" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">BEFORE</span>
          </div>
          <div class="image-card image-item" data-index="${i>=0?i:0}">
            ${e.afterImg?`<img src="${o(e.afterImg)}" alt="After front" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">AFTER FRONT</span>
          </div>
          <div class="image-card image-item" data-index="${a>=0?a:0}">
            ${e.afterLateralImg?`<img src="${o(e.afterLateralImg)}" alt="After side" loading="lazy" />`:`<div class="image-placeholder"><span class="material-symbols-outlined">photo</span></div>`}
            <span class="image-label">AFTER SIDE</span>
          </div>
        </div>
        ${e.notes?`
        <div class="service-notes">
          <h4 class="service-notes-title">Service Notes</h4>
          <p>${o(e.notes)}</p>
        </div>`:``}
      </div>
    </div>
  `}function jt(e){let t=new Date,n=new Date(e),r=t-n,i=Math.floor(r/6e4);if(i<60)return`${i} minutes ago`;let a=Math.floor(i/60);if(a<24)return`${a} hours ago`;let o=Math.floor(a/24);return o===1?`Yesterday`:o<7?`${o} days ago`:n.toLocaleDateString(`en-US`)}async function Mt(){W(`New Client`,`
    <form id="new-client-form">
      <label>Full name:</label>
      <input type="text" id="client-name" placeholder="Full name" required />
      <div class="field-error" id="error-client-name"></div>
      <label>Country:</label>
      <select id="client-country" required style="width:100%; margin-bottom:0.8rem;">
        ${qe.map(e=>`<option value="${e.dialCode}" ${e.code===`PE`?`selected`:``}>${e.flag} ${e.name} (${e.dialCode})</option>`).join(``)}
      </select>
      <label>Phone number (without prefix):</label>
      <input type="tel" id="client-phone" placeholder="987654321" required />
      <div class="field-error" id="error-client-phone"></div>
      <div id="validation-area"></div>
      <button type="submit" id="validate-btn">Validate and Save</button>
    </form>
  `),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-country`).value,r=Je(n,document.getElementById(`client-phone`).value.trim()),i=dt(t,r);if(X(`client`,i),Object.keys(i).length>0)return;let a=document.getElementById(`validate-btn`),s=document.getElementById(`validation-area`);if((await O()).find(e=>e.phone===r)){s.innerHTML=`<div class="validation-error">The phone number is already registered.</div>`;return}a.disabled=!0,a.innerHTML=`<span class="spinner"></span> Validating...`,s.innerHTML=``;try{let e=await at(r);s.innerHTML=`
        <div class="validation-result">
          <span class="material-symbols-outlined" style="color:green;">check_circle</span> Valid number<br>
          <strong>${o(e.number)}</strong><br>
          Country: ${o(e.country_name)} (${o(e.country_code)})<br>
          Carrier: ${o(e.carrier)}
        </div>`,await Ge({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:r,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),G(),await K(),M(`Client created successfully`)}catch(e){e.name===`InvalidPhoneError`?(s.innerHTML=`
          <div class="validation-error">The number is not valid.</div>
          <label><input type="checkbox" id="manual-save"> Save anyway</label>
          <button type="button" id="force-save-btn">Save manually</button>`,document.getElementById(`force-save-btn`).addEventListener(`click`,async()=>{await Ge({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:r,phoneValid:!1,phoneDetails:null,services:[]}),G(),await K()})):s.innerHTML=`<div class="validation-error">${o(e.message)}</div>`}finally{a.disabled=!1,a.innerHTML=`Validate and Save`}})}async function Nt(e){W(`Edit Client`,ot(e)),document.getElementById(`edit-client-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-client-name`).value.trim(),r=document.getElementById(`edit-client-phone`).value.trim(),i=dt(n,r);if(X(`edit-client`,i),Object.keys(i).length>0)return;await Ke(e.id,{name:n,phone:r}),G(),await K();let a=document.getElementById(`main-content-area`);I===e.id&&await Y(e.id,a),M(`Client updated`)})}async function Pt(){if(!I){j(`Select a client first.`);return}let e=Ye();W(`Add Service`,st(e.beforeImg,e.afterImg,e.afterLateralImg));let t=document.getElementById(`new-service-form`),n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=Ye();n=e.beforeImg,r=e.afterImg,i=e.afterLateralImg,document.getElementById(`preview-before`).src=n,document.getElementById(`preview-after-frontal`).src=r,document.getElementById(`preview-after-lateral`).src=i}),t.addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,a=document.getElementById(`service-date`).value,o=document.getElementById(`service-notes`).value.trim(),s=ft(t,a,o);X(`service`,s),!(Object.keys(s).length>0)&&(await $e(I,{id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:I,date:a,type:t,notes:o,beforeImg:n,afterImg:r,afterLateralImg:i}),G(),await Y(I,document.getElementById(`main-content-area`)),M(`Service added`))})}async function Ft(e){let t=(await P(I)).find(t=>t.id===e);t&&(W(`Edit Service`,ct(t)),document.getElementById(`edit-service-form`).addEventListener(`submit`,async t=>{t.preventDefault();let n=document.getElementById(`edit-service-type`).value,r=document.getElementById(`edit-service-date`).value,i=document.getElementById(`edit-service-notes`).value.trim(),a=ft(n,r,i);X(`edit-service`,a),!(Object.keys(a).length>0)&&(await et(I,e,{type:n,date:r,notes:i}),G(),await Y(I,document.getElementById(`main-content-area`)),M(`Service updated`))}))}async function It(e){await wt(`Delete this service?`)&&(await tt(I,e),await Y(I,document.getElementById(`main-content-area`)),M(`Service deleted`))}function X(e,t){[`name`,`phone`,`type`,`date`].forEach(n=>{let r=document.getElementById(`error-${e}-${n}`);r&&(r.textContent=t[n]||``)})}async function Lt(e){let t=localStorage.getItem(`sr-client-phone`);if(!t){e.innerHTML=`<p class="login-support">Client session not found.</p>`;return}let n=await Ue(t);if(!n){e.innerHTML=`<p class="login-support">Client profile not found.</p>`;return}let r=await P(n.id),i=[...r].sort((e,t)=>new Date(t.date)-new Date(e.date)),a=r.length,s=r.length>0?new Date(i[i.length-1].date).getFullYear():new Date().getFullYear(),c=re(n.id),l=`${window.location.origin}${window.location.pathname}?token=${c}`;e.innerHTML=`
    <section class="client-panel">
      <!-- Panel header -->
      <div class="client-panel-header">
        <div>
          <h1 class="client-panel-title">My Service History</h1>
          <p class="client-panel-subtitle">Welcome back, a detailed record of your aesthetic evolution.</p>
        </div>
        <button class="btn-logout-client" id="btn-client-logout">
          <span class="material-symbols-outlined">logout</span>
          Log out
        </button>
      </div>

      <!-- 2-column layout -->
      <div class="client-layout">
        <!-- Main column: service list -->
        <div class="client-services-col">
          <div class="timeline-line"></div>
          ${i.length===0?`
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>You have no services registered yet</h3>
              <p>Your history will appear here when your professional logs services.</p>
            </div>
          `:i.map(e=>Rt(e)).join(``)}
        </div>

        <!-- Sidebar column: profile + actions -->
        <div class="client-sidebar-col">
          <!-- Client profile -->
          <div class="client-profile-card">
            <div class="client-profile-avatar">
              ${zt(n.name)}
            </div>
            <div class="client-profile-info">
              <h2 class="client-profile-name">${o(n.name)}</h2>
              <span class="client-profile-badge">Elite Client</span>
            </div>
            <hr class="profile-divider" />
            <div class="client-stats">
              <div class="stat-item">
                <span class="stat-label">Member since</span>
                <span class="stat-value">${s}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Services</span>
                <span class="stat-value">${a}</span>
              </div>
            </div>
          </div>

          <!-- Next appointment (placeholder) -->
          <div class="next-appointment-card">
            <div class="appointment-header">
              <span class="material-symbols-outlined">calendar_today</span>
              <h4>Next Appointment</h4>
            </div>
            <p class="appointment-date">Not scheduled</p>
            <p class="appointment-service">Request an appointment with your professional</p>
            <button class="btn-appointment" disabled>Reschedule</button>
          </div>

          <!-- Share profile -->
          <div class="share-profile-card">
            <div class="share-header">
              <span class="material-symbols-outlined">ios_share</span>
              <h4>Share Progress</h4>
            </div>
            <p>Want to show your progress to your stylist or friends? Share your profile securely.</p>
            <button class="btn-share-profile" id="btn-share-profile">
              <span class="material-symbols-outlined">share</span>
              Share Profile
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
      <img class="lightbox-image" id="lightbox-image" src="" alt="Enlarged view" />
    </div>
  `,document.getElementById(`btn-client-logout`).addEventListener(`click`,()=>{h(),window.location.hash=`/home`}),document.getElementById(`btn-share-profile`).addEventListener(`click`,()=>{navigator.clipboard.writeText(l).then(()=>{A(`Profile link copied to clipboard!`,`success`)}).catch(()=>{A(`Could not copy link`,`error`)})});let u=document.getElementById(`lightbox-overlay`),d=document.getElementById(`lightbox-image`),f=document.getElementById(`lightbox-close`);e.querySelectorAll(`.service-image-clickable`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.querySelector(`img`)?.src;t&&(d.src=t,u.classList.remove(`hidden`),document.body.style.overflow=`hidden`)})}),f.addEventListener(`click`,p),u.addEventListener(`click`,e=>{e.target===u&&p()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!u.classList.contains(`hidden`)&&p()});function p(){u.classList.add(`hidden`),document.body.style.overflow=``}}function Rt(e){let t=new Date(e.date).toLocaleDateString(`en-US`,{day:`numeric`,month:`long`,year:`numeric`}),n=[];e.beforeImg&&n.push({src:e.beforeImg,label:`BEFORE`}),e.afterImg&&n.push({src:e.afterImg,label:`AFTER`}),e.afterLateralImg&&n.push({src:e.afterLateralImg,label:`SIDE`});let r=n.length>0?`
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
          <p class="notes-title">Professional's Notes</p>
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
        <span class="service-status-badge">Completed</span>
      </div>
      <h3 class="service-type-title">${o(e.type)}</h3>
      ${r}
      ${i}
    </div>
  `}function zt(e){return e.split(` `).map(e=>e[0]).join(``).toUpperCase().substring(0,2)}async function Bt(e,t){let n=ie(t);if(!n){e.innerHTML=`
      <section class="shared-error">
        <div class="shared-error-card">
          <span class="material-symbols-outlined">link_off</span>
          <h2>Expired or invalid link</h2>
          <p>This link has expired (24 hours) or is not correct. Ask your professional for a new link.</p>
          <a href="/" class="btn-primary-hero">Back to home</a>
        </div>
      </section>`;return}let r=await We(n);if(!r){e.innerHTML=`<p>Profile not found.</p>`;return}let i=await P(n),a=[...i].sort((e,t)=>new Date(t.date)-new Date(e.date)),s=i.length,c=a.length>0?a[0]:null;e.innerHTML=`
    <!-- Expiration banner -->
    <div class="expiration-banner">
      <span class="material-symbols-outlined">schedule</span>
      <span class="expiration-text">Temporary view – This link will expire</span>
      <span class="expiration-countdown" id="expiration-countdown">--:--:--</span>
    </div>

    <section class="shared-panel">
      <!-- Profile header -->
      <div class="shared-header">
        <div class="shared-header-info">
          <h1 class="shared-title">History of <span class="text-primary">${o(r.name)}</span></h1>
          <p class="shared-subtitle">
            Detailed record of aesthetic treatments and service evolution performed at our salon.
          </p>
        </div>
        <button class="btn-outline-shared" id="btn-download-pdf" disabled>
          <span class="material-symbols-outlined">download</span>
          Download PDF
        </button>
      </div>

      <!-- Main layout -->
      <div class="shared-layout">
        <!-- Sidebar: summary -->
        <aside class="shared-sidebar">
          <div class="summary-card">
            <h3 class="summary-title">Client Summary</h3>
            <div class="summary-row">
              <span>Last Visit</span>
              <span class="font-semibold">${c?Ht(c.date):`—`}</span>
            </div>
            <div class="summary-row">
              <span>Total Services</span>
              <span class="font-semibold">${s} sessions</span>
            </div>
            <div class="summary-row">
              <span>Preference</span>
              <span class="font-semibold text-tertiary">Organic Dyes</span>
            </div>
          </div>
          <div class="decorative-image-card">
            <img src="https://picsum.photos/seed/salon/600/400" alt="Professional salon" loading="lazy" />
            <div class="decorative-overlay">
              <p class="font-headline-md">Your Style, Your Record</p>
              <p class="font-body-sm">Secure access to your beauty history.</p>
            </div>
          </div>
        </aside>

        <!-- Service list -->
        <div class="shared-services-list">
          ${a.length===0?`
            <div class="empty-services">
              <span class="material-symbols-outlined">history</span>
              <h3>No services registered</h3>
            </div>
          `:a.map(e=>Vt(e)).join(``)}
        </div>
      </div>
    </section>
  `,Ut(),document.querySelectorAll(`.shared-service-card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>e.classList.add(`elevated`)),e.addEventListener(`mouseleave`,()=>e.classList.remove(`elevated`))})}function Vt(e){let t=new Date(e.date);return`
    <div class="shared-service-card">
      <div class="service-date-block">
        <span class="service-day-number">${t.getDate()}</span>
        <span class="service-month-label">${t.toLocaleString(`en-US`,{month:`short`})} ${t.getFullYear()}</span>
      </div>
      <div class="service-content">
        <div class="service-header-row">
          <h4 class="service-name">${o(e.type)}</h4>
          <span class="service-status">Completed</span>
        </div>
        <p class="service-description">${o(e.notes||`No additional notes.`)}</p>
        ${e.beforeImg||e.afterImg?`
        <div class="service-tags">
          ${e.beforeImg?`<span class="service-tag"><span class="material-symbols-outlined">photo_camera</span> Before</span>`:``}
          ${e.afterImg?`<span class="service-tag"><span class="material-symbols-outlined">checkroom</span> After</span>`:``}
        </div>`:``}
      </div>
    </div>
  `}function Ht(e){return new Date(e).toLocaleDateString(`en-US`,{day:`numeric`,month:`short`,year:`numeric`})}function Ut(){let e=document.getElementById(`expiration-countdown`);if(!e)return;function t(){let t=new Date,n=new Date(t);n.setHours(23,59,59,999);let r=n-t;if(r<=0){e.textContent=`Expired`;return}e.textContent=`${Math.floor(r/36e5).toString().padStart(2,`0`)}:${Math.floor(r%36e5/6e4).toString().padStart(2,`0`)}:${Math.floor(r%6e4/1e3).toString().padStart(2,`0`)}`}t(),setInterval(t,1e3)}var Wt=`modulepreload`,Gt=function(e){return`/StyleRecordLite/`+e},Kt={},qt=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=Gt(t,n),t in Kt)return;Kt[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:Wt,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Z=0,Q={type:``,modality:``,businessName:``,address:``,workFromHome:!1,companyId:``,companyName:``,requestLink:!1};function Jt(e){Z=0,Object.keys(Q).forEach(e=>{Q[e]=Q[e]===!1?!1:``}),Q.workFromHome=!1,Q.requestLink=!1,$(e)}function $(e){let t=(Z+1)/3*100;N(800,200,`salon`),e.innerHTML=`
    <section class="register-view-container fade-in">
      <!-- Stepper -->
      <div class="stepper">
        <div class="stepper-track">
          <div class="stepper-progress" style="width: ${t}%"></div>
        </div>
        <div class="stepper-steps">
          <div class="stepper-step ${Z>=0?`active`:``} ${Z>0?`completed`:``}">
            <div class="step-circle">1</div>
            <span class="step-label ${Z>=0?`active`:``}">Profile</span>
          </div>
          <div class="stepper-line ${Z>=1?`active`:``}"></div>
          <div class="stepper-step ${Z>=1?`active`:``} ${Z>1?`completed`:``}">
            <div class="step-circle">2</div>
            <span class="step-label ${Z>=1?`active`:``}">Portfolio</span>
          </div>
          <div class="stepper-line ${Z>=2?`active`:``}"></div>
          <div class="stepper-step ${Z>=2?`active`:``}">
            <div class="step-circle">3</div>
            <span class="step-label ${Z>=2?`active`:``}">Verification</span>
          </div>
        </div>
      </div>

      <!-- Form card -->
      <div class="register-card">
        <div class="register-card-header">
          <h1 class="register-card-title">${Yt(Z)}</h1>
          <p class="register-card-subtitle">${Xt(Z)}</p>
        </div>

        <div class="register-card-body">
          ${Zt(Z)}
        </div>
      </div>

      <!-- Trust badges -->
      <div class="register-trust">
        <div class="trust-item">
          <span class="material-symbols-outlined">lock</span>
          <span>Encrypted data</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <span class="material-symbols-outlined">verified</span>
          <span>Certified Platform</span>
        </div>
      </div>
    </section>
  `;let n=document.getElementById(`btn-cancel`);if(n&&n.addEventListener(`click`,()=>{window.location.hash=`/rol`}),Z>0){let t=document.getElementById(`btn-prev`);t&&t.addEventListener(`click`,()=>{Z--,$(e)})}let r=document.getElementById(`btn-next`);r&&r.addEventListener(`click`,()=>tn(e)),Z===0&&on(),Z===1&&sn()}function Yt(e){switch(e){case 0:return`Professional Information`;case 1:return`Business Details`;case 2:return`Registration Summary`;default:return``}}function Xt(e){switch(e){case 0:return`Complete your specialty details to start managing your schedule with StyleRecord Lite.`;case 1:return Q.modality===`independent`?`Set up your independent activity details.`:`Link your profile with the company you work for.`;case 2:return`Review all the information before finalizing.`;default:return``}}function Zt(e){switch(e){case 0:return Qt();case 1:return $t();case 2:return en();default:return``}}function Qt(){return`
    <form id="step0-form" class="register-form">
      <div class="form-group">
        <label class="form-label" for="prof-type">Professional type</label>
        <div class="select-wrapper-register">
          <select id="prof-type" class="form-select" required>
            <option value="" disabled ${Q.type?``:`selected`}>Select your specialty</option>
            <option value="barbero" ${Q.type===`barbero`?`selected`:``}>Barber</option>
            <option value="estilista" ${Q.type===`estilista`?`selected`:``}>Stylist</option>
            <option value="lashista" ${Q.type===`lashista`?`selected`:``}>Lash Artist</option>
            <option value="colorista" ${Q.type===`colorista`?`selected`:``}>Colorist</option>
            <option value="otros" ${Q.type===`otros`?`selected`:``}>Other</option>
          </select>
          <span class="material-symbols-outlined select-icon">expand_more</span>
        </div>
        <div class="field-error" id="error-type"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Work modality</label>
        <div class="radio-cards">
          <label class="radio-card ${Q.modality===`independent`?`selected`:``}">
            <input type="radio" name="modality" value="independent" ${Q.modality===`independent`?`checked`:``} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">person_pin</span>
            <span class="radio-title">Independent</span>
            <span class="radio-desc">You work on your own or at clients' homes.</span>
          </label>
          <label class="radio-card ${Q.modality===`employed`?`selected`:``}">
            <input type="radio" name="modality" value="employed" ${Q.modality===`employed`?`checked`:``} class="radio-input" />
            <span class="material-symbols-outlined radio-icon">store</span>
            <span class="radio-title">Employee</span>
            <span class="radio-desc">You are part of a salon or clinic team.</span>
          </label>
        </div>
        <div class="field-error" id="error-modality"></div>
      </div>

      <div class="register-decoration">
        <img src="${N(800,200,`salon-deco`)}" alt="Professional salon" loading="lazy" />
        <div class="decoration-overlay"></div>
      </div>

      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Next</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </form>
  `}function $t(){return Q.modality===`independent`?`
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label" for="business-name">Business / Professional name</label>
          <input type="text" id="business-name" class="form-input" value="${o(Q.businessName)}" placeholder="e.g. Beauty Studio" required />
          <div class="field-error" id="error-business-name"></div>
        </div>
        <div class="form-group">
          <label class="form-label" for="address">Address</label>
          <input type="text" id="address" class="form-input" value="${o(Q.address)}" placeholder="Location address" />
          <div class="field-error" id="error-address"></div>
        </div>
        <label class="checkbox-label">
          <input type="checkbox" id="work-from-home" ${Q.workFromHome?`checked`:``} />
          <span class="checkmark"></span>
          Work from home (no physical location)
        </label>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
          <button type="button" id="btn-prev" class="btn-outline">Previous</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Next</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `:`
      <form id="step1-form" class="register-form">
        <div class="form-group">
          <label class="form-label">Search existing company</label>
          <div class="autocomplete-wrapper">
            <input type="text" id="company-search" class="form-input" placeholder="Company name..." autocomplete="off" />
            <ul id="company-suggestions" class="autocomplete-list hidden"></ul>
          </div>
        </div>
        <div class="or-divider"><span>or</span></div>
        <div class="form-group">
          <label class="form-label" for="new-company-name">Register new company</label>
          <input type="text" id="new-company-name" class="form-input" value="${o(Q.companyName)}" placeholder="Company name" />
          <div class="field-error" id="error-company-name"></div>
          <input type="hidden" id="selected-company-id" value="${o(Q.companyId)}" />
          <p id="selected-company-display" class="selected-company"></p>
        </div>
        <div class="form-actions">
          <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
          <button type="button" id="btn-prev" class="btn-outline">Previous</button>
          <button type="button" id="btn-next" class="btn-gold-gradient">
            <span>Next</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </form>
    `}function en(){let e=`<ul class="summary-list">`;return e+=`<li><strong>Type:</strong> ${o(Q.type)}</li>`,e+=`<li><strong>Modality:</strong> ${Q.modality===`independent`?`Independent`:`Employee`}</li>`,Q.modality===`independent`?(e+=`<li><strong>Name:</strong> ${o(Q.businessName)}</li>`,Q.workFromHome?e+=`<li><strong>Work from home:</strong> Yes</li>`:e+=`<li><strong>Address:</strong> ${o(Q.address)}</li>`):(Q.companyId?e+=`<li><strong>Company:</strong> ${o(Q.companyName)} (ID: ${o(Q.companyId)})</li>`:e+=`<li><strong>New company:</strong> ${o(Q.companyName)}</li>`,e+=`<li><strong>Request linking:</strong> ${Q.requestLink?`Yes`:`No`}</li>`),e+=`</ul>`,`
    <div class="register-form">
      <div class="summary-box">
        ${e}
      </div>
      <div class="form-actions">
        <button type="button" id="btn-cancel" class="btn-cancel">Cancel</button>
        <button type="button" id="btn-prev" class="btn-outline">Previous</button>
        <button type="button" id="btn-next" class="btn-gold-gradient">
          <span>Finish</span>
          <span class="material-symbols-outlined">check</span>
        </button>
      </div>
    </div>
  `}async function tn(e){if(Z===0){if(!nn())return;Z++,$(e)}else if(Z===1){if(!rn())return;Z++,$(e)}else if(Z===2){await an(),M(`Registration completed successfully.`);let{loginAsProfessional:e}=await qt(async()=>{let{loginAsProfessional:e}=await Promise.resolve().then(()=>l);return{loginAsProfessional:e}},void 0);e(`1234`),window.location.hash=`/professional`}}function nn(){let e=document.getElementById(`prof-type`)?.value,t=document.querySelector(`input[name="modality"]:checked`)?.value,n=pt(e),r=mt(t);return document.getElementById(`error-type`).textContent=n||``,document.getElementById(`error-modality`).textContent=r||``,n||r?!1:(Q.type=e,Q.modality=t,!0)}function rn(){if(Q.modality===`independent`){let e=document.getElementById(`business-name`)?.value.trim(),t=document.getElementById(`address`)?.value.trim(),n=document.getElementById(`work-from-home`)?.checked||!1,r=ht(e),i=null;return n||(i=gt(t)),document.getElementById(`error-business-name`).textContent=r||``,document.getElementById(`error-address`).textContent=i||``,r||i?!1:(Q.businessName=e,Q.address=t,Q.workFromHome=n,!0)}else{let e=document.getElementById(`selected-company-id`)?.value,t=document.getElementById(`new-company-name`)?.value.trim();if(!e&&!t)return document.getElementById(`error-company-name`).textContent=`You must select a company or enter a new name.`,!1;if(t&&!e){let e=_t(t);if(e)return document.getElementById(`error-company-name`).textContent=e,!1;Q.companyName=t,Q.companyId=``}else if(e){Q.companyId=e;let t=document.getElementById(`selected-company-display`);Q.companyName=t?t.textContent.replace(`Company: `,``):``}return Q.requestLink=!0,!0}}async function an(){let e=`prof_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),t={id:e,type:Q.type,modality:Q.modality,createdAt:new Date().toISOString()};if(Q.modality===`independent`&&(t.businessName=Q.businessName,t.address=Q.workFromHome?`A domicilio`:Q.address,t.workFromHome=Q.workFromHome),await ze(t),Q.modality===`employed`){let t=Q.companyId;t||(t=`comp_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),await Be({id:t,name:Q.companyName,createdAt:new Date().toISOString()})),await He({id:`link_`+Date.now().toString(36)+Math.random().toString(36).substr(2,5),professionalId:e,companyId:t,status:`pending`,requestedAt:new Date().toISOString()})}}function on(){document.querySelectorAll(`input[name="modality"]`).forEach(e=>{e.addEventListener(`change`,function(){document.querySelectorAll(`.radio-card`).forEach(e=>e.classList.remove(`selected`)),this.closest(`.radio-card`).classList.add(`selected`)})})}function sn(){if(Q.modality===`employed`){let e=document.getElementById(`company-search`),t=document.getElementById(`company-suggestions`),n=document.getElementById(`new-company-name`);e?.addEventListener(`input`,async e=>{let n=e.target.value.trim();if(n.length<2){t.classList.add(`hidden`);return}let r=await Ve(n);t.innerHTML=r.length===0?`<li class="no-results">No companies found</li>`:r.map(e=>`<li data-id="${o(e.id)}">${o(e.name)}</li>`).join(``),t.classList.remove(`hidden`)}),t?.addEventListener(`click`,r=>{let i=r.target.closest(`li`);!i||!i.dataset.id||(document.getElementById(`selected-company-id`).value=i.dataset.id,document.getElementById(`selected-company-display`).textContent=`Company: ${i.textContent}`,e.value=i.textContent,t.classList.add(`hidden`),n.value=``,document.getElementById(`error-company-name`).textContent=``)}),n?.addEventListener(`input`,()=>{document.getElementById(`selected-company-id`).value=``,document.getElementById(`selected-company-display`).textContent=``,e.value=``,t.innerHTML=``,t.classList.add(`hidden`)}),document.addEventListener(`click`,e=>{e.target.closest(`.autocomplete-wrapper`)||t?.classList.add(`hidden`)})}}document.addEventListener(`DOMContentLoaded`,async()=>{await a(),ae(),Tt();let e=document.createElement(`div`);e.id=`offline-banner`,e.className=`offline-banner hidden`,e.innerHTML=`<i class="fas fa-wifi-slash"></i> ${y(`offline`)}`,document.body.appendChild(e),window.addEventListener(`online`,()=>e.classList.add(`hidden`)),window.addEventListener(`offline`,()=>e.classList.remove(`hidden`));let t=document.getElementById(`modal-close`),n=document.getElementById(`modal-overlay`);t&&t.addEventListener(`click`,G),n&&n.addEventListener(`click`,e=>{e.target===e.currentTarget&&G()});let r=document.getElementById(`btn-logout`);r&&r.addEventListener(`click`,()=>{h(),window.location.hash=`/home`,window.location.reload()});let i=document.getElementById(`main-header`);i&&window.addEventListener(`scroll`,()=>{i.classList.toggle(`scrolled`,window.scrollY>10)});let o=new URLSearchParams(window.location.search).get(`token`);if(o){document.body.classList.remove(`dashboard-mode`);let e=document.querySelector(`main`);e.innerHTML=``,await Bt(e,o),window.addEventListener(`hashchange`,()=>{window.location.href=window.location.origin+window.location.pathname+window.location.hash});return}let s=se(),c=document.querySelector(`main`);s.addRoute(`/home`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),ce(c)}),s.addRoute(`/rol`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),ue(c)}),s.addRoute(`/login`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),Xe(c)}),s.addRoute(`/register`,()=>{document.body.classList.remove(`dashboard-mode`),r&&(r.style.display=`none`),Jt(c)}),s.addRoute(`/professional`,async()=>{if(!g()||m()!==`professional`){s.navigate(`/login?role=professional`);return}await Et(c)}),s.addRoute(`/client`,async()=>{if(document.body.classList.remove(`dashboard-mode`),!g()||m()!==`client`){s.navigate(`/login?role=client`);return}r&&(r.style.display=`block`),await Lt(c)}),s.addRoute(`*`,()=>s.navigate(`/home`)),s.start()});