Feature: R&P happy path workflow 1

Media Producer creates a course
   
Background:
        Given I have opened Achieve "loginURL"
    
    Scenario: Create course in Achieve for "Bookname??"
        When I have logged in as "media_producer_1"
        When I click the create_course button to create course
        When save the value to variable
            |variablename        | value    |
            |course_type         | Template |
            |product_model       | Read & Practice |
            |course_name         | TestCourse |
            |course_code         | E2E 101 |
            |isbn_number         | 9781464199495 |
            |course_status       | draft |
        When I elect to create a course with the following data:
            #|courseType | ProductModel    | courseName              | courseCode        | ISBN           | courseStatus | cancelBtn | saveBtn |
            #| Template  | Read & Practice | [$course.templatename] |  [$course.code]   | [$course.ISBN] | Draft        | NA        | Click   |
        #Then I validate that the course "$course.templatename" is listed in the courses page
        #And I create a folder named <folderName> on the resources screen
        And I create a folder named on the resources screen
            #| folderName |
            #| Chapter 1  |
            #| Chapter 2  |
        Then I will add the following content to the resource page:
            #| contentName                                  | 
            #| Chapter 1. Introduction and Research Methods |
            #| Chapter 1. Background to the Study of Psychology |
            #| Chapter 1. The People and the Field |
            #| Chapter 2: North America |
    
        Then I move the activity named to the folder named
        #And I move the activity named <activity> to the folder named <folderName>
            #| activityName                                     | folderName |
            #| Chapter 1. Introduction and Research Methods     | Chapter 1  |
            #| Chapter 1. Background to the Study of Psychology | Chapter 1  |
            #| Chapter 1. The People and the Field              | Chapter 1  |
            #| Chapter 2: North America                         | Chapter 2  |

        Then I reorder the items on the course resource page to be in this order:
            #| itemName  |
            #| Chapter 1 |
            #| Chapter 2 |
        And I sign out of Achieve
    

    Scenario: Convert a template from a draft to a Template
        When I have logged in as "media_producer_1"
        And I click on open menu
        When I elect to edit the course named "course1.templatename"
        When save the value to variables 
            |variablesname     | value |
            |Template_status   | Active On Date |
            |Active_Date       | @Date('now')   |
        When I elect to edit the course with the following data:
            #|courseStatus   | activeOnDate   | saveBtn |
            #| Template      | @Date('now')   | Click   |
        Then I validate that the course card named "course1.templatename" exists on the course page with the status of "Template"
        And I click on course card "Testcourse" template
        And I click on Resource tab
        And add content into chapter 
        And I click on Activity search button and enter "Introduction and Resarch Methods"
        And I click on add content 
        And I click on Activity search button and enter "American Experiments"
        And I click on add content 
        And I click on Activity search button and enter "Personality Development in Adulthood"
        And I click on add content
        And I click on Activity search button and pass the value "do not use"
        And I click on add content
        And I click on Activity search button and pass the value "DECIMALS"
        And I click on add content 
        And I click on Activity search button and pass the value "How to Read a Graph"
        And I click on add content 
        And I click on Activity search button and pass the value "LO asset verification Edited"
        Then I reorder the items
        And I sign out of Achieve

    Scenario: Assign the course to an instructor
        When I have logged in as "admin_alt" 
        When I search for "Testcourse"
        And  I click on open menu
        Then I copy the course named "Testcourse" to the name "E2E101"
        When I search for "E2E101"
        And I click on open menu
        Then I open the Manage Instructors page on the course named "$course1.name"
        Then I manage the instructors on the course and add the "instructor_1" loginUser
        And I validate that the Course Specific Link opens the course named "$course1.name"
        And I close the Manage Instructors page
        And I sign out of Achieve
        

    Scenario: As an instructor, login and mange the course settings and invite students
        When I have logged in as "instructor_1"
        And I click on open menu
        And I elect to edit the course named "$course1.name"
        When save the values to course  
            |values             | course|
            |Template_status    | Active On Date |
            |Active_Date        | @Date('now')   |
            |course_end_date    | @Date('+1m')   |
        And I elect to edit the course with the following data
                 #|courseStatus         | activeOnDate   | courseEndDate |saveBtn  |
                #| Active On Date      | @Date('now')   | @Date('+1m')  | Click   |
        And I click on open menu
        Then I capture the invite link and store to variable "inviteLink"
        Then I populate the Invite Students "student" page 
             #| inviteBtn | sendEmailBtn | emailList                     | cancelBtn | sendInvitesBtn |
             #| NA        | Click        | "$loginStudent1.email_address"| NA        | Click          |
        And I click on course card "E2E101"
        And I click on Resource tab of Testcourse
        And I click on Open Folder
        Then I click on Read and Practice 
        And I click on Target points
        And I click on Read&Practice
        And I click on Resource tab of Testcourse
        And I click on courseplanner
        And I click on Open Folder for activity
        And I click on chapter 1 R&P folder
        And I elect to assign the course
        And assign the values to variable
                |values           | variable |
                |Date_assign      | @Date('now') |
                |Time_Hour        | 12         |
                |Time_minute      |  30         |
                |Time_period      | AM          |
                |points_minimum   | 5           |
                |Assign_button    | click |
        And I elect it with the following data:
        And I sign out of Achieve
    
    Scenario: Enroll into course with link and access code
        Given I have opened Achieve "ThirdpartyURL"
        When I log in as "student"
        And I open the invite link and login with "student" account details
        And I click on Purchase read&Practice button

        #Then validate that the following information is correct on the Course Access Code page
           # |courseName     | courseCode    | Instructor         | accessType      |
           # | $course1.name | $course1.code | $instructor1.email | [$course.pm]    |

  
    Scenario: Student enroll in the class and takes the quiz after reading the content assigned to the student in read&practice activity 
        When I have logged in as "student"
        And I click on course card "E2E101"
        And I click on Resuource tab
        And I click on Open Folder
        Then I click on Read and Practice 
        And I click on the reading material and validate whether the content is available 
        And I start the quiz 
        And I answer the questions
        And I click on submit button
        #And I click on alert message
        #And I answer the questions
        #And I click on submit button
        #And I validate the content 
        #And I click on close message
        #And I click on Read&Practice
        # And I click on Gradebook
    
    
        




        
   

    

    



        
        



    








   