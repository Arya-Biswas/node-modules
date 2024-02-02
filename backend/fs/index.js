const fs = require('fs');
 

try{
    fs.writeFileSync('example.js', 'data is being written bla bla bla');
    console.log('done successfully');
    }
    catch(err){
    console.error(err);
    }

try {
    // Synchronously read from the file
    const data = fs.readFileSync('example.js', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}


 

// Reading from a file asynchronously
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File Content:', data);

      
        fs.writeFile('op.txt', 'This is a new file content.', 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File has been written successfully.');

                // Appending to a file asynchronously
                fs.appendFile('op.txt', '\nThis is appended text.', 'utf8', (err) => {
                    if (err) {
                        console.error('Error appending to file:', err);
                    } else {
                        console.log('File has been appended successfully.');

                        // Deleting a file asynchronously
                        fs.unlink('op.txt', (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            } else {
                                console.log('File has been deleted successfully.');

                                // Creating a directory asynchronously
                                fs.mkdir('example_directory', (err) => {
                                    if (err) {
                                        console.error('Error creating directory:', err);
                                    } else {
                                        console.log('Directory has been created successfully.');

                                        // Removing a directory asynchronously
                                        fs.rmdir('example_directory', (err) => {
                                            if (err) {
                                                console.error('Error removing directory:', err);
                                            } else {
                                                console.log('Directory has been removed successfully.');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

// Note: This is just a basic example for demonstration purposes. In a real-world application, you would typically handle errors more gracefully and structure your code accordingly.
