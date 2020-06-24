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

let inputStream = Fs.createReadStream('./python/df_green_queen_food_tech.csv', 'utf8');

function processData(input) {
    // Extract each row from the Excel file
    input
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
    .on('data', async function (row) {
        // For each row, try the following operation
        // console.log('A row arrived: ', row);
        await knex.transaction(async (trx) => {
            try {
                // Get names
                let first_name = row.user.split(' ')[0]
                let last_name = row.user.split(' ')[1]
                let email = first_name.toLowerCase()
                email = email + '@' + email + '.com'
                let display_name = first_name + '_' + last_name
                let profile_picture_URL = row.main_picture_URL

                // Check if user exists
                let results_user = await trx("users")
                    .select('id')
                    .where("email", email)
                    .catch((err) => console.log(err))
                
                if (results_user.length === 0) {
                    // Specify user
                    let user = {
                        first_name,
                        last_name,
                        email,
                        display_name,
                        profile_picture_URL,
                        password: '$2b$10$TeDLJ.CehjeNyXD8ZQnfh.xa6rsFd4x1H.cwdLexoPFuu3r7Q/4ii',
                        security_question: 'What is 1 + 2',
                        security_answer: '3',
                    }

                    // Insert user
                    results_user = await trx('users')
                        .insert(user)
                        .returning('*')
                        .catch((err) => console.log(err))
                }

                let user_id = results_user[0].id

                // Check if blog exists
                let results_blog = await trx
                    .select('*')
                    .from("blogs")
                    .where("title", row.title)
                    .catch((err) => console.log(err))

                // Insert blog if it does not exist
                if (results_blog.length === 0){
                    let body = row.body.split('\\n')

                    for (let i = 0; i < body.length; i++){
                        body[i] = body[i].replace(/'/g, "").replace(/"/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\\n/g, "").replace(/\\/g, "").trim()
                    }

                    body = body.filter(n => n)
                    body = body.join('||')

                    let categories = row.categories.split('\'')
                    let pictures = row.pictures.replace(/'/g, "").replace(/\[/g, "").replace(/\]/g, "").split(/\n /g)

                    blog = {
                        title: row.title,
                        body,
                        main_picture_URL: row.main_picture_URL,
                        date_created: new Date(row.date_created),
                        date_modified: new Date(row.date_modified),
                        user_id
                    }

                    results_blog = await trx('blogs')
                        .insert(blog)
                        .returning('*')
                        .catch((err) => console.log(err))

                    let blog_id = results_blog[0].id

                    // Insert pictures
                    for (let item of pictures){
                        picture = {
                            picture_URL: item,
                            blog_id
                        }

                        await trx('blog_pictures')
                            .insert(picture)
                            .catch((err) => console.log(err))
                    }

                    // Insert categories
                    for (let item of categories){
                        item = item.replace(/'/g, "").replace('[', "").replace(']', "").replace('\\n', "").trim()

                        if (item != ''){
                            category = {
                                category: item,
                                blog_id
                            }
    
                            await trx('blog_categories')
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