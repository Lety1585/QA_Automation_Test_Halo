Feature: Negative Login

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    Then I should see an error message