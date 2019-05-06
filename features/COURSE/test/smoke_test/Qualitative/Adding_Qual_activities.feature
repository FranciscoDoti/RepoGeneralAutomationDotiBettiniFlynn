Feature: Adding activities in Qual course
  
  @delete-all-courses
  Scenario: Verify that Media Producer is able to add activities in Qualitative Template (Pre-made Assessments, Learning Curve, Reading, Static File & Active Learning) 
  
    Given I click login to the Achieve product
    And I have logged in as "media_producer_2"
    And I click on "course" system "create_course" feature "button" element
    When I fill out the form to edit a new course
      | page_object        | value                   |clear|
      | course_type        | Template                |     |
      | product_model      | Qualitative             |     |
      | learning_objective | Principles of Economics |     |
      | course_name        | Qualitative Testcourse  |true |
      | course_code        | E2E 301                 |true |
      | isbn_number        | 9781464199411           |true |
      | course_status      | draft                   |     |

    And I close the popup message

    And I fill out the form to update the template from draft to Template
      | page_object      | value                                                       |clear|
      | edit_course_name | Qualitative Testcourse                                      |true |
      | edit_course_code | E2E 301                                                     |true |
      | template_status  | Active On Date                                              |     |

    And I close the popup message
     
     Then I verify the course_list data
      | page_object             | value                 | 
      | course_name             | Qualitative Testcourse| 
      | course_name_course_code | E2E 301               |
      | course_name_isbn        |  9781464199411        |

    And I click on "course" system "create_course" feature "course_card" element  
    And I click on "course" system "course_page" feature "resources" element
    And I add the activity to the course under the resources tab
        | activity                                                          | type                      |
        | Exercise: Misused words 1 (autoscored)                            | add_button_assessment     |
        | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |
 
    Then I verify the activity list in resource tab 
        | activity                                                            | 
        | Exercise: Misused words 1 (autoscored)                              |
        | Chapter 15. Monopolistic Competition and ...                        |


    

    
