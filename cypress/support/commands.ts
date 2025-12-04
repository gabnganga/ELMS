/// <reference types="cypress" />

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})


Cypress.Commands.add('loginAsEmployee', (email = 'tester002@gmail.com', password = 'tester') => {
    cy.visit('/login')
    cy.getDataTest('elms-login-email-input').type(email)
    cy.getDataTest('elms-login-password-input').type(password)
    cy.getDataTest('elms-login-submit-button').click()

    cy.contains(/Success/i).should('be.visible')
    cy.url().should('include', '/employee/dashboard/requests')
    cy.contains(/Welcome back/i).should('be.visible')
})

Cypress.Commands.add('loginAsAdmin', (email = 'tester001@gmail.com', password = 'tester') => {
    cy.visit('/login')
    cy.getDataTest('elms-login-email-input').type(email)
    cy.getDataTest('elms-login-password-input').type(password)
    cy.getDataTest('elms-login-submit-button').click()

    cy.contains(/Success/i).should('be.visible')
    cy.url().should('include', '/admin/dashboard/requests')
    cy.contains(/Welcome back/i).should('be.visible')
})

export { }
declare global {
    namespace Cypress {
        interface Chainable {
            getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
            loginAsEmployee(email: string, password: string): Chainable<void>;
            loginAsAdmin(email: string, password: string): Chainable<void>
           
        }
    }
}
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }