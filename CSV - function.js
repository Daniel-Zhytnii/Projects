const txt = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментарі`

function parserFunction() {
    let result = txt
        .split('\n')
        .filter(str => /^\d.+/.test(str))
        .map(str => {
            let arr = []
            arr = str.split(',').map(el => el.replace(/[^'\d\. \p{L}]/iug, ''))
            const obj = { 'x': arr[0], 'y': arr[1], 'name': arr[2], 'population': arr[3] }
            return obj
        })
        .sort((a, b) => { return b.population - a.population })
        .slice(0, 10)
        .reduce((accum, currentV, currentI) => {
            let obj = {}
            obj[currentV['name']] = { 'population': currentV['population'], 'rating': currentI + 1 }
            return {...accum, ...obj }
        }, {})
    console.log(result)
    return (strUser) => {
        if (strUser === undefined || strUser === null) {
            return
        }/*что бы заменить строку в рядке, надо: 
        1.массив ключей, которые через декларацию регулярки будут реплейситься в строку(можно юзать метод replaceAll())*/
        const keys = Object.getOwnPropertyNames(result)
        const strCompleted = keys.map(key=>{
            const str = `${key} (${result[key].rating} місце в ТОП-10 найбільших міст України, населення ${result[key].population} чоловік)`
            return str
        })
        console.log(strCompleted)
        const parserSTR = (keys.reduce((accum,currentV,currentI)=>{
            const regexp = new RegExp(currentV,'gi')
            accum=accum.replaceAll(regexp,strCompleted[currentI])
            return accum
        },strUser))
        return parserSTR
    }
}
const strParser = parserFunction()
console.log(strParser(`Вінниця,
Біла Церква,
Бердянськ,
Бердичів,
Алушта - міста України
вінниця`))