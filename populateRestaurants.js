const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

// Update with your config settings.
require('dotenv').config();

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    }
});

let inputStream = Fs.createReadStream('./python/df_final-cleaned-03.csv', 'utf8');

function processData(input) {
    // Extract each row from the Excel file
    input
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
    .on('data', async function (row) {
        // For each row, try the following operation
        console.log('A row arrived: ', row);
        knex.transaction(async (trx) => {
            try {
                // Empty district_id variable
                let district_id

                // Check if area exists
                let results_area = await trx
                    .select('id')
                    .from("areas")
                    .where("area",row.area)
                    .catch((err) => console.log(err))

                if (results_area.length == 1){
                    // Specify District
                    let district = {
                        district: row.district,
                        area_id: results_area[0].id
                    }

                    // Check if district exists
                    let results_district = await trx
                        .select('id')
                        .from("districts")
                        .where("district", row.district)
                        .catch((err) => console.log(err))

                    console.log('row.district')
                    console.log(row.district)
                    console.log('results_district')
                    console.log(results_district)

                    if (results_district.length == 1){
                        district_id = results_district[0].id
                    }
                    // Insert district if it does not exist
                    else if (results_district.length == 0){
                        await trx('districts')
                            .insert(district)
                            .catch((err) => console.log(err))
                                
                        results_district = await trx
                            .select('id')
                            .from("districts")
                            .where("district", row.district)
                            .catch((err) => console.log(err))

                        district_id = results_district[0].id
                    }

                    // Specify Restaurant
                    let restaurant = {
                        name: row.name,
                        street_address: row.street_address,
                        district_id: district_id,
                        description: row.description,
                        logo: row.logo,
                        price: row.price,
                        telephone_number: row.telephone_number,
                        social_media_URL: row.social_media_URL,
                        main_picture_URL: row.main_picture_URL,
                        website_URL: row.website_URL,
                        latitude: row.latitude,
                        longitude: row.longitude,
                        main_category: row.main_category,
                        monday: row.monday,
                        tuesday: row.tuesday,
                        wednesday: row.wednesday,
                        thursday: row.thursday,
                        friday: row.friday,
                        saturday: row.saturday,
                        sunday: row.sunday,
                    }

                    // Check if restaurant exists
                    let results_restaurant = await trx
                        .select('*')
                        .from("restaurants")
                        .where("name", row.name)
                        .catch((err) => console.log(err))

                    // Insert restaurant if it does not exist
                    if (results_restaurant.length == 0){
                        await trx('restaurants')
                            .insert(restaurant)
                            .catch((err) => console.log(err))
        
                        results_restaurant = await trx
                            .select('id')
                            .from("restaurants")
                            .where("name", row.name)
                            .catch((err) => console.log(err))
        
                        let restaurant_id = results_restaurant[0].id

                        // Specify images
                        let images = row.images.replace(/'/g, "").replace('[', "").replace(']', "").split('\n ')

                        for (let item of images){
                            image = {
                                picture_URL: item,
                                restaurant_id: restaurant_id
                            }

                            await trx('restaurant_pictures')
                                .insert(image)
                                .catch((err) => console.log(err))
                        }

                        // Specify categories
                        let categories = row.categories.replace(/'/g, "").replace('[', "").replace(']', "").split(' ')

                        for (let item of categories){
                            category = {
                                category: item,
                                restaurant_id: restaurant_id
                            }

                            await trx('restaurant_categories')
                                .insert(category)
                                .catch((err) => console.log(err))
                        }
                    }
                }
                trx.commit;
            }
            catch (error) {
                console.log(error);
                trx.rollback
            }
        })
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });
}

processData(inputStream)