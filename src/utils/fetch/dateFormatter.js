//simple function to properly format the date from the gamedata.createdAt:
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

export {
    formatDate
};