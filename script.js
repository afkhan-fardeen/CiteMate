    // Citation templates for each style
    const citationTemplates = {
        apa: {
            book: "{author}. ({year}). {title}. {publisher}.",
            website: "{author}. ({year}). {title}. Retrieved from {url}"
        },
        harvard: {
            book: "{author}, {year}, {title}, {publisher}.",
            website: "{author}, {year}, {title}. Available at: {url} (Accessed: {accessDate})"
        },
        ieee: {
            book: "{author}, \"{title},\" {publisher}, {year}.",
            website: "{author}, \"{title},\" {url}, Accessed: {accessDate}."
        },
        mla: {
            book: "{author}. {title}. {publisher}, {year}.",
            website: "{author}. \"{title}.\" {url}. Accessed {accessDate}."
        }
    };

    function displayFields() {
    const citationType = document.getElementById('citationType').value;
    const fieldGroups = document.querySelectorAll("[id^='fields-']");
    
    // Hide all field groups
    fieldGroups.forEach(group => group.classList.add('hidden'));

    // Show the selected field group using template literals
    document.getElementById(`fields-${citationType}`).classList.remove('hidden');
}


    function generateCitation() {
    const style = document.getElementById('citationStyle').value;
    const type = document.getElementById('citationType').value;
    
    // Check if the style and type exist in citationTemplates
    if (!citationTemplates[style] || !citationTemplates[style][type]) {
        alert(`Citation style "${style}" or type "${type}" not found.`);
        return;
    }

    const template = citationTemplates[style][type];
    const fields = document.querySelectorAll(`#fields-${type} input`); // Fixed with backticks for template literals
    const fieldValues = {};
    
    // Collect field values based on field ID
    fields.forEach(field => fieldValues[field.id] = field.value);

    // Replace placeholders in the template with actual values
    let citation = template.replace(/{(\w+)}/g, (_, field) => fieldValues[field] || '');

    // Display the generated citation
    displayCitation(citation);
}


    function displayCitation(citation) {
        const citationsList = document.getElementById('citationsList');
        const citationItem = document.createElement('li');
        citationItem.className = "flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-600";

        const citationText = document.createElement('p');
        citationText.className = "text-gray-300";
        citationText.textContent = citation;

        const actionIcons = document.createElement('div');
        actionIcons.className = "flex space-x-2";

        const copyIcon = document.createElement('i');
        copyIcon.className = "fas fa-copy text-gray-400 cursor-pointer hover:text-gray-300";
        copyIcon.onclick = () => {
            navigator.clipboard.writeText(citation);
            alert('Copied!');
        };

        const trashIcon = document.createElement('i');
        trashIcon.className = "fas fa-trash text-gray-400 cursor-pointer hover:text-gray-300";
        trashIcon.onclick = () => citationItem.remove();

        actionIcons.append(copyIcon, trashIcon);
        citationItem.append(citationText, actionIcons);
        citationsList.appendChild(citationItem);
    }

    function exportCitations() {
        const citations = Array.from(document.querySelectorAll('#citationsList p')).map(p => p.textContent);
        const blob = new Blob([citations.join('\n\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'citations.txt';
        a.click();

        URL.revokeObjectURL(url);
    }
