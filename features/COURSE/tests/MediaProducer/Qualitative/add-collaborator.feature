@Course @Smoke @Skip
Feature: Adding collaborator to the template 

    @mediaproducer-delete-course
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to the template

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      


        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I add the activities in resources to "Qualitative Template" template
            | type                    | activity                                      |
            | addButtonAssessment     | Exercise: Misused words 1 (autoscored)        |     
            | addButtonLearningcurve  | LC1551301608988                               |
            | addReadingButton        |  Analyzing Drama                              |
       
        And I add "media_editor_1" as collaborator to "Qualitative Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Qualitative Template" is present and media editor has access to it has collaborator

        And I add the activities in resources to "Qualitative Template" template
            | type                     | activity                                      |
            | addButtonAssessment      | BR19.2: Bridge: Income Distribution           |     
            | addButtonLearningcurve   | Active and Passive Voice                      |
            | addReadingButton         |  Appendix F                          |

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            | BR19.2: Bridge: Income Distribution           | Assesment         | 'BR19.2: Bridge: Income Distribution' was successfully moved to Assesment.          |
            | Active and Passive Voice                      | Learning Curve    | 'Active and Passive Voice' was successfully moved to Learning Curve.                |
            |  Appendix F                                   | Reading           | ' Appendix F' was successfully moved to Reading.                                    |
           
        Then I verify the following activities are present in folders
            | activity                                      | folders           |
            | BR19.2: Bridge: Income Distribution           | Assesment         |
            | Active and Passive Voice                      | Learning Curve    |
            |  Appendix F                                   | Reading           |








