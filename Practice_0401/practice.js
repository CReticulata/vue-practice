const users = [
  { name: 'Ajay', description: 'xxxx....', isPosted: true },
  { name: 'Jami', description: 'xxxx....', isPosted: true },
  { name: 'Jami', description: 'xxxx....', isPosted: false },
  { name: '橘子', description: 'xxxx....', isPosted: true },
]

// const cards = [
//   { title: 'Ajay', content: '' },
//   { title: 'Jami', content: '' },
//   { title: '橘子', content: '' },
// ]

// filter + map
const cardsByFilterAndMap = users
  .filter((user) => user.isPosted)
  .map((user) => {
    return {
      title: user.name,
      content: user.description,
    }
  })
console.log(cardsByFilterAndMap)

// reduce
const cardsByReduce = users.reduce((previousCards, user, i) => {
  if (!user.isPosted) {
    return [...previousCards]
  }

  return [...previousCards, { title: user.name, content: user.description }]
}, [])

console.log(cardsByReduce)

// reduce
// const groupedUsers = {
//   Ajay: [{ name: 'Ajay', description: 'xxxx....' }],
//   Jami: [
//     { name: 'Jami', description: 'xxxx....' },
//     { name: 'Jami', description: 'xxxx....' },
//   ],
//   橘子: [{ name: '橘子', description: 'xxxx....' }],
// }

const groupedUsers = users.reduce((groupedUsers, user, i) => {
  if (!groupedUsers[user.name]) {
    groupedUsers[user.name] = [user]
  } else {
    groupedUsers[user.name] = [...groupedUsers[user.name], user]
  }

  return groupedUsers
}, {})

console.log(groupedUsers)
