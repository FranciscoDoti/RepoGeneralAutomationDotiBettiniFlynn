@Course @Smoke
Feature: Customer Support attempts all the activities in Read & Practice Template

    @custmersupport-delete-course
    Scenario: Verify that Customer Support is able to create course from Read & Practice Template
    
        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName                  |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Read & Practice   | Read & Practice Template    |                  | E2E 301      | 9781464199498  | draft         |                      

        And I activate the "Read & Practice Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Read & Practice Template                                    |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I add the activities in resources to "Read & Practice Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551301608988                               |
            | addReadingButton         | Dedication                                    |
            | addButtonReadandpractice | LCRP1550612138614                             |

        And I sign out of Achieve
        
        And I login to Achieve-CW as "customer_support_1"
        And I click on search button and input "Read & Practice Template" to search the course
                
        And I copy course from the "Read & Practice Template" template with the following data
            | field             | value                        |
            | courseName        | Read & Practice Course       |
<<<<<<< HEAD
            | courseCode        | E2E 301                       |
=======
            | courseCode        | E2E 301                      |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8

        And I click on search button and input "Read & Practice Course" to search the course
        
        Then I verify that "Read & Practice Course" is created with following data
            | field                 | value                     |
            | courseName            | Read & Practice Course    |
<<<<<<< HEAD
            | courseDate            |  E2E 301                   |
=======
            | courseDate            |  E2E 301                  |
>>>>>>> 803e85fe0dad639d7cde8e6de6eaa15bfaeae6f8
           
        