# 2020 Redesign Techical Specification

## Table of Contents

1. [Introduction](Introduction)
   1.1. Proposal
   1.2. Technical Introduction
   1.2.1. Purpose
   1.2.2. Scope
   1.2.3. Acronyms and Abbreviations
   1.2.4. Summary
2. [Use Case Diagram](USECASES-Use-Case-Diagram)

## Use Cases and Collaboration Diagrams / Figma Flow

1. [Use Case Summaries](USECASES-Use-Case-Summaries)
2. Base User // Common Functionality

   1. [View Public Posts](View-Public-Posts)
   2. [Search Public Posts](Search-Public-Posts)

3. Unauthorized User

   1. [Login](Login)
   2. [Register](Register)
   3. [View Private Requests WITHOUT Private Data](View-Request-No-Data)
   4. [Search Private Requests WITHOUT Private Data](Search-Request-No-Data)

4. Authorized User
   1. Requests (Was "Request")
      1. [Create New Request](Create-New-Request)
      2. [View Private Requests WITH Private Data](View-Request-Yes-Data)
      3. [Search Private Requests WITH Private Data](Search-Request-Yes-Data)
      4. [Timeline Interactions with Posts](Timeline-Interactions-Post)
   2. Posts
      1. [Create New Post](Create-New-Post)
      2. [Timeline Interactions with Posts](Timeline-Interactions-Post)
   3. Timeline
      1. [Interact with Request Timeline](Timeline-Interactions-Request)
      2. [Interact with Posts Timeline](Timeline-Interactions-Post)
   4. Communicate with Other User
      1. [Send and Receive Messages](Send-and-Receive-Messages)
      2. [Respond to Request](Respond-to-Request)
      3. [Respond to Post Privately](Respond-to-Post-Privately)
   5. Notifications
      1. [View Notifications](View-Notifications)
      2. [Use Notifications -- eg. Navigation](Use-Notifications)
   6. Account Profile
      1. [Administer Account Profile](Administer-Profile)
   7. Organization User
      1. [Create Post](Create-Post)
      2. [Edit Profile](Edit-Profile)
      3. [Communicate With Other User](Communicate-With-Other-User)
   8. Admin
      1. [Delete Request](Delete-Request)
      2. [Delete Post](Delete-Post)
      3. [Delete User](Delete-User)

5)  User Models

    1. [Base User Model](MODELS-Base-User-Model)
    2. [Unauthorized User Model](MODELS-Unauthorized-User-Model)
    3. [Authorized User Model](MODELS-Authorized-User-Model)
    4. [Group User Model](MODELS-Group-User-Model)
    5. [Admin User Model](MODELS-Admin-User-Model)

6)  Entity Models -- Models must be NOUNS "request" and "offer" are verbs as well as nouns
    1. [Type Model](MODELS-Type-Model)
    
    2. [Post Model](MODELS-Post-Model)
    3. [Response Model](MODELS-Response-Model)
    
    4. [Offer Model](MODELS-Offer-Model) 
    5. [Request Model](MODELS-Request-Model) 
    
    6.  [Message Model](MODELS-Message-Model)
    
    7. [Timeline Model](MODELS-Timeline-Model)

=========

# FROM OLD TECH SPEC. IGNORE

    2.1.1.
        2.2. Collaboration Diagrams
            2.2.1. Post: READ
                2.2.1.1. ViewPost
                2.2.1.2. SearchPosts
            2.2.2. ACCOUNT CONTROL: EXTERNAL
                2.2.2.1. Login
                2.2.2.2. Register
                2.2.2.3. RecoverPassword
            2.2.3. ACCOUNT CONTROL: INTERNAL
    2.2.3.1 EditProfile
    2.2.3.2. EditSchedule
    2.2.3.3. RenewMembership
    2.2.3.4. ChangePassword
    2.2.3.5. Logout
    2.2.3.6. DeleteAccount
            2.2.4. Post: CREATE, UPDATE, DELETE
    2.2.4.1 AddPost
    2.2.4.2. EditPost
    2.2.4.3. DeletePost
            2.2.5. Post: ANNOTATE
                2.2.5.1. RatePost
                2.2.5.2. CommentOnPost
                2.2.5.3. DeleteComment
            2.2.6. COMMUNICATIONS
                2.2.6.1. SendMessage
                2.2.6.2. ReadMessage
                2.2.6.3. DeleteMessage
                2.2.6.4. BlockUser
    1. Class Definitions and Diagrams
        3.1. User and Subclasses
            3.1.1. User and Subclasses Diagram
            3.1.2. User Definition
            3.1.3. Guttersnipe Definition
            3.1.4. Caretaker Definition
        3.2. Post and Parts
            3.2.1. Post and Parts
            3.2.2. Post Definition
            3.2.3. Time Definition,
            3.2.4. Thing Defintition
        3.3. 3.3.ER Class Diagram
    2. Screenshots from 0.2 release and Future Wireframes
        4.1. Front Page
        4.2. Create Post Wizard
            4.2.1. CreatePost: Start
            4.2.2. CreatePost: Instructions
            4.2.3. CreatePost: Describe
            4.2.4. CreatePost: Classify (I)
            4.2.5. CreatePost: Classify(2)
            4.2.6. CreatePost: Map
            4.2.7. CreatePost: Schedule (1)
            4.2.8. CreatePost: Schedule (2)
            4.2.9. CreatePost: Schedule (3)
        4.3. SearchPost
            4.3.1. SearchPost:	ResultList
            4.3.2. SearchPost:	ResultCalendar
            4.3.3. SearchPost:	ResultMap
            4.3.4. SearchPost:	SearchByCategory
            4.3.5. SearchPost:	SearchByTag
            4.3.6. SearchSharable: SearchByLocation
            4.3.7. SearchPost: SearchByTime
        4.4. Authentication
            4.4.1. SignIn
            4.4.2. SignUp
        4.5. Documentation
            4.5.1. Mission Page
            4.5.2. FAQ
            4.5.3. Presentation (2013)
                4.5.3.1. Start
                4.5.3.2. Objective
                4.5.3.3. Audience
