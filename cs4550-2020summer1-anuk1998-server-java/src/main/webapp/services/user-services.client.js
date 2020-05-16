function AdminuserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/anuk1998/users'
    var self = this;

    function createUser(user) {
        console.log('creating user')
        console.log(user)
        const userString = JSON.stringify(user)
        console.log(userString)

        //sending request out to server
        return fetch(self.url, {method: 'POST',
        body: userString,
         headers: {
            'content-type': 'application/json'
         }
        })
            .then(function(response) {
                return response.json()
            })
    }



    function findAllUsers() {
        /*console.log('find all users')
        return ['some user']*/
        return fetch(self.url)
        .then(function(response){
            return response.json()
        })

    }

    function findUserById(userId) {
    }

    function updateUser(userId, user) {
    }

    function deleteUser(userId) {
    }
}
