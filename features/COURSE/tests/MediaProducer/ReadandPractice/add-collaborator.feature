@Course @Smoke @Skip
Feature: Adding collaborator to Read & Practice template 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Read & Practice template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Read & Practice Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Read & Practice Template  |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | LCRP1550612138614                             |     
            | addButtonLearningcurve    | LC1551301608988                               |
            | addReadingButton          |  GLOSSARY                                     |
    
        And I add "media_editor_1" as collaborator to "Read & Practice Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Read & Practice Template" is present and media editor has access to it has collaborator

        And I add the activities in resources to "Read & Practice Template" template
            | type                     | activity                                      |   
            | addButtonReadandpractice | LCRP1551301608988                             |
            | addReadingButton         |  Appendix F                                   |

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            | LCRP1551301608988                             | Learning Curve    | 'LCRP1551301608988' was successfully moved to Learning Curve.                       |
            |  Appendix F                                   | Reading           | 'Appendix F' was successfully moved to Reading.                                     |
           
        Then I verify the following activities are present in folders
            | activity                                      | folders           |
            | LCRP1551301608988                             | Learning Curve    |
            |  Appendix F                                   | Reading           |








