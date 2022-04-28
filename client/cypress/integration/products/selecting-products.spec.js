describe('selecting products and adding to basket', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('a:contains("Go to product page")').click()
  })

  it('takes the user to the products page', () => {
    cy.url().should('include', '/products')
  })

  it('adds a product to the basket', () => {
    cy.get('button:contains("Add to cart"):first').click()
    cy.get('ul').find('span').contains('Basket Items: 1')
  })

  it('then adds a different product to the basket', () => {
    cy.get('button:contains("Add to cart"):last').click()
    cy.get('ul').find('span').contains('Basket Items: 2')
  })

  it('then can view more details of a product', () => {
    cy.get('a:contains("More detail"):first').click()
    cy.wait(500)
    cy.get('h2').contains('Specifications')
      .should('exist')
    cy.get('h2').contains('Description')
      .should('exist')
    cy.go('back')
  })

  it('then shows the products in the basket', () => {
    cy.get('a[href*="/basket"]').click()
    cy.wait(500)
    cy.get('h2').contains('You have 2 items in your basket').should('exist')
    cy.get('div').contains('Total: 23.98').should('exist')
  })

  it('then updates quantity in the basket', () => {
    cy.get('a[href*="/basket"]').click()
    cy.get('button:contains("+"):first').click()
    cy.get('button:contains("Update basket"):first').click()
    cy.wait(500)
    cy.get('div').contains('Total: 36.97').should('exist')
  })

  it('then empties the basket', () => {
    cy.get('a[href*="/basket"]').click()
    cy.get('button:contains("Empty your basket")').click()
    cy.wait(500)
    cy.get('div').contains('Total: 23.98').should('not.exist')
    cy.get('h2').contains('You have 0 items in your basket').should('exist')
    cy.get('a:contains("Browse our products")').should('exist')
  })
})
