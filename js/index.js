// JSC.Chart('chartDiv', {
//   type: 'horizontal column',
//   series: [
//     {
//       name: 'Andy',
//       points: [
//         {x: 'Apples', y:50},
//         {x:'Oranges', y:42}
//       ]
//     },
//     {
//       name: 'Anna', 
//       points: [
//         {x: 'Apples', y: 30}, 
//         {x: 'Oranges', y: 22}
//       ]
//     }
//   ]
// });

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    csvToSeries(text);
  })
  .catch(function (error) {
    //Something went wrong
    console.log(error);
  })

function csvToSeries(text) {
  const lifeExp = 'average_life_expectancy';
  let dataAsJson = JSC.csv2Json(text);
  let male = [];
  let female = [];
  dataAsJson.forEach(function (row){
    //add either to male, female, or discard.
    if (row.race === 'All Races') {
      if (row.sex === 'Male') {
        male.push({x: row.year, y: row[lifeExp]});
      } else if (row.sex === 'Female') {
        female.push({x: row.year, y: row[lifeExp]})
      }
    }
    console.log([male, female]);
  })
}