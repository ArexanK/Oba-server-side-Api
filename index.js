import express from 'express'

const url = 'https://zoeken.oba.nl/api/v1'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))




// Maak een route voor de index
const BoekenURL = url + '/search/?q=boek&authorization=1e19898c87464e239192c8bfe422f280&refine=true&output=json'
app.get('/', (request, response) => {


    fetchJson(BoekenURL).then((data) => {
        response.render('index', data)
        console.log(data)
    })

})

app.get('/search', (request, response) => {
    fetchJson(BoekenURL).then((data) => {
        let dataClone = structuredClone(data);

        // 1) als request.query.name bestaat
        if (request.query.titles) {
            // 2) Filter dan uit de data alle mensen die niet dat deel in hun naam hebben
            dataClone.results.titles = dataClone.results.titles.filter(function (title) {
                // 3 zoekfunctie  op naam+ achternaam. (hoofdlettergevoelig in script.js geplaatst)
                return results.titles.includes(request.query.titles)
            })
        }

        response.render('index', dataClone)
    });
});

app.get('/detail', (request, response) => {
    response.render('detail')
})


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