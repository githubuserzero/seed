describe('My First Test', () => {
  it('Visits the main page', () => {
    expect('test').to.eq('test');
    
    cy.visit('http://localhost:3100');
    
    cy.get('#app > .body').invoke('text').then(text => {
      expect(text).to.eq('THIS TEXT IS FROM SERVER SIDE RENDERING INITIAL STATE');
    });
    
    cy.get('#app a[href="/translation-sample"]').click();
    
    cy.location().then(loc => {
      expect(loc.pathname).to.eq('/translation-sample');
    });
    
    cy.getCookie('locale').then(({value}) => {
      cy.get('#app > .body').invoke('text').then(text => {
        expect(text).to.eq(`THIS IS TRANSLATION TEXT (${value})`);
      });
    });
  });
});