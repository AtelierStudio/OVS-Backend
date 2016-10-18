# OVS-backend

# Contributor
* Designer [Hakjun Kim](https://github.com/ChickenBeer)
* Android Developer [Yungchae Yun](https://github.com/dudco)
* Server Backend Developer [Younjune Kim](https://github.com/iwin2471)
* Planners [Taejoon Park](https://github.com/puze8681)

# restful api docs
* Common Response

    HTTP 200: Success

    HTTP 400: DB error

    HTTP 401: Bad Request

    HTTP 403: Params Missing
    

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

### User
> id: user inherence id [Number]

> token: user discrimination code [String]

> user_id : User id [String required unique]

> pw : User Password [String required]

> nick_name: user name [String]

> tag: cu [String array]

> firends: [{firend_id: [String], profile_image: [String]}] [JSON array]

<<<<<<< HEAD

=======
>>>>>>> e0dcd6ba728764c2bd61410f6d2c380e657f379f
