(function() {

let users =[
  {username: 'alice', password: 'alice', first: 'Alice', last: 'Wonderland', role: 'Faculty'},
  {username: 'bob', password: 'bob', first: 'Bob', last: 'Marley', role: 'Faculty'},
  {username: 'charlie', password: 'charlie', first: 'Charlie', last: 'Garcia', role: 'Student'}

]
  let $tbody, $addBtn
  let $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld
  let service = new AdminuserServiceClient()


  function renderAllUsers() {
  console.log('render users')
    console.log(users)
    const template = $('.wbdv-user-row-template')[0]
    const $template = $(template)
    const clone = $template.clone()
    console.log($template)
    $tbody.empty()

    for(let i=0; i<users.length; i++) {
      const user = users[i].username
      console.log(user)
      const copy = clone.clone()
      copy.find('.wbdv-username').html(user.username)
      copy.find('.wbdv-password').html(user.password)
      copy.find('.wbdv-first-name').html(user.first)
      copy.find('.wbdv-last-name').html(user.last)
      copy.find('.wbdv-role').html(user.role)
      copy.find('.wbdv-delete').attr('id', user._id)
          .click(deleteUser)

      $tbody.append(copy)
    }

  }

  function deleteUser(event) {
  console.log(event)
  const target = event.currentTarget
    const $button = $(target)
    const userId = $button.attr('id')
    alert('delete user ' + userId)
  }

function createUser() {
  const username = $usernameFld.val()
  const first = $firstFld.val()
  const last = $lastFld.val()
  console.log(username,first)

  const newUser = {
    username: username,
    first: first,
    last: last
  }

  service.createUser(newUser)
      .then(function(actualUser) {
        users.push(actualUser)
        renderAllUsers()
      })

}

function findAllUsers(){
return fetch(self.url)
    .then(function(response) {
      return response.json()
    })
}



function main() {

  $tbody = $('tbody')

  $addBtn = $('wbdv-add-button')
  $addBtn.css('backgroundColor','yellow')
  $addBtn.click(createUser)

  $usernameFld = $('.wbdv-username-fld')
  $passwordFld = $('.wbdv-password-fld')
  $firstFld = $('.wbdv-first-fld')
  $lastFld = $('.wbdv-last-fld')
  $roleFld = $('.wbdv-role-fld')

 findAllUsers()


//fetch all H1 elements from HTML document
const h1 = jQuery('h1')
h1.css('color', 'red')

const tr = jQuery('tr')
tr.css('backgroundColor', 'blue')
    .css('color','white')

  const h2 = jQuery('<h2> Hello from jQuery</h2>')
  const body = jQuery('body')
  body.append(h2)

  const newTr = $('<tr><td>dan</td></tr>')
  $tbody.append(newTr)

  for(let i=0; i<users.length; i++){
    const username = users[i].username
    const newUserRow = $('<tr><td>'+username+'</td></tr>')
    $tbody.append(newUserRow)
  }

   renderAllUsers()
}


jQuery(main)


})()



