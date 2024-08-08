import React, { useState } from 'react';
import CheckboxThree from '../buttons/CheckboxThree';
import CheckboxTwo from '../buttons/CheckboxTwo';



const data = [
  { id: 1, title: 'Article 1', published: true },
  { id: 2, title: 'Article 2', published: false },
  { id: 3, title: 'Article 3', published: true },
  { id: 4, title: 'Article 3', published: true },
  { id: 5, title: 'Article 3', published: true },
  { id: 6, title: 'Article 3', published: true },
];

const Checkbox1 = () => (
  <div className="p-2 border flex items-center">
    <span className="text-red-500">x</span>
  </div>
);

const Checkbox2 = () => (
  <div className="p-2 border flex items-center">
    <span className="text-green-500">✔</span>
  </div>
);

const Table2 = () => {
  const [currentComponent, setCurrentComponent] = useState(
    new Array(data.length).fill('checkbox1')
  );

  const [openBarIndex, setOpenBarIndex] = useState(null);

  const handleCheckboxClick = (index) => {
    setOpenBarIndex(openBarIndex === index ? null : index);
  };

  const handleComponentSelect = (index, component) => {
    const newComponents = [...currentComponent];
    newComponents[index] = component;
    setCurrentComponent(newComponents);
    setOpenBarIndex(null);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Published</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">
                <div
                  onClick={() => handleCheckboxClick(index)}
                  className="cursor-pointer"
                >
                  {currentComponent[index] === 'checkbox1' ? (
                    <Checkbox1 />
                  ) : (
                    <Checkbox2 />
                  )}
                </div>
                {openBarIndex === index && (
                  <div className="flex mt-2 space-x-2">
                    <div
                      onClick={() => handleComponentSelect(index, 'checkbox1')}
                      className="cursor-pointer"
                    >
                      <Checkbox1/>
                    </div>
                    <div
                      onClick={() => handleComponentSelect(index, 'checkbox2')}
                      className="cursor-pointer"
                    >
                      <Checkbox2 />
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
