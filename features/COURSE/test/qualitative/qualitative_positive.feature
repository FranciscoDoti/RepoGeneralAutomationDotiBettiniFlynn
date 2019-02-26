Feature: Qualitative Positive feature

# @delete-course
  Scenario: Verify that a Media Producer is able to create a Qualitative Template
    Then Check email for "macmillanstudent5@gmail.com" user using "ABCabc@123" password
#     Given I have opened "achieve" "login"
#     And I click on "course" system "home" feature "sign_in" element

#     And I have logged in as "media_producer_2"
#     And I click on "course" system "create_course" feature "button" element

#     When I fill out the form to edit a course
#         | page_object                   | value                                       |
#         | course_type                   | Template                                    |
#         | product_model                 | Qualitative                                 |
#         | course_name                   | Qualitative Template                        |
#         | learning_objective            | Principles of Microeconomics                |
#         | course_code                   | E2E 302                                     |
#         | isbn_number                   | 1547659765744                               |
#         | course_status                 | Draft                                       |
#     Then I verify "course" system "create_course" feature "success_message" element's "create_course_success" message is displayed
#     And I verify that the course "isbn" "1547659765744" is listed on the courses page
#     And I verify the create_course data
#         | page_object             | value                   |
#         | edit_course_name        | Qualitative Template    |
#         | edit_course_code        | E2E 302                 |
#         | edit_isbn_number        | 1547659765744           |

#     And I click on "edit_course" on "Read & Practice Template" course menu //Try to use this step in datatable
#     And I fill out the form to edit a course
#         | page_object      | value           |clear|
#         | edit_course_name | Edit Testcourse |true |
#         | edit_course_code | E2E 301         |true |
#         | template_status  | Active On Date  |     |
#     And I click on "course" system "create_course" feature "course_card" element 

#     And I add the activity to the course under the resources tab
#         | activity                                                          | type                      |
#         | Monopolistice Competition                                         | add_button_assessment     |
#         | Chapter 15. Monopolistic Competition and Product Differentiation  | add_button_learningcurve  |

#     Then I verify activity list 
#         | activity                                                          |
#         | BR15: Bridge: Monopolistic Competition                            |
#         | Chapter 15. Monopolistic Competition and Product Differentiation  |

#     Then I add the activities to the course under the course planner tab  // create a datable for this 
#     And I click on "course" system "main" feature "Achieve_home" element 
#     And I click on "copy_course" on "Read & Practice Template" course menu // add above two steps in datatable
#     And I fill out the form to edit a course
#         | page_object       | value                    |
#         | copy_course       | Read & Practice course   |
#         | copy_course_code  | E2E301                   |


#     And I login with the following credentials
#     |  username                                   | password       |
#     |  coustomer.macmillan@gmail.com              |  ABCabc@123    | 
#     And I click on "course" system "course_list" feature "search_for_course_name" element "DRAFT of Qualitative" input // use datatable for all this steps
#     And I click on "Manage_instructor" element to add instructor 
#     And I click on "course" system "create_course" feature "add_instructor" element "legud@xcodes.net" email
#     And I click on "course" system "create_course" feature "add_instructor_button" element 
#     And I click on "course" system "create_course" feature "add_instructor_close" element 


#     When I sign out of Achieve
#     And I login to Achieve
#     And I login with the following credentials
#     |  username                                     | password       |
#     |  macmillaninstructor2@gmail.com               | ABCabc@123     | 

#     When I click on "invite_students_button" element to add
#     And I copy the invite link to open course with "student_1"
#     And I click on "course" system "student_view" feature "start_grace_period" element
 
#     When I sign out of Achieve
#     When I login to Achieve
#     And I login with the following credentials
#     |  username                                     | password       |  
#     |  macmillaninstructor2@gmail.com               | ABCabc@123     |
#     And I click on the first course card
#     And I click on the course planner to assign the activity "500" points 

# Assign Instructor to course

#     And I login with the following credentials
#         |  username                                   | password       |
#         |  coustomer.macmillan@gmail.com              |  ABCabc@123    | 
#     And I click on "course" system "course_list" feature "search_for_course_name" element "DRAFT of Qualitative" input 
#     And I assign Instructor to the course
#         | username              | password   |
#         |legud@xcodes.net       | ABCabc@123 |


#     When I sign out of Achieve
#     And I login to Achieve
#     And I have logged in as "instructor_4"
#     When I click on "invite_students_button" element to add
#     And I copy the invite link to open course with "student_1"
#     And I click on "course" system "student_view" feature "start_grace_period" element

# #  Assign Activity and add points here

#     And I "sign_out" of Achieve
#     When I login to Achieve
#     And I have logged in as "instructor_4"
#     And I click on the first course card
#     And I click on the course planner to assign the activity and add points
#         |   Activity                    |   Points  |
#         |   BR13.1: Bridge: Monopoly    |   5       |
#     And I "sign_out" of Achieve
#     And I login to Achieve
#     And I have logged in as "admin_1"
#     And I search for a course and click on the first course card that appears
#         |   Course          |
#         |   Qualitative E2E |
#     And I enroll students to the current course
#         |   Student     |
#         |   student_4   |
#     And I generate a course code to the current course
#     And I "sign_out" of Achieve
#     When I login to Achieve
#     And I have logged in as "student_1"
#     And I validate the "Qualitative E2E" course is accessible to user
#     And I open the activity in the current course
#         |   Activity                    |
#         |   BR13.1: Bridge: Monopoly    | 

#     |  username                              | password       |
#     |  coursewareachieve@gmail.com           | ABCabc@123     |
#     # use datable for this too
#     And I click on "course" system "course_list" feature "search_for_course_name" element "Qualitative E2E" input
#     And I click on the first course card
#     And I enroll "student_1" to the current course
#     And I generate a course code to the current course
#     And I "sign_out" of Achieve
#     When I login to Achieve
#     And I have logged in as "student_1"
#     And I validate the "Qualitative E2E" course is accessible to user

# # I log in as a student and open the activity

#     And I have logged in as "student_4"
#     And I click on "course" system "course_list" feature "search_for_course_name" element "Qualitative E2E" input
#     And I click on the first course card
#     And I open the activity in the current course
#     |   Activity                                |
#     |   PrQ13: Practice Quiz - Ch. 13: Monopoly |
#     And I attempt to answer the questions in the current activity assignment
#     |   Question    |   Answer                                                                                  |
#     |   1           |   diamond producers limit the quantity supplied to the market.                            |
#     |   2           |   The average total cost curve for firms in the industry becomes horizontal.              |   
#     |   3           |   earns an economic profit in the long run.                                               |



#     Then I click on courseplanner and I add custom content to the course 
    
#     Then I verify the activity list  
#         | page_object                                 | value             | clear |
#         | Atwood                                      | Reading           | true  |
#         | Monopolistice Competition                   | Reading           | true  |
#         | Table: The Lemonade Market                  | Qualitative       | true  |



# I am using datatable to change the status from asigned to unassigned you can use that 

#     And I click on "course" system "courseplanner" feature "Assign_assignment_button" element

#     And I click on "course" system "courseplanner" feature "Assign_assignment_button" element


#     Then I verify "course" system "courseplanner" feature "assignment_status" element is displayed

#     And I sign out of Achieve, log in as "student_positive", and attempt an "qualitative_activity"


#     Then I verify "course" system "courseplanner" feature "activity_content" element is displayed correctly


  
#     Then I verify "course" system "courseplanner" feature "activity_content" element is displayed correctly

