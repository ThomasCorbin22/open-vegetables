// Note that when running this script that it needs to be run TWICE. Please ensure that the first run has completely finished before Ctl+C and starting the second run. The first run through there will be errors for approximately 10% of the total restaurants, these will be added successfully on the second run of the script. This is due to an error where existing districts aren't being properly recognised in the database. 


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

let inputStream = Fs.createReadStream('./python/df_final-cleaned-01.csv', 'utf8');

function processData(input) {
    // Extract each row from the Excel file
    input
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
    .on('data', async function (row) {
        // For each row, try the following operation
        // console.log('A row arrived: ', row);
        await knex.transaction(async (trx) => {
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
                        .where("district", 'ilike', row.district)
                        .catch((err) => console.log(err))

                    if (results_district.length === 1){
                        district_id = results_district[0].id
                    }
                    // Insert district if it does not exist
                    else if (results_district.length === 0){
                        results_district = await trx('districts')
                            .insert(district)
                            .returning('*')
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
                        results_restaurant = await trx('restaurants')
                            .insert(restaurant)
                            .returning('*')
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
                        let categories = row.categories.split('\'')

                        for (let item of categories){
                            item = item.replace(/'/g, "").replace('[', "").replace(']', "").trim()

                            if (item != ''){
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