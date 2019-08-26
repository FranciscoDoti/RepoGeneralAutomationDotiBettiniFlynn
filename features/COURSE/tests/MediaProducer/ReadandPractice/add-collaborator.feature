@Course @Smoke @Skip
Feature: Adding collaborator to the template 

    @mediaproducer-delete-course
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                      |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice MPC Template    |                  | E2E 356      | 9781464199417  | draft         |                      

        And I activate the "Read & Practice MPC Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Read & Practice MPC Template  |   E2E 356     |  Active On Date      | 

        And I add the activities in resources to "Read & Practice MPC Template" template
            | type                      | activity                                      |
            | addButtonReadandpractice  | Automation Test                               |     
            | addButtonLearningcurve    | LC1551356608988                               |
            | addReadingButton          |  GLOSSARY                                     |
    
        And I add "media_editor_1" as collaborator to "Read & Practice MPC Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Read & Practice MPC Template" is present and media editor has access to it has collaborator

        And I add the activities in resources to "Read & Practice MPC Template" template
            | type                     | activity                                      |   
            | addButtonLearningcurve   | Active and Passive Voice                      |
            | addReadingButton         |  Appendix F                                   |

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            | addButtonReadandpractice                      | ReadandParctice   | 'Automation Test' was successfully moved to addButtonReadandpractice              |                            
            | Active and Passive Voice                      | Learning Curve    | 'Active and Passive Voice' was successfully moved to Learning Curve.                |
            |  Appendix F                                   | Reading           | 'Appendix F' was successfully moved to Reading.                                     |
           
        Then I verify the following activities are present in folders
            | activity                                      | folders           |
            | Automation Test                               | ReadandPractice   |
            | Active and Passive Voice                      | Learning Curve    |
            |  Appendix F                                   | Reading           |








