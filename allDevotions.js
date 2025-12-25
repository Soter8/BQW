document.addEventListener('DOMContentLoaded', () => {

    // Function to calculate the devotion file number based on days since January 1st
    function getDevotionFileByDate(selectedDate, bookPrefix) {
        const startOfYear = new Date(selectedDate.getUTCFullYear(), 0, 1); // January 1st of the selected year

        // Days since Jan 1
        let daysSinceStartOfYear = Math.round((selectedDate - startOfYear) / (1000 * 60 * 60 * 24));

        //if the day is before leap year on a day when leap year does not exist add a day
        if (!((selectedDate.getUTCFullYear() % 4 === 0 && selectedDate.getUTCFullYear() % 100 !== 0) || (selectedDate.getUTCFullYear() % 400 === 0))) {
            if (daysSinceStartOfYear >= 59) { // March 1 or later
                daysSinceStartOfYear += 1;
            }
        }

        // File number (your original logic used +2)
        const devotionNumber = daysSinceStartOfYear + 1;

        // Build filename using the selected prefix
        return `${bookPrefix}${devotionNumber}.mp3`;
    }

    // Date picker elements
    const datePicker = document.getElementById('devotion-date');
    const loadButton = document.getElementById('load-devotion');
    const devotionTitle = document.getElementById('devotion-title');
    const audioElement = document.getElementById('devotion-audio').querySelector('source');

    // Handle "Load Devotion" click
    loadButton.addEventListener('click', () => {
        const selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate)) {
            alert('Please select a valid date.');
            return;
        }

        // Get selected devotion book (BQW or TWJ)
        const bookPrefix = document.querySelector('input[name="devotion-book"]:checked').value;

        // Get devotion file
        const devotionFile = getDevotionFileByDate(selectedDate, bookPrefix);

        // Add one day for display (your existing logic)
        selectedDate.setDate(selectedDate.getDate() + 1);
        const displayDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        // Update UI
        devotionTitle.innerText = `Devotion for ${displayDate} (${bookPrefix})`;
        audioElement.src = `media/${devotionFile}`;
        audioElement.parentElement.load();
    });
});
