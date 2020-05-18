(function () {
let users = [
    {username: 'alice', password: 'alice', first: 'Alice', last: 'Wonderland', role: 'FACULTY'},
    {username: 'bob', password: 'bob', first: 'Bob', last: 'Marley', role: 'FACULTY'},
    {username: 'charlie', password: 'charlie', first: 'Charlie', last: 'Garcia', role: 'STUDENT'}
  ]

  let $tbody, $addBtn, $updateBtn
  let $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld
  let service = new AdminUserServiceClient()
  let selectedUser = {}



function renderAllUsers() {
  //console.log('rendering all users')
  //console.log(users)
  const template = $('.wbdv-user-row-template')[0]
  const $template = $(template)
  //creating copy of html of template in memory bc you are blowing original away
  const clone = $template.clone()
  //console.log($template)
  $tbody.empty()
  for(let i = 0; i<users.length; i++) {
    const user = users[i]
    //console.log(user)
    const copy = clone.clone()
    copy.find('.wbdv-username').html(user.username)
    copy.find('.wbdv-first-name').html(user.first)
    copy.find('.wbdv-last-name').html(user.last)
    copy.find('.wbdv-role').html(user.role)
    copy.find('.wbdv-delete')
        .attr('id', user._id)
        .click(deleteUser)
    copy.find('.wbdv-edit')
        .attr('id', user._id)
        .click(selectUser)
    $tbody.append(copy)
  }
}



function renderUser(user) {
  selectedUser = user
  $usernameFld.val(user.username)
  $firstFld.val(user.first)
  $lastFld.val(user.last)
}

function selectUser(event) {
  const target = event.currentTarget
  const $button = $(target)
  const userId = $button.attr('id')
  service.findUserById(userId)
      .then(function(user){
        renderUser(user)
      })
}

    function clearInputFields() {
        $usernameFld.val().set("")
        $passwordFld.val().set("")
        $firstFld.val().set("")
        $lastFld.val().set("")
        $roleFld.val().set("")
    }


    function updateUser() {
      const updatedUser = {
        _id: selectedUser._id,
        username: $usernameFld.val(),
        first: $firstFld.val(),
        last: $lastFld.val(),
        role: $roleFld.val()
      }
      service.updateUser(selectedUser._id, updatedUser)
          .then(function(status) {
            users = users.map(function(user) {
              if(user._id === selectedUser._id) {
                return updatedUser
              } else {
                return user
              }
            })
            renderAllUsers()
              clearInputFields()
          })
    }



//deletes user
function deleteUser(event) {
  console.log(event)
  const target = event.currentTarget
  const $button = $(target)
  const userId = $button.attr('id')
  service.deleteUser(userId)
      .then(function() {
        users = users.filter(function (user) {
          return user._id !== userId
        })
        renderAllUsers()
      })
}

//add user
function createUser() {
  const username = $usernameFld.val()
  const first = $firstFld.val()
  const last = $lastFld.val()
    const role = $roleFld.val()

  const newUser = {
    username: username,
    first: first,
    last: last,
      role: role
  }
  service.createUser(newUser)
      .then(function(actualUser){
        users.push(actualUser)
        renderAllUsers()
      })
}

function findAllUsers(){
  service.findAllUsers()
      .then(function(allUsers) {
        users = allUsers
        renderAllUsers()
      })
}

function main() {
  $tbody = $('tbody')
  $addBtn = $('.wbdv-add-btn')
  $updateBtn = $('.wbdv-update')

  $addBtn.click(createUser)
  $updateBtn.click(updateUser)

  $usernameFld = $('.wbdv-username-fld')
  $passwordFld = $('.wbdv-password-fld')
  $firstFld = $('.wbdv-first-fld')
  $lastFld = $('.wbdv-last-fld')
  $roleFld = $('.wbdv-role-fld')

  findAllUsers()


  //fetch all h1 elements from html document
 /* const h1 = jQuery('h1')
  h1.css('color', 'red')*/

 /* const tr = jQuery('tr')
  tr.css('backgroundColor', 'blue')
      .css('color', 'white')*/

 /* //adding element dynamically
  const h2 = jQuery('<h2>Hello from jQuery</h2>')
  const body = jQuery('body')
  body.append(h2)*/

  /*//$ is alias to jQuery function
  //creating new tr Dan
  const newTr = $('<tr><td>Dan</td></tr>')
  const tBody = $('tbody')
  $tbody.append(newTr)*/

  /*//adding users from array dynamically at the end of table
  for(let i = 0; i<users.length; i++) {
    const username = users[i].username
    const newUserRow = $('<tr><td>'+username+'</td></tr>')
    $tbody.append(newUserRow)
  }*/

  //renderAllUsers()
}

jQuery(main)


})()