Feature: Verify that mediaProducer is able to create URL

    @delete-all-courses
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Quantitative course

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

         When I fill out the form to edit a new course
            | page_object                   | value                                       |
            | course_type                   | Template                                    |
            | product_model                 | Quantitative                                |
            | course_name                   | Quantitative Template                       |
            | learning_objective            | macmillan calculus                          |
            | course_code                   | E2E 302                                     |
            | isbn_number                   | 9036787554164                               |
            | course_status                 | Draft                                       |

        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative Template                                       |true |
            | edit_course_code | E2E 302                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message

        Then I verify the course_list data
            | page_object             | value                 | 
            | course_name             | Quantitative Template |
            | course_name_course_code | E2E 302               | 
            | course_name_isbn        | 9781464199441         | 

        And I click on create custom button to add URL link 
            | Pagedef           | link                     |
            | add_url_link      | http://www.cnn.com       |


        When I click on "course" system "resources_page" feature "goTocontent" element

        And I add custom made activities in resource tab
            | activity                                    |
            | CNN - Breaking News, Latest News and Videos |

        Then I verify the activity list in resource tab 
            | activity                                                            | 
            | CNN - Breaking News, Latest News and Vid ...                        |

        And I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | URL Link                                                            |
            

    
        
        
         



        



