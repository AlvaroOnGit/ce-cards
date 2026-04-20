const res = await fetch(
    "https://api.scryfall.com/cards/search?q=set:mid"
);

const data = await res.json();

console.log(data);