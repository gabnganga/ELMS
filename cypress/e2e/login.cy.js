describe("login tests", () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it("should login with valid credentials", () => {
        cy.getDataTest('elms-login-header').contains("Login")

        cy.getDataTest('elms-login-email-input').as('login-emailInput')

        cy.get('@login-emailInput')
            .should('be.visible')
            .should('have.attr', 'type', 'email')
            .type('tester001@gmail.com')


        cy.getDataTest('elms-login-password-input').as('login-passwordInput')

        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('tester')


        cy.getDataTest('elms-login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .should('not.be.disabled')
            .click()


        cy.contains(/Success/i).should('be.visible')
        cy.url().should('include', '/admin/dashboard/requests')
        cy.contains(/Welcome back/i).should('be.visible')

    })

    it("should not login with invalid email", () => {

        // Get the email input
        cy.getDataTest('elms-login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('tester@gmail.com')

        // Get the password input
        cy.getDataTest('elms-login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('tester')

        // Submit the form
        cy.getDataTest('elms-login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        cy.contains(/User not found/i).should('be.visible')

    })
    it("should not login with invalid password", () => {

        // Get the email input
        cy.getDataTest('elms-login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('tester001@gmail.com')

        // Get the password input
        cy.getDataTest('elms-login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('taster')

        // Submit the form
        cy.getDataTest('elms-login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        cy.contains(/Invalid Credentials/i).should('be.visible')

    })
        it("should not login without email", () => {

        // Get the email input
        cy.getDataTest('elms-login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
        

        // Get the password input
        cy.getDataTest('elms-login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('tester')

        // Submit the form
        cy.getDataTest('elms-login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        cy.contains(/Email is required/i).should('be.visible')

    })
})