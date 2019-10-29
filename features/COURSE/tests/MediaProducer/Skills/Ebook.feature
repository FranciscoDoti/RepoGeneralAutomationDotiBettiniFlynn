Feature: Verify that Admin is able to add activities in Ebook

    Scenario: Admin add the activities in ebook tab

       Given I login to Achieve-CW as "media_producer_2"
       When I create template with following data 
            | courseType  | productModel      | courseName                 | learningObjective      | courseCode   | isbnNumber     | courseStatus  |
            | Template    | Skills            | Skills Production Template | macmillan calculus     | E2E 301      | 9781464199499  | draft         |

        And I close the popup message                      

        And I click on search button and input "Skills Production Template" to search the course

        And I activate "Skills Production Template" template and add the following data
            | courseName                    |  courseCode   |  templateStatus      |
            | Skills Production Template    |   E2E 301     |  Active On Date      | 
        

        And I click on "Skills Production Template" card
        And I click on "Production" Tab

        And I add activities to "Content Library"
          | activities            |
          | Glossary              |
          | Appendix F            |
          | Literary Elements     |
          | Confidence Intervals  |
          | Psychopathology       |

        And I add the activities in "E-book"
            | activities |
            | Glossary   |
            | Appendix F |

        Then I verify that activities are added in "E-book" and not in "Course Plan"
            | activities |
            | Glossary   |
            | Appendix F |
    And I sign out of Achieve

    Scenario:  Admin add activities in courseplan and not in ebook

       Given I login to Achieve-CW as "media_producer_2"

       When I search for "Skills Production Template" and click on course card
       And I click on "Production" Tab

       And I add activities in "Course Plan" 
            | activities           |
            | Literary Elements    |
            | Confidence Intervals |

        Then I verify that activities are added in CoursePlan and not in eBook
            | activities                    |
            | Literary Elements             |
            | Confidence Intervals          |
        And I sign out of Achieve

    Scenario: Verify that Admin is able to add reading activities both in eBook and Course plan
        Given I login to Achieve-CW as "media_producer_2"

        When I search for "Skills Production Template" and click on course card
        And I click on "Production" Tab

         And I add the activities in both "Course Plan" and "E-book"
            | activities            | tab               |
            | Glossary              | CoursePlanEbook   |
            | Appendix F            | CoursePlanEbook   |
            | Literary Elements     | CoursePlanEbook   |
            | Confidence Intervals  | CoursePlanEbook   |
            | Psychopathology       | All               |

        Then I verify that activities are added both in "E-book" and "Course Plan" 
            | activities            |
            | Glossary              |
            | Appendix F            |
            | Literary Elements     |
            | Confidence Intervals  |
            | Psychopathology       |
        And I sign out of Achieve


    Scenario: Verify that Admin is able to create Folder, reorder and delete Folder in ebook 

        Given I login to Achieve-CW as "media_producer_2"

        When I search for "Skills Production Template" and click on course card
        And I click on "Production" Tab

        And I create folder and add the activities to the folder in "E-book" 
            | Folder       | activities             | PlaceFolder           |
            | Reading 1    |  Psychopathology       | Reading 1 folder      |
            | Reading 2    | Appendix F             | Reading 2 folder      |
            | Reading 3    | Glossary               | Reading 3 folder      |
            | Reading 4    | Confidence Intervals   | Reading 4 folder      |
            | Reading 5    | Literary Elements      | Reading 5 folder      |

        Then I verify that activities are added to the folder 
            | Folder        | activities             |
            | Reading 5     | Literary Elements      |
            | Reading 1     | Psychopathology        |
            | Reading 2     | Appendix F             |
            | Reading 3     | Glossary               |
            | Reading 4     | Confidence Intervals   |

        When I Reorder The folders
            | Folder    |   Button              |
            | Reading 1 |   moveToTop           |
            | Reading 2 |   moveUpButton        |
            | Reading 2 |   moveUpButton        |
            | Reading 3 |   moveUpButton        |
            | Reading 5 |  moveToEnd            |  

        Then I verify that Folders are reordered 
            | Folder                                                            | orderNumber    |
            | Reading 1                                                         |  1             |                                                       
            | Reading 2                                                         |  2             |
            | Reading 3                                                         |  3             |
            | Reading 4                                                         |  4             |
            | Reading 5                                                         |  5             |

        When I delete the folder 
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            | Reading 4  |
            | Reading 5  |

        Then I verify that Folders are deleted
            | Folder     |
            | Reading 1  |
            | Reading 2  |
            | Reading 3  |
            | Reading 4  |
            | Reading 5  |

    Scenario: Verify that admin is able to delete the template 

        Given I login to Achieve-CW as "media_producer_2"

        When I search for "Skills Production Template" course

        And I delete the "Skills Production Template"

        Then I verify that "Skills Production Template" is deleted

