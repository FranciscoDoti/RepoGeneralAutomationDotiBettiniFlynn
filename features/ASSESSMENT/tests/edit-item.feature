@Assessment @AMS @EditItem @Smoke
Feature: To create and update a single raptor items in AMS

    @EditItemOnce
    Scenario: Instructor creates and updates a single item in AMS

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type     |
            | NGA QA Test MC Item | Multiple Choice |

        And I update single items by title with the following details in AMS
            | Title               | Topic Level 1 | Topic Level 2 | Topic Level 3        | Topic Level 4 | Topic Level 5                  | Taxonomy Level 1 | Taxonomy Level 2 | Difficulty | Status |
            | NGA QA Test MC Item | Algebra       | Math Review   | CHAPTER 0 All Topics | All Topics    | Your Questions (uncategorized) | Algebra          | Math Review      | Easy       | Live   |

        Then I verify the details of the following items are displayed in AMS
            | Author Mode | Title               | Topic                          | Taxonomy    | Difficulty | Module Type | Status |
            | Raptor      | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   |

    @EditItemTwice
    Scenario: Instructor creates and updates twice a single item in AMS

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type     |
            | NGA QA Test MC Item | Multiple Choice |

        And I update single items by title with the following details in AMS
            | Title               | Topic Level 1 | Topic Level 2 | Topic Level 3        | Topic Level 4 | Topic Level 5                  | Taxonomy Level 1 | Taxonomy Level 2 | Difficulty | Status |
            | NGA QA Test MC Item | Algebra       | Math Review   | CHAPTER 0 All Topics | All Topics    | Your Questions (uncategorized) | Algebra          | Math Review      | Easy       | Live   |

        And I verify the details of the following items are displayed in AMS
            | Author Mode | Title               | Topic                          | Taxonomy    | Difficulty | Module Type | Status |
            | Raptor      | NGA QA Test MC Item | Your Questions (uncategorized) | Math Review | easy       | MC          | live   |

        And I update single items by title with the following details in AMS
            | Title               | Topic Level 1 | Topic Level 2                         | Topic Level 3                       | Topic Level 4                                                                          | Topic Level 5   | Taxonomy Level 1 | Taxonomy Level 2                      | Difficulty | Status    |
            | NGA QA Test MC Item | Astronomy     | Comins 10e - Discovering the Universe | CHAPTER 1 Discovering the Night Sky | 1-2 Well-known constellations make locating more obscure stars and constellations easy | Observing Tools | Astronomy        | Comins 10e - Discovering the Universe | Hard       | In Review |

        Then I verify the details of the following items are displayed in AMS
            | Author Mode | Title               | Topic           | Taxonomy                              | Difficulty | Module Type | Status    |
            | Raptor      | NGA QA Test MC Item | Observing Tools | Comins 10e - Discovering the Universe | hard       | MC          | in review |

    @EditItemDefaultValues
    Scenario: Instructor creates and updates a single item in AMS and verifies default values

        Given I login to AMS as "all-permissions-author"
        When I create the following draft Raptor items in AMS
            | Title               | Module Type     |
            | NGA QA Test MC Item | Multiple Choice |

        Then I verify the details of the following items are displayed in the Item Details modal
            | Author Mode | Title               | Taxonomy      | Difficulty | Status      | Item Type   |
            | author      | NGA QA Test MC Item | Question Bank | medium     | in progress | performance |
