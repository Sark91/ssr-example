import React from 'react';
import { mount } from 'enzyme';
import DataTable from 'jsx/components/DataTable';

const mockedModel = {
  id: {
    title: 'Id',
    cellRenderer: (item) => `__xD_${item}`,
  },
  title: 'Title',
  body: 'Post'
};

const mockedData = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
];

const mountElement = (model = mockedModel, data = mockedData) => mount(
  <DataTable model={model} data={data} />
);

describe('<DataTable /> Compoenent', () => {
  test('It should mount properly', () => {
    expect(mountElement().is('DataTable')).toBe(true);
  });

  test('It should have all items from "data" property', () => {
    const element = mountElement();

    expect(element.find('tbody').children().length).toBe(mockedData.length);
  });

  test('It should have all items from "model" property', () => {
    const element = mountElement();

    expect(element.find('thead tr').children().length).toBe(Object.keys(mockedModel).length);
  });

  test('It should have all items in properly order', () => {
    const element = mountElement();

    expect(element.find('thead tr').children().at(1).text()).toMatch('Title')
    expect(element.find('tbody').children().at(0).children().at(1).text()).toMatch(mockedData[0].title)
  });

  test('It should use cellRenderer if available', () => {
    const element = mountElement();

    expect(element.find('thead tr').children().at(0).text()).toMatch('Id')
    expect(element.find('tbody').children().at(0).children().at(0).text()).toMatch(`__xD_${mockedData[0].id}`)
  });
});