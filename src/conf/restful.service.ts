
class Resuful {
    Method: "POST" | "GET"
    URL: string
    Service: ServiceType
    NeedLogin: boolean
    ServiceOnly: boolean
}


enum ServiceType {
    Login = "Login"
}


const ServiceHost: { [key: string]: string } = {
    "Login": "http://localhost:9001/api/",
}

const RestfulService: { [key: string]: Resuful } = {
    "loginApi": {
        Method: "POST",
        URL: "Login/Login",
        Service: ServiceType.Login,
        NeedLogin: false,
        ServiceOnly: true
    },
    "loginAuthApi": {
        Method: "POST",
        URL: "Login/Auth",
        Service: ServiceType.Login,
        NeedLogin: false,
        ServiceOnly: true
    },
}

export { RestfulService, ServiceHost }

