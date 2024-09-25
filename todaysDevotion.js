document.addEventListener('DOMContentLoaded', () => {
    // Calculate the devotion file number based on days since January 1st
    function getTodayDevotionFile() {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1); // January 1st of the current year

        // Calculate the number of days between today and January 1st
        const daysSinceStartOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));

        // Devotion number is daysSinceStartOfYear + 1 (since January 1st is devotion1)
        const devotionNumber = daysSinceStartOfYear + 1;

        // Generate the filename for today's devotion
        return `BQW${devotionNumber}.mp3`;
    }

    // Logic to load the devotion of the day
    const devotionContainer = document.getElementById('devotion-container');
    const devotionTitle = document.getElementById('devotion-title');
    const audioElement = devotionContainer.querySelector('audio source');

    // Get today's devotion file
    const todayDevotion = getTodayDevotionFile();
    const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    devotionTitle.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + todayDate;
    audioElement.src = `media/${todayDevotion}`;
    audioElement.parentElement.load(); // Reload the audio element with the new source
});
