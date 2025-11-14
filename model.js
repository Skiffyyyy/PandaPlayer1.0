const Model = {
    playlist: [
        'Team Panda.mp3',
        'Panda Theme Song!.mp3',
        'The Codes Divine.mp3',
        'Fredag.mp3',
        'Get Academy.mp3',
        'Team 7 Panda Express.mp3',
        'Team 7 Panda Express song 2.mp3',
        'Team 7 Panda Express song 3.mp3',
        'Team 7 Panda Express song 4.mp3',
        'In Our Team We Feel at Home.mp3',
        'Weekend Is Here 4.mp3'
    ],
    current: 0,

    next() {
        this.current = (this.current + 1) % this.playlist.length;
    },

    prev() {
        this.current = (this.current - 1 + this.playlist.length) % this.playlist.length;
    },

    setSong(index) {
        this.current = index;
    },

    getCurrentSong() {
        return this.playlist[this.current];
    }
};
