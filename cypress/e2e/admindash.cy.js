describe("employee page tests", () => {

        beforeEach(() => {

       cy.loginAsAdmin();
    })

it("should successfully view all leaves", () => {
    cy.getDataTest('requests').as('requests')

    cy.get('@requests')
        .contains("Staff ID")
    cy.contains("Name")
    cy.contains("Leave Type")
    cy.contains("Start Date")
    cy.contains("End Date")
    cy.contains("Status")
    cy.contains("Comment")
    cy.contains("Actions")


    cy.getDataTest('searchbar').as('searchbar')

    cy.get('@searchbar')
        .should('have.attr', 'type', 'text')
        .type("6748")


    cy.getDataTest('filter').contains("Pending")
    cy.contains("Approved")
    cy.contains("Rejected")

})
it("should view all employees",() => {
         cy.contains("Employees")
         cy.visit('/admin/dashboard/employees')

         cy.getDataTest('employees-table').as('employeestable')

         cy.get('@employeestable')
              .contains("Staff ID")
            cy.contains("Name")
            cy.contains("Email")
            cy.contains("Role")
            cy.contains("Actions")
             
        cy.contains("Add New Employee")

})
it("should add new employee",() => {
    cy.visit('/admin/dashboard/employees')

    cy.contains("Add New Employee")

    cy.getDataTest('new-employee').click()

    cy.getDataTest('staffid-input').type("3434")

    cy.getDataTest('name-input').type("Lexanol Kamande")

    cy.getDataTest('email-input').type("kamande444@gmail.com")

    cy.getDataTest('pass-input').type("132425")

    cy.getDataTest('create-button').click()

    
})
})