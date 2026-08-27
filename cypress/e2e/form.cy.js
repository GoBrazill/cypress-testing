beforeEach(() => {
  cy.visit('http://localhost:3000')
  cy.login('4DM@gmail.com', '4DM')
  cy.contains('button', 'Formulários').should('be.visible').click()
  cy.contains('h1', 'Consultoria').should('be.visible')
})

describe('form', () => {
  it('Formulário preenchido corretamente', () => {

    cy.get('#name').type('fds vtnc')
    cy.get('#email').type('fds@gmail.com')
    cy.get('#phone').type('1')
    cy.get('#consultancyType').select('In Company')

    cy.contains('label', 'Pessoa Jurídica').find('input[type=radio]').click().should('be.checked')
    cy.contains('label', 'Pessoa Física').find('input[type=radio]').should('not.be.checked')
    
    cy.get('#document').type('123')
    
    const sociais = [
      'Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo'
    ]

    sociais.forEach((social) => {
      cy.contains('label', social).find('input[type=checkbox]').click().should('be.checked')
    })

    cy.get('input[type=file]').selectFile('./cypress/fixtures/apple.png', {force : true})
    cy.contains('label', 'apple.png')

    
    const tecnologias = [
      'Garoto de Programa', 'DST', 'Front-end', 'Back-end', 'Banco de Dados', 'Mobile'
    ]

    tecnologias.forEach((tec) => {
      cy.get('#technologies').type(tec).type('{enter}').should('be.visible')
    })

    cy.contains('label', 'Li e aceito os termos de uso *').click()

    cy.contains('button[type=submit]', 'Enviar formulário').click()

    cy.contains('h3', 'Sucesso!').should('be.visible')
  })
})