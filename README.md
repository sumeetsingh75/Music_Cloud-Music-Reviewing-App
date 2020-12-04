# Music_Cloud-Music-Reviewing-App
# Introduction

Music cloud is a music review site similar to iMDB where users can submit reviews of music songs. The app allows browsing reviews, creating, editing, and saving new reviews, creating and managing playlists, sharing playlists with other users and commenting public playlists.


# Technologies

1.  Front End (Client) : Angular Framework (8.3.18)
2.  Backend Services (Server) : Node (12.13.0) + Express Framework (4.17.1)
3.  Database : MongoDB


# Functionality
- Local and external authentication method (Facebook) mechanism for users and admin including proper authorization using JSON Web Tokens (JWT).
- Proper handling of deactivated accounts by admin.
## Unauthenticated Flow
- Display top 10 songs ordered by popularity along with the average rating for each song.
- Ability to search songs based on keywords.
- Ability to view all information on a song by expanding it.
- Ability to view all reviews, the reviewers username and total number of reviews.
## Authenticated Flow
- Rate and add a review to a song.
- Add a new song to the site.
- Create a playlist of songs with a title and optional description and edit it.
- Add or remove songs from the playlists.
- Change the visibility of playlist from "public" or "private" by the owner of the playlist so that "private" playlists does not show up in the search results.

## Site Manager
-	Ability to grant site manager privilege to one or more existing users.
-	Ability to add/modify/delete songs and playlists.
-	Ability to mark a comment as hidden.
-	Ability to mark user as "deactivated".
