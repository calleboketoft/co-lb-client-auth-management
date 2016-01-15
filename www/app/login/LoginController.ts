export default class LoginController {
  public static $inject = ['coAuthenticateService', 'apiService']
  constructor (
    public coAuthenticateService,
    public apiService
  ) {}
}
