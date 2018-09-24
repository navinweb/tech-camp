<?php
//****
$people = [
	[ 'John', 'Doe' ],
	[ 'Tony', 'Makarony' ],
];

foreach ( $people as [$first, $last] ) {
	var_dump( "{$first} {$last}" );
}

//****
[ , $last ] = [ 'John', 'Doe' ];
var_dump( $last );

//****
preg_match( '/\d{3}-\d{3}-(\d{4})/', '555-555-4321', $matches );
[ $full, $lastFour ] = $matches;
var_dump( $lastFour );

