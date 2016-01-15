export default class UserListController {
  public static $inject = ['userList', '$state', 'userService']
  constructor (
    public userList,
    public $state,
    public userService
  ) { }

    public addNew = function() {
      this.userService.addUser(this.userList);
    }

    public edit (userId) {
      this.$state.go('root.user.edit', { userId: userId });
    }
}
