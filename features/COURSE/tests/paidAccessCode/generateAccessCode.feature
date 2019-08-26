@Course @Smoke @Skip
Feature: Verify that paid Access code Creater is able to generate, Check and update access code

    @mediaproducer-delete-course
    Scenario: Verify that paid Access code Creater is able to generate, Check and update access code

        Given I login to Achieve-CW as "media_producer_2"
         When I create template with following data 
            | courseType  | productModel | courseName          |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills PA Template  |                  | E2E 371      | 9781464199397  | draft         |                      

        And I activate the "Skills PA Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills PA Template        |   E2E 371     |  Active On Date      |

        And I add the activities in resources to "Skills PA Template" template
            | type                     | activity                                      |    
            | addButtonLearningcurve   | LC1551371608988                               |
            | addButtonReadandpractice | Automation Test                               |

        And I sign out of Achieve

        When I login to Achieve-CW as "paid_access"

        And I generate "1" month length access code for "Skills PA Template" 

        Then I verify that access code is generated "Skills PA Template"
            | Value         |
            | Access Code   |

        When I check Access Code of "Skills PA Template" 

        Then I verify that "Skills PA Template" is displayed

        When I update the access code for "Skills PA Template"
            | AccessCode   | Value      |
            | totalInput   | 2          |

        Then I verify that "Code update successful.." message is displayed 





        
