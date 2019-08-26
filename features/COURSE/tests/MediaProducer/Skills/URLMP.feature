@Course @Smoke
Feature: Verify that mediaProducer is able to create URL

   @mediaproducer-delete-course
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Qual course

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel | courseName             |learningObjective | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills       | Skills MPURL Template  |                  | E2E 371      | 9781464199398  | draft         |                      

        And I activate the "Skills MPURL Template" template and add the following data
            | courseName                |  courseCode   |  templateStatus      |
            | Skills MPURL Template     |   E2E 371     |  Active On Date      |

        And I add URL link to "Skills MPURL Template" 
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