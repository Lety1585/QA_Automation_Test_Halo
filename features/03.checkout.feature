Feature: Purchase Process - Positive

  Scenario: Select products, add to cart, and complete the purchase
    Given I am logged in
    When I select a product and add it to the cart
    Then I should be able to complete the purchase