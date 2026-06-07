(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t=document){return t.querySelector(e)}function t(e,t,n,r){t.innerHTML=e,r&&r(n)}async function n(e){return await(await fetch(e)).text()}async function r(){let r=await n(`/partials/header.html`),i=await n(`/partials/footer.html`),a=e(`#main-header`),o=e(`#main-footer`);t(r,a),t(i,o)}var i=`sr-role`,a=`1234`;function o(e){return e===a?(localStorage.setItem(i,`professional`),!0):!1}function s(e){localStorage.setItem(i,`client`),localStorage.setItem(`sr-client-phone`,e)}function c(){return localStorage.getItem(i)}function l(){localStorage.removeItem(i),localStorage.removeItem(`sr-client-phone`)}function u(){return c()!==null}var d=`sr-clients`;function f(){let e=localStorage.getItem(d);return e?JSON.parse(e):[]}function p(e){localStorage.setItem(d,JSON.stringify(e))}function m(e){return f().find(t=>t.phone===e)}function h(e){let t=f();t.push(e),p(t)}function g(e){let t=f();if(t.length===0){e.innerHTML=`<p>No hay clientes registrados.</p>`;return}e.innerHTML=t.map(e=>`
    <div class="card" data-id="${e.id}">
      <i class="fas fa-user-circle"></i>
      <div>
        <strong>${e.name}</strong><br>
        <small>${e.phone} ${e.phoneValid?`✓`:`✗`}</small>
      </div>
    </div>
  `).join(``)}function _(e,t){let n=m(e);if(!n||n.services.length===0){t.innerHTML=`<p>No tienes servicios registrados aún.</p>`;return}t.innerHTML=[...n.services].sort((e,t)=>new Date(t.date)-new Date(e.date)).map(e=>`
    <div class="card">
      <i class="fas fa-spa"></i>
      <div>
        <strong>${e.type}</strong> – ${e.date}<br>
        <small>${e.notes}</small><br>
        <div class="image-pair">
          <img src="${e.beforeImg}" alt="Antes" loading="lazy" />
          <img src="${e.afterImg}" alt="Después" loading="lazy" />
        </div>
      </div>
    </div>
  `).join(``)}function v(e,t){let n=document.querySelector(`#modal-overlay`),r=document.querySelector(`#modal-body`);r.innerHTML=`<h3>${e}</h3>${t}`,n.classList.remove(`hidden`)}function y(){document.querySelector(`#modal-overlay`).classList.add(`hidden`)}var b=`c43204c2a5e320e5600d73ce305b6f0d`;async function x(e){let t=`http://apilayer.net/api/validate?access_key=${b}&number=${encodeURIComponent(e)}`;try{let e=await fetch(t);if(!e.ok)throw Error(`Error de red: ${e.status}`);let n=await e.json();if(!n.valid)throw{name:`InvalidPhoneError`,message:`El número no es válido o no existe.`,details:n};return n}catch(e){throw e.name===`InvalidPhoneError`?e:{name:`ServiceError`,message:`No se pudo conectar con el servicio de validación. Intenta más tarde.`}}}document.addEventListener(`DOMContentLoaded`,async()=>{await r();let e=document.getElementById(`login-section`),t=document.getElementById(`professional-view`),n=document.getElementById(`client-view`),i=document.getElementById(`btn-logout`)||document.createElement(`button`);document.getElementById(`modal-close`).addEventListener(`click`,y),document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===e.currentTarget&&y()});function a(){e.classList.remove(`active`),t.classList.remove(`active`),n.classList.remove(`active`);let r=c();if(r===`professional`)t.classList.add(`active`),g(document.getElementById(`client-list`));else if(r===`client`){n.classList.add(`active`);let e=localStorage.getItem(`sr-client-phone`);e&&_(e,document.getElementById(`client-history`))}if(r){i.style.display=`block`,i.textContent=`Salir`,i.onclick=()=>{l(),window.location.reload()};let e=document.getElementById(`main-header`);e&&!e.contains(i)&&e.appendChild(i)}else i.style.display=`none`}u()?(e.classList.remove(`active`),a()):(e.classList.add(`active`),t.classList.remove(`active`),n.classList.remove(`active`)),document.getElementById(`btn-professional-login`).addEventListener(`click`,()=>{let t=document.getElementById(`login-form-container`);t.classList.remove(`hidden`),t.innerHTML=`
      <form id="prof-login-form">
        <label for="prof-code">Código de acceso:</label>
        <input type="password" id="prof-code" placeholder="Código" required />
        <button type="submit">Ingresar</button>
      </form>
    `,document.getElementById(`prof-login-form`).addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`prof-code`).value;o(n)?(e.classList.remove(`active`),a()):alert(`Código incorrecto. Prueba con 1234`)})}),document.getElementById(`btn-client-login`).addEventListener(`click`,()=>{let t=document.getElementById(`login-form-container`);t.classList.remove(`hidden`),t.innerHTML=`
      <form id="client-login-form">
        <label for="client-phone">Tu número de teléfono (con código de país):</label>
        <input type="tel" id="client-phone" placeholder="+54 11 1234-5678" required />
        <button type="submit">Ver historial</button>
      </form>
    `,document.getElementById(`client-login-form`).addEventListener(`submit`,t=>{t.preventDefault();let n=document.getElementById(`client-phone`).value.trim();m(n)?(s(n),e.classList.remove(`active`),a()):alert(`No se encontró un cliente con ese número. Pide a tu profesional que te registre.`)})}),document.getElementById(`btn-new-client`).addEventListener(`click`,()=>{v(`Nuevo Cliente`,`
      <form id="new-client-form">
        <label for="client-name">Nombre completo:</label>
        <input type="text" id="client-name" placeholder="María García" required />
        <label for="client-phone">Teléfono (con código de país):</label>
        <input type="tel" id="client-phone" placeholder="+5491112345678" required />
        <div id="validation-area"></div>
        <button type="submit" id="validate-btn">Validar y Guardar</button>
      </form>
    `),document.getElementById(`new-client-form`).addEventListener(`submit`,async e=>{e.preventDefault();let t=document.getElementById(`client-name`).value.trim(),n=document.getElementById(`client-phone`).value.trim(),r=document.getElementById(`validate-btn`),i=document.getElementById(`validation-area`);r.disabled=!0,r.innerHTML=`<span class="spinner"></span> Validando...`,i.innerHTML=``;try{let e=await x(n);i.innerHTML=`
          <div class="validation-result">
            <i class="fas fa-check-circle"></i> Número válido<br>
            <strong>${e.number}</strong><br>
            País: ${e.country_name} (${e.country_code})<br>
            Compañía: ${e.carrier}<br>
            Tipo: ${e.line_type}
          </div>
        `,h({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!0,phoneDetails:{country:e.country_name,carrier:e.carrier,line_type:e.line_type},services:[]}),g(document.getElementById(`client-list`)),y()}catch(e){let r=``;e.name===`InvalidPhoneError`?(r=`
            <div class="validation-result validation-error">
              <i class="fas fa-times-circle"></i> El número no es válido.<br>
              <small>${e.message}</small>
            </div>
          `,r+=`
            <label>
              <input type="checkbox" id="manual-save"> Guardar de todas formas (sin validar)
            </label>
            <button type="button" id="force-save-btn">Guardar manualmente</button>
          `,i.innerHTML=r,document.getElementById(`force-save-btn`).addEventListener(`click`,()=>{h({id:Date.now().toString(36)+Math.random().toString(36).substr(2),name:t,phone:n,phoneValid:!1,phoneDetails:null,services:[]}),g(document.getElementById(`client-list`)),y()})):i.innerHTML=`
            <div class="validation-result validation-error">
              <i class="fas fa-exclamation-triangle"></i> ${e.message}
            </div>
          `}finally{r.disabled=!1,r.innerHTML=`Validar y Guardar`}})})});