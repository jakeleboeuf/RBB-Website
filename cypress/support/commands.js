// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Select Nth select option
Cypress.Commands.add(
  'selectNth',
  { prevSubject: 'element' },
  (subject, pos) => {
    cy.wrap(subject)
      .children('option')
      .eq(pos)
      .then(e => {
        cy.wrap(subject).select(e.val());
      });
  }
);

const clear = Cypress.LocalStorage.clear;

Cypress.LocalStorage.clear = function (keys, ls, rs) {
  const whitelistKeys = ['user::subscription'];
  if (keys && keys.length == 0) {
    keys = Object.keys(localStorage);
  }
  keys = keys.filter(function (i) {
    return whitelistKeys.indexOf(i) < 0;
  });
  return clear.apply(this, arguments);
};

//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
