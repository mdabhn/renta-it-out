import { collection, addDoc } from 'firebase/firestore'
import data from '../data/data.json' assert { type: 'json' }
import { firebase } from '../firebase/init.js'

const runSeeder = () => {
  data.map(async (d, i) => {
    await addDoc(collection(firebase, 'rental'), {
      ...d,
    })
    console.log(i)
    if (i === data.length - 1) process.exit(0)
  })
}

runSeeder()
