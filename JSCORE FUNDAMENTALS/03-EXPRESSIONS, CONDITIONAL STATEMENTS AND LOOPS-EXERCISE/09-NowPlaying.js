function nowPlaying(arr) {
    [trackName,artistName,duration]=arr;
    console.log(`Now Playing: ${artistName} - ${trackName} [${duration}]`);
}

nowPlaying(['Number One', 'Nelly', '4:09']);