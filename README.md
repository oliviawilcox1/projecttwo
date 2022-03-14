# projecttwo

## Lyrical Fun


### Option 1: Search a Song Name to find the lyrics


##### The premise is to create a history and save events in a form to the users profile. 

###### Steps

1. Each will start with a login for a new user and then a sign in.

2. Once you are logged in, there is an announcement at the top of the page for you user.

3. There will be an index page of all your saved searches that you can edit and delete as well as click on to render the show page with either then lyrics or the data on the song. 

4. The opening page will be a search bar that utilizes the API which will be a new page, and after you search you will recieve an show page of the song with lyrics or song information

5. There will be logout links on the top of the page.

6. There will be a user profile link at the top of the page

7. The user profile should have all past searches and ability to comment on each song/lyric to make notes.


Models - Song Information/Lyrics

Many Comments to One Song
comments have userid/reference to user
Comment will have an Owner
Meta data may be linked to spotify 

Song Key-Value Pair:
Name: 
Artist: 
Year:
Album: 
Possibly Genre: 

![start](img/one.png)
![start](img/two.png)
![start](img/three.png)
![start](img/four.png)

ERD
![start](img/erd.png)
![start](img/erd2.png)


Technologies - HTML, CSS, Mongoose, JavaScript, Liquid, Express, Bcrypt
API - https://docs.ksoft.si/api/lyrics-api
Another API - https://developer.musixmatch.com/documentation

Long term stretch goal - More CSS.(Dribble)
Adding some sort of recommendation section for the user to possible find either artists/songs or events they may like or adding something to redirect them to the artists work
-changing show page color based on genre 