Feature: Verify that mediaProducer is able to create URL

  
    Scenario: Verify that mediaproducer is able to create a custom task with URL in Qual course

        Given I login to Achieve-CW as "media_producer_2"
        When I create "Qualitative Template" with the data
            | field             | value                        |
            | courseType        | Template                     |
            | productModel      | Qualitative                  |
            | courseName        | Qualitative Template         |
            | learningObjective | Principles of Microeconomics |
            | courseCode        | E2E 301                      |
            | isbnNumber        | 9781464199498                |
            | courseStatus      | draft                        |

        And I activate the "Qualitative Template" template and add the following data
            | field            | value                                                       |
            | courseName       | Qualitative Template                                        |       
            | courseCode       | E2E 301                                                     |
            | templateStatus   | Active On Date                                              |

        And I click on create custom button to add URL link 
            | Pagedef           | link                     |
            | add_url_link      | http://www.cnn.com       |

        When I click on "course" system "resources_page" feature "goTocontent" element

        And I add custom made activities in resource tab
            | activity                                    |
            | CNN - Breaking News, Latest News and Videos |

        Then I verify the activity list in resource tab 
            | activity                                                            | 
            | CNN - Breaking News, Latest News and Vid ...                        |

        And I verify that custom activity is present in courseplanner your content section
            | activity                                                            | 
            | URL Link                                                            |