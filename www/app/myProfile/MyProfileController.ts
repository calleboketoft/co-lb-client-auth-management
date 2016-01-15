export default class MyProfileController {
  public static $inject = ['myProfile', 'apiService']

  constructor (
    public myProfile,
    public apiService
  ) { }

  public updateProfile (params) {
    this.apiService.User.updateMyProfile(params).$promise
      .then((res) => {
          console.log(res)
      }, (err) => {
          console.log(err)
      })
  }

  public accessTokenId = localStorage.getItem('$LoopBack$accessTokenId')
}
