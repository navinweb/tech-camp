<?php

interface EventDispatcher
{
	/**
	 * listen
	 *
	 * @param  mixed $name
	 * @param  mixed $handler
	 *
	 */
	public function listen( string $name, callable $handler );

	/**
	 * fire
	 *
	 * @param  mixed $name
	 *
	 * @return bool
	 */
	public function fire( string $name ): bool;
}

class SyncDispatcher implements EventDispatcher
{
	protected $events = [];

	public function listen( string $name, callable $handler )
	{
		$this->events[ $name ][] = $handler;
	}

	public function fire( string $name ): bool
	{
		if ( ! array_key_exists( $name, $this->events ) ) {
			return false;
		}

		foreach ( $this->events[ $name ] as $event ) {
			$event();
		}

		return true;
	}
}

$event = new SyncDispatcher;

$event->listen( 'subscribed', function () {
	echo 'handling it';
} );

$event->listen( 'subscribed', function () {
	echo 'handling it again';
} );

$event->fire( 'subscribed' );
