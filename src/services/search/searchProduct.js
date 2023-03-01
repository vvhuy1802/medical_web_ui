import {
  collection,
  getDocs,
  query,
  //limit,
  //startAfter,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { PRODUCTS } from '../constant/firestore'

const searchProducts = async (searchTerm) => {
  try {
    const start = query(
      collection(db, PRODUCTS),
      orderBy('benh')
      //limit(4)
    )
    const querySnapshot = await getDocs(start)

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

    const listProducts = []
    querySnapshot.forEach((doc) => {
      if (doc.data().benh.toLowerCase().includes(searchTerm.toLowerCase())||doc.data().name.toLowerCase().includes(searchTerm.toLowerCase())) {
      listProducts.push(doc.data())
      listProducts[listProducts.length - 1].uuid = doc.id
    }
  })
    return Promise.resolve([listProducts, lastVisible])
  } catch (error) {
    return Promise.reject(error)
  }
}

export default searchProducts
