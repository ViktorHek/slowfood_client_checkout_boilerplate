describe('add to order button is visability', () => {

    beforeEach(() => {
        cy.server()
        cy.route({
            method: "POST",
            url: "http://localhosat:3000/api/auth/sign_up",
            response: "fixture:successfull_sign_up.json"
        })
        cy.route({
            method: 'GET',
            url: 'http://localhost:3000/api/products',
            response: 'fixture:product_data.json',
            header: {
                uid: "user@example.com",
                access_token: 'fakof',
                client: '420',
                token_type: "Bearer",
                expiry: 1699999
            }
        })
        cy.visit("/")
    })
    describe('when user is !auth visability', () => {
        
        it('IS EXPECted to be hidden', () => {
            cy.get("[data-cy='product-1']").within(()=>{
                cy.get("button").should("not.be.visible")
            })
        })
    })

    describe('when user is auth', () => {
        beforeEach(() => {
            cy.get("[data-cy='register-cta']").click()
            cy.get("[data-cy='email']").type("user@example.com")
            cy.get("[data-cy='password']").type("password")
            cy.get("[data-cy='password-confirmation']").type("password")
            cy.get("[data-cy='register']").click()
        })

		it('is expected to be visible', () => {
            cy.get("[data-cy='product-1']").within(()=>{
                cy.get("button").should("be.visible")
            })
        })
    }) 
})