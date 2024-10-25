async function getScore() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=9a070f69-58aa-447a-b950-6358a39bf75e&offset=0");
        const { data } = await response.json();
        console.log(data);
    }
    catch (err) {
        console.log(err)
    }
}
getScore();