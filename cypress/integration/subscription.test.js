/// <reference types="Cypress" />

import { FORM_ACTION } from '../../src/components/SubscribeForm.js';

describe('Subscription Form', () => {
  const EMAIL = 'me@email.com';

  beforeEach(() => {
    cy.server();
    cy.route('POST', FORM_ACTION, 'fixture:mailchimp');
    cy.visit('/');
  });

  it('Subscribing hides the subscription button on Desktop', () => {
    // Open the modal
    cy.findByTestId('subscribe').click();

    // Fill and Submit the form
    cy.findByTestId('email').type(`${EMAIL}`);
    cy.findByTestId('firstName').type('George');
    cy.findByTestId('lastName').type('Floyd');
    cy.get('form').submit();

    // Go back go the site (form redirects to mailchimp)
    cy.visit('/');

    // Make sure the subscription button is hidden
    cy.findByTestId('subscribe').should('not.exist');
  });

  it('Subscribing hides the subscription button on Mobile', () => {
    cy.viewport('iphone-6');

    // Open the modal
    cy.findByTestId('menu').click();
    cy.findByTestId('subscribe-mobile').click();

    // Fill and Submit the form
    cy.findByTestId('email').type(`${EMAIL}`);
    cy.findByTestId('firstName').type('George');
    cy.findByTestId('lastName').type('Floyd');
    cy.get('form').submit();

    // Go back go the site (form redirects to mailchimp)
    cy.visit('/');

    // Make sure the subscription button is hidden
    cy.findByTestId('menu').click();
    cy.findByTestId('subscribe').should('not.exist');
  });
});
