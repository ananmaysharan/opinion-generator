document.addEventListener('DOMContentLoaded', () => {
    // Set the date to today's date
    const dateElement = document.getElementById('date');
    const today = new Date();

    // Get month as a short name with a period
    const month = today.toLocaleString('en-US', { month: 'short' }) + '.';
    const day = today.getDate();
    const year = today.getFullYear();

    // Format the date as "Month. Day, Year"
    dateElement.textContent = `${month} ${day}, ${year}`;


    // Function to convert text to Title Case
    function toTitleCase(text) {
        return text.replace(/\w\S*/g, function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    }

    // Update the text to Title Case as the user types
    const headlineText = document.getElementById('headline-text');
    headlineText.addEventListener('input', () => {
        let currentText = headlineText.textContent;
        headlineText.textContent = toTitleCase(currentText);
        
        // Move the caret to the end of the text
        let range = document.createRange();
        let selection = window.getSelection();
        range.setStart(headlineText.childNodes[0], headlineText.textContent.length);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        document.title = 'Opinion | ' + headlineText.textContent;
    });



    // Download as image functionality
    document.getElementById('download-button').addEventListener('click', () => {
        html2canvas(document.getElementById('headline-container')).then(canvas => {
            let link = document.createElement('a');
            link.download = 'headline.png';
            link.href = canvas.toDataURL();
            link.click();
        }).catch(err => console.error('Error generating image:', err));
    });
});
