
@SAVI
@Brightcove

Feature: Brightcove Video Player

  Background: Login to IBISCMS and navigate to Student Assignment tab

    Given I login to IBISCMS as "savi.create"
    Then I navigate to an assignment with Brightcove Video Player
    Then I launch the Student Assignment

  # SAVI -> Brightcove Video -> Test Cases -> Play Video
  Scenario: Play video with bottom bar play button
    When I click the play button in the bottom bar of the player
    Then the video should begin playing

  Scenario: Play video with center video play button
    When I click the play button in the center of the player
    Then the video should begin playing

  # SAVI -> Brightcove Video -> Test Cases -> Pause Video
  Scenario: Pause video with bottom bar pause button
    Given the video is playing
    When I click the pause button in the bottom bar of the player
    Then the video should pause

  # SAVI -> Brightcove Video -> Test Cases -> Captions Button
  Scenario: Toggle Show Captions on
    Given the Captions button is present
    When I click the "Show Captions" button
    Then the captions should be toggled on and visible, and the button text should change to "Hide captions"

  # Toggle Show Captions off
    Given the Captions button is present
    When I click the "Hide Captions" button
    Then the captions should be toggled off and not visible, and the button text should change to "Show captions"

  # SAVI -> Brightcove Video -> Test Cases -> Audio Description
  Scenario: Toggle Audio Descriptions on
    Given the Audio Description button is present
    When I click the "Turn on Audio Description" button
    Then the audio descriptions should be toggled on, and the button text should change to "Turn off audio description"

  # Toggle Audio Descriptions off
    Given the Audio Description button is present
    When I click the "Turn off Audio Description" button
    Then the audio descriptions should be toggled off, and the button text should change to "Turn on audio description"

  # SAVI -> Brightcove Video -> Test Cases -> Open transcript
  Scenario: Open a video transcript
    Given the Open Transcript button is present
    When I click the "Open Transcript" button
    Then a new tab should open containing an HTML page transcript of the content

  # SAVI -> Brightcove Video -> Test Cases -> Playback Speed
  Scenario: Open playback speed menu
    When I click the "Playback speed" menu bar button while the playback speed menu is closed
    Then the playback speed menu should open

  # Close playback speed menu
    When I click the "Playback speed" menu bar button while the playback speed menu is open
    Then the playback speed menu should close

  Scenario: Increase playback speed
    Given the playback speed menu is open
    When I click the "Increase playback speed" button
    Then the playback speed should increase by 0.5, to a maximum of 2.0

  Scenario: Decrease playback speed
    Given the playback speed menu is open
    When I click the "Decrease playback speed" button
    Then the playback speed should decrease by 0.5, to a minimum of 0.5

  # SAVI -> Brightcove Video -> Test Cases -> Fullscreen
  Scenario: Toggle fullscreen on
    When I click the "Enter fullscreen" button
    Then the video player should maximize, filling up the entire screen space

  # Toggle fullscreen off
    When I click the "Exit fullscreen" button
    Then the video player should demaximize, reverting back to the normal video player size

  # SAVI -> Brightcove Video -> Test Cases -> Volume
  Scenario: Open volume menu
    Given the volume menu is not open
    When I click the volume button
    Then the volume menu should open

  # Close volume menu
    When I click the volume button
    Then the volume menu should close

  Scenario: Move volume slider
    Given the volume menu is open
    When I move the volume slider
    Then the volume level visually should change as well as change in volume level heard from the media

  Scenario: Mute volume from menu
    Given the volume menu is open
    When I click on the volume icon
    Then the application should mute

  # SAVI -> Brightcove Video -> Test Cases -> Video playing
  Scenario: Timestamp update while playing
    When the video is playing
    Then the current timestamp of the media should be updating every second in the menu bar
