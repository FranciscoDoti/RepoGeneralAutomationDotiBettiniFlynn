@Course @Smoke @Skip
Feature: Verify that media Producer is able to create Custom Task Qualitative template 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media Producer is able to create Custom Task in Qualitative Template
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative  | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course                     

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I create Custom Assesment Task in "Create" Tab
            | activity           | value                                    |
            | assignmentTitle    | Qual Test                                |
            | taxonomy           | Interactive General Chemistry V1         |
            | assignmentType     | Test/Quiz                                |

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Qual Test                                     |

        And I add custom activity to Content Library
            | activity                                      |    
            | Qual Test                                     |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Qual Test                                     |

       



        