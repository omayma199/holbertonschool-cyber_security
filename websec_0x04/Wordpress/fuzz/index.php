



<?php
// Define an array of allowed parameters



// Get the randomly selected parameter
$random_param = '##RANDOM_PARAM##' ;

// Extract the path from the URL
$path = trim($_SERVER['REQUEST_URI'], '/');
$paths = explode('/', $path);

// Check if the path follows the 'fuzz/hbtn-{param}' pattern
if (count($paths) == 2 && 
    preg_match('/^hbtn-(\w+)$/', $paths[1], $matches) && 
    $matches[1] === $random_param) {
    
    echo "Flag found! Congratulations. Here is your flag: " . " ##FLAG_7## ";
} else {
    http_response_code(404);
    echo "Page not found. Expected: hbtn-";
}
?>
