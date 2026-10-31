@smoke
Feature: Positive Login

  Scenario: Login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    Then I should see the Products page