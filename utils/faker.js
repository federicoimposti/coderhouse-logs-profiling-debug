const { faker } = require('@faker-js/faker');

const fakerList = async () => {
  try {
    let id = 1;
    const data = [];
    const count = 5
    for (let i = 0; i < count; i++) {
      const item = {
          id: id++,
          title: faker.commerce.department(),
          price: faker.commerce.price(100, 1000, 0, '$'),
          image: faker.image.business(300, 300, true)
      }
      data.push(item);
    }
  return(data)
  } catch (err) {
    throw new Error('Hubo un error generando productos con Faker.', err)
  }  
}

module.exports = { fakerList };