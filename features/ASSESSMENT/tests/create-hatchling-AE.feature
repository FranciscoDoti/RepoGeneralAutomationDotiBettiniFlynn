Feature: Create a Hatchling Item from AE

Scenario: Verify that user able to create Hatchling Item through Activity Editor
Given I login to an existing course as "nga_instructor"
And I create a new assessment with its necessary details
When I add hatchling item as "numeric_entry" from activity editor