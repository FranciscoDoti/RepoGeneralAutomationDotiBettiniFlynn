@SAVI
@Mol3d

Feature: Mol3d

  Scenario: Mol3d applet loads in NGA
    Given I login to Savi Verification as "savi.create"
    When I open the Mol3d assessment
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons

  Scenario: Mol3d loads at standalone link
    Given I login to Savi Verification as "savi.create"
    When I click the link to Mol3d standalone
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons

  Scenario: Mol3d reports errors at faulty standalone link
    Given I return to the Savi Verification page
    When I click the link to Mol3d standalone with invalid molecule file parameter
    Then the Mol3d applet reports 2 errors
