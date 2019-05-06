Feature: Student completes Learning curve activity 

    @delete-all-courses
    Scenario: Verify that student is able to complete the learning curve activity


    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element

    When I fill out the form to edit a new course
      | page_object        | value                   |clear|
      | course_type        | Template                ||
      | product_model      | Qualitative             ||
      | learning_objective | Principles of Economics ||
      | course_name        | Qualitative Testcourse  |true |
      | course_code        | E2E 301                 |true |
      | isbn_number        | 9781464199497           |true |
      | course_status      | draft                   ||

    And I fill out the form to update the template from draft to Template
      | page_object      | value                                                       |clear|
      | edit_course_name | Qualitative Testcourse                                      |true |
      | edit_course_code | E2E 301                                                     |true |
      | template_status  | Active On Date                                              |     |
     
     Then I verify the course_list data
      | page_object             | value                      | 
      | course_name             | Qualitative Testcourse     | 
      | course_name_course_code | E2E 301                    |
      | course_name_isbn        |  9781464199497             |

    When I click on "course" system "create_course" feature "course_card" element  
    And I click on "course" system "course_page" feature "resources" element
    And I add the activity to the course under the resources tab
        | activity                                                          | type                      |
        |Exercise: Misused words 1 (autoscored)                             | add_button_assessment     |
        | LC1551301608988                                                   | add_button_learningcurve  |

    And I click on "course" system "main" feature "achieve_home" element 
    And I fill out the form to copy a course
      | page_object       | value                      |clear|
      | copy_course       | Qualitative Testcourse Tc  |true |
      | copy_course_code  | E2E301                     |true |

    And I close the popup message

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "customer_support_1"
        
    And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse Tc" input 
    And I assign "instructor_1" to the course
       
    And I "sign_out" of Achieve
    And I click login to the Achieve product 
    And I have logged in as "instructor_1"

     When I fill out the form to update the status of course to active 
        | page_object      | value                     | clear |
        | edit_course_name | Qualitative Testcourse Tc | true  |
        | edit_course_code |  E2E301                   | true  |
        | template_status  |  Active On Date           |       |
    
    And I close the popup message
    And I click on "course" system "create_course" feature "course_card" element
    
    And I add the activities in courseplanner
        | activity                                                          | 
        | BR15: Bridge: Monopolistic Competition                            |                                                        
        | LC1551301608988                                                   |
        
    And I add custom made activities in courseplanner
        | activity                           |
        | Qual Test                          |

    And I click on the course planner to assign the activity and add points
        | Activity                                                             |   Points  |
        | LC1551301608988                                                      |   5       |

    Then I verify activity staus
        | Activity                                                          | Status |
        | LC1551301608988                                                   |  Open  |

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "admin_1"
        
    And I click on "course" system "course_list" feature "search" element "Qualitative Testcourse Tc" input 
    And I enroll the "student_6" in the course 
       
    And I click on "course" system "home" feature "close_alert" element 

    And I "sign_out" of Achieve
    And I click login to the Achieve product
    And I have logged in as "student_6"

    And I open the activity in the current course
        |   Activity                                |
        |  LC1551301608988                          |


    

