describe("employee page tests", () => {

        beforeEach(() => {

       cy.loginAsEmployee();
    })
it("should successfully apply for a leave", () => {
    cy.getDataTest('leave-request-header').contains("Leave Request Dashboard")

    cy.getDataTest('apply-leave').contains("Apply for Leave")

    cy.getDataTest('leave-type').select("Sick Leave")

    cy.getDataTest('start-date').type('2025-12-01')

    cy.getDataTest('end-date').type('2025-12-12')

    cy.getDataTest('submit').click()
  
})
it("should view leave history",() =>{
    cy.getDataTest('history-header').contains("Leave History")

    cy.getDataTest('history-table').as('historytable')
   
    cy.get('@historytable')
        .contains("Leave Type")
        
    cy.contains("Start")
    cy.contains("End")
    cy.contains("Status")
    cy.contains("Comments")
    cy.contains("Actions")

   cy.getDataTest('edit').contains("Edit")

   cy.getDataTest('delete').contains("Delete")

})




})