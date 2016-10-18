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
    
### User
> id: user inherence id [Number]

> token: user discrimination code [String]

> user_id : User id [String required unique]

> pw : User Password [String required]

> nick_name: user name [String]

> tag: cu [String array]

> firends [String array] (this array Contains ONLY inherence id)
