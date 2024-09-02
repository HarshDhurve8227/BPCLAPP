import mongoose from 'mongoose';

// Function to connect to the first database
const dbCon = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.DB_URL, {
                // No need to include useNewUrlParser and useUnifiedTopology
            });
            console.log('Database 1 connected');
        } else {
            console.log('Database 1 already connected');
        }
    } catch (error) {
        console.error('Error connecting to Database 1:', error.message);
    }
};

// Function to connect to the second database
const dbCon2 = async () => {
    try {
        // Use createConnection for additional databases if needed
        if (mongoose.connections.length < 2 || mongoose.connections[1].readyState === 0) {
            await mongoose.createConnection(process.env.DB_URL2, {
                // No need to include useNewUrlParser and useUnifiedTopology
            });
            console.log('Database 2 connected');
        } else {
            console.log('Database 2 already connected');
        }
    } catch (error) {
        console.error('Error connecting to Database 2:', error.message);
    }
};

export { dbCon, dbCon2 };
