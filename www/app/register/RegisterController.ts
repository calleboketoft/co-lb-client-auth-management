export default class RegisterController {
  public static $inject = [
    '$state',
    'apiService'
  ]
  constructor (
    public $state,
    private apiService
  ) { }
  public email
  public password
  public username

  public register () {
    this.apiService.User.create({
      email: this.email,
      password: this.password,
      username: this.username
    })
  }
}
