describe('selecting products', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('takes the user to the marketplace page', () => {
    cy.get('a[href*="/marketplace"]').click()
    cy.url().should('include', '/marketplace')
  })
})
