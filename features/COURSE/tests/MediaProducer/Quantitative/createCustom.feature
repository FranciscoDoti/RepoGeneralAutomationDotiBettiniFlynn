
@Course @Smoke @Skip
Feature: Verify that media Producer is able to create Custom Task 

    @mediaproducer-delete-courseTemplate
    Scenario: Verify that media Producer is able to create Custom Task in Quantitative Template 
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative | Quantitative Template  | Principles of Microeconomics      | E2E 301      | 9781464199498  | draft         |

        
        And I close the popup message                      

        And I click on search button and input "Quantitative Template" to search the course     

        And I activate the "Quantitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Quantitative Template  |   E2E 301     |  Active On Date      | 


        And I click on "Quantitative Template" card
        And I click on "Production" Tab

        And I create Custom Assesment Task in "Create" Tab
            | activity           | value                                    |
            | assignmentTitle    | Quant Test                               |
            | taxonomy           | Interactive General Chemistry V1         |
            | assignmentType     | Test/Quiz                                |

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Quant Test                                    |

        And I add custom activity to Content Library
            | activity                                      |    
            | Quant Test                                    |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Quant Test                                    |
