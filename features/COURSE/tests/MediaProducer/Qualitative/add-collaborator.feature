@Course @Smoke @Skip
Feature: Adding collaborator to Qualitative template 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media producer is able to add collaborator to template and verify that media editor has access to Qualitative template

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
            | addReadingButton        |  Glossary                                     |
       
        And I add "media_editor_1" as collaborator to "Qualitative Template"
        And I sign out of Achieve
        And I login to Achieve-CW as "media_editor_1"

        Then I verify that "Qualitative Template" is present and media editor has access to it has collaborator

        And I add the activities in resources to "Qualitative Template" template
            | type                     | activity                                      |
            | addReadingButton         | Delirium                                      |     
            | addButtonReadandpractice   | LCRP1551301608988                           |
    

        And I add the following activities to respective folders in resource tab
            | activity                                      | folders           | message                                                                             |
            |  Delirium                                     | Reading           | 'Delirium' was successfully moved to Reading.                                       |
            | LCRP1551301608988                             | Learning Curve    | 'LCRP1551301608988' was successfully moved to Learning Curve.                             |
    
           
        Then I verify the following activities are present in folders
            | activity                                      | folders           |
            | Delirium                                      | Reading           |
            | LCRP1551301608988                             | Learning Curve    |
          








