document.addEventListener('DOMContentLoaded', () => {
    // Function to calculate the devotion file number based on days since January 1st
    function getDevotionFileByDate(selectedDate) {
        const startOfYear = new Date(selectedDate.getUTCFullYear(), 0, 1); // January 1st of the selected year

        // Calculate the number of days between selectedDate and January 1st
        const daysSinceStartOfYear = Math.round((selectedDate - startOfYear) / (1000 * 60 * 60 * 24)); // Use Math.round for precise day calculation

        // Devotion number is daysSinceStartOfYear + 1 (since January 1st is devotion1)
        const devotionNumber = daysSinceStartOfYear + 1;

        // Generate the filename for the selected date's devotion
        return `BQW${devotionNumber}.mp3`;
    }

    // Date picker elements
    const datePicker = document.getElementById('devotion-date');
    const loadButton = document.getElementById('load-devotion');
    const devotionTitle = document.getElementById('devotion-title');
    const audioElement = document.getElementById('devotion-audio').querySelector('source');

    // Handle date selection and load devotion
    loadButton.addEventListener('click', () => {
        const selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate)) {
            alert('Please select a valid date.');
            return;
        }

        // Get the devotion file for the selected date
        const devotionFile = getDevotionFileByDate(selectedDate);
        //add one day to datepicker
        selectedDate.setDate(selectedDate.getDate() + 1);
        const displayDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        // Set the devotion title and audio source
        devotionTitle.innerText = `Devotion for ${displayDate}`;
        audioElement.src = `media/${devotionFile}`;
        audioElement.parentElement.load(); // Reload the audio element with the new source
    });
});
