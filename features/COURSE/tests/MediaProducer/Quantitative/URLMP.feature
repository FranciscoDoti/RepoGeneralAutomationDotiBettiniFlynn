@Course @Smoke
Feature: Verify that mediaProducer is able to create URL

   @mediaproducer-delete-course
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Qual course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel       | courseName                   | learningObjective                 | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Quantitative       | Quantitative MPUrl Template  | Principles of Microeconomics      | E2E 355      | 9781464199418  | draft         | 

        And I activate the "Quantitative MPUrl Template" template and add the following data
            | courseName                   |  courseCode   |  templateStatus      |
            | Quantitative MPUrl Template  |   E2E 355     |  Active On Date      | 


        And I add URL link to "Quantitative MPUrl Template" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"" message is displayed

        And I add URL activity in resource tab
            | activity                                    |
            | Google                                      |

        Then I verify that activties are added 
            | activity                                                            | 
            | Google                                                              |

        And I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | Google                                                              |                                                         