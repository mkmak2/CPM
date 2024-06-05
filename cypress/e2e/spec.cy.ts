const singleWayDataset = [
  {name: 'A',time: 5,sId: 1,eId:2},
  {name: 'B',time: 4,sId: 2,eId:3},
  {name: 'C',time: 1,sId: 3,eId:4},
  {name: 'D',time: 2,sId: 4,eId:5},
  {name: 'E',time: 3,sId: 5,eId:6},
  {name: 'F',time: 5,sId: 6,eId:7}
]

describe('My First Test', () => {
  it('Visits the Main page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-cy=entry-table]').should('not.exist');

    singleWayDataset.forEach(element => {
      cy.get('[data-cy=activity-name]')
      .should('have.value', '')
      .type(element.name)

      cy.get('[data-cy=activity-time]')
      .should('have.value', '')
      .type(`${element.time}`)

      cy.get('[data-cy=start-activity]')
      .should('have.value', '')
      .type(`${element.sId}`)

      cy.get('[data-cy=end-activity]')
      .should('have.value', '')
      .type(`${element.eId}`)

      cy.get('[data-cy=add-task]')
      .click()
    })

    cy.get('[data-cy=entry-table]').should('exist');
    cy.get('[data-cy=error-msg]').should('have.value', '')

    cy.get('[data-cy=execute]').click()



  })
})