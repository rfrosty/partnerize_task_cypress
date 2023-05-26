import { baseUrl } from '../../utils/urls'
import { homePageProductAnchor, cartSummaryNoProduct, cartSummaryNumberOfProducts } from '../../utils/locators'

describe('Main Page Tests', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  });
  it("Displays 7 products on Popular tab", () => {
    cy.get('#homefeatured li').should('have.length', 7)
  })
  it("Returns 1 correct result when user searches 'blouse'", () => {
    cy.get("#search_query_top")
      .type('blouse')
      .should('have.value', 'blouse')
    cy.get("#searchbox button[name='submit_search']").click()
    cy.get("#product_list a[class*='product-name']").first()
      .invoke('text')
      .then((text) => {
        expect(text.trim().toLowerCase()).to.equal('blouse')
      })
  })
  it("Loads product page when product clicked", () => {
    cy.get(homePageProductAnchor).first()
      .invoke('attr', 'href')
      .then((href) => {
        cy.get(homePageProductAnchor).first().click()
        cy.url().should('eq', href)
      })
  })
})

describe('Product Page Tests', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  });
  it("Contains correct short description of product", () => {
    cy.get(homePageProductAnchor).first()
      .invoke('text')
      .then((text) => {
        cy.get(homePageProductAnchor).first().click()
        cy.get('#center_column h1').should('have.value', text.trim())
      })
  })
  it("Informs user when 1 product added to cart", () => {
    cy.get(homePageProductAnchor).first().click()
    cy.get(cartSummaryNoProduct).should('not.have.css', 'display', 'none')
    cy.get(cartSummaryNumberOfProducts).should('have.css', 'display', 'none');
    cy.get("#add_to_cart button").click()
    cy.contains('There is 1 item in your cart').should('exist')
    cy.get(cartSummaryNoProduct).should('have.css', 'display', 'none')
    cy.get(cartSummaryNumberOfProducts).should('not.have.css', 'display', 'none')
    cy.get(cartSummaryNumberOfProducts).contains('1')
  })
})




