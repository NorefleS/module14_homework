/*Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код,
который будет преобразовывать XML в JS-объект и выводить его в консоль.

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}*/

const parser = new DOMParser();

const xmlString = `
<list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
        
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

let list = [];

let student = xmlDOM.querySelectorAll("student");
student.forEach(item => {
    list.push(
      {
        name: `${item.querySelector("first").textContent} ${item.querySelector("second").textContent}`,
        age: item.querySelector("age").textContent,
        prof: item.querySelector("prof").textContent,
        lang: item.querySelector("name").getAttribute("lang")
      }
    )
})

const obj = {list}
console.log(obj);