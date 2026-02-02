/* Singleton Pattern Implementation

Core rules:

Private constructor (no new from outside)
Static instance holder
Static getter


*/

class SingletonService {
  private static instance: SingletonService;   // hidden dependency so we use DI dependency injection to make is single reponsiblity principle
  private config: Record<string, string>;

  private constructor() {
    this.config = {
      env: "prod",
      apiUrl: "https://api.example.com",
    };
  }

  public static getInstance() : SingletonService{
    if(!SingletonService.instance){
        SingletonService.instance = new SingletonService()
    }
    return SingletonService.instance
  }

  getConfig (key : string){
    return this.config[key]
  }
}

let env = SingletonService.getInstance().getConfig('env')
console.log(env ,"<<<<")
