Feature: Creating Custom made activity in Qual

    @delete-all-courses
    Scenario: Verify that instructor is able to add a custom created assessment activity in a Instructor created course from Skills course 
     Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object       | value                  |
            | course_type       | Template               |
            | product_model     | Skills                 |
            | course_name       |  Skills Template       |
            | Taxonomy_skills   | Study Island           |
            | course_code       | E2E 401                |
            | isbn_number       | 9781464199497          |
            | course_status     | draft                  |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Skills Template                                             |true |
            | edit_course_code | E2E 401                                                     |true |
            | template_status  | Active On Date                                              |     | 
        And I close the popup message

        And I fill out the form to copy a course
            | page_object       | value                         | clear |
            | copy_course       | Skills Testcourse test        | true  |
            | copy_course_code  | E2E301                        | true  |

        And I close the popup message
        And I "sign_out" of Achieve
        And  I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Skills Testcourse test" input
        And And I assign "instructor_1" to the course
            | username                         | password   |
            | macmillaninstructor3@gmail.com   | ABCabc@123 |

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1" 

        And I click on create custom button to add URL link in courseplanner
            | Pagedef           | link                     |
            | add_url_link      | http://www.cnn.com       |

        When I click on "course" system "resources_page" feature "goTocontent" element

        And I add custom made activities in courseplanner
            | activity                                              |
            | CNN - Breaking News                                   |
        
       Then I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | URL Link                                                            |
            

    
 


    
        
        
         



        


        

       