Feature: Paid access code creater is able to generate access code 
    @delete-all-courses
    Scenario: Verify that paid access code creator is able to generate access codes for Quantitative Template

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
            | isbn_number                   | 9781464199411                               |
            | course_status                 | Draft                                       |
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Quantitative  Template                                      |true |
            | edit_course_code | E2E 302                                                     |true |
            | template_status  | Active On Date                                              |     |
        And I close the popup message

        Then I verify the course_list data
            | page_object             | value                 | 
            | course_name             | Quantitative Template |
            | course_name_course_code | E2E 302               | 
            | course_name_isbn        | 9781464199411         | 
        And I close the popup message
        And I click on "course" system "create_course" feature "course_card" element  
        And I click on "course" system "course_page" feature "resources" element
        And I add the activity to the course under the resources tab
            | activity                                                          | type                      |
            | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
            | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
        
         And I click on "course" system "main" feature "achieve_home" element

         And I fill out the form to copy a course
            | page_object       | value                    | clear |
            | copy_course       | Quantitaive Testcourse   | true  |
            | copy_course_code  | E2E302                   | true  |
        
        And I close the popup message
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse" input 
        And I assign "instructor_1" to the course


        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I fill out the form to update the status of course to active 
        | page_object      | value                   | clear |
        | edit_course_name | Quantitative Testcourse | true  |
        | edit_course_code |  E2E301                 | true  |
        | template_status  |  Active On Date         |       |

        And I close the popup message
        And I "sign_out" of Achieve
        And I click login to the Achieve product
         And I have logged in as "paid_access"

        And I click on "course" system "course_list" feature "search" element "Quantitative Testcourse" input

        When I generate access code
            | page_object       | value |
            | single_use_code   |    1  |
            | length_access     |    1  |



