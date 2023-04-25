const mongoose = require('mongoose')

const database = 'Notes' 


mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://127.0.0.1/${database}`, {
  // In some cases you mane need to change local host to `127.0.0.1` 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`established connection to the Database: ${database}`))
    .catch(err => console.log(`something wrong with database.`))
