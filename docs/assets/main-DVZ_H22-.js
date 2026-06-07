var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t=document){return t.querySelector(e)}function r(e,t,n,r){t.innerHTML=e,r&&r(n)}async function i(e){let t=`/StyleRecordLite/`+e.replace(/^\//,``);return await(await fetch(t)).text()}async function a(){let e=await i(`partials/header.html`),t=await i(`partials/footer.html`),a=n(`#main-header`),o=n(`#main-footer`);r(e,a),r(t,o)}var o=`sr-role`,s=`1234`;function c(e){return e===s?(localStorage.setItem(o,`professional`),!0):!1}function l(e){localStorage.setItem(o,`client`),localStorage.setItem(`sr-client-phone`,e)}function u(){return localStorage.getItem(o)}function d(){localStorage.removeItem(o),localStorage.removeItem(`sr-client-phone`)}function f(){return u()!==null}var p=`sr-clients`;function m(){let e=localStorage.getItem(p);return e?JSON.parse(e):[]}function h(e){localStorage.setItem(p,JSON.stringify(e))}function g(e){return m().find(t=>t.phone===e)}function _(e){let t=m();t.push(e),h(t)}function v(e){h(m().filter(t=>t.id!==e))}function y(e=300,t=200,n=null){return`https://picsum.photos/${n?`seed/${n}/`:``}${e}/${t}`}function b(){let e=Math.random().toString(36).substring(2,10),t=Math.random().toString(36).substring(2,10);return{before:y(300,200,e),after:y(300,200,t)}}var x=t({addService:()=>C,deleteService:()=>T,getServicesByClientId:()=>S,updateService:()=>w});function S(e){let t=m().find(t=>t.id===e);return t?t.services:[]}function C(e,t){let n=m(),r=n.find(t=>t.id===e);return r?(Array.isArray(r.services)||(r.services=[]),r.services.push(t),h(n),!0):!1}function w(e,t,n){let r=m(),i=r.find(t=>t.id===e);if(!i)return!1;let a=i.services.findIndex(e=>e.id===t);return a===-1?!1:(i.services[a]={...i.services[a],...n},h(r),!0)}function T(e,t){let n=m(),r=n.find(t=>t.id===e);return r?(r.services=r.services.filter(e=>e.id!==t),h(n),!0):!1}function E(e,t=``){let n=m(),r=t?n.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())||e.phone.includes(t)):n;if(r.length===0){e.innerHTML=`<p>No hay clientes registrados.</p>`;return}e.innerHTML=r.map(e=>`
    <div class="card client-card" data-id="${e.id}">
      <i class="fas fa-user-circle"></i>
      <div class="client-info">
        <strong>${e.name}</strong><br>
        <small>${e.phone} ${e.phoneValid?`✓`:`✗`}</small>
      </div>
      <div class="client-actions">
        <button class="btn-delete-client" data-id="${e.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join(``)}function D(e,t){let n=S(e);if(n.length===0){t.innerHTML=`<p>Este cliente no tiene servicios registrados.</p>`;return}t.innerHTML=[...n].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>`
    <div class="card service-card" data-service-id="${e.id}">
      <div class="service-header">
        <strong>${e.type}</strong>
        <span>${e.date}</span>
      </div>
      <p>${e.notes}</p>
      <div class="image-pair">
        <div>
          <small>Antes</small>
          <img src="${e.beforeImg}" alt="Antes" loading="lazy" />
        </div>
        <div>
          <small>Después</small>
          <img src="${e.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
      <div class="service-actions">
        <button class="btn-edit-service" data-id="${e.id}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-service" data-id="${e.id}">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `).join(``)}function O(e,t){let n=g(e);if(!n||n.services.length===0){t.innerHTML=`<p>No tienes servicios registrados aún.</p>`;return}t.innerHTML=[...n.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>`
    <div class="card service-card">
      <div class="service-header">
        <strong>${e.type}</strong>
        <span>${e.date}</span>
      </div>
      <p>${e.notes}</p>
      <div class="image-pair">
        <div>
          <small>Antes</small>
          <img src="${e.beforeImg}" alt="Antes" loading="lazy" />
        </div>
        <div>
          <small>Después</small>
          <img src="${e.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
    </div>
  `).join(``)}function k(e,t){let n=document.querySelector(`#modal-overlay`),r=document.querySelector(`#modal-body`);r.innerHTML=`<h3>${e}</h3>${t}`,n.classList.remove(`hidden`)}function A(){document.querySelector(`#modal-overlay`).classList.add(`hidden`)}var j=`c43204c2a5e320e5600d73ce305b6f0d`;async function M(e){let t=`https://apilayer.net/api/validate?access_key=${j}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw{name:`InvalidPhoneError`,message:`El número no es válido o no existe.`,details:n};return n}catch(e){throw e.name===`InvalidPhoneError`?e:{name:`ServiceError`,message:`No se pudo conectar con el servicio de validación. Intenta más tarde.`}}}var N=`modulepreload`,P=function(e){return`/StyleRecordLite/`+e},F={},I=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=P(t,n),t in F)return;F[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:N,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},L=null;document.addEventListener(`DOMContentLoaded`,async()=>{await a();let e=document.getElementById(`login-section`),t=document.getElementById(`professional-view`),n=document.getElementById(`client-view`),r=document.createElement(`button`);r.id=`btn-logout`,r.textContent=`Salir`,r.style.display=`none`;let i=document.getElementById(`main-header`);i&&i.appendChild(r),document.getElementById(`modal-close`).addEventListener(`click`,A),document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===e.currentTarget&&A()});function o(){e.classList.remove(`active`),t.classList.remove(`active`),n.classList.remove(`active`);let i=u();if(i===`professional`)t.classList.add(`active`),s(),document.getElementById(`service-history`).innerHTML=``,r.style.display=`block`;else if(i===`client`){n.classList.add(`active`);let e=localStorage.getItem(`sr-client-phone`);e&&O(e,document.getElementById(`client-history`)),r.style.display=`block`}}f()?(e.classList.add(`hidden`),o()):e.classList.remove(`hidden`);function s(e=``){E(document.getElementById(`client-list`),e),p()}function p(){document.querySelectorAll(`.client-card`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.btn-delete-client`))return;let n=e.dataset.id;L=n,D(n,document.getElementById(`service-history`)),document.getElementById(`btn-add-service`).style.display=`block`})}),document.querySelectorAll(`.btn-delete-client`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id;confirm(`¿Eliminar este cliente y todos sus servicios?`)&&(v(n),L===n&&(L=null,document.getElementById(`service-history`).innerHTML=``,document.getElementById(`btn-add-service`).style.display=`none`),s())})})}document.getElementById(`btn-professional-login`).addEventListener(`click`,()=>{let t=document.getElementById(`login-form-container`);t.classList.remove(`hidden`),t.innerHTML=`
      <form id="prof-login-form">
        <label>Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `,document.getElementById(`prof-login-form`).addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`prof-code`).value;c(n)?(e.classList.add(`hidden`),o()):alert(`Código incorrecto. Prueba con 1234`)})}),document.getElementById(`btn-client-login`).addEventListener(`click`,()=>{let t=document.getElementById(`login-form-container`);t.classList.remove(`hidden`),t.innerHTML=`
      <form id="client-login-form">
        <label>Tu número de teléfono:</label>
        <input type="tel" id="client-phone" placeholder="+541112345678" required />
        <button type="submit">Ver historial</button>
      </form>
    `,document.getElementById(`client-login-form`).addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`client-phone`).value.trim();g(n)?(l(n),e.classList.add(`hidden`),o()):alert(`No se encontró un cliente con ese número.`)})});let h=document.getElementById(`client-search`);h&&h.addEventListener(`input`,e=>{s(e.target.value)}),document.getElementById(`btn-add-service`).addEventListener(`click`,()=>{if(!L){alert(`Selecciona un cliente primero.`);return}let{before:e,after:t}=b();k(`Agregar Servicio`,`
      <form id="new-service-form">
        <label>Tipo de servicio:</label>
        <select id="service-type" required>
          <option value="corte">Corte</option>
          <option value="tinte">Tinte</option>
          <option value="tratamiento">Tratamiento</option>
          <option value="peinado">Peinado</option>
          <option value="otros">Otros</option>
        </select>
        <label>Fecha:</label>
        <input type="date" id="service-date" value="${new Date().toISOString().slice(0,10)}" required />
        <label>Notas:</label>
        <textarea id="service-notes" rows="3"></textarea>
        <div class="image-preview">
          <div><small>Antes</small><img src="${e}" id="preview-before" /></div>
          <div><small>Después</small><img src="${t}" id="preview-after" /></div>
        </div>
        <button type="button" id="btn-regenerate-images">Generar otras imágenes</button>
        <button type="submit">Guardar Servicio</button>
      </form>
    `);let n=document.getElementById(`new-service-form`),r=e,i=t;document.getElementById(`btn-regenerate-images`).addEventListener(`click`,()=>{let e=b();r=e.before,i=e.after,document.getElementById(`preview-before`).src=r,document.getElementById(`preview-after`).src=i}),n.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`service-type`).value,n=document.getElementById(`service-date`).value,a=document.getElementById(`service-notes`).value,o={id:Date.now().toString(36)+Math.random().toString(36).substr(2),clientId:L,date:n,type:t,notes:a,beforeImg:r,afterImg:i};C(L,o),D(L,document.getElementById(`service-history`)),A()})}),document.getElementById(`service-history`).addEventListener(`click`,e=>{let t=e.target.closest(`.btn-edit-service`),n=e.target.closest(`.btn-delete-service`);if(t){let e=t.dataset.id,n=getServicesByClientId(L).find(t=>t.id===e);if(!n)return;k(`Editar Servicio`,`
        <form id="edit-service-form">
          <label>Tipo:</label>
          <select id="edit-service-type" required>
            <option value="corte" ${n.type===`corte`?`selected`:``}>Corte</option>
            <option value="tinte" ${n.type===`tinte`?`selected`:``}>Tinte</option>
            <option value="tratamiento" ${n.type===`tratamiento`?`selected`:``}>Tratamiento</option>
            <option value="peinado" ${n.type===`peinado`?`selected`:``}>Peinado</option>
            <option value="otros" ${n.type===`otros`?`selected`:``}>Otros</option>
          </select>
          <label>Fecha:</label>
          <input type="date" id="edit-service-date" value="${n.date}" required />
          <label>Notas:</label>
          <textarea id="edit-service-notes" rows="3">${n.notes}</textarea>
          <button type="submit">Guardar Cambios</button>
        </form>
      `),document.getElementById(`edit-service-form`).addEventListener(`submit`,t=>{t.preventDefault();let n={type:document.getElementById(`edit-service-type`).value,date:document.getElementById(`edit-service-date`).value,notes:document.getElementById(`edit-service-notes`).value};I(async()=>{let{updateService:e}=await Promise.resolve().then(()=>x);return{updateService:e}},void 0).then(({updateService:t})=>{t(L,e,n),D(L,document.getElementById(`service-history`)),A()})})}if(n){let e=n.dataset.id;confirm(`¿Eliminar este servicio?`)&&(T(L,e),D(L,document.getElementById(`service-history`)))}}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>{k(`Nuevo Cliente`,`
      <form id="new-client-form">
        <label>Nombre completo:</label>
        <input type="text" id="client-name" placeholder="María García" required />
        <label>Teléfono (con código de país):</label>
        <input type="tel" id="client-phone" placeholder="+5491112345678" required />
        <div id="validation-area"></div>
        <button type="submit" id="validate-btn">Validar y Guardar</button>
      </form>
    `),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-phone`).value.trim(),r=document.getElementById(`validate-btn`),i=document.getElementById(`validation-area`);if(m().find(e=>e.phone===n)){i.innerHTML=`<div class="validation-error">El teléfono ya está registrado.</div>`;return}r.disabled=!0,r.innerHTML=`<span class="spinner"></span> Validando...`,i.innerHTML=``;try{let e=await M(n);i.innerHTML=`
          <div class="validation-result">
            <i class="fas fa-check-circle"></i> Número válido<br>
            <strong>${e.number}</strong><br>
            País: ${e.country_name} (${e.country_code})<br>
            Compañía: ${e.carrier}<br>
          </div>
        `,_({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),s(),A()}catch(e){e.name===`InvalidPhoneError`?(i.innerHTML=`
            <div class="validation-error">El número no es válido.</div>
            <label><input type="checkbox" id="manual-save"> Guardar de todas formas</label>
            <button type="button" id="force-save-btn">Guardar manualmente</button>
          `,document.getElementById(`force-save-btn`).addEventListener(`click`,()=>{_({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!1,phoneDetails:null,services:[]}),s(),A()})):i.innerHTML=`<div class="validation-error">${e.message}</div>`}finally{r.disabled=!1,r.innerHTML=`Validar y Guardar`}})}),r.addEventListener(`click`,()=>{d(),window.location.reload()})});