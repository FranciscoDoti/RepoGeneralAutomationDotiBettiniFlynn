Feature: Verify that customer support is able to create URL

    @delete-all-courses
    Scenario: Verify that customer support is able to create a custom tsak with URL in Quant course
        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element
        When I fill out the form to edit a new course
            | page_object                   | value                                       |
            | course_type                   | Template                                    |
            | product_model                 | Qualitative                                 |
            | course_name                   | Qualitative Template                        |
            | learning_objective            | Principles of Microeconomics                |
            | course_code                   | E2E 302                                     |
            | isbn_number                   | 1547659765791                               |
            | course_status                 | Draft                                       |
        And I close the popup message
   
        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Qualitative Template                                        |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I close the popup message
        And I fill out the form to copy a course
            | page_object       | value                         |clear|
            | copy_course       | Qualitative Testcourse test   |true |
            | copy_course_code  | E2E301                        |true |

        And I "sign_out" of Achieve

        And I click login to the Achieve product
        And I have logged in as "customer_support_1"

        When I click on "course" system "course_list" feature "search" element "Qualitative Testcourse test" input

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
            

    
 


    
        
        
         



        


        

       