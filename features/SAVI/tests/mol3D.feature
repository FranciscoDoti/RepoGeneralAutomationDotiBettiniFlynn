@SAVI
@Mol3d

Feature: Mol3d
 
Background: Log into Savi Verification page
Given I login to Savi Verification as "kelly.lancaster+savi"

@mol3d
  Scenario: Mol3d loads at standalone link using Pubchem smile identifier
    When I click the link to Mol3d standalone using Pubchem smile identifier
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons  

@mol3d  
  Scenario: Mol3d loads at standalone link using Pubchem name identifier
    When I click the link to Mol3d standalone using Pubchem name identifier
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons  

@mol3d
  Scenario: Mol3d loads at standalone link using RCSB Protein in Data Bank identifier
    When I click the link to Mol3d standalone using RCSB Protein in Data Bank identifier
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons   

  @mol3d 
  Scenario: Mol3d loads at standalone link using NIH Cactus identifier    
    When I click the link to Mol3d standalone using NIH Cactus identifier
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons  
  
  Scenario: Mol3d applet loads in NGA
    When I click the link to Mol3d assessment
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons

@mol3d
  Scenario: Mol3d loads at standalone link
    When I click the link to Mol3d standalone
    Then the Mol3d applet loads without errors
    Then I can click all the menu buttons 
    
  Scenario: Mol3d reports errors at faulty standalone link    
    When I click the link to Mol3d standalone with invalid molecule file parameter
    Then the Mol3d applet reports 2 errors
  

  
            

     

