@Module @NameAPIBeingTested @TestSuiteType @TestGroupName
Feature: To verify the request and reponse from sample API

    @NamesofTheAPIBeingCalled @PriorityOfTest @ParameterSelections
    Scenario: Check if user is able to submit a GET API request
        Given I create a course template with as "admin_1" with the following data
            | is_course_template | name                     | short_name | status |
            | true               | Qualitative URL Template | E2E 301    | draft |
# | productModel      | learningObjective      | isbnNumber     |
# | Qualitative       | macmillan calculus     | 9781464199499  |

# @AllPossibleCombinations
# Scenario: verify the response

# Scenario: verify the reponse code

# @SelfContained
# Scenario: verify the duration 1

# @AvoidChaining
# Scenario: verify the duration 2

# @CallSequencing
# Scenario: verify the duration 3