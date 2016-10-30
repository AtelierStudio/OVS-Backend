# OVS-backend

# Contributor
* Designer [Hakjun Kim](https://github.com/ChickenBeer)
* Android Developer [Yungchae Yun](https://github.com/dudco)
* Server Backend Developer [Younjune Kim](https://github.com/iwin2471)
* Planners [Taejoon Park](https://github.com/puze8681)

# restful api docs
* Common Response

    HTTP 200: Success

    HTTP 405: Bad Request
    
    HTTP 409: DB error

    HTTP 412: Params Missing or params error
    

* POST /auth/reg : User Register

> Params

    userid : User's ID [String]

    pw : User's Password [String]

    username : User's Name [String]


> Response

    HTTP 200 : User

    HTTP 300 : already exists

    HTTP 409 : DB Error

* POST /auth/login : User Login

> Params

    userid : User's ID [String]

    pw : User's   Password [String]

> Response

    HTTP 200 : User

    HTTP 400 : No user

    HTTP 401 : ID / Password Incorrect

* POST /auth/auto : Auto Login

> Params

    token : token [String]

> Response

    HTTP 200 : UserID and token or apikey

    HTTP 401 : Access Denied


* POST /auth/destroy

> Params

    token : token [String]

> Response

    HTTP 200 : good bye

    HTTP 401 : not found
    
    HTTP 409 : DB ERROR
    
* GET /auth/fb/token

> Params

    access_token : access token


> Response

    HTTP 200 : send user

    HTTP 400 : DB Error
    
* GET /auth/tw/token : send tw token 

> Params

    oauth_token : oauth_token
    
    oauth_token_secret: oauth_token_secret
    
    user_id: user_id

> Response

    HTTP 200 : send user

    HTTP 400 : DB Error 
    
* POST /users/getInfo

> Params

    token : user token

> Response

    HTTP 200 : send user

    HTTP 400 : DB Error 
    

    
* POST /users/setProfile

> Params

    file : user token
    token : user token

> Response

    HTTP 200 : send user

    HTTP 400 : DB Error
    

* POST /auth/reg : User Register

> Params

    userid : User's ID [String]

    pw : User's Password [String]

    username : User's Name [String]


> Response

    HTTP 200 : User

    HTTP 300 : already exists

    HTTP 400 : DB Error

* POST /auth/login : User Login

> Params

    userid : User's ID [String]

    pw : User's   Password [String]

> Response

    HTTP 200 : User

    HTTP 400 : No user

    HTTP 401 : ID / Password Incorrect

* POST /auth/auto : Auto Login

> Params

    token : token [String]

> Response

    HTTP 200 : UserID and token or apikey

    HTTP 401 : Access Denied


* POST /auth/destroy

> Params

    token : token [String]

> Response

    HTTP 200 : good bye

    HTTP 401 : not found
    
    HTTP 409 : DB ERROR
    
* GET /auth/fb/token

> Params

    access_token : access token


> Response

    HTTP 200 : send user

    HTTP 400 : DB Error
    
* GET /auth/tw/token : send tw token 

> Params

    oauth_token : oauth_token
    
    oauth_token_secret: oauth_token_secret
    
    user_id: user_id

> Response

    HTTP 200 : send user

    HTTP 400 : DB Error 

* POST /board/write

> Params

    token: writer token
    
    contents: board content
    
    tourid: (DB Tours id) mt_00 is mountain, tr_00 is trail, lm_00 is landmark, at_00
    
    file: file upload

> Response

    HTTP 200 : send board

    HTTP 400 : DB Error 
    
* POST /board/addCommant

> Params

    token: writer token
    
    boardid: where user writed in
    
    summary: commant
 

> Response

    HTTP 200 : send board

    HTTP 400 : DB Error 

* POST /board/like

> Params

    boardid: boardid

> Response

    HTTP 200 : send board

    HTTP 400 : DB Error 
    

* POST /board/dislike

> Params

    boardid: boardid

> Response

    HTTP 200 : send board

    HTTP 400 : DB Error 
    
* POST /search/tag

> Params

    tag : tag String

> Response

    HTTP 200 : result
    
    HTTP 400 : DB Error 
    
    
    
* POST /search/user

> Params

    name : username

> Response

    HTTP 200 : send board

    HTTP 400 : DB Error 
    
    
* POST /info


> Response

    HTTP 200 : return tour id and gps

    HTTP 400 : DB Error 
    
* POST /main

> Response

    HTTP 200 : best(best place 최고의 달성 장소): [String Array] , month(monthly recommend place 이달의 추천 장소): [String Array]

    HTTP 409 : DB Error 
    
    
* POST /tour

> Params

    id : tour id

> Response

    HTTP 200 : send tour and boards
    
    HTTP 409 : DB Error 
    
 * POST /tour/like

> Params

    id : tour id
    
    token : user token

> Response

    HTTP 200 : su

    HTTP 409 : DB Error 

 * POST /tour/dislike

> Params

    id : tour id
    
    token : user token

> Response

    HTTP 200 : su

    HTTP 409 : DB Error 
    
### User
> id: user inherence id [Number]

> token: user discrimination code [String]

> user_id : User id [String required unique]

> pw : User Password [String required]

> nick_name: user name [String]

> tag: cu [String array]


## Tour
> id: mt_00 is mountain, tr_00 is trail, lm_00 is landmark, at_00 is attraction [String]

> name: place name kor [String]

> name_eng: place name eng [String]

> adress: place adress [String]

> gps: place gps latitude is in gps[0] longtitude is in gps[1]: 위도는 0번째 경도는 1번째 [String array]

> map: map is url [String]

> phoneNum: phoneNumber of tour place [String]

> info: tour place infomation [String]

> navigation: naver navigation url (IDK WTF is this) [String]

> img_url: place image url

> restaurant: restaurant name of around tour place [String]

> tag: tour place tags [String array]

> board_ids: board ids is use for tour place board


## Board
> id: board id [String]

> board_writer: writer name [String]

> writer_img: writer img url [String]

> summary: board summary [String]

> like: [Number]

> img_url: {type: String}

> comments [{

>> writer: {type: String}

>> date: {type: Date}

>> summary: {type: String}

>> profile_image: {type: String}

> }]
