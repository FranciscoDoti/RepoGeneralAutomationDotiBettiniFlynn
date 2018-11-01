Feature: R&P happy path workflow 2


Background:
        Given I have opened Achieve "loginURL"

  Scenario: Create Course in Achieve for Writing 
        When I have logged in as "media_producer_2"
         When I click the create_course button to create course
        And I elect to create a course for writing with the following data:
            |variable            | values    |
            |course_type         | Template  |
            |product_model       | Skills    |
            |course_name         | TestCourse Writer's Help 3.0 |
            |course_code         | E2E 201   |
            |isbn_number         | 9781464199496 |
            |course_status       | draft         |
        Then I validate that the course "$course.templatename" is listed in the courses page
        And I click on course card and Resource tab
        And I add the content in the chapters
        And I reorder the content
        And I sign out of Achieve
       
    Scenario: Convert a Skills template from a draft to a Template
        When I have logged in as "media_producer_2"
        When I click on open menu 
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
            #|courseStatus   | activeOnDate   | saveBtn |
            #| Template      | @Date('now')   | Click   |
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I sign out of Achieve

    Scenario: Assign the course to an instructor
        When I have logged in as "admin_alt" 
        When I search for "TestCourse Writer's Help 3.0"
        And  I click on open menu
        Then I copy the course named "TestCourse Writer's Help 3.0" to the name ""
        When I search for ""
        And I click on open menu
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve

