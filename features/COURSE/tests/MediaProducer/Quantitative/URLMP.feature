@Course @Smoke @API
Feature: Verify that mediaProducer is able to create URL in Quantitative Template

    @delete-Courses     
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Quantitative Template

        Given I login to Achieve-CW as "media_producer_2"
        When I create a course as "media_producer_2" with the following data
            | name                                | short_name | format | status | product_model_id | is_course_template | owner_id             | course_type   | lo_framework_id                         | warn_prebuilt | isbn             | template_version  |
            | Quantitative Template               | E2E 301    | topics | draft  | 3                | true               | 0050n000002Wt0kAACA  | template      | 57ba5934-30c2-4558-b776-b4bef6954d99    |  false        |  9781464199490   |  1                |               
   
                                                    
        And I click on "COURSE TEMPLATES" tab
        And I click on "Quantitative Template" card
        And I click on "Production" Tab


        And I add URL link to "Create" 
            | field             | link                         |
            | addUrlLinkinput   | https://www.google.com       |

        Then I verify that "URL Link Added to "Your Content"." message is displayed

        When I click on go to your content

        Then I verify that activties are added in "Create"
            | activity                                      |    
            | Google                                        |

        And I add custom activity to Content Library
            | activity                                      |    
            | Google                                        |
 
        Then I verify that activties are added in "Content Library"
            | activity                                      |    
            | Google                                        |                                                        