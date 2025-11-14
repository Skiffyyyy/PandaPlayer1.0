const Controller = {
    init() {
        View.render(
            this.playPause.bind(this),
            this.nextSong.bind(this),
            this.prevSong.bind(this),
            this.playSong.bind(this)
        );

        View.setAudioSource(Model.getCurrentSong());
        View.updateActive(Model.current);

        View.audio.onended = () => this.nextSong();

        View.audio.ontimeupdate = () => {
            const current = this.formatTime(View.audio.currentTime);
            const duration = this.formatTime(View.audio.duration);
            View.updateProgress(current, duration);
        };

        const progressTrack = document.getElementById("progress-track");

progressTrack.addEventListener("click", (e) => {
    const rect = progressTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    View.audio.currentTime = percent * View.audio.duration;
});


    },

    playPause() {
        if (View.audio.paused) View.play();
        else View.pause();
    },

    nextSong() {
        Model.next();
        this.updateCurrentSong();
    },

    prevSong() {
        Model.prev();
        this.updateCurrentSong();
    },

    playSong(index) {
        Model.setSong(index);
        this.updateCurrentSong();
    },

    updateCurrentSong() {
        View.setAudioSource(Model.getCurrentSong());
        View.updateActive(Model.current);
        View.play();
    },

    formatTime(sec) {
        if (isNaN(sec)) return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
};

Controller.init();
