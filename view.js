const View = {
    app: document.getElementById("app"),
    audio: null,
    playlistEl: null,

    render(onPlayPause, onNext, onPrev, onSongClick) {
        this.app.innerHTML = /*HTML*/`
            <h1>Panda Radio</h1>
            <h2>Playlist</h2>
            <ul id="playlist"></ul>

            <div id="play-bar">

                <!-- Ny Spotify-stil progressbar -->
                <div id="progress-area">
                    <span id="current-time" class="time">0:00</span>

                    <div id="progress-track">
                        <div id="progress-fill"></div>
                    </div>

                    <span id="duration-time" class="time">0:00</span>
                </div>

                <!-- Kontroller -->
                <div class="controls">
                    <button id="prev">⏮️</button>
                    <button id="playpause">▶️</button>
                    <button id="next">⏭️</button>
                </div>

                <!-- Volum -->
                <div class="volume-container">
                    <span>🔊</span>
                    <input type="range" id="volume-slider" min="0" max="1" step="0.01" value="0.5">
                </div>

                <audio id="audio" controls></audio>
            </div>
        `;

        // hent elementer
        this.audio = document.getElementById("audio");
        this.playlistEl = document.getElementById("playlist");

        // knapper
        document.getElementById("playpause").onclick = onPlayPause;
        document.getElementById("next").onclick = onNext;
        document.getElementById("prev").onclick = onPrev;

        // volum slider
        const volumeSlider = document.getElementById("volume-slider");
        volumeSlider.value = 0.5;
        this.audio.volume = volumeSlider.value;
        volumeSlider.addEventListener("input", (e) => {
            this.audio.volume = e.target.value;
        });

        // spilleliste
        Model.playlist.forEach((song, index) => {
            const li = document.createElement("li");
            li.textContent = song.replace(".mp3", "");
            li.onclick = () => onSongClick(index);
            this.playlistEl.appendChild(li);
        });
    },

    setAudioSource(src) {
        this.audio.src = src;
    },

    play() {
        this.audio.play();
    },

    pause() {
        this.audio.pause();
    },

    updateActive(currentIndex) {
        const items = this.playlistEl.querySelectorAll("li");
        items.forEach(li => li.classList.remove("active"));
        items[currentIndex].classList.add("active");
    },

    updateProgress(current, duration) {
        document.getElementById("current-time").textContent = current || "0:00";
        document.getElementById("duration-time").textContent = duration || "0:00";

        const bar = document.getElementById("progress-fill");
        const percent = (!isNaN(this.audio.duration))
            ? (this.audio.currentTime / this.audio.duration) * 100
            : 0;

        bar.style.width = percent + "%";
    }
};
