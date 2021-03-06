import Promise from 'bluebird'
import fs from 'fs'
import cassandra from 'cassandra-driver'
// const getFakeAd = require('../faker/script')
// const json2csv = require('json2csv')

export const cassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  promiseFactory: Promise.fromCallback
})

cassandraClient.connect()
  .then(() => console.log('connected to cassandra'))
  .catch(err => console.error(err))

export const insertAds = (id, img, siteLink, category) => {
  const insertionQuery = 'INSERT INTO ads_service.ads(id, img, siteLink, category) VALUES(?, ?, ?, ?)'

  return cassandraClient.execute(insertionQuery, [ id, img, siteLink, category ])
}

export const findAds = (category) => {
  const insertionQuery = `SELECT * FROM ads_service.ads WHERE category='${category}' ALLOW FILTERING`

  return cassandraClient.execute(insertionQuery)
}

export const findAdsById = (id) => {
  const insertionQuery = `SELECT * FROM ads_service.ads WHERE id='${id}' ALLOW FILTERING`

  return cassandraClient.execute(insertionQuery)
}

export const deleteAd = (id) => {
  const deletionQuery = `DELETE FROM ads_service.ads WHERE id = '${id}'`

  return cassandraClient.execute(deletionQuery)
}

/* COUNT ROWS */
// client.execute('SELECT COUNT(*) FROM ads_service.ads')
//   .then(res => console.log(res))
//   .catch(err => console.error('timeout bruh'))

/* SCRIPT GENERATING FAKE USERS AND WRITING THEM INTO A CSV FILE */
// const addFiveThousand = () => {
//   let i = 0; do {
//     const id = cassandra.types.uuid()
//     const fakeAd = getFakeAd()
//     const category = fakeAd.category
//     const img = fakeAd.img
//     const siteLink = fakeAd.siteLink
//     const fields = [id, category, img, siteLink]
//     const file = json2csv({ fields }) + '\n'

//     fs.appendFile('test_ONE.csv', file, err => {
//       if (err) throw err
//       console.log('The file has been saved!')
//     })

//     ++i
//   } while (i <= 5000)
// }


// addFiveThousand()
// let i = 0; setInterval(function() {
//   if (i <= 180) {
//     console.log('Insertion number:', i)
//     addFiveThousand()
//   } 
//   else { console.log('1,000,000 records loaded') }
//   i++
// }, 1000)

/* WRITE DIRECTLY INTO THE DB */
// export const insertAds = (id, img, siteLink, category) => {
//   console.log('running cassandra method')
//   const insertUsers = 'INSERT INTO ads_service.ads(id, img, siteLink, category) VALUES(?, ?, ?, ?)'
//   cassandraClient.execute(insertUsers, [id, img, siteLink, category], (err, res) => {
//     if (err) throw err
//     else {
//       console.log('User Added')
//       console.log({
//         id,
//         img,
//         siteLink,
//         category
//       })
//     }
//   })
// }