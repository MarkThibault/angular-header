export default class AppService {
    signOutMessage = "You've been signed out!";

    static $inject = ["$q", "$timeout"];
    constructor(
        private $q: ng.IQService,
        private $timeout: ng.ITimeoutService
    ) {
    }

    getUser(): ng.IPromise<any> {
        let resolve = {
            resolve: ()=>{
                return "Miles Morales"
            }
        }
        return this.$q.resolve(resolve)
    }

    signOut() {
        alert(this.signOutMessage);
    }
}