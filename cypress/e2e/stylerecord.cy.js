describe('StyleRecord Lite', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('Login como profesional', () => {
    cy.contains('Soy Profesional').click();
    cy.get('#prof-code').type('1234');
    cy.get('#prof-login-form button').click();
    cy.url().should('include', '#/professional');
    cy.contains('Panel del Profesional').should('be.visible');
  });

  it('Crear cliente y agregar servicio', () => {
    // Login
    cy.contains('Soy Profesional').click();
    cy.get('#prof-code').type('1234');
    cy.get('#prof-login-form button').click();
    // Crear cliente
    cy.contains('Nuevo Cliente').click();
    cy.get('#client-name').type('Test Client');
    cy.get('#client-phone').type('+5491122334455');
    cy.get('#validate-btn').click();
    cy.contains('Número válido', { timeout: 10000 }).should('be.visible');
    // Guardar
    cy.get('#new-client-form button[type="submit"]').click();
    cy.contains('Test Client').should('be.visible');
    // Seleccionar cliente
    cy.get('.client-card').first().click();
    cy.contains('Agregar Servicio').should('be.visible').click();
    // Llenar servicio
    cy.get('#service-type').select('corte');
    cy.get('#new-service-form button[type="submit"]').click();
    cy.contains('Servicio agregado').should('be.visible');
  });

  it('Compartir perfil como cliente', () => {
    // Primero crear cliente como profesional (opcional)...
    // Luego login como cliente
    cy.visit('/#/login');
    cy.contains('Soy Cliente').click();
    cy.get('#client-phone').type('+5491122334455');
    cy.get('#client-login-form button').click();
    cy.contains('Compartir Perfil').click();
    cy.get('#share-link').should('have.value', window.location.origin);
  });
});
