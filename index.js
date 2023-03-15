import express from 'express'

const url = 'https://zoeken.oba.nl/api/v1'
const activityURL = url + '/search/?q=special:all%20table:activiteiten&authorization=16c19e6083308c984c452600134989ba&output=json'
const bookURL = url + '/search/?q=boek&authorization=1e19898c87464e239192c8bfe422f280&refine=true&output=json'
const courseURL = url + '/search/?q=special:all%20table:jsonsrc&authorization=16c19e6083308c984c452600134989ba&output=json'
// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', (request, response) => {
    fetchJson(bookURL).then((data) => {
        response.render('index', data)

    })
})

//BOEKEN
app.get('/search', (request, response) => {
    fetchJson(bookURL).then((data) => {
        let dataClone = structuredClone(data);


        if (request.query.titles) {

            dataClone.results.titles = dataClone.results.titles.filter(function (title) {
                return results.titles.includes(request.query.titles)
            })
        }

        response.render('index', dataClone)
    });
});

//ACTIVITEITEN
app.get('/search', (request, response) => {
    fetchJson(activityURL).then((data) => {
        let dataClone = structuredClone(data);


        if (request.query.titles) {

            dataClone.results.titles = dataClone.results.titles.filter(function (title) {

                return results.titles.includes(request.query.titles)
            })
        }

        response.render('index', dataClone)
    });
});

// DETAIL
app.get('/detail', (request, response) => {
    response.render('detail')
})

//COURSE
app.get('/search', (request, response) => {
    fetchJson(courseURL).then((data) => {
        let dataClone = structuredClone(data);


        if (request.query.titles) {

            dataClone.results.titles = dataClone.results.titles.filter(function (title) {

                return results.titles.includes(request.query.titles)
            })
        }

        response.render('index', dataClone)
    });
});









// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}