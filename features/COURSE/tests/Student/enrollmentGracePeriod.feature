
@Smoke @localonly @Course
Feature: Student Enrolls in the course using Grace Period

    @mediaproducer-delete-course
    @mediaproducer-delete-courseTemplate
    Scenario:Verify that Student can enroll in the course using Grace Period

        Given I login to Achieve-CW as "media_producer_2"
        When I create template with following data 
            | courseType  | productModel      | courseName            | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Qualitative       | Qualitative Template  | macmillan calculus     | E2E 301      | 9781464199498  | draft         |                      

        And I close the popup message                      

        And I click on search button and input "Qualitative Template" to search the course                     

        And I activate the "Qualitative Template" template and add the following data
            | courseName             |  courseCode   |  templateStatus      |
            | Qualitative Template   |   E2E 301     |  Active On Date      | 

        And I click on "Qualitative Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities                                 |
          | Glossary                                   |
          | Exercise: Misused words 1 (autoscored)     |
        
        And I click on back to course

        And I click on home button to return to coursepage
        And I click on "COURSE TEMPLATES" tab 
        And I copy course from the "Qualitative Template" template with the following data
            | courseName          | courseCode           |
            | Qualitative Course  | E2E 301              |


        And I sign out of Achieve
        And I login to Achieve-CW as "customer_support_1"
        And I assign "instructor_1" to the "Qualitative Course" course
        And I sign out of Achieve

        And I login to Achieve-CW as "instructor_1"

        When I activate "Qualitative Course" course with following data 
            | field             | value                        |
            | courseName        | Qualitative Course           |
            | courseCode        |  E2E 301                     |
            | templateStatus    |  Active On Date              |

        And I enroll "student_1" in "Qualitative Course" using Grace Period
        And I click on home button to return to coursepage

        Then I verify that student is enrolled in "Qualitative Course"


          



     
        

    