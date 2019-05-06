Feature: Paid access code creater is able to generate access code 

    @delete-all-courses
    Scenario: Verify that paid access code creator is able to generate access codes for Read and Practice Template

        Given I click login to the Achieve product
        And I have logged in as "media_producer_2"
        And I click on "course" system "create_course" feature "button" element

        When I fill out the form to edit a new course
            | page_object   | value                    |
            | course_type   | Template                 |
            | product_model | Read & Practice          |
            | course_name   | Read & Practice Template |
            | course_code   | E2E 301                  |
            | isbn_number   | 9781464199411            |
            | course_status | draft                    |
        
        And I close the popup message

        And I fill out the form to update the template from draft to Template
            | page_object      | value                                                       |clear|
            | edit_course_name | Read & Practice Template                                    |true |
            | edit_course_code | E2E 301                                                     |true |
            | template_status  | Active On Date                                              |     |

        And I verify the course_list data
            | page_object             | value                    |
            | course_name             | Read & Practice Template |
            | course_name_course_code | E2E 301                  |
            | course_name_isbn        | 9781464199411            |

        And I close the popup message
        
        And I click on "course" system "create_course" feature "course_card" element 
    
        And I click on "course" system "course_page" feature "resources" element   
        And I add the activity to the course under the resources tab
            | activity                                                          | type                        |
            | communicating courteously                                         | add_reading_button          |                                                        
            | LC1551301608988                                                   | add_button_learningcurve    |
            | LCRP1550612138614                                                  | add_button_readandpractice  |

        And I click on "course" system "main" feature "achieve_home" element 
        And I fill out the form to copy a course
            | page_object       | value                        | clear |
            | copy_course       | Read & Practice course Test  | true  |
            | copy_course_code  | E2E301                       | true  |

        And I close the popup message 

        And I "sign_out" of Achieve
        Given I click login to the Achieve product
        And I have logged in as "customer_support_1"
        
        And I click on "course" system "course_list" feature "search" element "Read & Practice course Test" input 
        And I assign "instructor_1" to the course

        And I "sign_out" of Achieve
        And I click login to the Achieve product 
        And I have logged in as "instructor_1"

        When I fill out the form to update the status of course to active
            | page_object      | value                    | clear |
            | edit_course_name | read and practice course | true  |
            | edit_course_code |  E2E301                  | true  |
            | template_status  |  Active On Date          |       |

        And I close the popup message
        And I click on "course" system "create_course" feature "course_card" element 

        And I add the activities in courseplanner
            | activity                                                          | 
            | communicating courteously                                         |                                                         
            | LC1551301608988                                                   | 
            | LCRP1550612138614                                                  |

        And I assign the activities in courseplanner
            | activity                                                          | verify | Points | 
            | LC1551301608988                                                   | true   | 5      |
            | LCRP1550612138614                                                  | true   | 5      | 
            | communicating courteously                                         | true   | 5      | 
 
        And I "sign_out" of Achieve
        And I click login to the Achieve product
        And I have logged in as "paid_access"

        And I click on "course" system "course_list" feature "search" element "read and practice course" input

        When I generate access code
            | page_object       | value |
            | single_use_code   |    1  |
            | length_access     |    1  |

        Then I verify the expoted list as "1" access code based on single use code

