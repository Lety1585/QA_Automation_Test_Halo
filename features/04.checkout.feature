Feature: Purchase Process - Negative

  Scenario: Attempt to complete the purchase without adding products to the cart
    Given I am on the empty cart
    When I attempt to complete the purchase without adding products
    Then checkout should not be allowed